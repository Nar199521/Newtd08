from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class LoginReq(BaseModel):
    email: str
    password: str

@router.post('/login')
def login(data: LoginReq):
    # For scaffold: mock login. Replace with real DB and JWT generation.
    if data.email == 'admin@stock.com' and data.password == 'admin':
        return {'role':'admin','token':'mock-admin-token'}
    return {'role':'user','token':'mock-user-token'}
