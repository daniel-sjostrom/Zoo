from settings import get_database_url
import asyncpg

SQL_DATABASE_URL = get_database_url()


async def insert_profile_id(user_id: str, llm_id: str):
    conn = await asyncpg.connect(SQL_DATABASE_URL)
    await conn.execute(
        """
        INSERT INTO profile_ids(id, user_id) VALUES($1, $2)
    """,
        str(user_id),
        str(llm_id),
    )
    await conn.close()
