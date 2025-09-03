#!/usr/bin/env bash
set -euo pipefail

# This script stages and commits changes in logical batches of up to 5 files each,
# assigning commit dates between 2025-09-03 and 2025-09-07.
# Usage:
#   bash scripts/commit_batches.sh
#
# Requirements: GNU coreutils (date), git installed and configured with user.name and user.email.

# Pre-seeded timestamps in the target range (local time). The script will cycle through them.
TIMESTAMPS=(
  "2025-09-03 09:17:12" "2025-09-03 13:42:55" "2025-09-03 18:05:09"
  "2025-09-04 10:11:03" "2025-09-04 15:29:44" "2025-09-04 19:56:21"
  "2025-09-05 08:23:37" "2025-09-05 12:48:10" "2025-09-05 17:31:58"
  "2025-09-06 09:03:22" "2025-09-06 14:16:47" "2025-09-06 20:41:05"
  "2025-09-07 10:05:30" "2025-09-07 13:57:11" "2025-09-07 18:49:59"
)
TS_INDEX=0

next_timestamp() {
  local ts="${TIMESTAMPS[$TS_INDEX]}"
  TS_INDEX=$(( (TS_INDEX + 1) % ${#TIMESTAMPS[@]} ))
  printf '%s' "$ts"
}

commit_batch() {
  local message="$1"; shift
  local files=("$@")
  if [ ${#files[@]} -eq 0 ]; then
    return 0
  fi
  git add -- "${files[@]}"
  local when
  when="$(next_timestamp)"
  GIT_AUTHOR_DATE="$when" GIT_COMMITTER_DATE="$when" git commit -m "$message"
}

# Collect untracked and modified files
mapfile -t UNTRACKED < <(git ls-files --others --exclude-standard)
mapfile -t MODIFIED < <(git diff --name-only)

# Combine and unique while preserving order
ALL=()
seen=""
append_unique() {
  local f
  for f in "$@"; do
    if [[ ",$seen," != *",$f,"* ]]; then
      ALL+=("$f");
      seen="$seen,$f"
    fi
  done
}
append_unique "${UNTRACKED[@]}"
append_unique "${MODIFIED[@]}"

# Group files by logical areas to create meaningful commits
CONFIG=()
DOCS=()
FRONTEND_CORE=()
FRONTEND_PAGES=()
FRONTEND_COMPONENTS=()
BACKEND_CORE=()
BACKEND_ROUTES=()
BACKEND_CONTROLLERS=()
BACKEND_SERVICES=()
BACKEND_MISC=()
PUBLIC_ASSETS=()
OTHER=()

for f in "${ALL[@]}"; do
  case "$f" in
    package.json|package-lock.json|tsconfig.json|next.config.js|tailwind.config.ts|postcss.config.js|prettier.config.js|vercel.json|vitest.config.ts|.eslintrc.json|.env.example)
      CONFIG+=("$f") ;;
    README.md|LICENSE|article.md|sample-readme.md|CHANGELOG.md)
      DOCS+=("$f") ;;
    src/lib/*)
      FRONTEND_CORE+=("$f") ;;
    src/app/*)
      FRONTEND_PAGES+=("$f") ;;
    src/components/*)
      FRONTEND_COMPONENTS+=("$f") ;;
    backend/src/index.ts|backend/src/server.ts|backend/src/config/*)
      BACKEND_CORE+=("$f") ;;
    backend/src/routes/*)
      BACKEND_ROUTES+=("$f") ;;
    backend/src/controllers/*)
      BACKEND_CONTROLLERS+=("$f") ;;
    backend/src/services/*)
      BACKEND_SERVICES+=("$f") ;;
    backend/src/*)
      BACKEND_MISC+=("$f") ;;
    public/*)
      PUBLIC_ASSETS+=("$f") ;;
    *)
      OTHER+=("$f") ;;
  esac
done

# Helper to chunk arrays into batches of at most 5 files and commit with a base message
chunk_and_commit() {
  local base_msg="$1"; shift
  local -n arr_ref=$1
  local total=${#arr_ref[@]}
  local start=0
  local end
  local batch
  local idx=1
  while [ $start -lt $total ]; do
    end=$(( start + 5 ))
    if [ $end -gt $total ]; then end=$total; fi
    batch=("${arr_ref[@]:$start:$(( end - start ))}")
    commit_batch "$base_msg (batch $idx)" "${batch[@]}"
    start=$end
    idx=$(( idx + 1 ))
  done
}

# Execute batches in a sensible order
chunk_and_commit "chore(config): add project configuration" CONFIG
chunk_and_commit "docs: add repository documentation" DOCS
chunk_and_commit "feat(frontend): add core libraries" FRONTEND_CORE
chunk_and_commit "feat(frontend): add application pages" FRONTEND_PAGES
chunk_and_commit "feat(frontend): add shared components" FRONTEND_COMPONENTS
chunk_and_commit "feat(backend): bootstrap core server" BACKEND_CORE
chunk_and_commit "feat(backend): add HTTP routes" BACKEND_ROUTES
chunk_and_commit "feat(backend): add controllers" BACKEND_CONTROLLERS
chunk_and_commit "feat(backend): add services and integrations" BACKEND_SERVICES
chunk_and_commit "chore(backend): add supporting files" BACKEND_MISC
chunk_and_commit "assets: add public assets" PUBLIC_ASSETS
chunk_and_commit "chore: add other repository files" OTHER

# Show resulting log succinctly
printf "\nDone. Recent commits:\n"
GIT_PAGER=cat git --no-pager log --pretty=format:'%h %ad %s' --date=local -n 20
