import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────

export const MAX_COUNT = 9_999;

// ─── Types ────────────────────────────────────────────────────────────────────

interface CounterContextType {
  count: number;
  isAtMax: boolean;
  increment: () => void;
  reset: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const CounterContext = createContext<CounterContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

interface CounterProviderProps {
  children: ReactNode;
}

export function CounterProvider({ children }: CounterProviderProps) {
  const [count, setCount] = useState<number>(0);

  const increment = useCallback(() => {
    setCount((prev) => (prev < MAX_COUNT ? prev + 1 : prev));
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  return (
    <CounterContext.Provider value={{ count, isAtMax: count >= MAX_COUNT, increment, reset }}>
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
