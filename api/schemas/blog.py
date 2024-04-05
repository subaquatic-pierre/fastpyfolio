from typing import Optional
from models.model import ModelId

from schemas.base import BaseSchema, BaseModelSchema


class CreateBlogReq(BaseSchema):
    title: str
    description: str
    featured_image_url: str
    content: str
    slug: str
    author_id: str
    category: str = "Uncategorized"


# Inherit all fields from create Blog request schema
# plus add id, created_at, updated_at fields inherited
# from BaseSchema. Not used as request body schema for documentation
# purpose as to exclude id from examples in documentation
class BlogSchema(CreateBlogReq, BaseModelSchema):
    author_id: ModelId | None = None


class CreateBlogRes(BaseSchema):
    status: str
    blog: BlogSchema | None = None


class DeleteBlogRes(BaseSchema):
    status: str
    delete_count: int


class UpdateBlogReq(BaseSchema):
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    featured_image_url: Optional[str] = None
    category: Optional[str] = None
    content: Optional[str] = None
