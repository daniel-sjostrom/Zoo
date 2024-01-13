from api.ai_settings import router as ai_settings_router
from api.ai_store import router as ai_store_router
from settings import get_database_url, get_app

app = get_app()
SQL_DATABASE_URL = get_database_url()


@app.get("/")
async def read_root():
    return {"hello": "Welcome to the super duper backend API 🦸‍♀️"}


app.include_router(ai_settings_router, prefix="/api/v1")
app.include_router(ai_store_router, prefix="/api/v1")
