from fastapi import APIRouter, HTTPException, status
from asyncpg import PostgresError
from app.db.connection import db
from app.utils.hash import hash_password
from pydantic import BaseModel,EmailStr

router = APIRouter()

class SignupData:
    name:str
    email:EmailStr
    password:str

@router.post("/signup")
async def signup(payload:SignupData):
    # checking if email already exists
    user = await db.fetchrow("SELECT id FROM attendee WHERE email = $1",payload.email)

    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registred"
        )
    
    #hashing the password
    try:
        hashed_psss = hash_password(payload.password)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="password hashing failed"
        )
    
    #Insert into database
    try:
        await db.execute(
            """
    INSERT INTO attendee(name, email, password)
    VALUES ($1,$2,$3)
""",
payload.name, payload.email, hashed_psss
        )
        return {"message":"User Registred Successfully"}
    except PostgresError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database Error"
        )
    