import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

# Get MongoDB URL from environment variable
MONGODB_URL = os.getenv("MONGODB_URL")

if not MONGODB_URL:
    raise ValueError("MONGODB_URL not found in .env file")

# Create async MongoDB client
client = AsyncIOMotorClient(MONGODB_URL)

# Get database (will be created automatically when you insert data)
database = client.get_database()  # Uses database from connection string
# OR specify explicitly: database = client["employee_portal_db"]

# Define collections
admins_collection = database.get_collection("admins")
news_collection = database.get_collection("news")
jobs_collection = database.get_collection("jobs")
employees_collection = database.get_collection("employees")
attendance_collection = database.get_collection("attendance")
employee_links_collection = database.get_collection("employee_links")
admin_links_collection = database.get_collection("admin_links")  # ← ADDED THIS

# Helper function to convert MongoDB document to dict
def document_helper(document) -> dict:
    """Convert MongoDB document to dict with _id as string"""
    if document:
        document["id"] = str(document["_id"])
        return document
    return None