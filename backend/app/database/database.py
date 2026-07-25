import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# 1. Fetch DATABASE_URL from Render's environment variables
DATABASE_URL = os.getenv("DATABASE_URL")

# 2. Fallback to local database if running on your machine
if not DATABASE_URL:
    DATABASE_URL = "postgresql://postgres:XXXXX@localhost:5432/signalmind"

# 3. Handle Render's legacy URL scheme if necessary ('postgres://' -> 'postgresql://')
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# 4. Initialize engine
engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()