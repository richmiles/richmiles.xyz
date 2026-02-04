# richmiles.xyz

Personal resume site built as a Vite + React + TypeScript SPA and served by Caddy (no backend, no database).

## Local development

Fast iteration (Vite dev server):

```bash
npm install
npm run dev
```

Production-like (Caddy serving the built SPA + health endpoints):

```bash
make dev
```

Then open `http://127.0.0.1:8000`.

## Health endpoints

Served by Caddy inside the container:

- `GET /healthz`
- `GET /api/v1/healthz` (proxy routing check for the fleet contract)

## Deploy

This repo follows the Spark Swarm fleet contract.

- Ephemeral staging: `deploy/pack.toml` + GitHub Action `Ephemeral Staging` (manual or `/stage` PR comment; owner-only).
- Production: GitHub Action `Promote to Production` pins `RICHMILES_XYZ_IMAGE_TAG=sha-...` on the prod droplet and restarts service `richmiles-xyz`.

More detail: `docs/deploy.md`.
