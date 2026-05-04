import { createFileRoute } from "@tanstack/react-router";
import { InnerThought } from "../components/MonologueContext";

export const Route = createFileRoute("/logs")({
  component: LogsComponent,
});

const LOGS = [
  {
    date: "2026-05-04",
    entry: "Restructured the entire UI hierarchy. Separated the presentation layer from the deep-dive analysis. The system breathes better now.",
    thought: "Information overload is a common failing point. Restraint is key."
  },
  {
    date: "2026-05-02",
    entry: "Optimized websocket handling for the Discord integration. Reduced reconnection loops by implementing an exponential backoff.",
    thought: "Still not satisfied. The latency spikes occasionally when the gateway drops."
  },
  {
    date: "2026-04-28",
    entry: "Tried new caching layer using Redis for the API responses. Failed due to memory constraints on the current cluster.",
    thought: "Over-engineered. Rolling back to memory cache until usage demands otherwise."
  }
];

function LogsComponent() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-2xl mx-auto">
      <div className="border-b border-border/50 pb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          / logs
        </h1>
        <InnerThought>
          Raw thoughts. Unfiltered telemetry of the development process.
        </InnerThought>
      </div>

      <div className="space-y-8 font-mono text-sm">
        {LOGS.map((log, i) => (
          <div key={i} className="border-l border-primary/30 pl-4 py-1 space-y-2">
            <div className="text-primary text-xs tracking-widest">
              [ {log.date} ]
            </div>
            <div className="text-foreground/80 leading-relaxed">
              {log.entry}
            </div>
            <InnerThought>
              {log.thought}
            </InnerThought>
          </div>
        ))}
      </div>
    </div>
  );
}
