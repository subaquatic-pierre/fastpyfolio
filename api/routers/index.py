from fastapi import APIRouter, Request, Header
import requests

from config.settings import settings
from schemas.index import IndexRes, IndexReq, ContactReq
from utils.email import (
    send_email,
    generate_user_contact_html,
    generate_admin_contact_html,
)

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
    return {"data": {"id": 1, "attributes": {"title": "Cool Title"}}}


@router.post("/contact")
async def get_me(data: ContactReq):
    try:
        subject = "Contact Message"
        data = dict(data)
        user_message = generate_user_contact_html(data)
        admin_message = generate_admin_contact_html(data)
        send_email(subject, user_message, data["email"])
        send_email(subject, admin_message, settings.SMTP_FROM)

        return {"status": "success"}
    except Exception as e:
        print(e)
        return {"status": {"error": f"{e}"}}
