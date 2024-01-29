from fastapi import APIRouter, Header
from pydantic import BaseModel
import asyncpg

from settings import get_database_url


router = APIRouter()
SQL_DATABASE_URL = get_database_url()


async def insert_prompt_response(ai_id: str, user_id: str, prompt: str, response: str):
    table_name = f"{user_id}{ai_id}"
    conn = await asyncpg.connect(SQL_DATABASE_URL)
    try:
        await conn.execute(
            f"CREATE TABLE IF NOT EXISTS {table_name} (id SERIAL PRIMARY KEY, ai_id TEXT, user_id TEXT, prompt TEXT, response TEXT)"
        )
        await conn.execute(
            f"INSERT INTO {table_name} (ai_id, user_id, prompt, response) VALUES ($1, $2, $3, $4)",
            ai_id,
            user_id,
            prompt,
            response,
        )
    finally:
        await conn.close()


async def get_all_conversation_data(user_id: str, ai_id: str):
    table_name = f"{user_id}{ai_id}"
    conn = await asyncpg.connect(SQL_DATABASE_URL)
    try:
        return await conn.fetch(f"SELECT prompt, response FROM {table_name}")
    finally:
        await conn.close()


class ChatSaveInput(BaseModel):
    ai_id: str
    prompt: str
    response: str


@router.post("/chat-history")
async def post_chat_history(
    chat_save_input: ChatSaveInput,
    user_id: str = Header(..., convert_underscores=False),
):
    await insert_prompt_response(
        chat_save_input.ai_id,
        user_id,
        chat_save_input.prompt,
        chat_save_input.response,
    )

    conversation = await get_all_conversation_data(user_id, chat_save_input.ai_id)
    return conversation
