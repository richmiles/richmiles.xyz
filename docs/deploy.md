# Deploy (Fleet Contract)

This repo participates in the Spark Swarm fleet contract:

- Image: `ghcr.io/richmiles/richmiles-xyz-app:<tag>`
- Service: `richmiles-xyz` (on the shared prod droplet)
- Health URL: `https://richmiles.xyz/healthz`

## Ephemeral staging

Source of truth: `deploy/pack.toml`.

Workflow: GitHub Action **Ephemeral Staging**.

- Trigger: workflow dispatch or PR comment `/stage` (owner-only).
- Behavior: builds `linux/amd64`, uploads as `--image-tar`, stages to an ephemeral droplet, then runs the HTTP checks defined in `deploy/pack.toml`.

## Production

Workflow: GitHub Action **Promote to Production**.

- Trigger: workflow dispatch.
- Behavior: builds and pushes `linux/amd64` image to GHCR as `ghcr.io/<owner>/richmiles-xyz-app:sha-<short>`, then pins `RICHMILES_XYZ_IMAGE_TAG` on the prod droplet and restarts the `richmiles-xyz` service.
- Verification: workflow checks `https://richmiles.xyz/healthz`.

## Local sanity checks

```bash
make check
make docker-build
make docker-run
```
