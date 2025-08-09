# db/connection.py

import asyncpg
import os
from dotenv import load_dotenv
from contextlib import asynccontextmanager

load_dotenv()  # Load from .env

DATABASE_URL = (
    f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}"
    f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
)

class Database:
    def __init__(self):
        self.pool = None

    async def connect(self):
        self.pool = await asyncpg.create_pool(DATABASE_URL)
        print("Connected to database")

    async def disconnect(self):
        if self.pool:
            await self.pool.close()
            print("Disconnected from database")

    async def fetch(self, query, *args):
        async with self.pool.acquire() as conn:
            return await conn.fetch(query, *args)

    async def fetchrow(self, query, *args):
        async with self.pool.acquire() as conn:
            return await conn.fetchrow(query, *args)

    async def execute(self, query, *args):
        async with self.pool.acquire() as conn:
            return await conn.execute(query, *args)
    @asynccontextmanager
    async def transaction(self):
        conn = await self.pool.acquire()
        try:
            tr = conn.transaction()
            await tr.start()
            yield conn
            await tr.commit()
        except Exception:
            await tr.rollback()
            raise
        finally:
            await self.pool.release(conn)

db = Database()
