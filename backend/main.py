from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from typing import Optional
from datetime import datetime, date, timedelta
import uuid
from bson import ObjectId

import schemas
from database import (
    admins_collection,
    news_collection,
    jobs_collection,
    employees_collection,
    attendance_collection,
    employee_links_collection,
    admin_links_collection  # ← ADDED THIS
)
from location_utils import is_location_allowed

import smtplib
from email.message import EmailMessage

# ----------------------------
# FastAPI App
# ----------------------------
app = FastAPI()

SECRET_KEY = "AdminSecretKey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

SMTP_EMAIL = "sania.elizabath@btech.christuniversity.in"
SMTP_PASSWORD = "bcjqxsfjfivcibov"

reset_tokens = {}  # token -> email/employee data

# ← FIXED CORS - Added more permissive settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Added both variants
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],  # Added this
)

# ----------------------------
# Serve uploaded images
# ----------------------------
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# ----------------------------
# Contact Form & Careers Application APIs
# ----------------------------

@app.post("/api/send-contact")
async def send_contact_form(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(None),
    subject: str = Form(...),
    message: str = Form(...)
):
    """Handle contact form submission"""
    try:
        body = f"""
New Contact Form Submission

Name: {name}
Email: {email}
Phone: {phone or 'Not provided'}
Subject: {subject}

Message:
{message}
        """
        
        send_email(
            to="sales@magmarine.in",
            subject=f"Contact Form: {subject}",
            body=body
        )
        
        return {"success": True, "message": "Message sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")


@app.post("/api/send-application")
async def send_job_application(
    job_title: str = Form(...),
    name: str = Form(None),
    email: str = Form(None)
):
    """Handle job application submission"""
    try:
        body = f"""
New Job Application

Position: {job_title}
"""
        if name:
            body += f"Name: {name}\n"
        if email:
            body += f"Email: {email}\n"
        
        body += """
Note: Applicant should attach their resume when replying to this email.
"""
        
        send_email(
            to="careers@magmarine.in",
            subject=f"Application for {job_title}",
            body=body
        )
        
        return {"success": True, "message": "Application submitted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")
# ----------------------------
# Email Helper
# ----------------------------
def send_email(to: str, subject: str, body: str):
    EMAIL_ADDRESS = SMTP_EMAIL
    EMAIL_PASSWORD = SMTP_PASSWORD

    msg = EmailMessage()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = to
    msg["Subject"] = subject
    msg.set_content(body)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)


# ----------------------------
# Helper Functions for Attendance
# ----------------------------
def calculate_hours(in_time_str: str, out_time_str: Optional[str]) -> float:
    """Calculate hours worked between in_time and out_time"""
    if not out_time_str:
        return 0.0
    
    try:
        in_time = datetime.fromisoformat(in_time_str)
        out_time = datetime.fromisoformat(out_time_str)
        
        duration = out_time - in_time
        hours = duration.total_seconds() / 3600
        return round(hours, 2)
    except:
        return 0.0


def get_date_range(filter_type: str):
    """Get start and end dates based on filter type"""
    today = date.today()
    
    if filter_type == "today":
        return today.isoformat(), (today + timedelta(days=1)).isoformat()
    
    elif filter_type == "week":
        # Get Monday of current week
        start_of_week = today - timedelta(days=today.weekday())
        end_of_week = start_of_week + timedelta(days=7)
        return start_of_week.isoformat(), end_of_week.isoformat()
    
    elif filter_type == "month":
        # Get first day of current month
        start_of_month = date(today.year, today.month, 1)
        if today.month == 12:
            end_of_month = date(today.year + 1, 1, 1)
        else:
            end_of_month = date(today.year, today.month + 1, 1)
        return start_of_month.isoformat(), end_of_month.isoformat()
    
    return None, None


# ----------------------------
# Admin Auth APIs
# ----------------------------
@app.post("/auth/login")
async def admin_login(
    email: str = Form(...),
    password: str = Form(...)
):
    # Fetch admin from MongoDB
    admin = await admins_collection.find_one({"email": email})
    
    if not admin:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Check password
    if admin["password_hash"] != password:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {"message": "Login successful"}


