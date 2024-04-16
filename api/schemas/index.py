from schemas.base import BaseSchema, BaseModelSchema


class IndexRes(BaseSchema):
    status: str


class IndexReq(BaseSchema):
    name: str


class ContactReq(BaseSchema):
    name: str | None = None
    email: str | None = None
    phone: str | None = None
    message: str | None = None
