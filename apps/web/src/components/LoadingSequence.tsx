import React, { useEffect, useState } from "react";

/** Removes the inline HTML splash rendered before React hydrates */
function hideSplash() {
  const el = document.getElementById("__splash");
  if (el) {
    el.classList.add("hide");
    setTimeout(() => el.remove(), 400);
  }
}

const BOOT_LINES = [
  "> initializing dark passenger...",
  "> scanning for anomalies...",
  "> code of conduct: verified",
  "> system clean. proceed.",
];

export const LoadingSequence: React.FC = () => {
  const [done, setDone] = useState(false);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    // Skip on repeat visits this session
    if (sessionStorage.getItem("booted") === "true") {
      hideSplash();
      setDone(true);
      return;
    }

    let i = 0;
    const iv = setInterval(() => {
      const currentLine = BOOT_LINES[i];
      if (currentLine) {
        setVisibleLines((p) => [...p, currentLine]);
      }
      i++;
      if (i >= BOOT_LINES.length) {
        clearInterval(iv);
        setTimeout(() => {
          sessionStorage.setItem("booted", "true");
          setDone(true);
          hideSplash();
        }, 500);
      }
    }, 280);

    return () => clearInterval(iv);
  }, []);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-[#0a0a0a]"
      style={{
        animation: done ? "splashOut 0.4s ease forwards" : undefined,
      }}
    >
      {/* Blood drip top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-[#8b0000] to-transparent opacity-80" />

      {/* Corner marks */}
      <span className="absolute top-4 left-5 font-mono text-[10px] text-[#8b0000]/60 tracking-widest uppercase">
        sys://dark-passenger
      </span>
      <span className="absolute top-4 right-5 font-mono text-[10px] text-[#8b0000]/40 tracking-widest">
        v1.0.0
      </span>

      {/* Terminal block */}
      <div className="flex flex-col gap-2 w-full max-w-sm px-8">
        <div className="mb-3 text-[#8b0000]/50 font-mono text-[11px] uppercase tracking-widest">
          [ initiating sequence ]
        </div>
        {visibleLines.map((line, idx) => (
          line ? (
            <div
              key={idx}
              className="font-mono text-sm text-white/80 leading-relaxed"
              style={{
                animation: "lineIn 0.25s ease both",
                animationDelay: `${idx * 0.05}s`,
              }}
            >
              <span className="text-[#8b0000] mr-2">&gt;</span>
              {line.replace("> ", "")}
            </div>
          ) : null
        ))}
        {/* blinking cursor */}
        {!done && (
          <span
            className="inline-block w-2 h-4 bg-[#8b0000] ml-0 mt-1"
            style={{ animation: "blink 0.9s step-end infinite" }}
          />
        )}
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-[#8b0000] to-transparent opacity-40" />

      <style>{`
        @keyframes lineIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes splashOut {
          to { opacity: 0; pointer-events: none; }
        }
      `}</style>
    </div>
  );
};
