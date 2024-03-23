from .ids_db import insert_profile_id
from fastapi import APIRouter
from uuid import uuid4

router = APIRouter()


@router.get("/ids")
async def generate_ids():
    user_id = uuid4()
    llm_id = uuid4()

    # Save generated ids in the db
    await insert_profile_id(user_id, llm_id)

    return {"user_id": str(user_id), "llm_id": str(llm_id)}
