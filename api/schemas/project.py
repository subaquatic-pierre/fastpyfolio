from typing import List, Optional
from datetime import datetime

from schemas.base import BaseSchema, BaseModelSchema


class CreateProjectReq(BaseSchema):
    title: str
    description: str
    tags: List[str] = []
    content: str | None
    www_url: str | None = None
    github_url: str | None = None
    slug: str | None = None
    featured_image_url: str | None = None


# Inherit all fields from create project request schema
# plus add id, created_at, updated_at fields inherited
# from BaseSchema. Not used as request body schema for documentation
# purpose as to exclude id from examples in documentation
class ProjectSchema(CreateProjectReq, BaseModelSchema):
    pass


class CreateProjectRes(BaseSchema):
    status: str
    project: ProjectSchema | None


class DeleteProjectRes(BaseSchema):
    status: str
    delete_count: int


class UpdateProjectReq(BaseSchema):
    title: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[List[str]] = None
    content: Optional[str] = None
    www_url: Optional[str] = None
    github_url: Optional[str] = None
    slug: Optional[str] = None
    updated_at: str | None = None
    created_at: str | None = None
    featured_image_url: str | None = None


class TagsRes(BaseSchema):
    tags: List[str] = []
