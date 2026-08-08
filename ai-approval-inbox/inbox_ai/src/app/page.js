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
  const [agentActive, setAgentActive] = useState(true);

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

  // NEW: Function to handle going back to the list on mobile
  const handleBack = () => {
    setSelectedId(null);
  };

  const selectedRequest = requests.find(req => req.request_id === selectedId);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#030712] relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="z-10 flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-[3px] border-blue-900 border-t-blue-400 rounded-full animate-spin shadow-[0_0_15px_rgba(96,165,250,0.5)]"></div>
        <div className="text-xs font-mono text-blue-400 tracking-[0.3em] text-center px-4">INITIALIZING_WORKSPACE</div>
      </div>
    </div>
  );

  return (
    <main className="flex h-screen bg-[#030712] text-gray-200 font-sans relative overflow-hidden">
      {/* Ambient Background Engine */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-900/10 rounded-full blur-[128px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>
      </div>

      {/* Glass Sidebar */}
      {/* RESPONSIVE LOGIC: Hidden on mobile if an item is selected. Always shown on md+ screens. */}
      <div className={`${selectedId ? 'hidden md:flex' : 'flex'} w-full md:w-80 lg:w-96 flex-col z-10 bg-black/40 backdrop-blur-xl border-r border-white/10 shadow-2xl transition-all duration-300`}>
        <div className="p-4 md:p-6 border-b border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg md:text-xl font-semibold tracking-tight text-white flex items-center gap-2">
              <span className="bg-blue-500/20 p-1.5 rounded-md border border-blue-500/30">
                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              Fulcrum AI
            </h1>
            
            <button 
              onClick={() => setAgentActive(!agentActive)}
              className={`w-12 h-6 rounded-full transition-all duration-300 flex items-center px-1 shadow-inner ${agentActive ? 'bg-blue-500/20 border border-blue-500/50' : 'bg-white/5 border border-white/10'}`}
            >
              <div className={`w-4 h-4 rounded-full transition-transform duration-300 ${agentActive ? 'bg-blue-400 translate-x-6 shadow-[0_0_10px_rgba(96,165,250,0.8)]' : 'bg-gray-500 translate-x-0'}`}></div>
            </button>
          </div>
          
          <div className="flex items-center gap-2 bg-black/50 p-2.5 rounded-md border border-white/5">
             <div className={`w-2 h-2 rounded-full shrink-0 ${agentActive ? 'bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-gray-600'}`}></div>
             <p className="text-[10px] font-mono text-gray-400 tracking-widest uppercase truncate">
               {agentActive ? 'Agent_Core: Active' : 'Agent_Core: Offline'}
             </p>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar pb-20 md:pb-0">
          {requests.map(req => (
            <RequestCard 
              key={req.request_id}
              request={req}
              isActive={selectedId === req.request_id}
              onClick={() => setSelectedId(req.request_id)}
            />
          ))}
          {requests.length === 0 && (
            <div className="p-8 text-center text-xs font-mono text-gray-500">QUEUE_EMPTY</div>
          )}
        </div>
      </div>

      {/* Main Glass Panel */}
      {/* RESPONSIVE LOGIC: Hidden on mobile if NO item is selected. Always shown on md+ screens. */}
      <div className={`${selectedId ? 'flex' : 'hidden md:flex'} flex-1 flex-col relative z-10 w-full`}>
         <ReviewPanel request={selectedRequest} onAction={handleAction} onBack={handleBack} />
      </div>
    </main>
  );
}