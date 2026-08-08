# app/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.services import mock_db

app = FastAPI(title="Nexus Agent API")

# FIX: Explicitly allow Next.js local development ports to resolve the CORS crash
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ActionModel(BaseModel):
    id: str
    action: str

class SubmissionModel(BaseModel):
    name: str
    email: str
    category: str
    details: str

@app.get("/api/requests")
async def get_requests():
    return mock_db.get_all_requests()

@app.post("/api/requests/action")
async def handle_action(payload: ActionModel):
    success = mock_db.process_action(payload.id, payload.action)
    if not success:
        raise HTTPException(status_code=404, detail="Request not found")
    return {"message": f"Successfully applied '{payload.action}' to {payload.id}"}

@app.post("/api/requests/submit")
async def submit_request(payload: SubmissionModel):
    new_req = mock_db.add_new_request(payload.dict())
    return {"message": "Submitted successfully", "data": new_req}