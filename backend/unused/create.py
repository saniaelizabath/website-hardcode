"""
Script to create initial admin user in the database
Run this script once to insert the admin credentials
"""

from database import SessionLocal, engine, Base
from models import Admin

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

# Initial admin credentials
INITIAL_ADMIN_EMAIL = "saniaelizabathmanoj@gmail.com"
INITIAL_ADMIN_PASSWORD = "123456"

def create_initial_admin():
    db = SessionLocal()
    
    try:
        # Check if admin already exists
        existing_admin = db.query(Admin).filter(Admin.email == INITIAL_ADMIN_EMAIL).first()
        
        if existing_admin:
            print(f"❌ Admin with email '{INITIAL_ADMIN_EMAIL}' already exists!")
            print(f"   If you want to reset the password, delete the existing admin first.")
            return
        
        # Create new admin
        new_admin = Admin(
            email=INITIAL_ADMIN_EMAIL,
            password_hash=INITIAL_ADMIN_PASSWORD  # Storing as plain text as per requirement
        )
        
        db.add(new_admin)
        db.commit()
        db.refresh(new_admin)
        
        print("✅ Initial admin created successfully!")
        print(f"   Email: {new_admin.email}")
        print(f"   Password: {INITIAL_ADMIN_PASSWORD}")
        print(f"   Admin ID: {new_admin.id}")
        
    except Exception as e:
        print(f"❌ Error creating admin: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Creating initial admin user...")
    print("-" * 50)
    create_initial_admin()
    print("-" * 50)