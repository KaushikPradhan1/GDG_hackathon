# ⚡ Nexus Engine: Autonomous Security Triage

An intelligent, agent-based security triage platform designed to intercept, analyze, and score internal enterprise requests in real-time. Nexus Engine eliminates manual verification bottlenecks by utilizing a state-machine AI workflow to automatically approve routine requests and flag high-risk anomalies for human review.

## 🚀 The Vision
IT and security teams are drowning in routine access requests. Nexus Engine acts as a frontline autonomous agent. By combining strict data typing with generative AI, it analyzes the context, location, and behavioral markers of a request, generating a live audit trail and a deterministic risk score before a human ever opens the ticket.

## ✨ Features
*   **Agentic AI Workflow:** Powered by LangGraph, treating ticket triage as an automated state machine.
*   **Structured AI Reasoning:** Leverages Gemini 2.5 Flash to generate strict JSON outputs, extracting specific security vectors instead of just conversational text.
*   **Real-Time Risk Visualizer:** Dynamic progress bars and confidence scores based on simulated PII leaks, geolocation anomalies, and policy violations.
*   **Enterprise "Bento Box" UI:** A premium, pitch-black dark mode interface with glassmorphism effects, built entirely with Tailwind CSS.
*   **Master-Detail Mobile Responsiveness:** Flawless UX across desktop dashboards and mobile devices.

## 🛠️ Tech Stack
**Frontend Ecosystem:**
*   Next.js (App Router)
*   React 18
*   Tailwind CSS (Custom Zinc/Violet design system)

**Backend & AI Services:**
*   Python 3 & FastAPI
*   Uvicorn (ASGI Server)
*   LangChain (Structured Output parsing)
*   LangGraph (Agent orchestration)
*   Google Gemini 2.5 Flash (Core reasoning engine)

---

## 📂 Project Structure
```text
nexus-engine/
├── backend/
│   ├── app/
│   │   ├── agents/
│   │   │   ├── graph.py       # LangGraph state machine workflow
│   │   │   └── reviewer.py    # Gemini 2.5 Flash analysis node
│   │   ├── services/
│   │   │   └── mock_db.py     # In-memory database & live demo data
│   │   └── main.py            # FastAPI routing and CORS setup
│   └── requirements.txt
├── src/
│   ├── app/
│   │   ├── page.js            # Main triage dashboard (Next.js)
│   │   └── submit/
│   │       └── page.js        # Internal employee submission portal
│   ├── components/
│   │   ├── inbox/             # Sidebar queue components
│   │   └── review-panel/      # Agent terminal and audit UI
│   └── lib/
│       └── api.js             # Data fetching & backend connection
├── deploy.sh                  # Automated production deployment script
└── package.json
