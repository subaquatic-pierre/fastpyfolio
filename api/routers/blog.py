import json
from fastapi import APIRouter, Request
from bson.objectid import ObjectId
from fastapi import APIRouter, Request, status, HTTPException

from typing import List
from schemas.blog import (
    BlogSchema,
    CreateBlogRes,
    CreateBlogReq,
    DeleteBlogRes,
    UpdateBlogReq,
)
from models.blog import Blog

router = APIRouter()


@router.get("")
async def list_blogs(req: Request) -> List[BlogSchema]:
    blogs = Blog.find_many()
    return [project.to_json() for project in blogs]


@router.get("/{id}")
async def get_project(id: str) -> BlogSchema:
    try:
        id = ObjectId(id)
        project = Blog.find_one({"_id": ObjectId(id)})
        if not project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Blog not found",
            )
        return project.to_json()
    except Exception as e:
        slug = id
        blog = Blog.find_one({"slug": slug})
        if not blog:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Blog not found",
            )
        return blog.to_json()


@router.put("/{id}")
async def update_project(id: str, body: UpdateBlogReq) -> BlogSchema:
    blog = Blog.find_one({"_id": ObjectId(id)})
    if blog:
        for attr, value in body:
            if value is not None:
                setattr(blog, attr, value)

        result = blog.save()
        updated_blog = Blog.find_one({"_id": ObjectId(id)})

        if not result or not updated_blog:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unable to update blog",
            )

        return updated_blog.to_json()

    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Unable to find blog",
        )


@router.post("")
async def create_project(body: CreateBlogReq) -> CreateBlogRes:
    data = json.loads(body.model_dump_json())
    data["author_id"] = ObjectId(data["author_id"])
    blog = Blog(**data)
    result = blog.save()
    new_blog = Blog.find_one({"_id": result.inserted_id})

    return {"status": "success", "blog": new_blog.to_json()}


@router.delete("/{id}")
async def delete_project(id: str) -> DeleteBlogRes:
    delete_res = Blog.delete(id)

    return {
        "status": "success" if delete_res.acknowledged else "failed",
        "deleteCount": delete_res.deleted_count,
    }
