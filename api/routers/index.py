from fastapi import APIRouter, Request, Header

from schemas.index import IndexRes, IndexReq

router = APIRouter()


@router.get("/")
async def index(req: Request) -> IndexRes:
    print("headers", req.headers.items())

    return {"status": "ok"}


@router.get("/health-check")
async def health_check():
    return {"message": "Welcome to Fast Python Portfolio with MongoDB and NextJS"}


@router.get("/site-settings")
async def get_me(req: Request):
    return {"data": {
        "id":1,
        "attributes":{
            "title":"Cool Title"
        }
    }}
    
