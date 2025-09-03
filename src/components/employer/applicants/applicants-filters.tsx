'use client'

export function ApplicantsFilters() {
  return (
    <div className="pj-flex pj-flex-wrap pj-gap-2">
      <button className="pj-btn pj-btn--ghost pj-px-3 pj-py-2">All</button>
      <button className="pj-btn pj-btn--ghost pj-px-3 pj-py-2">Qualified</button>
      <button className="pj-btn pj-btn--ghost pj-px-3 pj-py-2">Partial</button>
      <button className="pj-btn pj-btn--ghost pj-px-3 pj-py-2">Rejected</button>
    </div>
  )
}
