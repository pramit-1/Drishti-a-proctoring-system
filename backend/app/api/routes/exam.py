from fastapi import APIRouter, HTTPException, status
from asyncpg import PostgresError
from app.db.connection import db
from app.utils.hash import hash_password, verify_password
from pydantic import BaseModel,EmailStr

router = APIRouter()

class ExamData(BaseModel):
    title:str
    subject:str
    duration:int
    proctor:EmailStr