@app.post("/auth/forgot-password")
async def forgot_password():
    # Fetch the admin email from database (assuming only one admin)
    admin = await admins_collection.find_one({})
    
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found in database")
    
    email = admin["email"]
    token = str(uuid.uuid4())
    reset_tokens[token] = email

    reset_link = f"http://localhost:5173/?token={token}"

    send_email(
        to=email,
        subject="Reset Admin Password",
        body=f"""
Hello Admin,

Click the link below to reset your password:

{reset_link}

If you did not request this, please ignore this email.
"""
    )

    return {"message": "Reset link sent successfully"}


@app.post("/auth/reset-password")
async def reset_password(
    token: str = Form(...),
    new_password: str = Form(...)
):
    if token not in reset_tokens:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    email = reset_tokens[token]
    
    # Find admin by email and update password
    result = await admins_collection.update_one(
        {"email": email},
        {"$set": {"password_hash": new_password}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Admin not found")
    
    # Remove used token
    del reset_tokens[token]

    return {"message": "Password reset successful"}


# ----------------------------
# News APIs (FIXED DELETE & EDIT)
# ----------------------------
@app.post("/news")
async def add_news(
    title: str = Form(...),
    description: str = Form(...),
    date: str = Form(...),
    image: UploadFile = File(...)
):
    # Create uploads directory if it doesn't exist
    os.makedirs("uploads/news", exist_ok=True)
    
    file_path = f"uploads/news/{image.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    news_data = {
        "title": title,
        "description": description,
        "date": date,
        "image_path": file_path
    }

    result = await news_collection.insert_one(news_data)
    news_data["_id"] = str(result.inserted_id)
    
    return news_data


@app.get("/news")
async def get_news():
    news_list = []
    async for news in news_collection.find():
        news["_id"] = str(news["_id"])
        news_list.append(news)
    return news_list


@app.get("/news/{news_id}")
async def get_single_news(news_id: str):
    """Get a single news item by ID"""
    try:
        news = await news_collection.find_one({"_id": ObjectId(news_id)})
        if not news:
            raise HTTPException(status_code=404, detail="News not found")
        
        news["_id"] = str(news["_id"])
        return news
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid news ID: {str(e)}")


@app.put("/news/{news_id}")
async def update_news(
    news_id: str,
    title: str = Form(...),
    description: str = Form(...),
    date: str = Form(...),
    image: Optional[UploadFile] = File(None)
):
    """Update an existing news item"""
    try:
        # Find existing news
        news = await news_collection.find_one({"_id": ObjectId(news_id)})
        if not news:
            raise HTTPException(status_code=404, detail="News not found")

        update_data = {
            "title": title,
            "description": description,
            "date": date
        }

        # Update image if provided
        if image and image.filename:
            # Create uploads directory if it doesn't exist
            os.makedirs("uploads/news", exist_ok=True)
            
            # Delete old image if it exists
            if news.get("image_path") and os.path.exists(news["image_path"]):
                try:
                    os.remove(news["image_path"])
                except:
                    pass
            
            # Save new image
            file_path = f"uploads/news/{image.filename}"
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)
            update_data["image_path"] = file_path

        result = await news_collection.update_one(
            {"_id": ObjectId(news_id)},
            {"$set": update_data}
        )

        if result.modified_count == 0 and result.matched_count == 0:
            raise HTTPException(status_code=404, detail="News not found")

        return {"message": "News updated successfully", "news_id": news_id}
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error updating news: {str(e)}")


