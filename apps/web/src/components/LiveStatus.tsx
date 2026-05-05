import { useQuery } from "@tanstack/react-query";
import { Disc, Radio } from "lucide-react";
import React, { useState, useEffect } from "react";

function SmoothText({ text, className }: { text: string | undefined | null; className?: string }) {
  const safeText = text || "";
  const [currentText, setCurrentText] = useState(safeText);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (safeText !== currentText) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setCurrentText(safeText);
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [safeText, currentText]);

  return (
    <span
      className={`${className || ""} transition-opacity duration-300 ease-in-out ${isTransitioning ? "opacity-0" : "opacity-100"}`}
    >
      {currentText}
    </span>
  );
}

function FadeImage({ src, alt, className, style }: any) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <div className={`relative ${className}`} style={style}>
      <div className={`absolute inset-0 bg-muted/30 rounded transition-opacity duration-500 ${loaded ? 'opacity-0 pointer-events-none' : 'opacity-100 animate-pulse'}`} />
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover rounded transition-opacity duration-700 ease-in-out ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

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
        className={`flex flex-col gap-2 sm:gap-3 transition-all duration-300 origin-top-right ${isOpen ? 'opacity-100 scale-100 translate-y-0 h-auto' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none absolute top-full right-0'
          }`}
      >
        {/* Spotify Card */}
        <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-md p-2 sm:p-3 flex items-center gap-2 sm:gap-3 w-40 sm:w-64 shadow-lg transition-colors duration-500">
          {spotify?.isPlaying && spotify.albumArt ? (
            <FadeImage 
               src={spotify.albumArt} 
               alt="Album Art" 
               className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded animate-spin-slow" 
               style={{ animationDuration: '4s' }} 
            />
          ) : (
            <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded bg-muted flex items-center justify-center transition-colors duration-500">
              <Disc size={16} className="text-muted-foreground sm:w-5 sm:h-5" />
            </div>
          )}
          <div className="flex flex-col flex-1 overflow-hidden">
            <SmoothText 
               text={spotify?.isPlaying ? "Listening" : "Offline"}
               className="text-[8px] sm:text-[10px] text-primary uppercase font-bold tracking-wider mb-0.5"
            />
            <SmoothText 
               text={spotify?.isPlaying ? spotify.song : "No Track Active"}
               className="text-xs sm:text-sm font-medium truncate text-foreground"
            />
            <SmoothText 
               text={spotify?.isPlaying ? spotify.artist : "Awaiting input..."}
               className="text-[10px] sm:text-xs text-muted-foreground truncate"
            />
          </div>
        </div>

        {/* System Node (Discord) */}
        <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-md p-3 w-40 sm:w-64 shadow-lg flex flex-col gap-2 relative overflow-hidden group">
          <div className={`absolute top-0 right-0 w-24 h-24 opacity-[0.15] blur-2xl rounded-full -translate-y-1/2 translate-x-1/3 transition-colors duration-1000 ${presence?.status === 'online' ? 'bg-green-500' : presence?.status === 'dnd' ? 'bg-red-500' : presence?.status === 'idle' ? 'bg-yellow-500' : 'bg-gray-500'}`}></div>

          <div className="flex items-center justify-between relative z-10">
            <span className="text-[8px] sm:text-[10px] text-primary uppercase font-bold tracking-widest">
            Discord Node
            </span>
            <div className="flex items-center gap-1.5 bg-background/50 backdrop-blur-md px-1.5 py-0.5 rounded border border-border/50">
              <span className="text-[8px] uppercase tracking-widest text-muted-foreground font-mono">{presence?.status || "offline"}</span>
              <div className={`w-1.5 h-1.5 rounded-full ${presence?.status === 'online' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse' : presence?.status === 'dnd' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : presence?.status === 'idle' ? 'bg-yellow-500' : 'bg-muted-foreground/50'}`} />
            </div>
          </div>

          <div className="flex flex-col relative z-10 mt-1">
            <span className="text-xs sm:text-sm font-medium truncate text-foreground font-mono">
              {presence?.activity?.name || "Standing By.."}
            </span>
            {
              presence?.activity?.state && (
                <>
                  <span className="text-[9px] sm:text-[10px] text-muted-foreground truncate font-mono mt-0.5 opacity-80">
                    {presence?.activity?.details || (presence?.status === 'online' ? 'Network connection stable' : 'Awaiting transmission')}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-muted-foreground truncate font-mono mt-0.5 opacity-80">
                    {presence?.activity?.state || (presence?.status === 'online' ? 'Network connection stable' : 'Awaiting transmission')}
                  </span>
                </>
              )
            }
          </div>
        </div>
      </div>

    </div>
  );
};
