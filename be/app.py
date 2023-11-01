import asyncpg

from settings import get_database_url, get_app
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, Body

app = get_app()
SQL_DATABASE_URL = get_database_url()


@app.get("/")
async def read_root():
    return {"hello": "Welcome to the goose backend API 🪿"}


async def save_post(username: str):
    conn = await asyncpg.connect(SQL_DATABASE_URL)
    try:
        await conn.execute("INSERT INTO goose_table (username) VALUES ($1)", username)
    finally:
        await conn.close()


class EasyPost(BaseModel):
    username: str


@app.post("/post")
async def easy_post(request: EasyPost = Body(...)):
    try:
        print(request.username)
        await save_post(request.username)

        return {"message": "Response saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
