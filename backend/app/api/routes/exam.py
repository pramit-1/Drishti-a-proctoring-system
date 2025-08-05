from fastapi import APIRouter, HTTPException, status, Depends
from asyncpg import PostgresError
from app.db.connection import db
from pydantic import BaseModel
from app.dependency.auth_dependency import get_current_user
from app.api.routes.questions import questions_router
from datetime import date

exam_router = APIRouter(prefix="/exam")
exam_router.include_router(questions_router)

class ExamData(BaseModel):
    title:str
    subject:str
    duration:int
    date:date


@exam_router.post("/create")
async def create_exam(payload:ExamData, user = Depends(get_current_user)):
    if user["role"] != 'proctor':
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only proctors can create exams"
        )
    
    try:
        await db.execute(
            """
            INSERT INTO exams (title, subject, duration, date, proctor_id)
            VALUES ($1, $2, $3, $4, $5)
            """,
            payload.title,
            payload.subject,
            int(payload.duration),
            payload.date,
            user["user_id"]
        )
        return {"message": "Exam created successfully"}
    except PostgresError as e:
        print(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error during exam creation",
        )
@exam_router.get("/view-proctor")
async def view_exams_proctor(user = Depends(get_current_user)):
    if user["role"] != 'proctor':
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="OnlPostgresErrory proctors can view exams"
        )

    try:
        exams = await db.fetch(
            "SELECT exam_id, title, subject, duration, date FROM exams WHERE proctor_id = $1",
            user["user_id"]
        )
        return {"proctor_id": user["user_id"], "exams": exams}
    except PostgresError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error fetching exams"
        )

@exam_router.get("/view/{exam_id}")
async def view_single_exam(exam_id:int, user = Depends(get_current_user)):
    if user["role"] != 'proctor':
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="OnlPostgresErrory proctors can view exams"
        )
    try:
        exam = await db.fetchrow(
            """
            SELECT exam_id, title, subject, duration, date, status
            FROM exams
            WHERE exam_id = $1
            """,
            exam_id,
        )

        if not exam:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Exam not found",
            )
        
        return {
            "exam_id": exam["exam_id"],
            "title": exam["title"],
            "subject": exam["subject"],
            "duration": exam["duration"],
            "date": exam["date"].isoformat(),
            "status": exam["status"]}
        
    except PostgresError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error during exam creation",
        )
    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unknown error"
        )
        
