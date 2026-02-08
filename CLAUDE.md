# CLAUDE.md - richmiles.xyz Notes

Vite + React + TypeScript portfolio site with a FastAPI backend, served by Caddy + uvicorn in a single container.

## Architecture

- **Frontend**: React 19 + Vite 7 SPA (built to `dist/`, served by Caddy)
- **Backend**: FastAPI (`backend/main.py`) running on uvicorn `:8001`
- **Proxy**: Caddy on `:8000` — routes `/api/*` and `/healthz` to uvicorn, serves static files for everything else
- **Data**: No database. Backend fetches project data from Spark Swarm API at runtime.

## Fleet contract (Spark Swarm standard)

- Health: `GET /healthz` and `GET /api/v1/healthz` (served by FastAPI via Caddy proxy)
- Ephemeral staging: `deploy/pack.toml` + GitHub Action `Ephemeral Staging` (manual or `/stage`)
- Production: GitHub Action `Promote to Production` pins `RICHMILES_XYZ_IMAGE_TAG=sha-...` and restarts `richmiles-xyz`
- Image: `ghcr.io/richmiles/richmiles-xyz-app:sha-<short>`
- Health URL: `https://richmiles.xyz/healthz`

## Environment variables

- `SPARK_SWARM_API_KEY` — required for fetching project data from Spark Swarm
- `SPARK_SWARM_API_URL` — defaults to `https://swarm.sparkswarm.com/api/v1`

## Local dev

```bash
make install
make dev
```

Then open `http://127.0.0.1:8000`.
