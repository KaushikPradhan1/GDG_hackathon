// src/components/review-panel/ReviewPanel.js
export default function ReviewPanel({ request, onAction, onBack }) {
  if (!request) return (
    <div className="flex-1 flex flex-col items-center justify-center h-full">
      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
        <svg className="w-5 h-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      </div>
      <p className="text-xs font-mono tracking-widest text-zinc-500 uppercase">Select Target Node</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 lg:p-10 h-full flex flex-col overflow-y-auto w-full max-w-6xl mx-auto">
      
      <button onClick={onBack} className="md:hidden flex items-center gap-2 text-violet-400 hover:text-violet-300 mb-6 text-xs font-mono tracking-widest uppercase bg-violet-500/10 px-4 py-2 rounded-full border border-violet-500/20 w-fit">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Return
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
        <div className="flex items-center gap-5">
          <img src={request.avatar} alt="Profile" className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/10 shadow-xl object-cover" />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">{request.user_name}</h2>
            <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-mono text-zinc-400">
              <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/10 text-violet-300">{request.request_id}</span>
              <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/10">{request.email}</span>
              <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/10">{request.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Box Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8 flex-1">
        
        {/* Left Column (Wider) */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* Context Box */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="text-xs font-bold text-zinc-500 mb-4 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> Context
            </h3>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-medium relative z-10">
              {request.purpose}
            </p>
          </div>

          {/* Audit Trail Box */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-8 flex-1">
             <h3 className="text-xs font-bold text-zinc-500 mb-6 uppercase tracking-widest flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> Audit Protocol
             </h3>
             <div className="space-y-6">
              {request.history?.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.2)]"></div>
                  <div>
                    <p className="text-sm text-zinc-300 font-medium">{item.event}</p>
                    <time className="text-[10px] font-mono text-zinc-500 mt-1.5 block">{item.time}</time>
                  </div>
                </div>
              ))}
              <div className="flex gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 shadow-lg ${request.risk_score >= 50 ? 'bg-rose-500 shadow-rose-500/50' : 'bg-emerald-500 shadow-emerald-500/50'}`}></div>
                <div>
                  <p className={`text-sm font-semibold leading-relaxed ${request.risk_score >= 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    AI_OUTCOME: {request.agent_log}
                  </p>
                  <time className="text-[10px] font-mono text-zinc-500 mt-1.5 block">{request.timestamp}</time>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Controls) */}
        <div className="flex flex-col gap-6">
          {/* Risk Score Box */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden">
            <div className="flex justify-between items-end mb-4">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Confidence Score</span>
              <span className={`text-3xl font-black tracking-tighter ${request.risk_score >= 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {request.risk_score}
              </span>
            </div>
            <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-white/5 shadow-inner">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out ${request.risk_score >= 50 ? 'bg-gradient-to-r from-rose-600 to-rose-400' : 'bg-gradient-to-r from-emerald-600 to-emerald-400'}`} 
                style={{ width: `${request.risk_score}%` }}
              ></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-auto bg-[#0a0a0a] border border-white/10 p-4 rounded-3xl">
            <button 
              onClick={() => onAction(request.request_id, 'approve')}
              className="w-full py-4 rounded-2xl text-sm font-bold tracking-wide text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all transform active:scale-[0.98]"
            >
              APPROVE REQUEST
            </button>
            <button 
              onClick={() => onAction(request.request_id, 'reject')}
              className="w-full py-4 rounded-2xl text-sm font-bold tracking-wide border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all transform active:scale-[0.98]"
            >
              REJECT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}