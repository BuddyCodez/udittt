import { createFileRoute } from "@tanstack/react-router";
import { InnerThought } from "../components/MonologueContext";

export const Route = createFileRoute("/lab")({
  component: LabComponent,
});

function LabComponent() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="border-b border-border/50 pb-4">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          / lab
        </h1>
        <InnerThought>
          The proving grounds. Where theories are tested and limits are pushed.
        </InnerThought>
      </div>

      <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border/50 rounded-sm bg-card/5">
        <div className="text-primary font-mono mb-4 animate-pulse">
          [ WAITING_FOR_INPUT ]
        </div>
        <p className="text-muted-foreground text-sm max-w-md">
          This sector is reserved for experimental builds, Discord bots, and unverified API concepts. Current status: Isolated environment prepared.
        </p>
        <InnerThought className="mt-6">
          I need to clean up the workspace before deploying the next experiment. Focus.
        </InnerThought>
      </div>
    </div>
  );
}
