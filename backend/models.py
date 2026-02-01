from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime, date
from bson import ObjectId


# Custom ObjectId handler
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


# Admin Model
class Admin(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    email: str
    password_hash: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


# News Model
class News(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    title: str
    description: str
    image_path: str
    date: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


# Job Model
class Job(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    title: str
    description: str
    location: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


# Employee Model
class Employee(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str
    email: str
    password_hash: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


# Attendance Model
class Attendance(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    employee_id: int  # Keep as int to match your employee IDs
    date: date
    in_time: Optional[datetime] = None
    out_time: Optional[datetime] = None

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str, date: lambda v: v.isoformat(), datetime: lambda v: v.isoformat()}