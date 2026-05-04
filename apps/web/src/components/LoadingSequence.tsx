import React, { useEffect, useState } from "react";

const BootSequence = [
  "> scanning environment...",
  "> analyzing components...",
  "> eliminating inefficiencies...",
  "> ready.",
];

export const LoadingSequence: React.FC = () => {
  const [booting, setBooting] = useState(true);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [hasBooted, setHasBooted] = useState(true); // Default true for SSR safety

  useEffect(() => {
    // Only run on client
    const booted = sessionStorage.getItem("booted");
    if (booted === "true") {
      setHasBooted(true);
      setBooting(false);
      return;
    }
    setHasBooted(false);

    let currentLine = 0;
    const interval = setInterval(() => {
      setVisibleLines((prev) => [...prev, BootSequence[currentLine]]);
      currentLine++;

      if (currentLine >= BootSequence.length) {
        clearInterval(interval);
        setTimeout(() => {
          setBooting(false);
          sessionStorage.setItem("booted", "true");
        }, 600); // short delay after "ready." before fading out
      }
    }, 300); // 300ms per line = 1.2s total + 600ms fade delay

    return () => clearInterval(interval);
  }, []);

  if (hasBooted || !booting) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white font-mono text-sm sm:text-base animate-out fade-out duration-500 fill-mode-forwards" style={{ animationDelay: "1.8s" }}>
      <div className="flex flex-col gap-2 max-w-md w-full px-6">
        <div className="mb-4 text-muted-foreground">[ system log ]</div>
        {visibleLines.map((line, idx) => (
          <div key={idx} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};
