import { createContext, useContext, useState, type ReactNode } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CounterContextType {
  count: number;
  increment: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const CounterContext = createContext<CounterContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

interface CounterProviderProps {
  children: ReactNode;
}

export function CounterProvider({ children }: CounterProviderProps) {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <CounterContext.Provider value={{ count, increment }}>
      {children}
    </CounterContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCounter(): CounterContextType {
  const context = useContext(CounterContext);

  if (context === undefined) {
    throw new Error('useCounter must be used within a CounterProvider');
  }

  return context;
}
