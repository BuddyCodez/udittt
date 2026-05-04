import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "Lab | System Experiments & Sandboxes" },
      { name: "description", content: "Experimental builds, isolated testing environments, and unverified API concepts. The proving grounds." }
    ]
  }),
  component: LabComponent,
});

const LABS = [
  {
    name: "realtime-chat-v2",
    what: "Testing optimistic updates with TRPC subscriptions.",
    why: "Wanted to reduce the perceived latency on the client side.",
    result: "Still figuring out consistency vs speed tradeoff.",
    status: "unstable"
  },
  {
    name: "cache-layer-test",
    what: "Trying edge caching with Hono.",
    why: "Reduce database reads on heavily accessed public profiles.",
    result: "Faster reads but stale data issues. Needs better invalidation.",
    status: "testing"
  },
  {
    name: "discord-analytics",
    what: "Track user activity patterns to predict load.",
    why: "Scale resources preemptively.",
    result: "Problem: API limitations + noisy data. Dropped for now.",
    status: "dropped"
  },
  {
    name: "latency-checker",
    what: "Simple tool to monitor API response times.",
    why: "Built for debugging other systems.",
    result: "Deployed internally.",
    status: "stable"
  },
  {
    name: "music-bot-lavalink-v4",
    what: "Refactoring Lavalink Music Architecture.",
    why: "Resolve persistent playback instability and WebSocket disconnection loops.",
    result: "Migrated to local Lavalink. Strict singleton pattern works.",
    status: "stable"
  }
];

function LabComponent() {
  const [filter, setFilter] = useState("all");

  const filteredLabs = filter === "all" 
    ? LABS 
    : filter === "active" 
      ? LABS.filter(l => l.status === "testing" || l.status === "unstable")
      : LABS.filter(l => l.status === filter);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto pb-24 px-4 sm:px-0">
      <div className="border-b border-border/50 pb-6">
        <div className="flex items-center gap-3 mb-2">
           <h1 className="text-3xl font-semibold tracking-tight text-foreground">
             / lab
           </h1>
           <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 mt-1">sandbox</span>
        </div>
        <p className="text-muted-foreground font-mono text-xs sm:text-sm">
           Structured, intentional experiments. The proving grounds.
        </p>
      </div>

      <div className="flex gap-2 font-mono text-xs overflow-x-auto pb-2 scrollbar-none w-full max-w-full">
        {["all", "active", "dropped", "stable"].map(f => {
          const isSelected = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-sm border transition-colors whitespace-nowrap uppercase ${
                isSelected 
                  ? "bg-primary/20 border-primary/50 text-primary" 
                  : "bg-card/5 border-border/30 text-muted-foreground hover:bg-card/20"
              }`}
            >
              {f}
            </button>
          )
        })}
      </div>

      <div className="space-y-6 font-mono text-sm">
        {filteredLabs.map((lab, i) => (
          <div key={i} className="border border-border/30 bg-card/5 p-5 relative group hover:border-primary/30 transition-colors rounded-sm overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-border/50 group-hover:bg-primary/50 transition-colors"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pl-2 gap-3 sm:gap-0">
              <h3 className="text-primary font-bold text-sm break-all">/ {lab.name}</h3>
              <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded border tracking-widest self-start sm:self-auto ${
                lab.status === 'stable' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                lab.status === 'dropped' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                lab.status === 'unstable' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                'bg-blue-500/10 text-blue-400 border-blue-500/20'
              }`}>
                {lab.status}
              </span>
            </div>
            
            <div className="space-y-3 text-xs sm:text-sm text-foreground/80 pl-2">
              <div className="grid grid-cols-[60px_1fr] gap-2">
                <span className="text-muted-foreground">What:</span>
                <span>{lab.what}</span>
              </div>
              <div className="grid grid-cols-[60px_1fr] gap-2">
                <span className="text-muted-foreground">Why:</span>
                <span>{lab.why}</span>
              </div>
              <div className="grid grid-cols-[60px_1fr] gap-2">
                <span className="text-muted-foreground">Result:</span>
                <span>{lab.result}</span>
              </div>
            </div>
          </div>
        ))}
        {filteredLabs.length === 0 && (
          <div className="text-center py-12 text-muted-foreground border border-dashed border-border/50 rounded-sm">
            [ NO_RECORDS_FOUND ]
          </div>
        )}
      </div>
    </div>
  );
}
