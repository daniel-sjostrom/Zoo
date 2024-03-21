from fastapi import APIRouter
from uuid import uuid4

router = APIRouter()


@router.get("/generate-ids")
async def generate_ids():
    userid = uuid4()
    llmid = uuid4()
    return {"user_id": str(userid), "llm_id": str(llmid)}
