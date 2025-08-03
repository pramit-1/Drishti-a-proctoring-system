from fastapi import APIRouter
from app.api.routes.auth import auth_router
from app.api.routes.secure import secure_router
from app.api.routes.exam import exam_router

api_router = APIRouter(prefix="/api", tags=["api"])

api_router.include_router(auth_router)
api_router.include_router(secure_router)
api_router.include_router(exam_router)
