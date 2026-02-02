from __future__ import annotations

from pathlib import Path

import tomllib


def must(cond: bool, msg: str) -> None:
    if not cond:
        raise SystemExit(msg)


PROJECT = "richmiles-xyz"
IMAGE = "ghcr.io/richmiles/richmiles-xyz-app"


def main() -> None:
    for p in ("AGENTS.md", "CLAUDE.md", "Dockerfile", "Caddyfile", ".env.example", "deploy/pack.toml"):
        must(Path(p).exists(), f"missing {p}")

    caddy = Path("Caddyfile").read_text()
    must("/healthz" in caddy, "Caddyfile missing /healthz")
    must("/api/v1/healthz" in caddy, "Caddyfile missing /api/v1/healthz")

    pack_path = Path("deploy/pack.toml")
    pack = tomllib.loads(pack_path.read_text())
    must(pack.get("project", {}).get("key") == PROJECT, "deploy pack project.key mismatch")

    services = pack.get("services") or []
    must(isinstance(services, list) and services, "deploy pack missing [[services]]")
    must(services[0].get("image") == IMAGE, "deploy pack services[0].image mismatch")

    checks = (pack.get("checks") or {}).get("staging") or []
    must(any("/healthz" in str(c.get("url", "")) for c in checks), "deploy pack missing /healthz check")
    must(any("/api/v1/healthz" in str(c.get("url", "")) for c in checks), "deploy pack missing /api/v1/healthz check")

    workflow_stage = Path(".github/workflows/ephemeral-staging.yml").read_text()
    must("deploy/pack.toml" in workflow_stage, "ephemeral-staging.yml must reference deploy/pack.toml")

    workflow_prod = Path(".github/workflows/promote-production.yml").read_text()
    must("RICHMILES_XYZ_IMAGE_TAG" in workflow_prod, "promote-production.yml must pin RICHMILES_XYZ_IMAGE_TAG")
    must("richmiles.xyz/healthz" in workflow_prod, "promote-production.yml must health-check /healthz")

    for doc_name in ("AGENTS.md", "CLAUDE.md"):
        doc = Path(doc_name).read_text()
        must("/healthz" in doc, f"{doc_name} missing /healthz")
        must("/api/v1/healthz" in doc, f"{doc_name} missing /api/v1/healthz")
        must("deploy/pack.toml" in doc, f"{doc_name} missing deploy/pack.toml mention")
        must("RICHMILES_XYZ_IMAGE_TAG" in doc, f"{doc_name} missing RICHMILES_XYZ_IMAGE_TAG mention")

    print("check_contract ok")


if __name__ == "__main__":
    main()

