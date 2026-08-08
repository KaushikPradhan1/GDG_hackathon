from typing import TypedDict, Dict, Any
from langgraph.graph import StateGraph, START, END
from app.agents.reviewer import analyze_ticket_node

class AgentState(TypedDict):
    ticket: Dict[str, Any]
    analysis: Dict[str, Any]

workflow = StateGraph(AgentState)
workflow.add_node("reviewer_agent", analyze_ticket_node)
workflow.add_edge(START, "reviewer_agent")
workflow.add_edge("reviewer_agent", END)

nexus_agent_app = workflow.compile()