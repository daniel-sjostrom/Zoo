from startup import get_ollama_client
from fastapi import APIRouter, Header
from fastapi.responses import StreamingResponse
from pydantic import BaseModel


ollama_client = get_ollama_client()

from settings import get_database_url

router = APIRouter()


class ChatInput(BaseModel):
    ai_id: str
    prompt: str


# TODO Make it stream
@router.post("/chat")
async def chat(
    chat_input: ChatInput, user_id: str = Header(..., convert_underscores=False)
):
    response = ollama_client.chat(
        model="gemma:7b",
        messages=[
            {
                "role": "user",
                "content": "Why is the sky blue?",
            },
        ],
    )
    return {"response": response}

    # async def generate_words():
    #     for word in llm(chat_input.prompt, stream=True, max_new_tokens=25):
    #         yield f"data: {word}\n\n"
    #         await asyncio.sleep(0)

    # return StreamingResponse(generate_words(), media_type="text/event-stream")
