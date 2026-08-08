// src/lib/api.js

// FIX: Forcing IPv4 resolution to match the Python Uvicorn server
const API_BASE = 'http://127.0.0.1:8000/api';

export async function fetchRequests() {
  try {
    const res = await fetch(`${API_BASE}/requests`);
    
    if (!res.ok) {
      throw new Error(`Backend returned status: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error("Fetch Data Error:", error.message);
    // Return an empty array so the frontend doesn't crash, 
    // it will just show the "QUEUE_EMPTY" state
    return [];
  }
}

export async function processAction(id, action) {
  try {
    const res = await fetch(`${API_BASE}/requests/action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, action }),
    });
    
    if (!res.ok) {
      throw new Error(`Action failed with status: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error("Process Action Error:", error.message);
    return { error: 'Action failed to process on the backend' };
  }
}
