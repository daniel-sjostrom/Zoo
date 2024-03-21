from fastapi import APIRouter, Header
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import asyncpg
import asyncio

from settings import get_database_url

router = APIRouter()
SQL_DATABASE_URL = get_database_url()


async def select_ai_settings(id: str, user_id: str):
    conn = await asyncpg.connect(SQL_DATABASE_URL)
    try:
        ai_settings = await conn.fetchrow(
            "SELECT * FROM ai_settings WHERE id = $1 AND user_id = $2", id, user_id
        )
        return ai_settings
    finally:
        await conn.close()


class ChatInput(BaseModel):
    ai_id: str
    prompt: str


@router.post("/chat")
async def chat(
    chat_input: ChatInput, user_id: str = Header(..., convert_underscores=False)
):
    ai_settings = await select_ai_settings(chat_input.ai_id, user_id)

    async def generate_words():
        for word in llm(chat_input.prompt, stream=True, max_new_tokens=25):
            yield f"data: {word}\n\n"
            await asyncio.sleep(0)

    if ai_settings.get("id") == chat_input.ai_id:
        return StreamingResponse(generate_words(), media_type="text/event-stream")
    else:
        return {"error": "something went wrong"}
