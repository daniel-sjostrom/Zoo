from fastapi import APIRouter
from ctransformers import AutoModelForCausalLM
import random

from settings import get_database_url

router = APIRouter()
SQL_DATABASE_URL = get_database_url()

llm = AutoModelForCausalLM.from_pretrained(
    "TheBloke/Mistral-7B-Instruct-v0.1-GGUF",
    model_file="mistral-7b-instruct-v0.1.Q4_K_M.gguf",
    model_type="mistral",
    gpu_layers=0,
)


# 2: TODO Figure out how to choose the model stateless? db call that checks what is behind the id?
@router.get("/chat")
async def chat():
    for text in llm("AI is going to", stream=True, max_new_tokens=100):
        print(text, end="", flush=True)
    return {"hello": "world"}
