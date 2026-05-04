import { createFileRoute } from "@tanstack/react-router";
import { InnerThought } from "../components/MonologueContext";

export const Route = createFileRoute("/profile")({
  component: ProfileComponent,
});

function ProfileComponent() {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-3xl mx-auto">
      <div className="border-b border-border/50 pb-8 flex flex-col sm:flex-row sm:items-end gap-6 relative">
        <img 
          src="https://github.com/BuddyCodez.png" 
          alt="Udit Vegad" 
          className="w-24 h-24 rounded-sm border border-border/50 object-cover grayscale hover:grayscale-0 transition-all duration-500 shadow-xl"
        />
        <div className="flex-1">
          <div className="text-primary font-mono text-xs uppercase tracking-widest mb-2">ID: UDIT.VEGAD</div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            / profile
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest border-b border-border/30 pb-2">
            Mindset & Approach
          </h2>
          <div className="text-sm leading-relaxed text-foreground/80 space-y-4">
            <p>
              I dissect problems before writing a single line of code. Code is a liability; architecture is an asset.
            </p>
            <p>
              My process is methodical. When a system breaks, I don't look for quick patches. I isolate the bottleneck, analyze the data flow, and rebuild the compromised sector to handle 10x the original load.
            </p>
            <InnerThought>
              A patch is just a delayed failure. Do it right the first time.
            </InnerThought>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest border-b border-border/30 pb-2">
            Core Principles
          </h2>
          <ul className="space-y-4 font-mono text-sm text-foreground/80">
            <li className="flex flex-col">
              <span className="text-foreground font-medium mb-1"><span className="text-primary mr-2">1.</span>Build {'>'} Talk</span>
              <span className="text-muted-foreground text-xs">Action provides the only true telemetry.</span>
            </li>
            <li className="flex flex-col">
              <span className="text-foreground font-medium mb-1"><span className="text-primary mr-2">2.</span>Systems {'>'} Hacks</span>
              <span className="text-muted-foreground text-xs">A clever hack breaks tomorrow. A solid system scales indefinitely.</span>
            </li>
            <li className="flex flex-col">
              <span className="text-foreground font-medium mb-1"><span className="text-primary mr-2">3.</span>Reliability {'>'} Speed</span>
              <span className="text-muted-foreground text-xs">It doesn't matter how fast you ship if it fails in production.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-6 pt-8 border-t border-border/30">
        <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest border-b border-border/30 pb-2">
          Technical Arsenal
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-sm">
          <div className="p-4 border border-border/30 bg-card/10 text-center hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all cursor-default">Next.js</div>
          <div className="p-4 border border-border/30 bg-card/10 text-center hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all cursor-default">Node.js</div>
          <div className="p-4 border border-border/30 bg-card/10 text-center hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all cursor-default">TanStack</div>
          <div className="p-4 border border-border/30 bg-card/10 text-center hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all cursor-default">Hono</div>
          <div className="p-4 border border-border/30 bg-card/10 text-center hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all cursor-default">Prisma</div>
          <div className="p-4 border border-border/30 bg-card/10 text-center hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all cursor-default">tRPC / oRPC</div>
          <div className="p-4 border border-border/30 bg-card/10 text-center hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all cursor-default">Tailwind</div>
          <div className="p-4 border border-border/30 bg-card/10 text-center hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all cursor-default">TypeScript</div>
        </div>
      </div>
    </div>
  );
}
