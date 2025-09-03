# PrivJob

PrivJob is a privacy-first hiring platform that lets candidates prove what matters without exposing who they are. The product combines a modern Next.js frontend with a Fastify-based TypeScript backend and a secure PostgreSQL database (via Supabase) to deliver privacy-preserving job discovery, zero-knowledge credential verification, tamper-evident application tracking, and contact brokering that never leaks personal information by default. The implementation targets production reliability while centering Midnight-powered zero-knowledge workflows as first-class capabilities.

The system is intentionally split into two coherent layers. The frontend in `src/` implements the candidate and employer experiences and hosts the zero-knowledge UX flows. The backend in `backend/` exposes a clean REST API for jobs, applications, and contact requests; integrates with Supabase for Postgres and Row Level Security policies; and includes Redis for caching and privacy-preserving ephemeral data. A dedicated Midnight integration layer anchors verifiable credentials and privacy-preserving attestations to Midnight contracts while keeping sensitive material off-chain.

```
+---------------------+        HTTPS        +-------------------------+        TCP        +-------------------+
|     Next.js App     |  <----------------> |       Fastify API       |  <-------------> |     Postgres      |
|  (pages in src/app) |                    |   (TypeScript, JWT)     |                  |   (Supabase)      |
|  ZK UX Components   |                    |  RLS-aware Controllers  |                  |  RLS + Policies   |
+----------+----------+                    +------------+------------+                  +---------+---------+
           |                                                     |                               |
           | Proof Requests / Selective Disclosure               |                               |
           v                                                     v                               v
   +-------+--------+                                     +------+--------+                +------+------+
   |  ZK Client     |                                     |   Redis      |                | Midnight ZK |
   |  Flow (UI)     |                                     |   Ephemeral  |                | Contracts   |
   |                |                                     |   Data TTL   |                |  + zkVM     |
   +----------------+                                     +--------------+                +------------+
```

At its core, PrivJob enforces a strict privacy posture. Candidates manage credentials client-side and present cryptographic proofs of facts such as years of experience or possession of specific certifications. Employers discover talent and verify claims with confidence without ever receiving raw personal data. A dedicated contact broker issues ephemeral relays so that both parties can exchange messages while identities remain private until they mutually opt in to disclosure. The database is organized with table-level constraints and Row Level Security to ensure data isolation, while short-lived data, like contact relays, is kept in Redis with automatic time-to-live cleanup.

The frontend is built with Next.js App Router and Tailwind CSS utility classes, using a consistent `pj-` prefix to isolate styles. Key candidate and employer pages live under `src/app/`, and the UI guides users through selective disclosure, proof generation, and verification responses without asking for sensitive details up front.

The backend is implemented with Fastify in TypeScript and a clear separation of concerns. Configuration is centralized, controllers validate with shared middleware, and routes are registered under a versioned API surface. A services layer contains adapters for Supabase Postgres, Redis, and the Midnight Network. A worker streams on-chain events to keep application state consistent with verifications anchored to Midnight. JWT is used for employer authentication, and auditing avoids PII by design.

## Frontend overview

The Next.js application provides distinct experiences for candidates and employers with a consistent privacy baseline. The jobs listing experience is implemented at https://github.com/Abraham12611/privjob/blob/main/src/app/jobs/page.tsx and the employer workspace is at https://github.com/Abraham12611/privjob/blob/main/src/app/employer/page.tsx. Candidates track their applications at https://github.com/Abraham12611/privjob/blob/main/src/app/candidate/applications/page.tsx and manage credentials at https://github.com/Abraham12611/privjob/blob/main/src/app/candidate/credentials/page.tsx. Privacy preferences and data-sharing controls are available at https://github.com/Abraham12611/privjob/blob/main/src/app/settings/privacy/page.tsx, and contact requests are mediated at https://github.com/Abraham12611/privjob/blob/main/src/app/contact/page.tsx. Candidate navigation is centralized in https://github.com/Abraham12611/privjob/blob/main/src/components/candidate/candidate-nav.tsx for clarity.

