#!/bin/sh
set -e

# Start FastAPI backend in background
python3 -m uvicorn backend.main:app --host 127.0.0.1 --port 8001 &

# Run Caddy in foreground
exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
