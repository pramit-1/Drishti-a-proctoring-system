from fastapi import APIRouter
from app.api.routes.auth import auth_router

api_router = APIRouter(prefix="/api", tags=["api"])

api_router.include_router(auth_router)
