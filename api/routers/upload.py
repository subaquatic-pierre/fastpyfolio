from os import path
from pathlib import Path

from fastapi import APIRouter, Request, status, HTTPException
from fastapi.responses import FileResponse

from fastapi import UploadFile

router = APIRouter()


@router.get("/{filename}")
async def get_file(req: Request, filename: str):
    filepath = path.join(req.app.config.UPLOADS_PATH, filename)
    if not path.exists(filepath):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found",
        )
    return FileResponse(filepath)


@router.post("")
async def upload_file(req: Request, file: UploadFile):
    contents = file.file.read()
    filepath = path.join(req.app.config.UPLOADS_PATH, file.filename)
    with open(filepath, "wb") as f:
        f.write(contents)
    return {
        "filename": file.filename,
        "url": f"{req.app.config.HOSTNAME}/api/upload/{file.filename}",
    }


@router.delete("/{filename}")
async def upload_file(req: Request, filename: str):
    filepath = path.join(req.app.config.UPLOADS_PATH, filename)
    delete_count = 0

    if path.exists(filepath):
        Path.unlink(filepath)
        delete_count = 1

    return {
        "status": "success",
        "deleteCount": delete_count,
    }
