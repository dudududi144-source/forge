# Forge

> Sovereign CI/CD platform - built from first principles

Forge is a self-hosted CI/CD platform that allows you to run builds
on your repositories without relying on external CI/CD services.

## Quick Start

    npm install
    npm run dev

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/health | GET | Health check |
| /api/build | POST | Trigger a build |
| /api/build/[buildId] | GET | Get build status |

## Build API

### Trigger a Build

    curl -X POST https://rabotatony.workers.dev/forge/api/build \
      -H "Content-Type: application/json" \
      -d '{"repo": "dudududi144-source/PromptForge", "branch": "main"}'

### Get Build Status

    curl https://rabotatony.workers.dev/forge/api/build/build_1234567890

## Deployment

    npm run deploy

## License

MIT
