import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile | Udit Vegad - Technical Arsenal & Journey" },
      { name: "description", content: "Full Stack Developer specialized in interactive web systems, Next.js, Node.js, and architectural decision making." }
    ]
  }),
  component: ProfileComponent,
});

function ProfileComponent() {
  return (
    <div className="space-y-12 sm:space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto pb-24 px-4 sm:px-0">

      {/* HEADER OVERVIEW */}
      <div className="pb-8 flex flex-col sm:flex-row sm:items-end gap-6 relative">
        <img
          src="/udit-img.jpg"
          alt="Udit Vegad"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-sm border border-border/50 object-cover grayscale hover:grayscale-0 transition-all duration-500 shadow-xl"
        />
        <div className="flex-1">
          <div className="text-primary font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
            ID: UDIT VEGAD
            <span className="px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-sm text-[9px]">FULL STACK DEVELOPER</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-4">
            / profile
          </h1>
          <p className="text-muted-foreground font-mono text-xs sm:text-sm max-w-xl leading-relaxed mb-4">
            Open to freelance and part-time opportunities. Building interactive web systems that solve real-world problems.
          </p>

          {/* STATUS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
            <div className="border border-border/30 bg-card/50 p-3 flex flex-col gap-1 relative overflow-hidden group">
              <span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Location</span>
              <span className="text-xs sm:text-sm font-mono text-foreground uppercase tracking-widest">Gandhinagar</span>
            </div>
            <div className="border border-border/30 bg-card/50 p-3 flex flex-col gap-1 relative overflow-hidden group">
              <span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Timezone</span>
              <span className="text-xs sm:text-sm font-mono text-foreground uppercase tracking-widest">Asia/Kolkata</span>
            </div>
          </div>
        </div>
      </div>



      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
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
      {/* ORIGIN PROTOCOL (DEVELOPER JOURNEY) */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-border/30 pb-2">
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
            Origin Protocol
          </h2>
          <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">FILE_ID: OPS-2018</span>
        </div>

        <div className="text-sm leading-relaxed text-foreground/80 space-y-6 font-mono bg-card/5 border border-border/20 p-6 sm:p-8 rounded-sm relative">
          <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary/50 to-transparent"></div>

          <p>
            The mission began in 2018 when I first encountered the trinity of web development: HTML, CSS, and JavaScript. What started as curiosity in classroom experiments rapidly evolved into building interactive web experiences and engineering Discord bots. The digital battlefield called, and I answered.
          </p>
          <p>
            My tactical experience with games like Brawl Stars, Counter-Strike 1.6, and Clash of Clans became an unexpected training ground—teaching me about user experience design, system performance optimization, and the psychology of engagement.
          </p>
          <p>
            Today, that initial curiosity has transformed into professional expertise. I've evolved from classroom experiments to deploying production-grade full-stack applications, specializing in interactive web systems that solve real-world problems. Every line of code is a step forward in the mission.
          </p>

          <div className="border-l-2 border-primary/50 pl-4 py-3 mt-8 bg-background/50 border-y border-r border-border/20">
            <p className="text-primary/90 font-mono text-xs sm:text-sm tracking-wide">
              {">>"} "From classroom experiments to professional deployments—every line of code tells the story of the mission."
            </p>
          </div>
        </div>
      </div>


      {/* TECHNICAL ARSENAL */}
      <div className="space-y-6 pt-8 border-t border-border/30">
        <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest border-b border-border/30 pb-2">
          Technical Arsenal
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs sm:text-sm">
          {["Next.js", "Node.js", "TanStack", "Hono", "Prisma", "tRPC / oRPC", "Tailwind", "TypeScript"].map((tech) => (
            <div key={tech} className="p-4 border border-border/30 bg-card/5 text-center hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all cursor-default">
              {tech}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
