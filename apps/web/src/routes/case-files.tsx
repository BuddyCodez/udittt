import { createFileRoute } from "@tanstack/react-router";
import { InnerThought } from "../components/MonologueContext";

export const Route = createFileRoute("/case-files")({
  component: CaseFilesComponent,
});

const CASES = [
  {
    id: "OPS-2024-01",
    name: "BuddyCodez Infrastructure",
    status: "RESOLVED",
    problem: "Outdated routing and inefficient data fetching causing high latency. Users experienced significant delay during critical interactions.",
    investigation: "Traced the payload lifecycle. Discovered monolithic endpoints were over-fetching by 400%. The client was blocking render until the entire payload was received. Unacceptable.",
    solution: "Dissected the monolithic architecture. Implemented TanStack Start for precise, edge-ready rendering. Moved heavy lifting to a streamlined Hono backend with oRPC for strict type safety.",
    outcome: "Zero-latency perceived load times. Payload size reduced by 75%. The system now operates smoothly under 10x the previous peak load."
  },
  {
    id: "OPS-2023-11",
    name: "Discord Bot Automation",
    status: "ARCHIVED",
    problem: "Manual moderation and utility processes were slowing down operations and increasing human error across multiple servers.",
    investigation: "Analyzed recurring moderation patterns. Found that 90% of infractions followed a predictable sequence that could be codified. Human intervention was the bottleneck.",
    solution: "Extracted core logic into automated, self-healing modules. Built a robust event-driven architecture using Discord.js, handling rate limits automatically and queuing events to prevent drops.",
    outcome: "A silent background worker that handles 10,000+ events daily. Human moderation reduced by 95%."
  }
];

function CaseFilesComponent() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
      <div className="border-b border-border/50 pb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          / case-files
        </h1>
        <InnerThought>
          A record of past extractions. Every problem requires a specific tool.
        </InnerThought>
      </div>

      <div className="space-y-16">
        {CASES.map((c) => (
          <div key={c.id} className="relative group">
            {/* The line connector */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border/40 group-hover:bg-primary/50 transition-colors"></div>
            
            <div className="pl-8 space-y-6">
              <div className="flex items-center justify-between border-b border-border/30 pb-2">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-primary text-xs tracking-widest bg-primary/10 px-2 py-1">
                    {c.id}
                  </span>
                  <h2 className="text-2xl font-medium text-foreground">
                    {c.name}
                  </h2>
                </div>
                <span className="font-mono text-[10px] uppercase text-muted-foreground tracking-widest">
                  STATUS: {c.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 gap-8 text-sm leading-relaxed">
                <div>
                  <h3 className="font-mono text-muted-foreground uppercase tracking-wider text-xs mb-2">1. Problem</h3>
                  <p className="text-foreground/80">{c.problem}</p>
                </div>
                
                <div className="pl-4 border-l-2 border-border/30">
                  <h3 className="font-mono text-muted-foreground uppercase tracking-wider text-xs mb-2">2. Investigation</h3>
                  <p className="text-foreground/80 italic">{c.investigation}</p>
                </div>
                
                <div>
                  <h3 className="font-mono text-muted-foreground uppercase tracking-wider text-xs mb-2">3. Solution Architecture</h3>
                  <p className="text-foreground/80">{c.solution}</p>
                </div>

                <div className="bg-card/10 border border-border/30 p-4">
                  <h3 className="font-mono text-primary uppercase tracking-wider text-xs mb-2">4. Outcome</h3>
                  <p className="text-foreground font-medium">{c.outcome}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
