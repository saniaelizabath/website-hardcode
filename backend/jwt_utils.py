from datetime import datetime, timedelta
from jose import jwt

SECRET_KEY = "CHANGE_THIS_TO_A_SECRET"
ALGORITHM = "HS256"

def create_token(data: dict, expires_minutes=30):
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(minutes=expires_minutes)
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
