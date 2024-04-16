import json
from fastapi import APIRouter, Request
from bson.objectid import ObjectId
from fastapi import APIRouter, Request, status, HTTPException

from typing import List
from schemas.project import (
    ProjectSchema,
    CreateProjectRes,
    CreateProjectReq,
    DeleteProjectRes,
    UpdateProjectReq,
    TagsRes,
)
from models.project import Project

router = APIRouter()


@router.get("")
async def list_projects(req: Request) -> List[ProjectSchema]:
    projects = Project.find_many()
    return [project.to_json() for project in projects]


@router.get("/tags")
async def get_tags() -> TagsRes:
    projects = Project.find_many()
    tags = set()
    tags.add("Featured")

    for project in projects:
        for tag in project.tags:
            tags.add(tag)

    tags = [tag for tag in tags]
    tags.insert(0, tags.pop(tags.index("Featured")))

    return {"tags": tags}


@router.get("/{id}")
async def get_project(id: str) -> ProjectSchema:
    try:
        id = ObjectId(id)
        project = Project.find_one({"_id": ObjectId(id)})
        if not project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found",
            )
        return project.to_json()
    except Exception as e:
        slug = id
        project = Project.find_one({"slug": slug})
        if not project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found",
            )
        return project.to_json()


@router.put("/{id}")
async def update_project(id: str, body: UpdateProjectReq) -> ProjectSchema:
    project = Project.find_one({"_id": ObjectId(id)})
    if project:
        for attr, value in body:
            if value is not None:
                setattr(project, attr, value)

        result = project.save()
        updated_project = Project.find_one({"_id": ObjectId(id)})

        if not result or not updated_project:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unable to update project",
            )

        return updated_project.to_json()

    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Unable to find project",
        )


@router.post("")
async def create_project(body: CreateProjectReq) -> CreateProjectRes:
    data = json.loads(body.model_dump_json())
    project = Project(**data)
    result = project.save()
    new_project = Project.find_one({"_id": result.inserted_id})

    return {"status": "success", "project": new_project.to_json()}


@router.delete("/{id}")
async def delete_project(id: str) -> DeleteProjectRes:
    delete_res = Project.delete(id)

    return {
        "status": "success" if delete_res.acknowledged else "failed",
        "deleteCount": delete_res.deleted_count,
    }
