<!--
Sync Impact Report:
- Version change: 1.0.0 → 1.1.0
- Modified principles: Added 6 specific principles for the Todo Full-Stack Web Application
- Added sections: Core Principles, Key Standards, Constraints, Quality & validation requirements, Success criteria
- Removed sections: None
- Templates requiring updates: ✅ Updated all templates to align with new principles
- Follow-up TODOs: None
-->
# Todo Full-Stack Web Application Constitution

## Core Principles

### I. Spec-First Development
All implementation must trace back to approved specs. No code implementation without corresponding specification requirement. Every feature, API endpoint, and functionality must be documented in spec before development begins.

### II. Correctness and Consistency
Implementation must maintain consistency across frontend, backend, and database layers. All components must integrate without implicit assumptions. API behavior must exactly match defined REST contract specifications.

### III. Security-by-Design
Authentication and authorization must be enforced at all system boundaries. Data isolation must be implemented to prevent cross-user access. All secrets must be handled via environment variables with no hardcoding allowed.

### IV. Automation Over Manual Work
No handwritten code outside agent-generated outputs. All code must be generated via Claude Code using Spec-Kit Plus. Manual coding is prohibited except for initial setup and configuration.

### V. Tech Stack Compliance
Must use only the defined technology stack: Frontend: Next.js 16+ (App Router), Backend: Python FastAPI, ORM: SQLModel, Database: Neon Serverless PostgreSQL, Authentication: Better Auth + JWT. Deviations require explicit approval and updated specifications.

### VI. Quality and Validation Standards
Backend must reject unauthenticated requests with 401 Unauthorized. JWT token verification must use a shared secret across services. Database schema must support multi-user isolation. Frontend must attach JWT to every API request. Errors must be explicit, consistent, and debuggable.

## Key Standards

Every feature must map directly to a written spec requirement. API behavior must exactly match the defined REST contract. Authentication must use Better Auth with JWT-based verification. All backend routes must enforce user ownership and access control. Frontend, backend, and database must integrate without implicit assumptions. All secrets handled via environment variables (no hardcoding).

## Constraints

No manual coding; all code generated via Claude Code using Spec-Kit Plus. Must use the defined tech stack only: Frontend: Next.js 16+ (App Router), Backend: Python FastAPI, ORM: SQLModel, Database: Neon Serverless PostgreSQL, Authentication: Better Auth + JWT. REST API endpoints must remain stable and consistent. All authenticated requests must require a valid JWT. Stateless backend authentication (no shared sessions).

## Quality & Validation Requirements

Backend must reject unauthenticated requests with 401 Unauthorized. Cross-user data access must be impossible. JWT token verification must use a shared secret across services. Database schema must support multi-user isolation. Frontend must attach JWT to every API request. Errors must be explicit, consistent, and debuggable.

## Success Criteria

All specs pass implementation review without deviation. End-to-end flow works: signup → login → CRUD tasks → logout. Each user can only see and modify their own tasks. API security verified via negative test cases. Project can be evaluated solely by reviewing specs, plans, prompts.

## Governance

This constitution governs all development activities. All implementations must comply with these principles. Amendments require documentation of changes and approval from project stakeholders. All pull requests and reviews must verify constitutional compliance. Code quality, security, and architectural decisions must align with these principles.

**Version**: 1.1.0 | **Ratified**: 2026-02-01 | **Last Amended**: 2026-02-01