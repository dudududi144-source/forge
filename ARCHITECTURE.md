# Forge Architecture

## Design Philosophy

Forge was rebuilt from scratch after a catastrophic failure taught us critical lessons.
This document captures the architectural decisions and their rationale.

## Lessons Learned (The Why)

### 1. GitHub Actions Abuse
**What happened:** Excessive API calls and workflow automation triggered account suspension.
**Solution:** Local-first development. GitHub Actions only for final deployment triggers.

### 2. Bundle Size Limits
**What happened:** Cloudflare Workers 3MiB limit caused deployment failures.
**Solution:** Use Cloudflare Pages (no bundle limit) for primary hosting.

### 3. Vendor Lock-in
**What happened:** D1 database tied us to Cloudflare's ecosystem.
**Solution:** Turso/libSQL - SQLite-compatible, works everywhere.

### 4. Silent Failures
**What happened:** Errors swallowed, debugging impossible.
**Solution:** Comprehensive logging, health checks, error boundaries.

## System Layers

1. **Interface Layer** - Cloudflare Pages (SSR + Static)
2. **Compute Layer** - Cloudflare Workers (Background Jobs)
3. **Database Layer** - Turso/libSQL (Platform-agnostic)
4. **CI/CD Layer** - Local-first with minimal GitHub deps
5. **Monitoring Layer** - Health checks + Structured logging

## Technology Stack

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Framework | Next.js 15 | SSR + API routes + static export |
| Database | Turso | Platform-agnostic SQLite |
| ORM | Prisma | Type-safe, multi-backend |
| Hosting | Cloudflare Pages | No bundle limits, edge network |
| Language | TypeScript | Type safety catches errors early |

## Database Design

### Why SQLite/libSQL?
- Zero administration
- ACID compliant
- Works embedded or over HTTP
- No vendor lock-in

### Schema Principles
- All IDs use cuid() (collision-resistant, sortable)
- Cascade deletes for owned resources
- Indexes on all foreign keys and query patterns
- Audit log for all mutations

## Deployment Strategy

### Primary: Cloudflare Pages
- No bundle size limit
- Global edge network
- Built-in analytics

### Secondary: Cloudflare Workers
- Background jobs only
- Scheduled tasks (cron)
- Webhook processing

### What We Avoid
- GitHub Actions for compute
- Long-running processes in serverless
- Storing secrets in code

## Security Model

1. **Encryption at rest:** All secrets encrypted with FORGE_ENCRYPTION_KEY
2. **Environment isolation:** Dev/staging/prod separation
3. **Least privilege:** API tokens scoped to specific operations
4. **Audit trail:** All actions logged with actor and timestamp

## Monitoring

- /api/health - System health check
- Structured logging with correlation IDs
- Error tracking (TODO: Sentry integration)
- Performance metrics (TODO)

## Future Considerations

1. Multi-region database replication
2. Queue system for build jobs
3. Plugin architecture for workflows
4. Self-hosted runner support