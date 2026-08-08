import os
from typing import Dict, Any, List
from pydantic import BaseModel, Field
from langchain_google_genai import ChatGoogleGenerativeAI

class TicketAnalysis(BaseModel):
    risk_score: int = Field(description="Risk score from 0 to 100 based on the security threat level.")
    status: str = Field(description="Must be exactly 'flagged_suspicious' if the score is >= 50, otherwise 'pending_review'.")
    agent_log: str = Field(description="A professional, 1-sentence terminal log summarizing the AI's decision.")
    findings: List[str] = Field(description="A list of specific security risks, anomalies, or observations found in the text.")

def analyze_ticket_node(state: Dict[str, Any]) -> Dict[str, Any]:
    ticket = state["ticket"]
    
    # Requires GOOGLE_API_KEY environment variable to be set
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.1)
    structured_llm = llm.with_structured_output(TicketAnalysis)
    
    prompt = f"""
    You are 'Nexus Engine', an automated enterprise security triage AI.
    Analyze the following internal employee request for security risks, anomalies, or policy violations.
    
    Category: {ticket.get('category')}
    Request Details: {ticket.get('details')}
    
    Evaluate the risk. Requests for root access, bypassing protocols, unauthorized database queries, 
    or overriding admin passwords are HIGH risk (Score > 50). General software issues, IT support, or standard 
    tool access are LOW risk (Score < 50).
    """
    
    result = structured_llm.invoke(prompt)
    
    return {
        "analysis": {
            "risk_score": result.risk_score,
            "status": result.status,
            "agent_log": result.agent_log,
            "findings": result.findings
        }
    }