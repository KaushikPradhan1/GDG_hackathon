// src/components/inbox/RequestCard.js
export default function RequestCard({ request, isActive, onClick }) {
  if (!request) return null;

  return (
    <div 
      onClick={onClick}
      className={`cursor-pointer p-4 mb-2 rounded-2xl transition-all duration-300 border ${
        isActive 
          ? 'bg-violet-500/10 border-violet-500/30 shadow-[0_4px_20px_rgba(139,92,246,0.05)]' 
          : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/[0.05]'
      }`}
    >
      <div className="flex items-start gap-3">
        <img 
          src={request.avatar} 
          alt={request.user_name} 
          className="w-10 h-10 rounded-full border border-white/10 shrink-0 object-cover"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <p className={`text-sm font-semibold truncate ${isActive ? 'text-white' : 'text-zinc-200'}`}>
              {request.user_name}
            </p>
            <p className="text-[10px] text-zinc-500 font-mono shrink-0">{request.timestamp}</p>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <p className="text-xs text-zinc-400 font-mono truncate">{request.request_id}</p>
          </div>

          <span className={`inline-block text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full border ${
            request.risk_score >= 50 
              ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
              : 'bg-white/5 text-zinc-300 border-white/10'
          }`}>
            {request.category.replace('_', ' ')}
          </span>
        </div>
      </div>
    </div>
  );
}