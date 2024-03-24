from api.ids.ids_endpoints import router as ids_router
from api.chat import router as chat_router
from api.chat_history import router as chat_history_router
from settings import get_database_url, get_app
from startup import download_models

app = get_app()
SQL_DATABASE_URL = get_database_url()


@app.on_event("startup")
async def on_startup():
    await download_models()


@app.get("/")
async def read_root():
    return {"hello": "Welcome to the Zoo backend API 🦁"}


app.include_router(chat_router, prefix="/api/v1")
app.include_router(chat_history_router, prefix="/api/v1")
app.include_router(ids_router, prefix="/api/v1")
