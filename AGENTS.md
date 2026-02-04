# AGENTS.md - Instructions for coding agents (richmiles.xyz)

This repo is a Vite + React + TypeScript resume site (no backend, no database). The built SPA is served by Caddy inside the container.

## Fleet contract (Spark Swarm standard)

This repo participates in the Spark Swarm fleet standard for staging and production deploys.

### Health (required)

Health is served at the webserver layer (Caddy inside the container):

- `GET /healthz` (public)
- `GET /api/v1/healthz` (verifies proxy routing)

### Ephemeral staging (required)

- Deploy definition: `deploy/pack.toml` (`database.kind` omitted; no DB)
- GitHub Action: `Ephemeral Staging` (manual or `/stage` PR comment; owner-only)

### Production promotion (required)

- GitHub Action: `Promote to Production`
- Pins: `RICHMILES_XYZ_IMAGE_TAG=sha-...` on the prod droplet and restarts service `richmiles-xyz`
- Health URL: `https://richmiles.xyz/healthz`

### Image + secrets

- Image: `ghcr.io/richmiles/richmiles-xyz-app:<tag>`
- Secrets: none required

## Commands (prefer Make)

- Install deps: `make install`
- Dev (local): `make dev` (serves on http://127.0.0.1:8000)
- Checks (contract): `make check`
- Build image: `make docker-build`
