import { useQuery } from "@tanstack/react-query";
import { Activity, Disc, Radio } from "lucide-react";
import React from "react";

export const LiveStatus: React.FC = () => {
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
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col gap-2 sm:gap-3 z-40">
      <div className="text-[10px] sm:text-xs font-mono text-muted-foreground uppercase tracking-widest mb-0.5 sm:mb-1 flex items-center gap-2 justify-end sm:justify-start">
        <Radio size={12} className="animate-pulse text-primary" />
        <span className="hidden sm:inline">[ Live Status ]</span>
      </div>

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

      {/* Discord Presence */}
      <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-md p-2 sm:p-3 flex items-center gap-2 sm:gap-3 w-40 sm:w-64 shadow-lg">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-muted flex items-center justify-center relative">
          <Activity size={16} className="text-muted-foreground sm:w-5 sm:h-5" />
          <div className={`absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border-2 border-background ${presence?.status === 'online' ? 'bg-green-500' : presence?.status === 'dnd' ? 'bg-red-500' : 'bg-gray-500'}`} />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <span className="text-[8px] sm:text-[10px] text-primary uppercase font-bold tracking-wider mb-0.5">
            Presence
          </span>
          <span className="text-xs sm:text-sm font-medium truncate text-foreground">
            {presence?.activity?.name || "System Idle"}
          </span>
          <span className="text-[10px] sm:text-xs text-muted-foreground truncate capitalize">
            {presence?.status || "Unknown"}
          </span>
        </div>
      </div>
    </div>
  );
};
