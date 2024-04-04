from typing import Optional

from schemas.base import BaseSchema, BaseModelSchema


class CreateBlogReq(BaseSchema):
    title: str
    description: str
    featured_image: str
    content: str
    category: str
    slug: str


# Inherit all fields from create Blog request schema
# plus add id, created_at, updated_at fields inherited
# from BaseSchema. Not used as request body schema for documentation
# purpose as to exclude id from examples in documentation
class BlogSchema(CreateBlogReq, BaseModelSchema):
    pass


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
    featured_image: Optional[str] = None
    category: Optional[str] = None
    content: Optional[str] = None
