import asyncpg
from pydantic import BaseModel
from fastapi import APIRouter
import random
import string

from settings import get_database_url

router = APIRouter()
SQL_DATABASE_URL = get_database_url()


async def insert_id(id: str):
    conn = await asyncpg.connect(SQL_DATABASE_URL)
    try:
        await conn.execute("INSERT INTO questions (id) VALUES ($1)", id)
    finally:
        await conn.close()


@router.get("/new-question")
async def generate_unique_id():
    id = "".join(
        random.choice(string.ascii_lowercase + string.digits) for _ in range(6)
    )

    await insert_id(id)

    return {"question_id": id}


async def insert_question(id: str, question: str):
    conn = await asyncpg.connect(SQL_DATABASE_URL)
    try:
        await conn.execute(
            "UPDATE questions SET question = $2 WHERE id = $1", id, question
        )
    finally:
        await conn.close()


class QuestionInput(BaseModel):
    id: str
    question: str


@router.post("/questions")
async def save_question(question_input: QuestionInput):
    await insert_question(question_input.id, question_input.question)

    return {"response": "Question saved successfully"}