@app.delete("/news/{news_id}")
async def delete_news(news_id: str):
    """Delete a news item"""
    try:
        news = await news_collection.find_one({"_id": ObjectId(news_id)})
        if not news:
            raise HTTPException(status_code=404, detail="News not found")

        # Delete image file if it exists
        if news.get("image_path") and os.path.exists(news["image_path"]):
            try:
                os.remove(news["image_path"])
            except Exception as e:
                print(f"Warning: Could not delete image file: {e}")

        result = await news_collection.delete_one({"_id": ObjectId(news_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="News not found")
        
        return {"message": "News deleted successfully", "deleted_id": news_id}
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error deleting news: {str(e)}")


# ----------------------------
# Jobs APIs (FIXED DELETE & EDIT)
# ----------------------------
@app.post("/jobs")
async def add_job(job: schemas.JobCreate):
    job_data = job.dict()
    result = await jobs_collection.insert_one(job_data)
    job_data["_id"] = str(result.inserted_id)
    return job_data


@app.get("/jobs")
async def get_jobs():
    jobs_list = []
    async for job in jobs_collection.find():
        job["_id"] = str(job["_id"])
        jobs_list.append(job)
    return jobs_list


@app.get("/jobs/{job_id}")
async def get_single_job(job_id: str):
    """Get a single job by ID"""
    try:
        job = await jobs_collection.find_one({"_id": ObjectId(job_id)})
        if not job:
            raise HTTPException(status_code=404, detail="Job not found")
        
        job["_id"] = str(job["_id"])
        return job
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid job ID: {str(e)}")


@app.put("/jobs/{job_id}")
async def update_job(job_id: str, job: schemas.JobCreate):
    """Update an existing job"""
    try:
        result = await jobs_collection.update_one(
            {"_id": ObjectId(job_id)},
            {"$set": job.dict()}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Job not found")
        
        return {"message": "Job updated successfully", "job_id": job_id}
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error updating job: {str(e)}")


@app.delete("/jobs/{job_id}")
async def delete_job(job_id: str):
    """Delete a job"""
    try:
        result = await jobs_collection.delete_one({"_id": ObjectId(job_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Job not found")
        
        return {"message": "Job deleted successfully", "deleted_id": job_id}
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error deleting job: {str(e)}")


# ----------------------------
# Employee APIs
# ----------------------------
@app.get("/employees")
async def get_employees():
    """Get all employees (for portal display)"""
    employees_list = []
    async for employee in employees_collection.find():
        employee["_id"] = str(employee["_id"])
        employees_list.append(employee)
    return employees_list


@app.post("/employee/login")
async def employee_login(
    email: str = Form(...),
    password: str = Form(...),
    employee_id: int = Form(...)
):
    """Employee login - verify credentials"""
    employee = await employees_collection.find_one({
        "id": employee_id,
        "email": email
    })
    
    if not employee:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Check password
    if employee["password_hash"] != password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "employee": {
            "id": employee["id"],
            "name": employee["name"],
            "email": employee["email"]
        }
    }


@app.post("/employee/forgot-password")
async def employee_forgot_password(employee_id: int = Form(...)):
    """Send password reset email to employee"""
    employee = await employees_collection.find_one({"id": employee_id})
    
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    email = employee["email"]
    token = str(uuid.uuid4())
    reset_tokens[token] = {"email": email, "employee_id": employee_id, "type": "employee"}

    reset_link = f"http://localhost:5173/?token={token}&type=employee"

    send_email(
        to=email,
        subject="Reset Employee Password",
        body=f"""
Hello {employee["name"]},

Click the link below to reset your password:

{reset_link}

If you did not request this, please ignore this email.
"""
    )

    return {"message": "Reset link sent successfully"}


@app.post("/employee/reset-password")
async def employee_reset_password(
    token: str = Form(...),
    new_password: str = Form(...)
):
    """Reset employee password"""
    if token not in reset_tokens:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    token_data = reset_tokens[token]
    
    if token_data.get("type") != "employee":
        raise HTTPException(status_code=400, detail="Invalid token type")
    
    employee_id = token_data.get("employee_id")
    
    # Update password
    result = await employees_collection.update_one(
        {"id": employee_id},
        {"$set": {"password_hash": new_password}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Remove used token
    del reset_tokens[token]

    return {"message": "Password reset successful"}


# ----------------------------
# Attendance APIs (ENHANCED)
# ----------------------------
@app.post("/attendance/mark-in")
async def mark_attendance_in(
    employee_id: int = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...)
):
    """Mark attendance IN - check location first"""
    
    # Verify location
    location_check = is_location_allowed(latitude, longitude)
    
    if not location_check["allowed"]:
        raise HTTPException(
            status_code=403, 
            detail="You are not at an allowed location. Please go to the office to mark attendance."
        )
    
    # Check if employee exists
    employee = await employees_collection.find_one({"id": employee_id})
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Check if attendance already marked today
    today = date.today()
    existing_attendance = await attendance_collection.find_one({
        "employee_id": employee_id,
        "date": today.isoformat()
    })
    
    if existing_attendance and existing_attendance.get("in_time"):
        raise HTTPException(status_code=400, detail="Attendance already marked for today")
    
    # Create or update attendance record
    if not existing_attendance:
        attendance_data = {
            "employee_id": employee_id,
            "date": today.isoformat(),
            "in_time": datetime.now().isoformat(),
            "status": "present"
        }
        await attendance_collection.insert_one(attendance_data)
    else:
        await attendance_collection.update_one(
            {"_id": existing_attendance["_id"]},
            {"$set": {
                "in_time": datetime.now().isoformat(),
                "status": "present"
            }}
        )
    
    return {
        "message": "Attendance marked successfully",
        "location": location_check["location_name"],
        "time": datetime.now().strftime("%I:%M %p")
    }


@app.post("/attendance/mark-out")
async def mark_attendance_out(
    employee_id: int = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...)
):
    """Mark attendance OUT - check location first"""
    
    # Verify location
    location_check = is_location_allowed(latitude, longitude)
    
    if not location_check["allowed"]:
        raise HTTPException(
            status_code=403, 
            detail="You are not at an allowed location. Please mark exit from office."
        )
    
    # Check if employee exists
    employee = await employees_collection.find_one({"id": employee_id})
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Find today's attendance record
    today = date.today()
    attendance = await attendance_collection.find_one({
        "employee_id": employee_id,
        "date": today.isoformat()
    })
    
    if not attendance or not attendance.get("in_time"):
        raise HTTPException(status_code=400, detail="Please mark IN time first")
    
    if attendance.get("out_time"):
        raise HTTPException(status_code=400, detail="Exit time already marked for today")
    
    # Calculate hours worked
    out_time = datetime.now()
    in_time = datetime.fromisoformat(attendance["in_time"])
    hours_worked = calculate_hours(attendance["in_time"], out_time.isoformat())
    
    # Update out time and hours
    await attendance_collection.update_one(
        {"_id": attendance["_id"]},
        {"$set": {
            "out_time": out_time.isoformat(),
            "hours_worked": hours_worked
        }}
    )
    
    return {
        "message": "Exit time marked successfully",
        "location": location_check["location_name"],
        "time": out_time.strftime("%I:%M %p"),
        "hours_worked": hours_worked
    }

@app.get("/attendance/all")
async def get_all_attendance(
    filter: Optional[str] = "today",
    date: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    month: Optional[int] = None,
    year: Optional[int] = None
):
    """
    Get all employees' attendance with flexible filters
    Filters: today, week, month
    Custom: date, start_date+end_date, month+year
    """
    
    # Determine date range
    if date:
        # Single custom date
        start_date_str = date
        end_date_str = (datetime.fromisoformat(date) + timedelta(days=1)).date().isoformat()
    elif start_date and end_date:
        # Custom week/range
        start_date_str = start_date
        end_date_str = end_date
    elif month and year:
        # Custom month
        first_day = datetime(year, month, 1).date()
        if month == 12:
            last_day = datetime(year + 1, 1, 1).date()
        else:
            last_day = datetime(year, month + 1, 1).date()
        start_date_str = first_day.isoformat()
        end_date_str = last_day.isoformat()
    else:
        # Use filter parameter (today, week, month)
        start_date_str, end_date_str = get_date_range(filter)
        
        if not start_date_str or not end_date_str:
            raise HTTPException(status_code=400, detail="Invalid filter")
    
    # Get all employees
    employees = []
    async for emp in employees_collection.find():
        employees.append(emp)
    
    # Build attendance data
    attendance_data = []
    
    for employee in employees:
        # Get attendance records for this employee in date range
        attendance_records = []
        async for record in attendance_collection.find({
            "employee_id": employee["id"],
            "date": {"$gte": start_date_str, "$lt": end_date_str}
        }).sort("date", -1):
            record["_id"] = str(record["_id"])
            
            # Calculate hours if not already calculated
            if record.get("in_time") and record.get("out_time"):
                if not record.get("hours_worked"):
                    hours = calculate_hours(record["in_time"], record["out_time"])
                    record["hours_worked"] = hours
            else:
                record["hours_worked"] = 0.0
            
            # Format times for display
            if record.get("in_time"):
                in_dt = datetime.fromisoformat(record["in_time"])
                record["in_time_display"] = in_dt.strftime("%I:%M %p")
            else:
                record["in_time_display"] = "-"
            
            if record.get("out_time"):
                out_dt = datetime.fromisoformat(record["out_time"])
                record["out_time_display"] = out_dt.strftime("%I:%M %p")
            else:
                record["out_time_display"] = "-"
            
            attendance_records.append(record)
        
        # Calculate summary
        total_hours = sum(r.get("hours_worked", 0) for r in attendance_records)
        present_days = len([r for r in attendance_records if r.get("status") == "present"])
        
        attendance_data.append({
            "employee_id": employee["id"],
            "employee_name": employee["name"],
            "email": employee["email"],
            "records": attendance_records,
            "summary": {
                "total_hours": round(total_hours, 2),
                "present_days": present_days,
                "total_days": len(attendance_records)
            }
        })
    
    return {
        "filter": filter or "custom",
        "date_range": {
            "start": start_date_str,
            "end": end_date_str
        },
        "attendance": attendance_data
    }


@app.get("/attendance/{employee_id}")
async def get_attendance(
    employee_id: int,
    filter: Optional[str] = None,
    date: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    month: Optional[int] = None,
    year: Optional[int] = None
):
    """
    Get attendance records for a specific employee
    Filters: today, week, month, all
    Custom: date, start_date+end_date, month+year
    """
    
    query = {"employee_id": employee_id}
    
    # Apply date filters
    if date:
        start_date_str = date
        end_date_str = (datetime.fromisoformat(date) + timedelta(days=1)).date().isoformat()
        query["date"] = {"$gte": start_date_str, "$lt": end_date_str}
    elif start_date and end_date:
        query["date"] = {"$gte": start_date, "$lt": end_date}
    elif month and year:
        first_day = datetime(year, month, 1).date()
        if month == 12:
            last_day = datetime(year + 1, 1, 1).date()
        else:
            last_day = datetime(year, month + 1, 1).date()
        query["date"] = {"$gte": first_day.isoformat(), "$lt": last_day.isoformat()}
    elif filter and filter != "all":
        start_date_str, end_date_str = get_date_range(filter)
        if start_date_str and end_date_str:
            query["date"] = {"$gte": start_date_str, "$lt": end_date_str}
    
    attendance_list = []
    async for attendance in attendance_collection.find(query).sort("date", -1):
        attendance["_id"] = str(attendance["_id"])
        
        # Calculate hours if not already calculated
        if attendance.get("in_time") and attendance.get("out_time"):
            if not attendance.get("hours_worked"):
                hours = calculate_hours(attendance["in_time"], attendance["out_time"])
                attendance["hours_worked"] = hours
        else:
            attendance["hours_worked"] = 0.0
        
        attendance_list.append(attendance)
    
    # Calculate summary
    total_hours = sum(a.get("hours_worked", 0) for a in attendance_list)
    present_days = len([a for a in attendance_list if a.get("status") == "present"])
    
    return {
        "filter": filter or "all",
        "records": attendance_list,
        "summary": {
            "total_hours": round(total_hours, 2),
            "present_days": present_days,
            "total_days": len(attendance_list)
        }
    }


@app.delete("/attendance/{attendance_id}")
async def delete_attendance(attendance_id: str):
    """Delete a specific attendance record"""
    try:
        result = await attendance_collection.delete_one({"_id": ObjectId(attendance_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Attendance record not found")
        
        return {"message": "Attendance record deleted successfully", "deleted_id": attendance_id}
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error deleting attendance: {str(e)}")


@app.delete("/attendance/employee/{employee_id}")
async def delete_employee_attendance(
    employee_id: int,
    filter: str = "today",
    date: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    month: Optional[int] = None,
    year: Optional[int] = None
):
    """
    Delete all attendance records for an employee based on filter
    """
    # Build query similar to get_all_attendance
    if date:
        start_date_str = date
        end_date_str = (datetime.fromisoformat(date) + timedelta(days=1)).date().isoformat()
    elif start_date and end_date:
        start_date_str = start_date
        end_date_str = end_date
    elif month and year:
        first_day = datetime(year, month, 1).date()
        if month == 12:
            last_day = datetime(year + 1, 1, 1).date()
        else:
            last_day = datetime(year, month + 1, 1).date()
        start_date_str = first_day.isoformat()
        end_date_str = last_day.isoformat()
    else:
        start_date_str, end_date_str = get_date_range(filter)
        if not start_date_str or not end_date_str:
            raise HTTPException(status_code=400, detail="Invalid filter. Use: today, week, or month")
    
    query = {
        "employee_id": employee_id,
        "date": {"$gte": start_date_str, "$lt": end_date_str}
    }
    
    result = await attendance_collection.delete_many(query)
    
    return {
        "message": f"Deleted {result.deleted_count} attendance records",
        "deleted_count": result.deleted_count,
        "filter": filter
    }


# =========================
# EMPLOYEE CRUD APIs
# =========================

@app.post("/employees")
async def add_employee(employee: schemas.EmployeeCreate):
    """Add a new employee"""
    # Check if employee ID already exists
    existing = await employees_collection.find_one({"id": employee.id})
    if existing:
        raise HTTPException(status_code=400, detail="Employee ID already exists")
    
    employee_data = employee.dict()
    result = await employees_collection.insert_one(employee_data)
    employee_data["_id"] = str(result.inserted_id)
    return employee_data


@app.put("/employees/{employee_id}")
async def update_employee(employee_id: int, employee: schemas.EmployeeUpdate):
    """Update an employee"""
    update_data = {}
    
    if employee.name:
        update_data["name"] = employee.name
    if employee.email:
        update_data["email"] = employee.email
    if employee.password_hash:
        update_data["password_hash"] = employee.password_hash
    
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    result = await employees_collection.update_one(
        {"id": employee_id},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    return {"message": "Employee updated successfully"}


@app.delete("/employees/{employee_id}")
async def delete_employee(employee_id: int):
    """Delete an employee and all their attendance records and links"""
    # Delete employee
    result = await employees_collection.delete_one({"id": employee_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Delete all attendance records for this employee
    attendance_result = await attendance_collection.delete_many({"employee_id": employee_id})
    
    # Delete all links for this employee
    links_result = await employee_links_collection.delete_many({"employee_id": employee_id})
    
    return {
        "message": "Employee deleted successfully",
        "attendance_records_deleted": attendance_result.deleted_count,
        "links_deleted": links_result.deleted_count
    }


# =========================
# EMPLOYEE LINKS APIs
# =========================

LINKS_CONFIG = [
    { "key": "attendance_url",     "name": "Attendance of Employees under them" },
    { "key": "project_report_url", "name": "Project Assigned ~ Project Report"  },
    { "key": "timesheet_url",      "name": "Time Sheet of Managers"            },
    { "key": "policy_hub_url",     "name": "Policy Hub"                        },
    { "key": "inventory_url",      "name": "Inventory Management"              },
    { "key": "petty_cash_url",     "name": "Petty Cash Management"             },
    { "key": "salary_advance_url", "name": "Salary Advance"                    },
    { "key": "approved_pr_url",    "name": "Approved PR"                       },
]

LINKS_KEYS = [item["key"] for item in LINKS_CONFIG]


@app.get("/employee-links/config")
async def get_links_config():
    """Return the static list of link field definitions.
    Frontend uses this to render forms / cards without hard-coding."""
    return {"links": LINKS_CONFIG}


@app.get("/employee-links/{employee_id}")
async def get_employee_links(employee_id: int):
    """Return the links document for one employee.
    If nothing has been saved yet, return empty strings so the
    frontend always gets a consistent shape."""
    doc = await employee_links_collection.find_one({"employee_id": employee_id})

    # Build a response that always contains every key (default "")
    result = {"employee_id": employee_id}
    for key in LINKS_KEYS:
        result[key] = (doc or {}).get(key, "")

    return result


@app.post("/employee-links")
async def create_employee_links(links: schemas.EmployeeLinksCreate):
    """Create a fresh links document for an employee.
    Returns 400 if one already exists – use PUT to update."""
    existing = await employee_links_collection.find_one({"employee_id": links.employee_id})
    if existing:
        raise HTTPException(
            status_code=400,
            detail="Links already exist for this employee. Use PUT to update."
        )

    await employee_links_collection.insert_one(links.dict())
    return {"message": "Links created", "employee_id": links.employee_id}


@app.put("/employee-links/{employee_id}")
async def update_employee_links(employee_id: int, links: schemas.EmployeeLinksUpdate):
    """Upsert links for an employee.  Only the fields that are provided
    (not None) are written; omitted fields are left untouched.
    If no document exists yet it is created automatically (upsert)."""
    update_data = {k: v for k, v in links.dict().items() if v is not None}

    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")

    await employee_links_collection.update_one(
        {"employee_id": employee_id},
        {
            "$set": update_data,
            "$setOnInsert": {"employee_id": employee_id}  # only written on upsert-create
        },
        upsert=True
    )
    return {"message": "Links saved", "employee_id": employee_id}


@app.delete("/employee-links/{employee_id}")
async def delete_employee_links(employee_id: int):
    """Remove all links for an employee."""
    result = await employee_links_collection.delete_one({"employee_id": employee_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="No links found for this employee")
    return {"message": "Links deleted", "employee_id": employee_id}


# ← NEW: Update individual link
@app.patch("/employee-links/{employee_id}/{link_key}")
async def update_single_link(
    employee_id: int,
    link_key: str,
    url: str = Form(...)
):
    """Update a single link for an employee"""
    if link_key not in LINKS_KEYS:
        raise HTTPException(status_code=400, detail=f"Invalid link key: {link_key}")
    
    result = await employee_links_collection.update_one(
        {"employee_id": employee_id},
        {
            "$set": {link_key: url},
            "$setOnInsert": {"employee_id": employee_id}
        },
        upsert=True
    )
    
    return {
        "message": f"Link {link_key} updated successfully",
        "employee_id": employee_id,
        "link_key": link_key,
        "url": url
    }


# =========================
# ADMIN LINKS APIs (for admin's own Excel sheets)
# =========================

@app.get("/admin-links")
async def get_admin_links():
    """Get all admin links"""
    links_list = []
    async for link in admin_links_collection.find().sort("created_at", -1):
        link["_id"] = str(link["_id"])
        links_list.append(link)
    return links_list


@app.post("/admin-links")
async def create_admin_link(
    name: str = Form(...),
    url: str = Form(...)
):
    """Create a new admin link"""
    link_data = {
        "name": name,
        "url": url,
        "created_at": datetime.now().isoformat()
    }
    
    result = await admin_links_collection.insert_one(link_data)
    link_data["_id"] = str(result.inserted_id)
    
    return {
        "message": "Admin link created successfully",
        "link": link_data
    }


@app.get("/admin-links/{link_id}")
async def get_admin_link(link_id: str):
    """Get a single admin link by ID"""
    try:
        link = await admin_links_collection.find_one({"_id": ObjectId(link_id)})
        if not link:
            raise HTTPException(status_code=404, detail="Link not found")
        
        link["_id"] = str(link["_id"])
        return link
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid link ID: {str(e)}")


@app.put("/admin-links/{link_id}")
async def update_admin_link(
    link_id: str,
    name: str = Form(...),
    url: str = Form(...)
):
    """Update an existing admin link"""
    try:
        update_data = {
            "name": name,
            "url": url,
            "updated_at": datetime.now().isoformat()
        }
        
        result = await admin_links_collection.update_one(
            {"_id": ObjectId(link_id)},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Link not found")
        
        return {
            "message": "Admin link updated successfully",
            "link_id": link_id
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error updating link: {str(e)}")


@app.delete("/admin-links/{link_id}")
async def delete_admin_link(link_id: str):
    """Delete an admin link"""
    try:
        result = await admin_links_collection.delete_one({"_id": ObjectId(link_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Link not found")
        
        return {
            "message": "Admin link deleted successfully",
            "deleted_id": link_id
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error deleting link: {str(e)}")