from __future__ import annotations

import os
from contextlib import asynccontextmanager
from typing import Any

import httpx
from fastapi import FastAPI
from fastapi.responses import JSONResponse

SPARK_SWARM_API_URL = os.getenv("SPARK_SWARM_API_URL", "https://swarm.sparkswarm.com/api/v1")
SPARK_SWARM_API_KEY = os.getenv("SPARK_SWARM_API_KEY", "")

_http_client: httpx.AsyncClient | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global _http_client
    _http_client = httpx.AsyncClient(timeout=10)
    yield
    await _http_client.aclose()


app = FastAPI(lifespan=lifespan)


@app.get("/healthz")
async def healthz():
    return JSONResponse({"status": "ok"})


@app.get("/api/v1/healthz")
async def api_healthz():
    return JSONResponse({"status": "ok"})


@app.get("/api/v1/projects")
async def get_projects():
    """Fetch live sparks from Spark Swarm and return as portfolio projects."""
    if not SPARK_SWARM_API_KEY:
        return JSONResponse({"projects": [], "error": "missing api key"}, status_code=503)

    assert _http_client is not None
    try:
        resp = await _http_client.get(
            f"{SPARK_SWARM_API_URL}/sparks",
            headers={"X-API-Key": SPARK_SWARM_API_KEY},
        )
        resp.raise_for_status()
    except httpx.HTTPError:
        return JSONResponse({"projects": [], "error": "upstream unavailable"}, status_code=502)

    sparks = resp.json().get("sparks", [])

    # Only include sparks that are live or building (not idea-stage)
    active_stages = {"live", "building"}
    projects: list[dict[str, Any]] = []
    for spark in sparks:
        if spark.get("stage") not in active_stages:
            continue
        # Skip richmiles.xyz itself
        if spark.get("slug") == "richmiles-xyz":
            continue

        projects.append({
            "id": spark.get("slug", ""),
            "title": spark.get("name", ""),
            "description": spark.get("description", ""),
            "domain": spark.get("domain"),
            "stage": spark.get("stage"),
            "health": spark.get("health", "unknown"),
            "last_deploy_at": spark.get("last_deploy_at"),
            "category": spark.get("category"),
        })

    return {"projects": projects}
