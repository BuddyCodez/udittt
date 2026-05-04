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
    problem: "Modern city communities exist across disconnected apps (WhatsApp, Google Forms, Meetup), making them hard to discover, manage, and sustain. This fragmentation leads to exclusion, burnout for organisers, and loss of civic engagement.",
    investigation: "Community infrastructure is broken. A single admin controls access. Events and knowledge disappear with no persistent history. Needed a unified platform that acts as a hybrid of Discord, Meetup, and Civic Governance.",
    solution: "Built a civic-tech platform using Next.js 14, Convex (real-time serverless DB), BetterAuth, and ShadCN Maps. Designed majority-voting governance, intent-based join requests, and an interactive activity memory map.",
    outcome: "A Freemium digital foundation for local communities to be discoverable, democratic, and enduring. Real-time updates sync instantly under 500ms."
  },
  {
    id: "OPS-2024-KLAR",
    name: "Klarheit",
    status: "ARCHIVED",
    problem: "Real-time financial fraud detection systems require absolute type-safety, low latency, and cinematic UI to monitor high-speed transaction streaming without failing or lagging.",
    investigation: "Standard monolithic architectures create bottlenecks. High-speed data processing requires a robust streaming architecture capable of handling Kafka/RabbitMQ patterns seamlessly without compromising the client-side render.",
    solution: "Engineered a high-performance monorepo using the Better-T-Stack: Bun + ElysiaJS backend with oRPC for end-to-end type safety, integrated with Next.js, Prisma, and Socket.io for live monitoring.",
    outcome: "A 'Noir' fintech dashboard processing live transaction streaming with ultra-low latency. Absolute clarity in financial systems."
  },
  {
    id: "OPS-2023-SKILL",
    name: "SkillSwap",
    status: "RESOLVED",
    problem: "Lack of a peer-to-peer platform where users can reliably exchange skills with each other, limiting community-driven learning ecosystems and increasing the barrier to entry.",
    investigation: "Needed a stack capable of handling real-time interactions, secure authentication, and complex relational data mapping between the skills offered and those requested by the community.",
    solution: "Deployed a full-stack Next.js app leveraging tRPC for type-safe API boundaries, Pusher for real-time client communication, Prisma for robust database schemas, and BetterAuth for session management.",
    outcome: "Established a scalable, real-time peer-to-peer skill exchange ecosystem."
  },
  {
    id: "OPS-2023-CHAT",
    name: "Private Chat",
    status: "RESOLVED",
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
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border/40 group-hover:bg-primary/50 transition-colors"></div>
            
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
                <span className={`font-mono text-[9px] sm:text-[10px] uppercase px-2 py-0.5 rounded border tracking-widest self-start sm:self-auto ${
                  c.status === 'RESOLVED' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                  'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                }`}>
                  STATUS: {c.status}
                </span>
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
