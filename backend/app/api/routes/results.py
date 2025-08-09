from fastapi import APIRouter, HTTPException, status, Depends
from app.db.connection import db
from app.dependency.auth_dependency import get_current_user
from pydantic import BaseModel
from typing import Dict

result_router = APIRouter(prefix="/result", tags=["Result"])


class SubmitExamRequest(BaseModel):
    exam_id: int
    answers: Dict[str, str]  # or Dict[int, str]

@result_router.post("/submit-exam")
async def evaluate_answers(
    payload: SubmitExamRequest,
    user = Depends(get_current_user),
):
    if user["role"] != "attendee":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only attendee can give exams"
        )

    attendee_id = user["user_id"]

    if not payload.answers:
        raise HTTPException(status_code=400, detail="No answers provided")

    try:
        # Convert question IDs to int keys
        answers = {int(k): v for k, v in payload.answers.items()}
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid question ID keys")

    correct_answers = 0

    try:
        async with db.transaction() as conn:
            for question_id, selected_option in answers.items():
                question = await db.fetchrow(
                    "SELECT correct_ans FROM questions WHERE question_id = $1",
                    question_id,
                )
                if not question:
                    raise HTTPException(
                        status_code=404,
                        detail=f"Question ID {question_id} not found"
                    )
                correct = (selected_option.lower() == question["correct_ans"].lower())

                if correct:
                    correct_answers += 1

                await conn.execute(
                    """
                    INSERT INTO answers (attendee_id, question_id, selected_option, correct)
                    VALUES ($1, $2, $3, $4)
                    ON CONFLICT (attendee_id, question_id)
                    DO UPDATE SET selected_option = EXCLUDED.selected_option, correct = EXCLUDED.correct
                    """,
                    attendee_id,
                    question_id,
                    selected_option,
                    correct,
                )
            updated = await conn.execute(
                """
                UPDATE exam_session
                SET score = $1
                WHERE attendee_id = $2 AND exam_id = $3
                """,
                correct_answers,
                attendee_id,
                payload.exam_id,
            )
            if updated == "UPDATE 0":
                # Optionally create a new session if none exists
                await conn.execute(
                    """
                    INSERT INTO exam_session (attendee_id, exam_id, score)
                    VALUES ($1, $2, $3)
                    """,
                    attendee_id,
                    payload.exam_id,
                    correct_answers,
                )

        return {"detail": "Answers submitted successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error saving answers: {str(e)}",
        )


@result_router.get("/view")
async def get_student_results(
    user=Depends(get_current_user),
):
    if user["role"] != "attendee":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only attendee can view results"
        )

    attendee_id = user["user_id"]

    query = """
        SELECT
            e.title,
            e.subject,
            e.date,
            es.score
        FROM exam_session es
        JOIN exams e ON es.exam_id = e.exam_id
        WHERE es.attendee_id = $1
        ORDER BY e.date DESC
    """

    try:
        results = await db.fetch(query, attendee_id)
        return [
            {
                "exam_title": row["title"],
                "subject": row["subject"],
                "date": row["date"],
                "score": row["score"],
            }

            for row in results
        ]
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching results: {str(e)}",
        )
