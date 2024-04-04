from __future__ import annotations

from schemas.blog import BlogSchema
from models.model import DBModel


class Blog(BlogSchema, DBModel):
    @staticmethod
    def _collection_name() -> str:
        return "blogs"
