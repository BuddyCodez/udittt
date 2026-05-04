import { Link } from "@tanstack/react-router";
import { useMonologue } from "./MonologueContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { isMonologueActive, toggleMonologue } = useMonologue();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const links = [
    { to: "/", label: "/ home" },
    { to: "/case-files", label: "/ case-files" },
    { to: "/profile", label: "/ profile" },
    { to: "/lab", label: "/ lab" },
    { to: "/logs", label: "/ logs" }
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b border-border/40">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-3 sm:py-4 gap-3 sm:gap-0">
        
        {/* Mobile Top Bar (Toggle + Menu Icon) */}
        <div className="w-full sm:w-auto flex justify-between items-center">
          <button 
            onClick={toggleMonologue}
            className={`text-[10px] sm:text-xs font-mono px-2 sm:px-3 py-1 sm:py-1.5 rounded transition-all duration-300 ${
              isMonologueActive 
                ? "bg-primary/10 text-primary border border-primary/30" 
                : "text-muted-foreground border border-transparent hover:text-foreground hover:border-border"
            }`}
          >
            [ thoughts: {isMonologueActive ? "ON" : "OFF"} ]
          </button>

          <button 
            className="sm:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex gap-6 text-sm font-mono tracking-wide text-muted-foreground">
          {links.map(({ to, label }) => {
            return (
              <Link 
                key={to} 
                to={to}
                className="hover:text-primary transition-colors [&.active]:text-foreground [&.active]:font-bold"
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Nav (Dropdown) */}
        {mobileMenuOpen && (
          <nav className="sm:hidden flex flex-col w-full gap-3 pt-3 pb-2 text-xs font-mono tracking-wide text-muted-foreground border-t border-border/30 mt-2">
            {links.map(({ to, label }) => {
              return (
                <Link 
                  key={to} 
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2 py-1.5 hover:bg-card/50 hover:text-primary transition-colors [&.active]:text-foreground [&.active]:font-bold rounded"
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        )}
        
      </div>
    </header>
  );
}
