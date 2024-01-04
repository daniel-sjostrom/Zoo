import asyncpg
from pydantic import BaseModel
from fastapi import APIRouter
import random
import string

from settings import get_database_url

router = APIRouter()
SQL_DATABASE_URL = get_database_url()


async def create_ai(id: str, user_id: str, name: str, model: str):
    conn = await asyncpg.connect(SQL_DATABASE_URL)
    try:
        await conn.execute(
            "INSERT INTO ai_settings (id, user_id, name, model) VALUES ($1, $2, $3, $4)",
            id,
            user_id,
            name,
            model,
        )
    finally:
        await conn.close()


class CreateAISettingsInput(BaseModel):
    user_id: str
    name: str
    model: str


@router.post("/create-ai-settings")
async def create_ai_settings(create_ai_settings_input: CreateAISettingsInput):
    id = "".join(
        random.choice(string.ascii_lowercase + string.digits) for _ in range(6)
    )

    await create_ai(
        id,
        create_ai_settings_input.user_id,
        create_ai_settings_input.name,
        create_ai_settings_input.model,
    )
    return {"response": {"ai_id": id}}


async def select_ai_settings(id: str, user_id: str):
    conn = await asyncpg.connect(SQL_DATABASE_URL)
    try:
        ai_settings = await conn.fetchrow(
            "SELECT * FROM ai_settings WHERE id = $1 AND user_id = $2", id, user_id
        )
        return ai_settings
    finally:
        await conn.close()


class ReadAISettingsInput(BaseModel):
    id: str
    user_id: str


@router.get("/read-ai-settings")
async def read_ai_settings(read_ai_settings_input: ReadAISettingsInput):
    ai_settings = await select_ai_settings(
        read_ai_settings_input.id, read_ai_settings_input.user_id
    )

    return {"response": {"ai_settings": ai_settings}}
