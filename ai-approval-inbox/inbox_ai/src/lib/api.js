// src/lib/api.js

// Mock data mimicking the LangGraph ApprovalState output
const mockRequests = [
  {
    request_id: "REQ-001",
    type: "Invoice",
    submitter: "Acme Corp",
    amount: "$4,500.00",
    date: "2026-08-05",
    status: "human_review",
    agent1_decision: "approve",
    agent1_reasoning: "The invoice matches the standard vendor profile and is mathematically accurate. No missing fields.",
    agent2_decision: "reject",
    agent2_reasoning: "Flagged: Duplicate invoice detected. A payment of $4,500.00 was already disbursed to Acme Corp on 2026-07-15 for the same service period.",
    confidence_score: 0.45,
  },
  {
    request_id: "REQ-002",
    type: "Expense Claim",
    submitter: "Jane Doe",
    amount: "$120.50",
    date: "2026-08-06",
    status: "human_review",
    agent1_decision: "reject",
    agent1_reasoning: "Amount exceeds the standard $100 per diem limit for undocumented client dinners.",
    agent2_decision: "reject",
    agent2_reasoning: "Confirmed policy violation. Section 4.2 states client dinners over $100 require pre-approval proof, which is missing.",
    confidence_score: 0.92,
  },
  {
    request_id: "REQ-003",
    type: "Purchase Order",
    submitter: "IT Department",
    amount: "$12,000.00",
    date: "2026-08-07",
    status: "auto_approved",
    agent1_decision: "approve",
    agent1_reasoning: "Standard hardware refresh request. All fields valid.",
    agent2_decision: "approve",
    agent2_reasoning: "Vendor is approved. Budget has sufficient allocated funds for Q3 IT expenditures.",
    confidence_score: 0.98,
  }
];

// Simulates an API call to your Python backend
// src/lib/api.js
export async function fetchRequests() {
  const res = await fetch('/api/requests');
  if (!res.ok) return [];
  return await res.json();
}

export async function processAction(id, action) {
  const res = await fetch('/api/requests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, action }),
  });
  return await res.json();
}