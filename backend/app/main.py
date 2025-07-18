from fastapi import FastAPI
from contextlib import asynccontextmanager
import asyncpg
import os
from app.db.connection import DATABASE_URL

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create DB pool
    app.state.db_pool = await asyncpg.create_pool(DATABASE_URL)
    print("Connected to DB")
    yield
    # Shutdown: Close DB pool
    await app.state.db_pool.close()
    print("Closed DB connection")

# Attach the lifespan context manager to the app
app = FastAPI(lifespan=lifespan)

# If you have routes later, include them here
# from app.api.routes import auth
# app.include_router(auth.router, prefix="/auth", tags=["Authentication"])

@app.get("/")
async def home():
    return {"message": "Server running"}
