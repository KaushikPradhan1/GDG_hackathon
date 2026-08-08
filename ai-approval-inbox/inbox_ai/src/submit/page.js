// src/app/page.js
"use client"
import { useState, useEffect } from 'react';
import RequestCard from '@/components/inbox/RequestCard';
import ReviewPanel from '@/components/review-panel/ReviewPanel';
import { fetchRequests, processAction } from '@/lib/api';

export default function InboxDashboard() {
  const [requests, setRequests] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchRequests();
      setRequests(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleAction = async (id, action) => {
    await processAction(id, action);
    setRequests(requests.filter(req => req.request_id !== id));
    setSelectedId(null);
  };

  const selectedRequest = requests.find(req => req.request_id === selectedId);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="w-6 h-6 border-2 border-violet-900 border-t-violet-500 rounded-full animate-spin"></div>
        <div className="text-xs font-mono tracking-widest text-violet-400">BOOTING_WORKSPACE...</div>
      </div>
    </div>
  );

  return (
    <main className="flex h-screen bg-black text-zinc-300 font-sans selection:bg-violet-500/30 relative overflow-hidden">
      {/* Gen-Z Ambient Glow Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-900/20 blur-[150px] rounded-full pointer-events-none"></div>
      
      {/* Sidebar */}
      <div className={`${selectedId ? 'hidden md:flex' : 'flex'} w-full md:w-[360px] flex-col z-10 bg-[#050505]/80 backdrop-blur-2xl border-r border-white/[0.08]`}>
        <div className="p-6 border-b border-white/[0.08]">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-base font-semibold text-white flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.8)]"></div>
              Nexus Triage
            </h1>
            <span className="bg-white/5 text-zinc-400 border border-white/10 px-2.5 py-1 rounded-full text-[10px] font-mono">
              {requests.length} IN_QUEUE
            </span>
          </div>
          <p className="text-xs text-zinc-500 font-medium">Security & Access Audits</p>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-3">
          {requests.map(req => (
            <RequestCard 
              key={req.request_id}
              request={req}
              isActive={selectedId === req.request_id}
              onClick={() => setSelectedId(req.request_id)}
            />
          ))}
          {requests.length === 0 && (
            <div className="p-8 text-center text-sm font-mono text-zinc-600">QUEUE_EMPTY</div>
          )}
        </div>
      </div>

      {/* Main Panel */}
      <div className={`${selectedId ? 'flex' : 'hidden md:flex'} flex-1 flex-col relative z-10 w-full`}>
         <ReviewPanel request={selectedRequest} onAction={handleAction} onBack={() => setSelectedId(null)} />
      </div>
    </main>
  );
}