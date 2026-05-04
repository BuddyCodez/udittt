import { createFileRoute, Link } from "@tanstack/react-router";
import { InnerThought, useMonologue } from "../components/MonologueContext";
import { useState, useEffect } from "react";
import { Folder, User, FlaskConical, Terminal } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const SUB_TEXTS = [
  "> observing patterns",
  "> building quietly",
  "> optimizing relentlessly"
];

function HomeComponent() {
  const [subTextIndex, setSubTextIndex] = useState(0);
  const { isMonologueActive } = useMonologue();

  useEffect(() => {
    const interval = setInterval(() => {
      setSubTextIndex((prev) => (prev + 1) % SUB_TEXTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-[80vh] max-w-3xl gap-12 sm:gap-16 relative animate-in fade-in duration-700 mx-auto px-2 sm:px-0">
      {/* Grid background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_100%_50%_at_50%_40%,#000_70%,transparent_100%)]"></div>

      {/* 1. HERO SECTION */}
      <div className="space-y-6 pt-8 sm:pt-12">
        <div className="relative">
          <div className="absolute -left-4 sm:-left-6 top-3 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-primary"></div>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-foreground mb-3 sm:mb-4">
            Hello, I'm Udit.
          </h1>
          <p className="text-lg sm:text-2xl text-muted-foreground font-light leading-relaxed">
            I build systems. Then I refine them until they don't fail.
          </p>
        </div>

        <div className="pt-4 sm:pt-6 min-h-12 border-l border-border/50 pl-4 ml-0.5 sm:ml-1 flex items-center relative transition-all duration-300">
          {isMonologueActive ? (
            <div className="bg-card/30 border border-border/30 px-4 py-3 rounded-sm relative overflow-hidden w-full">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/70"></div>
              <p className="font-mono text-foreground/90 text-xs sm:text-sm tracking-wide">
                <span className="text-primary font-bold mr-2">{"//"}</span> 
                This system could fail under load. Needs better handling.
              </p>
            </div>
          ) : (
            <p className="font-mono text-muted-foreground text-xs sm:text-sm tracking-wide">
              <span className="text-primary mr-2">{'>'}</span>{SUB_TEXTS[subTextIndex]}<span className="animate-ping inline-block w-1.5 h-3 sm:h-4 bg-primary align-middle ml-1"></span>
            </p>
          )}
        </div>
      </div>

      {/* 2. FEATURED CASE (MINIMAL) */}
      <div className="border border-border/30 bg-card/5 rounded-sm p-5 sm:p-6 relative group overflow-hidden">
        <div className="absolute top-0 right-0 bg-background px-2 sm:px-3 py-1 text-[8px] sm:text-[10px] font-mono text-muted-foreground border-b border-l border-border/30">
          FEATURED: 0X1A_DATAPIPELINE
        </div>
        
        <h2 className="text-lg sm:text-xl font-medium text-foreground mb-3 flex items-center gap-2">
          <Folder className="text-primary w-4 h-4 sm:w-5 sm:h-5" /> BuddyCodez Infrastructure
        </h2>
        <div className="text-muted-foreground text-xs sm:text-sm font-mono leading-relaxed mb-6 space-y-2">
          <p><span className="text-foreground/70 uppercase tracking-widest text-[10px] sm:text-xs">Identified:</span> Data ingestion latency exceeding SLA thresholds under load.</p>
          <p><span className="text-foreground/70 uppercase tracking-widest text-[10px] sm:text-xs">Executed:</span> Replaced monolithic bottlenecks with Kafka + Flink stream processing.</p>
        </div>
        
        <Link to="/case-files" className="inline-flex items-center text-[10px] sm:text-xs font-mono text-primary hover:text-primary/80 uppercase tracking-widest border border-primary/20 bg-primary/5 px-3 sm:px-4 py-2 hover:bg-primary/10 transition-all group-hover:border-primary/50">
          {'>'} Open Full Case File
        </Link>
      </div>

      {/* 3. GATEWAYS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/case-files" className="group border border-border/30 bg-card/5 p-4 sm:p-5 hover:border-primary/50 hover:bg-card/10 transition-all flex flex-col gap-2 sm:gap-3 relative overflow-hidden">
          <Folder className="text-muted-foreground group-hover:text-primary transition-colors w-4 h-4 sm:w-5 sm:h-5" />
          <div>
            <h3 className="font-medium text-foreground text-sm sm:text-base">/ case-files</h3>
            <p className="text-[10px] sm:text-xs font-mono text-muted-foreground mt-1 leading-relaxed">Deep dives into architectural decisions and problem resolutions.</p>
          </div>
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500"></div>
        </Link>

        <Link to="/profile" className="group border border-border/30 bg-card/5 p-4 sm:p-5 hover:border-primary/50 hover:bg-card/10 transition-all flex flex-col gap-2 sm:gap-3 relative overflow-hidden">
          <User className="text-muted-foreground group-hover:text-primary transition-colors w-4 h-4 sm:w-5 sm:h-5" />
          <div>
            <h3 className="font-medium text-foreground text-sm sm:text-base">/ profile</h3>
            <p className="text-[10px] sm:text-xs font-mono text-muted-foreground mt-1 leading-relaxed">Operator mindset, core principles, and technical arsenal.</p>
          </div>
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500"></div>
        </Link>

        <Link to="/lab" className="group border border-border/30 bg-card/5 p-4 sm:p-5 hover:border-primary/50 hover:bg-card/10 transition-all flex flex-col gap-2 sm:gap-3 relative overflow-hidden">
          <FlaskConical className="text-muted-foreground group-hover:text-primary transition-colors w-4 h-4 sm:w-5 sm:h-5" />
          <div>
            <h3 className="font-medium text-foreground text-sm sm:text-base">/ lab</h3>
            <p className="text-[10px] sm:text-xs font-mono text-muted-foreground mt-1 leading-relaxed">Experimental builds, isolated testing environments, and API concepts.</p>
          </div>
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500"></div>
        </Link>
      </div>
    </div>
  );
}
