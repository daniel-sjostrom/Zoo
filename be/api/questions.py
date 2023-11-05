import asyncpg
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
