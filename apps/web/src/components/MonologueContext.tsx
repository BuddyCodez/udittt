import React, { createContext, useContext, useState } from "react";

interface MonologueContextType {
  isMonologueActive: boolean;
  toggleMonologue: () => void;
}

const MonologueContext = createContext<MonologueContextType | undefined>(undefined);

export const MonologueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMonologueActive, setIsMonologueActive] = useState(false);

  const toggleMonologue = () => {
    setIsMonologueActive((prev) => !prev);
  };

  return (
    <MonologueContext.Provider value={{ isMonologueActive, toggleMonologue }}>
      {children}
    </MonologueContext.Provider>
  );
};

export const useMonologue = () => {
  const context = useContext(MonologueContext);
  if (!context) {
    throw new Error("useMonologue must be used within a MonologueProvider");
  }
  return context;
};

// Component to wrap internal thoughts
export const InnerThought: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  const { isMonologueActive } = useMonologue();

  if (!isMonologueActive) return null;

  return (
    <div className={`text-muted-foreground text-sm font-mono italic mt-2 animate-in fade-in duration-500 ${className}`}>
      // {children}
    </div>
  );
};
