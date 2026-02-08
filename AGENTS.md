# AGENTS.md - Instructions for coding agents (richmiles.xyz)

This repo is a Vite + React + TypeScript portfolio site with a FastAPI backend. Caddy serves the built SPA and proxies `/api/*` to uvicorn, all inside a single container.

## Fleet contract (Spark Swarm standard)

This repo participates in the Spark Swarm fleet standard for staging and production deploys.

### Health (required)

Health is served by FastAPI, proxied through Caddy:

- `GET /healthz` (public)
- `GET /api/v1/healthz` (verifies proxy routing)

### Ephemeral staging (required)

- Deploy definition: `deploy/pack.toml`
- GitHub Action: `Ephemeral Staging` (manual or `/stage` PR comment; owner-only)

### Production promotion (required)

- GitHub Action: `Promote to Production`
- Pins: `RICHMILES_XYZ_IMAGE_TAG=sha-...` on the prod droplet and restarts service `richmiles-xyz`
- Health URL: `https://richmiles.xyz/healthz`

### Image + secrets

- Image: `ghcr.io/richmiles/richmiles-xyz-app:<tag>`
- Secrets: `SPARK_SWARM_API_KEY` (required), `SPARK_SWARM_API_URL` (optional)

## Commands (prefer Make)

- Install deps: `make install`
- Dev (local): `make dev` (serves on http://127.0.0.1:8000)
- Checks (contract): `make check`
- Build image: `make docker-build`
