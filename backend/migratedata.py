import asyncio
import sqlite3
from database import (
    admins_collection,
    news_collection,
    jobs_collection,
    employees_collection,
    attendance_collection
)

async def migrate_data():
    # Connect to SQLite
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    
    # Migrate Admins
    cursor.execute("SELECT * FROM admins")
    for row in cursor.fetchall():
        await admins_collection.insert_one({
            "email": row[1],
            "password_hash": row[2]
        })
    print("✅ Admins migrated")
    
    # Migrate News
    cursor.execute("SELECT * FROM news")
    for row in cursor.fetchall():
        await news_collection.insert_one({
            "title": row[1],
            "description": row[2],
            "image_path": row[3],
            "date": row[4]
        })
    print("✅ News migrated")
    
    # Migrate Jobs
    cursor.execute("SELECT * FROM jobs")
    for row in cursor.fetchall():
        await jobs_collection.insert_one({
            "title": row[1],
            "description": row[2],
            "location": row[3]
        })
    print("✅ Jobs migrated")
    
    # Migrate Employees
    cursor.execute("SELECT * FROM employees")
    for row in cursor.fetchall():
        await employees_collection.insert_one({
            "id": row[0],  # Keep original ID
            "name": row[1],
            "email": row[2],
            "password_hash": row[3]
        })
    print("✅ Employees migrated")
    
    # Migrate Attendance
    cursor.execute("SELECT * FROM attendance")
    for row in cursor.fetchall():
        await attendance_collection.insert_one({
            "employee_id": row[1],
            "date": row[2],
            "in_time": row[3],
            "out_time": row[4]
        })
    print("✅ Attendance migrated")
    
    conn.close()
    print("✅ Migration complete!")

if __name__ == "__main__":
    asyncio.run(migrate_data())