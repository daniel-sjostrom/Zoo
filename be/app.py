import asyncpg

from api.create_ai import router as create_ai_router
from settings import get_database_url, get_app

from pydantic import BaseModel
from fastapi import HTTPException, Body

app = get_app()
SQL_DATABASE_URL = get_database_url()


@app.get("/")
async def read_root():
    return {"hello": "Welcome to the super duper backend API 🦸‍♀️"}


app.include_router(create_ai_router, prefix="/api/v1")
