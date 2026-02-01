"""
Script to create initial 4 employees in the database
Run this script once to insert the employee credentials
"""

from database import SessionLocal, engine, Base
from models import Employee

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

# Initial employee credentials
INITIAL_PASSWORD = "123456"

EMPLOYEES = [
    {"name": "Employee 1", "email": "saniaelizabathmanoj.com", "password": INITIAL_PASSWORD},
    {"name": "Employee 2", "email": "sania.elizabath@btech.christuniversity.in", "password": INITIAL_PASSWORD},
    {"name": "Employee 3", "email": "employee3@company.com", "password": INITIAL_PASSWORD},
    {"name": "Employee 4", "email": "employee4@company.com", "password": INITIAL_PASSWORD},
]

def create_employees():
    db = SessionLocal()
    
    try:
        # Check if employees already exist
        existing_count = db.query(Employee).count()
        
        if existing_count > 0:
            print(f"❌ {existing_count} employees already exist in the database!")
            print(f"   If you want to reset, delete existing employees first.")
            return
        
        # Create all 4 employees
        created_employees = []
        for emp_data in EMPLOYEES:
            new_employee = Employee(
                name=emp_data["name"],
                email=emp_data["email"],
                password_hash=emp_data["password"]  # Storing as plain text as per requirement
            )
            db.add(new_employee)
            created_employees.append(emp_data["name"])
        
        db.commit()
        
        print("✅ All employees created successfully!")
        print("-" * 50)
        for i, emp_data in enumerate(EMPLOYEES, 1):
            print(f"   {emp_data['name']}: {emp_data['email']}")
        print("-" * 50)
        print(f"   Password (same for all): {INITIAL_PASSWORD}")
        print("-" * 50)
        
    except Exception as e:
        print(f"❌ Error creating employees: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Creating initial 4 employees...")
    print("=" * 50)
    create_employees()
    print("=" * 50)