import asyncio
from startup import get_ollama_client
from fastapi import APIRouter, Header
from fastapi.responses import StreamingResponse
from pydantic import BaseModel


ollama_client = get_ollama_client()

router = APIRouter()


class ChatInput(BaseModel):
    ai_id: str
    prompt: str


@router.post("/chat")
async def chat(
    chat_input: ChatInput, user_id: str = Header(..., convert_underscores=False)
):
    stream = ollama_client.chat(
        model="gemma:7b",
        messages=[{"role": "user", "content": "Why is the sky blue?"}],
        stream=True,
    )

    async def generate_words():
        for chunk in stream:
            if "message" in chunk and "content" in chunk["message"]:
                yield f"data: {chunk['message']['content']}\n\n"
                await asyncio.sleep(0)
            else:
                print("Received chunk without 'message' or 'content'.", flush=True)

    return StreamingResponse(generate_words(), media_type="text/event-stream")