```
Frontend (src/)
  app/
    jobs/                    -> Jobs listing and discovery
    employer/                -> Employer workspace
    candidate/applications/  -> Application tracking with ZK status
    candidate/credentials/   -> Credential manager with proof handling
    settings/privacy/        -> Privacy and data sharing controls
    contact/                 -> Contact broker UI (no PII by default)
  components/
    candidate/               -> Candidate navigation and UI blocks
```

A small utilities and integration layer under `src/lib/` centralizes API access and Midnight Network client helpers. Find the API helper at https://github.com/Abraham12611/privjob/blob/main/src/lib/api.ts, the Midnight client layer at https://github.com/Abraham12611/privjob/blob/main/src/lib/midnight.ts, and general utilities at https://github.com/Abraham12611/privjob/blob/main/src/lib/utils.ts.

## Backend overview

The backend is a Fastify REST API built with TypeScript. The entrypoint wires up configuration and routes in https://github.com/Abraham12611/privjob/blob/main/backend/src/index.ts and https://github.com/Abraham12611/privjob/blob/main/backend/src/server.ts. Routes are declared in a central registrar at https://github.com/Abraham12611/privjob/blob/main/backend/src/routes/index.ts and are organized by resource into jobs at https://github.com/Abraham12611/privjob/blob/main/backend/src/routes/jobs.ts, applications at https://github.com/Abraham12611/privjob/blob/main/backend/src/routes/applications.ts, contact at https://github.com/Abraham12611/privjob/blob/main/backend/src/routes/contact.ts, organizations at https://github.com/Abraham12611/privjob/blob/main/backend/src/routes/organizations.ts, and health checks at https://github.com/Abraham12611/privjob/blob/main/backend/src/routes/health.ts. Each route delegates to a controller confined to validation and orchestration. For example, jobs are handled in https://github.com/Abraham12611/privjob/blob/main/backend/src/controllers/jobs.ts, applications in https://github.com/Abraham12611/privjob/blob/main/backend/src/controllers/applications.ts, and contact brokering in https://github.com/Abraham12611/privjob/blob/main/backend/src/controllers/contact.ts.

Configuration is centralized in https://github.com/Abraham12611/privjob/blob/main/backend/src/config/env.ts so the runtime obtains typed environment variables safely. Cross-cutting concerns are implemented as middleware. Authentication is enforced in https://github.com/Abraham12611/privjob/blob/main/backend/src/middleware/auth.ts, request validation lives in https://github.com/Abraham12611/privjob/blob/main/backend/src/middleware/validation.ts, and clean error surfaces are provided by https://github.com/Abraham12611/privjob/blob/main/backend/src/middleware/error-handler.ts. Services contain the integrations and complex workflows. Database access goes through Supabase in https://github.com/Abraham12611/privjob/blob/main/backend/src/services/database.ts, ephemeral contact channels and caches use Redis in https://github.com/Abraham12611/privjob/blob/main/backend/src/services/redis.ts, the privacy-preserving contact broker logic is in https://github.com/Abraham12611/privjob/blob/main/backend/src/services/contact-broker.ts, and Midnight Network integration points are implemented in https://github.com/Abraham12611/privjob/blob/main/backend/src/services/midnight.ts with SDK bindings in https://github.com/Abraham12611/privjob/blob/main/backend/src/services/midnight-sdk.ts. Background processing for chain events and automated application updates is handled by a dedicated worker in https://github.com/Abraham12611/privjob/blob/main/backend/src/workers/indexer.ts.

The underlying database schema and security decisions are aligned with modern privacy requirements. Tables for organizations, employer users, jobs, applications, and contact requests are designed to respect ownership boundaries, and Row Level Security policies in Supabase ensure that an employer can never access another organization’s data. Audit trails are recorded without storing PII. Ephemeral contact artifacts are stored in Redis with TTL so that private relays expire automatically and cannot be reconstructed from persistent storage even by privileged operators.

## Midnight integration

