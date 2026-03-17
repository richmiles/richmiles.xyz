import json
from functools import lru_cache
from pathlib import Path
from typing import Any

from backend.portfolio_schemas import (
    ExperienceItem,
    ExperienceListResponse,
    ProfileResponse,
    ProjectListResponse,
    ProjectResponse,
)

CONTENT_DIR = Path(__file__).resolve().parent / "content"
DEFAULT_PROJECT_ICON = "/img/spark-swarm.svg"


def _load_json(filename: str) -> Any:
    return json.loads((CONTENT_DIR / filename).read_text(encoding="utf-8"))


@lru_cache
def load_profile() -> ProfileResponse:
    return ProfileResponse.model_validate(_load_json("profile.json"))


@lru_cache
def load_experience() -> ExperienceListResponse:
    items = [ExperienceItem.model_validate(item) for item in _load_json("experience.json")]
    return ExperienceListResponse(items=items)


@lru_cache
def load_project_icons() -> dict[str, str]:
    data = _load_json("project_icons.json")
    return {str(key): str(value) for key, value in data.items()}


@lru_cache
def load_project_fallback() -> list[ProjectResponse]:
    icons = load_project_icons()
    projects: list[ProjectResponse] = []
    for item in _load_json("projects_fallback.json"):
        project = dict(item)
        project["icon"] = icons.get(project["id"], DEFAULT_PROJECT_ICON)
        projects.append(ProjectResponse.model_validate(project))
    return projects


def fallback_projects(*, warning: str | None = None) -> ProjectListResponse:
    return ProjectListResponse(projects=load_project_fallback(), source="fallback", warning=warning)
