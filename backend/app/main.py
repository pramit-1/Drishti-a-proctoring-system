# backend/app/main.py

from fastapi import FastAPI
from app.api.routes import auth  # import your route modules

app = FastAPI()

# Include all your route routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