PrivJob integrates with Midnight to anchor verifications in a way that preserves confidentiality while providing verifiable integrity. The service layer at https://github.com/Abraham12611/privjob/blob/main/backend/src/services/midnight.ts encapsulates interactions for proof submission and verification requests, while SDK bindings in https://github.com/Abraham12611/privjob/blob/main/backend/src/services/midnight-sdk.ts follow the patterns outlined in the Midnight builder quickstart. A background worker at https://github.com/Abraham12611/privjob/blob/main/backend/src/workers/indexer.ts subscribes to Midnight events and updates application state when proofs are finalized on-chain.

The approach is designed around selective disclosure. Candidates prove predicates over their credentials rather than revealing them in the clear, and the employer receives a signed verification outcome that can be independently validated against Midnight without learning the underlying secrets. This flow adheres to the principles documented in the Midnight developer hub and quickstart guides and treats on-chain artifacts as attestations rather than data dumps.

For technical orientation and alignment with the platform, consult the official Midnight documentation and builder resources. The developer hub at https://midnight.network/developer-hub explains architectural concepts and SDK capabilities, while the quickstart guidance at https://docs.midnight.network/quickstart/builder-quickstart and https://docs.midnight.network/develop/tutorial/creating/ provides step-by-step instructions for setting up projects, creating contracts, and working with zero-knowledge constructs.

## Running locally

Install dependencies at the repository root and start the development server with `npm install` followed by `npm run dev`. In another terminal, change into the `backend/` directory, install its dependencies, and start the API with `npm run dev`. The Next.js app listens on http://localhost:3000 and the Fastify API exposes its endpoints and health checks on a separate port. Configure environment variables following the examples in `backend/.env.example` and the root `.env.example`.

## Security posture

PrivJob is built on the premise that privacy must be the default, not a feature to opt in to. The backend authenticates employers using JWT and authorizes access using organization-scoped policies. The database is protected with Row Level Security, so even if an endpoint is misused, the database refuses cross-tenant access at the row layer. Audit logging avoids PII by design. Contact requests are brokered through ephemeral channels that use Redis with strict TTL so that the trail evaporates once a decision has been made. The frontend presents zero-knowledge verification flows visually and treats proofs as first-class objects without requiring the raw underlying credentials to pass through or be stored by the server.

## Code map (selected references)

For readers who prefer jumping to code, here are direct links to representative files in the repository. The jobs page is at https://github.com/Abraham12611/privjob/blob/main/src/app/jobs/page.tsx and the employer workspace is at https://github.com/Abraham12611/privjob/blob/main/src/app/employer/page.tsx. Candidate application tracking can be found at https://github.com/Abraham12611/privjob/blob/main/src/app/candidate/applications/page.tsx, credential management at https://github.com/Abraham12611/privjob/blob/main/src/app/candidate/credentials/page.tsx, privacy settings at https://github.com/Abraham12611/privjob/blob/main/src/app/settings/privacy/page.tsx, and the contact broker UI at https://github.com/Abraham12611/privjob/blob/main/src/app/contact/page.tsx. On the backend side, the Fastify bootstrap is at https://github.com/Abraham12611/privjob/blob/main/backend/src/index.ts, the route registrar sits at https://github.com/Abraham12611/privjob/blob/main/backend/src/routes/index.ts, and an example controller at https://github.com/Abraham12611/privjob/blob/main/backend/src/controllers/jobs.ts illustrates the pattern used throughout. Database and cache services live in https://github.com/Abraham12611/privjob/blob/main/backend/src/services/database.ts and https://github.com/Abraham12611/privjob/blob/main/backend/src/services/redis.ts, the Midnight integration layer is in https://github.com/Abraham12611/privjob/blob/main/backend/src/services/midnight.ts with SDK bindings in https://github.com/Abraham12611/privjob/blob/main/backend/src/services/midnight-sdk.ts, and the chain worker is at https://github.com/Abraham12611/privjob/blob/main/backend/src/workers/indexer.ts.

## Contributing and license

This repository aims to be a clear reference for building privacy-first job marketplaces with a modern TypeScript stack and Midnight-powered zero-knowledge verification. Contributions that improve security, documentation, test coverage, and developer ergonomics are welcome. Please open an issue describing the change you intend to make and submit a focused pull request once a maintainer has acknowledged the proposal. This project is licensed under the Apache License, Version 2.0. See the `LICENSE` file at the root of the repository.
