
from pydantic import BaseModel, EmailStr
from datetime import datetime, date
from typing import Optional


class AdminLogin(BaseModel):
    email: EmailStr
    password: str


class JobCreate(BaseModel):
    title: str
    description: str
    location: str


class NewsResponse(BaseModel):
    id: int
    title: str
    description: str
    image_path: str
    date: str

    class Config:
        orm_mode = True


# Employee Schemas
class EmployeeLogin(BaseModel):
    email: EmailStr
    password: str
    employee_id: int  # To identify which employee is logging in


class EmployeeResponse(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        orm_mode = True


# Attendance Schemas
class AttendanceMarkIn(BaseModel):
    employee_id: int
    latitude: float
    longitude: float


class AttendanceMarkOut(BaseModel):
    employee_id: int
    attendance_id: int
    latitude: float
    longitude: float


class AttendanceResponse(BaseModel):
    id: int
    employee_id: int
    date: date
    in_time: Optional[datetime]
    out_time: Optional[datetime]

    class Config:
        orm_mode = True

class AdminLogin(BaseModel):
    email: EmailStr
    password: str


class JobCreate(BaseModel):
    title: str
    description: str
    location: str

class NewsResponse(BaseModel):
    id: int
    title: str
    description: str
    image_path: str
    date: str

    class Config:
        orm_mode = True

class EmployeeCreate(BaseModel):
    id: int
    name: str
    email: str
    password_hash: str

class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    password_hash: Optional[str] = None

class EmployeeLinksCreate(BaseModel):
    employee_id: int
    attendance_url: str = ""
    project_report_url: str = ""
    timesheet_url: str = ""
    policy_hub_url: str = ""
    inventory_url: str = ""
    petty_cash_url: str = ""
    salary_advance_url: str = ""
    approved_pr_url: str = ""


class EmployeeLinksUpdate(BaseModel):
    attendance_url: Optional[str] = None
    project_report_url: Optional[str] = None
    timesheet_url: Optional[str] = None
    policy_hub_url: Optional[str] = None
    inventory_url: Optional[str] = None
    petty_cash_url: Optional[str] = None
    salary_advance_url: Optional[str] = None
    approved_pr_url: Optional[str] = None