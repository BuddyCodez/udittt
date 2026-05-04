import { useQuery } from "@tanstack/react-query";
import { Activity, Disc, Radio } from "lucide-react";
import React, { useState, useEffect } from "react";

export const LiveStatus: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 640) {
      setIsOpen(true);
    }
  }, []);

  const { data: spotify } = useQuery({
    queryKey: ["spotify"],
    queryFn: async () => {
      const res = await fetch("/api/hono/spotify");
      return res.json();
    },
    refetchInterval: 10000, // Every 10s
  });

  const { data: presence } = useQuery({
    queryKey: ["presence"],
    queryFn: async () => {
      const res = await fetch("/api/hono/presence");
      return res.json();
    },
    refetchInterval: 15000,
  });

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col items-end z-40 ">
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-[10px] sm:text-xs font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-colors bg-background/50 backdrop-blur-md px-3 py-1.5 border border-border/30 rounded-sm hover:bg-card/50 mb-2 sm:mb-3 relative z-10"
      >
        <Radio size={12} className={isOpen ? "animate-pulse text-primary" : "text-muted-foreground"} />
        <span>[ Live Status ]</span>
      </button>

      {/* Dropdown Content */}
      <div 
        className={`flex flex-col gap-2 sm:gap-3 transition-all duration-300 origin-top-right ${
          isOpen ? 'opacity-100 scale-100 translate-y-0 h-auto' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none absolute top-full right-0'
        }`}
      >
        {/* Spotify Card */}
        <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-md p-2 sm:p-3 flex items-center gap-2 sm:gap-3 w-40 sm:w-64 shadow-lg">
          {spotify?.isPlaying && spotify.albumArt ? (
            <img src={spotify.albumArt} alt="Album Art" className="w-8 h-8 sm:w-10 sm:h-10 rounded animate-spin-slow" style={{ animationDuration: '4s' }} />
          ) : (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-muted flex items-center justify-center">
              <Disc size={16} className="text-muted-foreground sm:w-5 sm:h-5" />
            </div>
          )}
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-[8px] sm:text-[10px] text-primary uppercase font-bold tracking-wider mb-0.5">
              {spotify?.isPlaying ? "Listening" : "Offline"}
            </span>
            <span className="text-xs sm:text-sm font-medium truncate text-foreground">
              {spotify?.isPlaying ? spotify.song : "No Track Active"}
            </span>
            <span className="text-[10px] sm:text-xs text-muted-foreground truncate">
              {spotify?.isPlaying ? spotify.artist : "Awaiting input..."}
            </span>
          </div>
        </div>

        {/* System Node (Discord) */}
        <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-md p-3 w-40 sm:w-64 shadow-lg flex flex-col gap-2 relative overflow-hidden group">
          <div className={`absolute top-0 right-0 w-24 h-24 opacity-[0.15] blur-2xl rounded-full -translate-y-1/2 translate-x-1/3 transition-colors duration-1000 ${presence?.status === 'online' ? 'bg-green-500' : presence?.status === 'dnd' ? 'bg-red-500' : presence?.status === 'idle' ? 'bg-yellow-500' : 'bg-gray-500'}`}></div>
          
          <div className="flex items-center justify-between relative z-10">
            <span className="text-[8px] sm:text-[10px] text-primary uppercase font-bold tracking-widest">
              USER NODE
            </span>
            <div className="flex items-center gap-1.5 bg-background/50 backdrop-blur-md px-1.5 py-0.5 rounded border border-border/50">
              <span className="text-[8px] uppercase tracking-widest text-muted-foreground font-mono">{presence?.status || "offline"}</span>
              <div className={`w-1.5 h-1.5 rounded-full ${presence?.status === 'online' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse' : presence?.status === 'dnd' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : presence?.status === 'idle' ? 'bg-yellow-500' : 'bg-muted-foreground/50'}`} />
            </div>
          </div>

          <div className="flex flex-col relative z-10 mt-1">
            <span className="text-xs sm:text-sm font-medium truncate text-foreground font-mono">
              {presence?.activity?.name || "Standing By"}
            </span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground truncate font-mono mt-0.5 opacity-80">
              {presence?.activity?.details || (presence?.status === 'online' ? 'Network connection stable' : 'Awaiting transmission')}
            </span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground truncate font-mono mt-0.5 opacity-80">
              {presence?.activity?.state || (presence?.status === 'online' ? 'Network connection stable' : 'Awaiting transmission')}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
