from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from config.settings import settings
from routers import auth, index, uploads, projects, users, blogs

app = FastAPI()
app.config = settings

origins = [settings.CLIENT_ORIGIN, "*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(index.router, tags=["Index"], prefix="/api")
app.include_router(auth.router, tags=["Auth"], prefix="/api/auth")
app.include_router(users.router, tags=["Users"], prefix="/api/users")
app.include_router(projects.router, tags=["Projects"], prefix="/api/projects")
app.include_router(blogs.router, tags=["Blogs"], prefix="/api/blogs")
app.include_router(uploads.router, tags=["Uploads"], prefix="/api/uploads")


if __name__ == "__main__":
    log_level = "debug" if settings.DEBUG else "info"

    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        log_level=log_level,
        reload=settings.DEBUG,
    )
