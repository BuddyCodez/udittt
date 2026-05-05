import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/logs")({
  head: () => ({
    meta: [
      { title: "Logs | Raw Telemetry" },
      { name: "description", content: "Raw thoughts and unfiltered telemetry of the development process. Failures, observations, and wins." }
    ]
  }),
  component: LogsComponent,
});

const LOGS = [
  {
    date: "2026-05-04",
    text: "System looked fine. Then broke under load. Need better handling.",
    status: "FAILURE"
  },
  {
    date: "2026-05-02",
    text: "Latency spikes aren't random. There's always a pattern. Just not obvious at first.",
    status: "OBSERVATION"
  },
  {
    date: "2026-04-30",
    text: "Tried fixing performance. Made it worse. Rolling back.",
    status: "FAILURE"
  },
  {
    date: "2026-04-28",
    text: "Finally stable under load. For now.",
    status: "WIN"
  },
  {
    date: "2026-04-25",
    text: "Real-time systems are less about speed, more about consistency.",
    status: "OBSERVATION"
  },
  {
    date: "2024-03-12",
    text: "Rebuilding the edge cache layer. Redis isn't a silver bullet when your invalidation logic is flawed.",
    status: "OBSERVATION"
  },
  {
    date: "2023-11-05",
    text: "Migrating from polling to WebSockets completely changed the telemetry flow.",
    status: "OBSERVATION"
  },
  {
    date: "2022-08-22",
    text: "Database read performance dropped. Tried indexing blindly. Locked rows. Don't touch prod DBs at 2AM.",
    status: "FAILURE"
  },
  {
    date: "2021-12-14",
    text: "Discord bot architecture throwing 429s everywhere. Rate limiting isn't a suggestion, it's a law.",
    status: "FAILURE"
  },
  {
    date: "2021-06-03",
    text: "First production deployment. The connection dropped twice, but it self-healed. We're live.",
    status: "WIN"
  }
];

function LogsComponent() {
  const [filter, setFilter] = useState("ALL");

  const filteredLogs = filter === "ALL" ? LOGS : LOGS.filter(l => l.status === filter);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto pb-24 px-4 sm:px-0">
      <div className="border-b border-border/50 pb-6">
        <div className="flex items-center gap-3 mb-2">
           <h1 className="text-3xl font-semibold tracking-tight text-foreground">
             / logs
           </h1>
           <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 mt-1">Raw telemetry</span>
        </div>
        <p className="text-muted-foreground font-mono text-xs sm:text-sm">
           Unfiltered thoughts and system observations.
        </p>
      </div>

      <div className="flex gap-2 font-mono text-xs overflow-x-auto pb-2 scrollbar-none w-full max-w-full">
        {["ALL", "FAILURE", "OBSERVATION", "WIN"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-sm border transition-colors whitespace-nowrap ${
              filter === f 
                ? "bg-primary/20 border-primary/50 text-primary" 
                : "bg-card/5 border-border/30 text-muted-foreground hover:bg-card/20"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-8 font-mono text-sm">
        {filteredLogs.map((log, i) => (
          <div key={i} className="border-l-2 border-border/40 pl-4 py-1 relative group hover:border-primary/50 transition-colors">
            <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-border group-hover:bg-primary/50 transition-colors shadow-[0_0_8px_rgba(0,0,0,0)] group-hover:shadow-[0_0_8px_rgba(34,211,238,0.4)]"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
              <span className="text-[10px] text-muted-foreground self-start sm:self-auto">[{log.date}]</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded border self-start sm:self-auto ${
                log.status === 'WIN' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                log.status === 'FAILURE' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                'bg-primary/10 text-primary border-primary/20'
              }`}>
                {log.status}
              </span>
            </div>
            
            <div className="text-foreground/90 leading-relaxed max-w-xl">
              {log.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
