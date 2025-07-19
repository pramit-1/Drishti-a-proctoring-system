from fastapi import FastAPI
from contextlib import asynccontextmanager
import asyncpg
import os
from app.db.connection import db
from app.api.routes import auth

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create DB pool
    await db.connect()
    print("Connected to DB")
    app.state.db = db
    yield
    # Shutdown: Close DB pool
    await db.disconnect()
    print("Closed DB connection")

# Attach the lifespan context manager to the app
app = FastAPI(lifespan=lifespan)

# from app.api.routes import auth
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])

@app.get("/")
async def home():
    return {"message": "Server running"}
