from typing import Annotated
from datetime import datetime, timedelta
from fastapi import APIRouter, status, Depends, Request, HTTPException

from db import UserCollection
from config.settings import settings
from auth.utils import (
    hash_password,
    authenticate_user,
    create_access_token,
    get_current_user,
)
from models.user import User
from schemas.user import (
    RegisterUserReq,
    RegsiterUserRes,
    LoginUserReq,
    LoginUserRes,
    ForgotPasswordReq,
    ForgotPasswordRes,
    ResetPasswordReq,
    ResetPasswordRes,
)
from schemas.token import TokenRes
from auth.utils import get_token_from_request
from lib.email import send_email, generate_password_reset_html


router = APIRouter()


# @router.post(
#     "/register",
# )
async def regsiter(body: RegisterUserReq) -> RegsiterUserRes:
    # Check if user already exist
    user = User.find_one({"email": body.email.lower()})
    if user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Account already exist"
        )
    # Compare password and passwordConfirm
    if body.password != body.password_confirm:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Passwords do not match"
        )

    new_data = {
        "id": None,
        "name": body.name,
        "email": body.email.lower(),
        "verified": True,
        "disabled": False,
        "hashed_password": hash_password(body.password),
        "role": "user",
    }

    new_user = User(**new_data)
    result = new_user.save()
    new_user = User.find_one({"_id": result.inserted_id})

    if not result:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unable to create user",
        )

    return {"status": "success", "user": new_user.to_json()}


@router.post("/login", response_model=LoginUserRes)
async def login(
    body: LoginUserReq,
) -> LoginUserRes:
    # Check if the user exist
    db_user = User.find_one({"email": body.email.lower()})
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect Email or Password",
        )

    # Check if the password is valid
    user = authenticate_user(body.email, body.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect Email or Password",
        )

    # Create access token
    access_token = create_access_token(
        email=user.email,
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
    )

    # Send both access
    return {"token": access_token, "user": user.to_json()}


@router.get("/refresh-token")
async def refresh_token(req: Request) -> TokenRes:
    token = get_token_from_request(req)
    user = get_current_user(token)

    token = create_access_token(
        email=user.email,
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="The user belonging to this token no logger exist",
        )

    return {"token": token}


@router.post("/forgot-password")
async def forgot_password(body: ForgotPasswordReq) -> ForgotPasswordRes:
    user = User.find_one({"email": body.email})

    if user:
        token = create_access_token(
            email=user.email,
            expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
        )
        user.reset_token = token
        user.save()

        message = generate_password_reset_html({"token": token})

        send_email("Reset Password Token", message, user.email)

        return {"status": "Email sent"}

    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized",
        )


@router.post("/reset-password")
async def reset_password(body: ResetPasswordReq) -> ResetPasswordRes:
    user = User.find_one({"reset_token": body.token})

    if user:
        if body.password == body.password_confirm:

            user.hashed_password = hash_password(body.password)
            user.reset_token = None
            user.save()

            return {"status": "Password Reset"}

        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Passwords do not match",
            )

    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized",
        )


@router.get("/me")
async def get_me(req: Request):
    token = get_token_from_request(req)
    user = get_current_user(token)
    return user.to_json()
