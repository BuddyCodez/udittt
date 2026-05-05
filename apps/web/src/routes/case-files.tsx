import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/case-files")({
  head: () => ({
    meta: [
      { title: "Case Files | Extracted Problem-Solving Records" },
      { name: "description", content: "Deep dives into architectural decisions, infrastructure overhauls, and specific problem resolutions by Udit Vegad." }
    ]
  }),
  component: CaseFilesComponent,
});

const CASES = [
  {
    id: "OPS-2024-CITY",
    name: "CityHub",
    status: "RESOLVED",
    github: "https://github.com/BuddyCodez/City-Hub",
    problem: "Modern city communities exist across disconnected apps (WhatsApp, Google Forms, Meetup), making them hard to discover, manage, and sustain. This fragmentation leads to exclusion, burnout for organisers, and loss of civic engagement.",
    investigation: "Community infrastructure is broken. A single admin controls access. Events and knowledge disappear with no persistent history. Needed a unified platform that acts as a hybrid of Discord, Meetup, and Civic Governance.",
    solution: "Built a civic-tech platform using Next.js 14, Convex (real-time serverless DB), BetterAuth, and ShadCN Maps. Designed majority-voting governance, intent-based join requests, and an interactive activity memory map.",
    outcome: "A Freemium digital foundation for local communities to be discoverable, democratic, and enduring. Real-time updates sync instantly under 500ms."
  },
  {
    id: "OPS-2024-KLAR",
    name: "Klarheit",
    status: "ARCHIVED",
    github: "https://github.com/BuddyCodez/klarheit",
    problem: "Real-time financial fraud detection systems require absolute type-safety, low latency, and cinematic UI to monitor high-speed transaction streaming without failing or lagging.",
    investigation: "Standard monolithic architectures create bottlenecks. High-speed data processing requires a robust streaming architecture capable of handling Kafka/RabbitMQ patterns seamlessly without compromising the client-side render.",
    solution: "Engineered a high-performance monorepo using the Better-T-Stack: Bun + ElysiaJS backend with oRPC for end-to-end type safety, integrated with Next.js, Prisma, and Socket.io for live monitoring.",
    outcome: "A 'Noir' fintech dashboard processing live transaction streaming with ultra-low latency. Absolute clarity in financial systems."
  },
  {
    id: "OPS-2023-SKILL",
    name: "SkillSwap",
    status: "RESOLVED",
    github: "https://github.com/BuddyCodez/SkillSwap",
    problem: "Lack of a peer-to-peer platform where users can reliably exchange skills with each other, limiting community-driven learning ecosystems and increasing the barrier to entry.",
    investigation: "Needed a stack capable of handling real-time interactions, secure authentication, and complex relational data mapping between the skills offered and those requested by the community.",
    solution: "Deployed a full-stack Next.js app leveraging tRPC for type-safe API boundaries, Pusher for real-time client communication, Prisma for robust database schemas, and BetterAuth for session management.",
    outcome: "Established a scalable, real-time peer-to-peer skill exchange ecosystem."
  },
  {
    id: "OPS-2023-CHAT",
    name: "Private Chat",
    status: "RESOLVED",
    github: "https://github.com/BuddyCodez/private-chat",
    problem: "Need for a secure, ephemeral real-time chat application with room destruction and time-to-live (TTL) countdowns to ensure extreme privacy.",
    investigation: "Investigated methods to handle real-time messaging with automatic room expiration. Needed immediate cleanup to guarantee message volatility without leaving database ghost records.",
    solution: "Implemented real-time room creation, message handling, and automated room destruction logic with precise TTL countdown mechanisms.",
    outcome: "A secure, real-time ephemeral communication environment where data simply ceases to exist post-countdown."
  }
];

function CaseFilesComponent() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto pb-24 px-4 sm:px-0">
      <div className="border-b border-border/50 pb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          / case-files
        </h1>
        <p className="text-muted-foreground font-mono text-xs sm:text-sm mt-2">
          A record of past extractions. Every problem requires a specific tool.
        </p>
      </div>

      <div className="space-y-16">
        {CASES.map((c) => (
          <div key={c.id} className="relative group">
            {/* The line connector */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border/40 group-hover:bg-primary/50 transition-colors" />

            <div className="pl-6 sm:pl-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/30 pb-3 gap-3 sm:gap-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span className="font-mono text-primary text-[10px] sm:text-xs tracking-widest bg-primary/10 px-2 py-1 self-start sm:self-auto">
                    {c.id}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-medium text-foreground">
                    {c.name}
                  </h2>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <span className={`font-mono text-[9px] sm:text-[10px] uppercase px-2 py-0.5 rounded border tracking-widest ${
                    c.status === 'RESOLVED' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                    'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                  }`}>
                    STATUS: {c.status}
                  </span>

                  <a
                    href={c.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${c.name} source on GitHub`}
                    className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground border border-border/40 bg-card/5 px-2 py-0.5 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                    Source
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 text-sm leading-relaxed">
                <div>
                  <h3 className="font-mono text-muted-foreground uppercase tracking-wider text-xs mb-2">1. Problem</h3>
                  <p className="text-foreground/80">{c.problem}</p>
                </div>

                <div className="pl-4 border-l-2 border-border/30 group-hover:border-primary/30 transition-colors">
                  <h3 className="font-mono text-muted-foreground uppercase tracking-wider text-xs mb-2">2. Investigation</h3>
                  <p className="text-foreground/80 italic">{c.investigation}</p>
                </div>

                <div>
                  <h3 className="font-mono text-muted-foreground uppercase tracking-wider text-xs mb-2">3. Solution Architecture</h3>
                  <p className="text-foreground/80">{c.solution}</p>
                </div>

                <div className="bg-card/5 border border-border/30 p-4 group-hover:border-primary/20 transition-colors">
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
