// src/components/review-panel/ReviewPanel.js
import { useState, useEffect } from 'react';

export default function ReviewPanel({ request, onAction, onBack }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [agentLogs, setAgentLogs] = useState([]);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    setAgentLogs([]);
    setAnalysisComplete(false);
    setIsAnalyzing(false);
    setDisplayScore(0);
  }, [request]);

  const runAgentAnalysis = async () => {
    setIsAnalyzing(true);
    setAgentLogs([]);
    
    const steps = [
      "> INITIATING NEURAL PROTOCOL...",
      `> Cross-referencing identity matrix for ${request?.user_name}...`,
      `> Verifying spatial coordinates: ${request?.location}...`,
      "> Auditing historical session logs...",
      request?.status === 'flagged_suspicious' 
        ? "> [!] CRITICAL: Security flags triggered in subsystem." 
        : "> [✓] CLEAR: Biometric and location data verified.",
      "> CALCULATING FINAL RISK SCORE..."
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setAgentLogs(prev => [...prev, steps[i]]);
    }

    let currentScore = 0;
    const scoreInterval = setInterval(() => {
      currentScore += 3;
      if (currentScore >= (request?.risk_score || 0)) {
        clearInterval(scoreInterval);
        setDisplayScore(request?.risk_score || 0);
        setAgentLogs(prev => [...prev, request?.status === 'flagged_suspicious' ? "> RECOMMENDATION: REJECT" : "> RECOMMENDATION: APPROVE"]);
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      } else {
        setDisplayScore(currentScore);
      }
    }, 20);
  };

  if (!request) return (
    <div className="flex-1 flex flex-col items-center justify-center h-full p-4">
       <div className="w-16 h-16 border border-white/10 bg-white/5 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm shadow-xl">
         <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
         </svg>
       </div>
       <p className="text-xs font-mono text-gray-500 tracking-[0.2em] animate-pulse text-center">AWAITING_WORK_ITEM</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 lg:p-12 h-full flex flex-col overflow-y-auto w-full max-w-6xl mx-auto">
      
      {/* NEW: Mobile Back Button */}
      <button 
        onClick={onBack} 
        className="md:hidden flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 font-mono text-xs tracking-widest bg-blue-500/10 w-fit px-3 py-1.5 rounded border border-blue-500/20 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        QUEUE
      </button>

      {/* Header Profile */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 border-b border-white/10 pb-8">
        <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <div className="relative group shrink-0">
            <img src={request.avatar} alt="Profile" className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-white/10 shadow-2xl object-cover" />
          </div>
          <div className="min-w-0">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-2 truncate">{request.user_name}</h2>
            <div className="flex flex-col xl:flex-row xl:items-center gap-1 xl:gap-3 text-[10px] sm:text-xs font-mono text-gray-400 bg-white/5 px-2 py-1.5 rounded-lg border border-white/10 w-fit">
              <span className="text-blue-400">{request.request_id}</span>
              <span className="hidden xl:block w-1 h-1 bg-gray-600 rounded-full"></span>
              <span className="truncate">{request.email}</span>
            </div>
          </div>
        </div>
        
        {/* Full width button on small screens */}
        <button 
          onClick={runAgentAnalysis}
          disabled={isAnalyzing || analysisComplete}
          className="w-full sm:w-auto justify-center relative overflow-hidden group bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/50 px-6 py-3 rounded-xl text-xs font-mono disabled:opacity-50 transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        >
          {isAnalyzing ? (
            <span className="w-2.5 h-2.5 bg-white animate-ping rounded-full shrink-0"></span>
          ) : (
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
          <span className="tracking-widest">{isAnalyzing ? 'PROCESSING...' : 'RUN_AGENT_AUDIT'}</span>
        </button>
      </div>

      {/* Two Column Layout for Audit & Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 flex-1">
        
        {/* Left Column: Context & History Timeline */}
        <div className="flex flex-col gap-6">
          <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6">
            <h3 className="text-xs font-mono text-gray-500 mb-4 uppercase tracking-widest flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Generation Purpose
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed font-medium">
              {request.purpose || 'No contextual purpose provided by the system.'}
            </p>
          </div>

          <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6 flex-1">
             <h3 className="text-xs font-mono text-gray-500 mb-6 uppercase tracking-widest flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Audit Trail
            </h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              {request.history?.length > 0 ? (
                request.history.map((item, index) => (
                  <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-4 h-4 rounded-full border border-white/20 bg-[#030712] group-[.is-active]:bg-blue-500/20 group-[.is-active]:border-blue-500/50 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    </div>
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded border border-white/5 bg-white/[0.01]">
                      <div className="flex items-center justify-between mb-1">
                        <time className="text-[10px] font-mono text-blue-400/80">{item.time}</time>
                      </div>
                      <div className="text-xs text-gray-400">{item.event}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-gray-500 italic pl-8">No historical audit data found for this record.</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: AI Terminal & Risk */}
        <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6 flex flex-col shadow-2xl relative overflow-hidden mt-6 lg:mt-0">
          <div className="mb-8">
            <div className="flex justify-between text-[10px] sm:text-xs font-mono mb-3 uppercase tracking-widest">
              <span className="text-gray-400">Agent Confidence Score</span>
              <span className={`font-bold ${displayScore > 50 ? 'text-red-400' : 'text-emerald-400'}`}>
                {displayScore}%
              </span>
            </div>
            <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden border border-white/5 shadow-inner">
              <div 
                className={`h-full transition-all duration-150 relative ${displayScore > 50 ? 'bg-gradient-to-r from-red-600 to-red-400' : 'bg-gradient-to-r from-emerald-600 to-emerald-400'}`}
                style={{ width: `${displayScore}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col bg-[#050505] rounded-xl border border-white/10 overflow-hidden shadow-inner min-h-[200px] md:min-h-[250px]">
            <div className="bg-white/5 border-b border-white/10 px-4 py-2 flex items-center gap-2">
               <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20"></div>
               <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20"></div>
               <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20"></div>
               <span className="ml-2 text-[9px] sm:text-[10px] font-mono text-gray-500 tracking-widest truncate">nexus_engine.exe</span>
            </div>
            
            <div className="p-4 sm:p-5 font-mono text-[10px] sm:text-xs overflow-y-auto relative h-full">
              {agentLogs.length === 0 && !isAnalyzing ? (
                 <div className="text-gray-600 italic">{'// System idle. Click "RUN AGENT AUDIT" to begin.'}</div>
              ) : null}
              {agentLogs.map((log, index) => (
                <div key={index} className={`mb-2.5 opacity-90 leading-relaxed ${log.includes('CRITICAL') || log.includes('REJECT') ? 'text-red-400' : log.includes('CLEAR') || log.includes('APPROVE') ? 'text-emerald-400' : 'text-blue-200'}`}>
                  {log}
                </div>
              ))}
              {isAnalyzing && <div className="w-2 h-4 bg-blue-400 animate-pulse mt-2"></div>}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
            <button 
              onClick={() => onAction(request.request_id, 'approve')}
              className={`w-full sm:flex-1 transition-all duration-500 py-3 rounded-lg text-xs font-mono tracking-[0.2em] font-medium border ${
                analysisComplete && (request?.risk_score || 0) < 50
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:bg-emerald-500/30'
                  : 'bg-white/5 text-gray-500 border-white/10 hover:bg-white/10 hover:text-gray-300'
              }`}
            >
              APPROVE
            </button>
            <button 
              onClick={() => onAction(request.request_id, 'reject')}
              className={`w-full sm:flex-1 transition-all duration-500 py-3 rounded-lg text-xs font-mono tracking-[0.2em] font-medium border ${
                analysisComplete && (request?.risk_score || 0) >= 50
                  ? 'bg-red-500/20 text-red-300 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:bg-red-500/30'
                  : 'bg-white/5 text-gray-500 border-white/10 hover:bg-white/10 hover:text-gray-300'
              }`}
            >
              REJECT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}