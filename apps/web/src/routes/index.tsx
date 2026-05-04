import { createFileRoute, Link } from "@tanstack/react-router";
import { InnerThought, useMonologue } from "../components/MonologueContext";
import { useState, useEffect } from "react";
import { Folder, User, FlaskConical, Terminal } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Udit Vegad | System Architect & Developer" },
      { name: "description", content: "I build systems. Then I refine them until they don't fail. Explore case files, labs, and telemetry logs." }
    ]
  }),
  component: HomeComponent,
});

const SUB_TEXTS = [
  "> observing patterns",
  "> building quietly",
  "> optimizing relentlessly"
];

const CASE_NOTES = [
  {
    title: "BUILDING PATTERN",
    content: [
      "I don't start with features. I start with failure points.",
      "Most things break under load, not in demos.",
      "So I isolate bottlenecks early, build around them, and keep refining until the system holds."
    ]
  },
  {
    title: "OBSERVATION",
    content: [
      "Systems always leave patterns. Latency spikes. Unstable edges. Things that look fine — until they don't.",
      "I spend more time observing than building.",
      "Because once you see the pattern, the solution is obvious."
    ]
  },
  {
    title: "WORK CULTURE",
    content: [
      "I don't rush builds.",
      "I ship, break things, rebuild them better.",
      "Most of my learning comes from systems that failed. That's where the real patterns are."
    ]
  }
];

function HomeComponent() {
  const [subTextIndex, setSubTextIndex] = useState(0);
  const [noteIndex, setNoteIndex] = useState(0);
  const { isMonologueActive } = useMonologue();

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    // Pick a random case note on mount
    setNoteIndex(Math.floor(Math.random() * CASE_NOTES.length));

    // Animate the hero text
    const textInterval = setInterval(() => {
      setSubTextIndex((prev) => (prev + 1) % SUB_TEXTS.length);
    }, 3000);

    return () => clearInterval(textInterval);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSending) return;

    setIsSending(true);
    try {
      const res = await fetch("/api/hono/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });
      if (res.ok) {
        setSent(true);
        setMessage("");
        setTimeout(() => setSent(false), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[80vh] max-w-7xl gap-12 sm:gap-16 relative animate-in fade-in duration-700 mx-auto px-2 sm:px-0">

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

      {/* 2. ROTATING CASE NOTES (MINDSET) */}
      <div className="border border-border/30 bg-card/5 rounded-sm p-5 sm:p-6 relative group overflow-hidden min-h-[220px] flex flex-col justify-between">
        <div className="absolute top-0 right-0 bg-background px-2 sm:px-3 py-1 text-[8px] sm:text-[10px] font-mono text-muted-foreground border-b border-l border-border/30 transition-all duration-500">
          CASE NOTE: {CASE_NOTES[noteIndex].title}
        </div>

        <div className="flex-1 mt-4">
          <div
            key={noteIndex}
            className="text-muted-foreground text-sm sm:text-base font-mono leading-relaxed space-y-4 animate-in fade-in slide-in-from-right-4 duration-500"
          >
            {CASE_NOTES[noteIndex].content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Link to="/case-files" className="inline-flex items-center text-[10px] sm:text-xs font-mono text-primary hover:text-primary/80 uppercase tracking-widest border border-primary/20 bg-primary/5 px-3 sm:px-4 py-2 hover:bg-primary/10 transition-all group-hover:border-primary/50">
            {'>'} Open Case Files
          </Link>
        </div>
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

      {/* 4. CONTACT WIDGET */}
      <div className="border border-border/30 bg-card/5 rounded-sm p-5 sm:p-6 relative group overflow-hidden mt-4">
        <div className="absolute top-0 right-0 bg-background px-2 sm:px-3 py-1 text-[8px] sm:text-[10px] font-mono text-muted-foreground border-b border-l border-border/30">
          SEC: COMMS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-medium text-foreground mb-4 font-mono">Transmission Link</h2>
            <p className="text-muted-foreground text-xs sm:text-sm font-mono leading-relaxed mb-6">
              Send a direct webhook transmission to my private server.
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full bg-background border border-border/50 rounded-sm p-3 font-mono text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary/50 resize-none h-24"
                disabled={isSending || sent}
              />
              <button
                type="submit"
                disabled={isSending || sent || !message.trim()}
                className="w-full text-[10px] sm:text-xs font-mono text-background bg-primary hover:bg-primary/90 px-4 py-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
              >
                {isSending ? "Transmitting..." : sent ? "Transmission Sent" : "Execute Ping"}
              </button>
            </form>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-border/30 pt-6 md:pt-0 md:pl-8 flex flex-col justify-center">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Linked Nodes</h3>
            <ul className="space-y-4 font-mono text-xs sm:text-sm">
              <li>
                <a href="https://github.com/BuddyCodez" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                  <span className="text-primary/50">{'>'}</span> GitHub [BuddyCodez]
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/uditvegad/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                  <span className="text-primary/50">{'>'}</span> Linkedin [Udit Vegad]
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/__udittt.56/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                  <span className="text-primary/50">{'>'}</span> Instagram [Udit Vegad]
                </a>
              </li>
              <li>
                <a href="mailto:vegadudit01@gmail.com" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                  <span className="text-primary/50">{'>'}</span> Encrypted Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
