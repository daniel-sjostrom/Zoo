from typing import Optional
import uuid
import asyncpg
from pydantic import BaseModel
from fastapi import APIRouter

from settings import get_database_url

router = APIRouter()
SQL_DATABASE_URL = get_database_url()


async def create_ai(ai_id: str, user_id: str, name: str, model: str):
    conn = await asyncpg.connect(SQL_DATABASE_URL)
    try:
        await conn.execute(
            "INSERT INTO ai_settings (id, user_id, name, model) VALUES ($1, $2, $3, $4)",
            ai_id,
            user_id,
            name,
            model,
        )
    finally:
        await conn.close()


class CreateAISettingsInput(BaseModel):
    user_id: Optional[str] = None
    name: str
    model: str


@router.post("/ai-settings")
async def post_ai_settings(create_ai_settings_input: CreateAISettingsInput):
    print(create_ai_settings_input.name)
    print(create_ai_settings_input.model)
    ai_id = str(uuid.uuid4())
    user_id = (
        str(uuid.uuid4())
        if create_ai_settings_input.user_id == None
        else create_ai_settings_input.user_id
    )

    print(ai_id)
    print(user_id)

    await create_ai(
        ai_id,
        user_id,
        create_ai_settings_input.name,
        create_ai_settings_input.model,
    )

    return {"ai_id": ai_id, "user_id": user_id}


async def select_ai_settings(id: str, user_id: str):
    conn = await asyncpg.connect(SQL_DATABASE_URL)
    try:
        ai_settings = await conn.fetchrow(
            "SELECT * FROM ai_settings WHERE id = $1 AND user_id = $2", id, user_id
        )
        return ai_settings
    finally:
        await conn.close()


# TODO refactor so that the user_id is received in the header instead
class ReadAISettingsInput(BaseModel):
    ai_id: str
    user_id: str


@router.get("/ai-settings")
async def get_ai_settings(ai_id: str, user_id: str):
    ai_settings = await select_ai_settings(ai_id, user_id)
    return {"ai_settings": ai_settings}
