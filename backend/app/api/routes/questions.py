from fastapi import APIRouter, HTTPException, status, Depends, Query
from asyncpg import PostgresError
from app.db.connection import db
from pydantic import BaseModel
from app.dependency.auth_dependency import get_current_user
from datetime import date

questions_router = APIRouter(prefix="/questions")

class QuestionData(BaseModel):
    exam_id:int
    question:str
    option1:str
    option2:str
    option3:str
    option4:str
    correct_option:str

@questions_router.post("/update")
async def create_exam_questions(payload:QuestionData, user=Depends(get_current_user)):
    if user["role"] != 'proctor':
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only proctors can create exams"
        )
    all_exams = await db.fetch("SELECT exam_id FROM exams WHERE proctor_id = $1",user["user_id"])
    all_exam_ids = [record["exam_id"] for record in all_exams]
    if payload.exam_id not in all_exam_ids:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid exam id"

        )
    if payload.correct_option not in [payload.option1, payload.option2, payload.option3, payload.option4]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Correct option is not among provided options"
        )
    try:
        await db.execute(
        """
        INSERT INTO questions(exam_id, question, optionA, optionB, optionC, optionD, correct_ans)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        """,
        payload.exam_id,
        payload.question,
        payload.option1,
        payload.option2,
        payload.option3,
        payload.option4,
        payload.correct_option

        )
        return {"message":"Question added successfully"}
    except PostgresError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error during question creation"
        )

@questions_router.get("/view/{exam_id}")
async def get_all_questions(exam_id:int, user = Depends(get_current_user)):
    if user["role"] == "proctor":
        try:
            exam = await db.fetchrow("SELECT * FROM exams WHERE exam_id = $1 AND proctor_id = $2", exam_id, user["user_id"])
            if not exam:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Exam not found or not owned by this proctor"
                          )

            questions = await db.fetch(
                """
                SELECT question_id, question, optionA, optionB, optionC, optionD, correct_ans
                FROM questions
                WHERE exam_id = $1
                """,
                exam_id
            )

            return {"exam_id": exam_id, "questions": questions}
        except PostgresError:
            raise HTTPException(
                status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail = "Database Error"
            )
    else:
        try:
            exam = await db.fetchrow("SELECT * FROM exams WHERE exam_id = $1", exam_id)
            if not exam:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Exam not found"
                    )

            if exam["date"] != date.today():
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Exam not available"
                    )
            else:
                questions = await db.fetch(
                """
                SELECT question_id, question, optionA, optionB, optionC, optionD
                FROM questions
                WHERE exam_id = $1
                """,
                exam_id
            )
            return {"exam_id": exam_id, "questions": questions}
        except PostgresError:
             raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database Error"
            )

@questions_router.get("/view-all-attendee")
async def get_all_questions_attendee(session_id:int = Query(...), user=Depends(get_current_user)):
    if user["role"] != "attendee":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only attendee can take exam"
        )
    pass
