# app/services/mock_db.py
import random
import string
import urllib.parse
from datetime import datetime
from app.agents.graph import nexus_agent_app

# Expanded Professional Enterprise Mock Data
db = {
    "requests": [
        {
            "request_id": "REQ-A7X9P",
            "user_name": "Sarah Jenkins",
            "email": "s.jenkins@nexus.inc",
            "avatar": "https://ui-avatars.com/api/?name=Sarah+Jenkins&background=09090b&color=fff&rounded=true",
            "location": "London, UK",
            "status": "flagged_suspicious",
            "category": "ACCESS_GRANT",
            "purpose": "Requesting temporary admin override for Q3 database migration.",
            "history": [
                {"time": "09:15:00", "event": "Ticket created via Employee Portal."},
                {"time": "09:15:05", "event": "Risk assessment initiated by Nexus Engine."}
            ],
            "timestamp": "09:15:05",
            "risk_score": 85,
            "agent_log": "CRITICAL: Admin override requests require human authorization. Policy violation detected."
        },
        {
            "request_id": "REQ-C9V2L",
            "user_name": "Elena Rodriguez",
            "email": "e.rodriguez@nexus.inc",
            "avatar": "https://ui-avatars.com/api/?name=Elena+Rodriguez&background=09090b&color=fff&rounded=true",
            "location": "Madrid, ES",
            "status": "flagged_suspicious",
            "category": "DATA_QUERY",
            "purpose": "Need bulk export of customer PII for marketing campaign analysis.",
            "history": [
                {"time": "11:45:00", "event": "Ticket created via Employee Portal."},
                {"time": "11:45:10", "event": "Data loss prevention (DLP) flags triggered."}
            ],
            "timestamp": "11:45:10",
            "risk_score": 92,
            "agent_log": "CRITICAL: Bulk PII export violates compliance protocol. Immediate rejection recommended."
        },
        {
            "request_id": "REQ-B2M4K",
            "user_name": "David Chen",
            "email": "d.chen@nexus.inc",
            "avatar": "https://ui-avatars.com/api/?name=David+Chen&background=09090b&color=fff&rounded=true",
            "location": "Toronto, CA",
            "status": "pending_review",
            "category": "ISSUE_REPORT",
            "purpose": "Unable to access the Q2 financial reports folder on the shared drive.",
            "history": [
                {"time": "10:30:00", "event": "Ticket created via Employee Portal."},
                {"time": "10:30:02", "event": "Risk assessment initiated by Nexus Engine."}
            ],
            "timestamp": "10:30:02",
            "risk_score": 12,
            "agent_log": "CLEAR: Standard file access issue. No anomalies detected in user behavior."
        },
        {
            "request_id": "REQ-E8H9W",
            "user_name": "Anita Patel",
            "email": "a.patel@nexus.inc",
            "avatar": "https://ui-avatars.com/api/?name=Anita+Patel&background=09090b&color=fff&rounded=true",
            "location": "Mumbai, IN",
            "status": "flagged_suspicious",
            "category": "ISSUE_REPORT",
            "purpose": "Password reset required. Current device is unrecognized and outside standard IP range.",
            "history": [
                {"time": "14:22:00", "event": "Ticket created via Employee Portal."},
                {"time": "14:22:02", "event": "Geolocation anomaly detected."}
            ],
            "timestamp": "14:22:02",
            "risk_score": 68,
            "agent_log": "WARNING: Authentication attempt from unverified device/location. Verify identity."
        },
        {
            "request_id": "REQ-D4F1T",
            "user_name": "Michael Chang",
            "email": "m.chang@nexus.inc",
            "avatar": "https://ui-avatars.com/api/?name=Michael+Chang&background=09090b&color=fff&rounded=true",
            "location": "Singapore, SG",
            "status": "pending_review",
            "category": "ACCESS_GRANT",
            "purpose": "Requesting access to the new staging environment for Project Alpha.",
            "history": [
                {"time": "13:10:00", "event": "Ticket created via Employee Portal."},
                {"time": "13:10:05", "event": "Role-based access control (RBAC) verified."}
            ],
            "timestamp": "13:10:05",
            "risk_score": 25,
            "agent_log": "CLEAR: Request aligns with user's current engineering role and project assignments."
        }
    ]
}

def get_all_requests():
    return db["requests"]

def process_action(req_id: str, action: str):
    for i, req in enumerate(db["requests"]):
        if req["request_id"] == req_id:
            db["requests"].pop(i)
            return True
    return False

def add_new_request(data: dict):
    salt = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    new_id = f"REQ-{salt}"
    now = datetime.now().strftime("%H:%M:%S")
    
    safe_name = urllib.parse.quote(data.get("name", "User"))
    avatar_url = f"https://ui-avatars.com/api/?name={safe_name}&background=09090b&color=fff&rounded=true"

    raw_ticket = {
        "request_id": new_id,
        "user_name": data.get("name"),
        "email": data.get("email"),
        "avatar": avatar_url,
        "location": "Internal Employee Node",
        "category": data.get("category", "ISSUE_REPORT").upper(),
        "details": data.get("details"),
    }

    initial_state = {"ticket": raw_ticket, "analysis": {}}
    final_state = nexus_agent_app.invoke(initial_state)
    ai_results = final_state["analysis"]

    new_record = {
        **raw_ticket,
        "status": ai_results["status"],
        "purpose": raw_ticket["details"],
        "history": [
            {"time": now, "event": "Ticket created via Employee Portal."},
            {"time": now, "event": "Risk assessment initiated by Nexus Engine."}
        ],
        "timestamp": now,
        "risk_score": ai_results["risk_score"],
        "agent_log": ai_results["agent_log"]
    }
    
    db["requests"].insert(0, new_record) 
    return new_record