"""
Script to delete attendance records for a specific employee
Run this script to remove attendance data from the database
"""

from database import SessionLocal, engine, Base
from models import Attendance

# Employee ID whose attendance records should be deleted
EMPLOYEE_ID_TO_DELETE = "2"

def delete_attendance_records():
    db = SessionLocal()
    
    try:
        # Check if any records exist for this employee
        existing_count = db.query(Attendance).filter(
            Attendance.employee_id == EMPLOYEE_ID_TO_DELETE
        ).count()
        
        if existing_count == 0:
            print(f"❌ No attendance records found for employee_id={EMPLOYEE_ID_TO_DELETE}")
            return
        
        print(f"⚠️  Found {existing_count} attendance record(s) for employee_id={EMPLOYEE_ID_TO_DELETE}")
        
        # Delete the records
        deleted_count = db.query(Attendance).filter(
            Attendance.employee_id == EMPLOYEE_ID_TO_DELETE
        ).delete()
        
        db.commit()
        
        print(f"✅ Successfully deleted {deleted_count} attendance record(s)!")
        print(f"   Employee ID: {EMPLOYEE_ID_TO_DELETE}")
        
    except Exception as e:
        print(f"❌ Error deleting attendance records: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Deleting attendance records...")
    print("-" * 50)
    delete_attendance_records()
    print("-" * 50)