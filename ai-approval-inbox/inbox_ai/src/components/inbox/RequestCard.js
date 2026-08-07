// src/components/inbox/RequestCard.js
export default function RequestCard({ request, isActive, onClick }) {
  if (!request) return null;

  return (
    <div 
      onClick={onClick}
      className={`cursor-pointer p-5 transition-all duration-300 group relative border-b border-white/5 ${
        isActive ? 'bg-blue-900/20' : 'hover:bg-white/[0.02]'
      }`}
    >
      {isActive && (
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-blue-600 shadow-[0_0_10px_rgba(96,165,250,0.6)]"></div>
      )}

      <div className="flex items-center gap-4 mb-2">
        <div className="relative">
          <img 
            src={request.avatar} 
            alt={request.user_name} 
            className={`w-10 h-10 rounded-full object-cover transition-all ${isActive ? 'ring-2 ring-blue-500/50 ring-offset-2 ring-offset-[#030712]' : 'opacity-80 group-hover:opacity-100'}`}
          />
          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-[2.5px] border-[#030712] ${
            request.status === 'flagged_suspicious' ? 'bg-red-500' : 'bg-emerald-500'
          }`}></div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <p className={`text-sm font-medium tracking-wide truncate ${isActive ? 'text-white' : 'text-gray-300'}`}>
              {request.user_name}
            </p>
            <p className="text-[10px] text-gray-500 font-mono tracking-wider">{request.timestamp}</p>
          </div>
          <p className={`text-xs truncate font-mono ${isActive ? 'text-blue-300/80' : 'text-gray-500'}`}>
            {request.request_id}
          </p>
        </div>
      </div>
      
      {/* Category Tag */}
      <div className="ml-14">
        <span className={`text-[9px] font-mono tracking-widest px-2 py-0.5 rounded border ${
          request.category === 'FRAUD_PREVENTION' 
            ? 'bg-red-500/10 text-red-400 border-red-500/20' 
            : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
        }`}>
          {request.category}
        </span>
      </div>
    </div>
  );
}