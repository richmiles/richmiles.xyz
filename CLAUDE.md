# CLAUDE.md - richmiles.xyz Notes

Static resume site deployed as a small Caddy container (no FastAPI, no database).

## Fleet contract (Spark Swarm standard)

- Health: `GET /healthz` and `GET /api/v1/healthz` (served by Caddy)
- Ephemeral staging: `deploy/pack.toml` + GitHub Action `Ephemeral Staging` (manual or `/stage`)
- Production: GitHub Action `Promote to Production` pins `RICHMILES_XYZ_IMAGE_TAG=sha-...` and restarts `richmiles-xyz`
- Image: `ghcr.io/richmiles/richmiles-xyz-app:sha-<short>`
- Health URL: `https://richmiles.xyz/healthz`

## Local dev

```bash
make dev
```

Then open `http://127.0.0.1:8000`.

