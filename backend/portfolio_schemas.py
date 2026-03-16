from pydantic import BaseModel, Field


class ContactLink(BaseModel):
    label: str
    href: str
    icon: str


class ProfileResponse(BaseModel):
    name: str
    tagline: str
    description: str
    photo_url: str
    cta_label: str
    location: str
    contact_links: list[ContactLink] = Field(default_factory=list)


class ExperienceItem(BaseModel):
    date: str
    title: str
    company: str
    description: str


class ExperienceListResponse(BaseModel):
    items: list[ExperienceItem]


class ProjectResponse(BaseModel):
    id: str
    title: str
    description: str
    domain: str | None = None
    stage: str
    health: str
    last_deploy_at: str | None = None
    category: str | None = None
    icon: str


class ProjectListResponse(BaseModel):
    projects: list[ProjectResponse]
    source: str
    warning: str | None = None
