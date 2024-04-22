import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", 8000))
    HOSTNAME: str = os.getenv("NEXT_PUBLIC_API_URL", "http://localhost:8001")

    SMTP_USERNAME: str = os.getenv("SMTP_USERNAME", "")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")
    SMTP_FROM: str = os.getenv("SMTP_FROM", "subaquatic.pierre@gmail.com")

    DB_HOST: str = os.getenv("MONGODB_HOST")
    DB_PORT: int = int(os.getenv("MONGODB_PORT"))
    DB_NAME: str = os.getenv("MONGODB_DB_NAME")

    DB_USER: str = os.getenv("MONGODB_USER")
    DB_PASSWORD: str = os.getenv("MONGODB_PASSWORD")

    SECRET_KEY: str = os.getenv("SECRET_KEY")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM")

    CLIENT_ORIGIN: str = os.getenv("CLIENT_ORIGIN")
    DEBUG: bool = os.getenv("ENV", "dev") == "dev"

    ROOT_DIR = os.path.abspath(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    )
    UPLOADS_PATH = os.path.join(ROOT_DIR, "uploads")


settings = Settings()
