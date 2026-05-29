# Yendou Counter — Take-Home Assignment

A React + TypeScript counter application with a global context, custom hook, Chakra UI toast notifications, spring animations, accessible focus states, and edge-case handling.

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Architecture

```
src/
├── context/
│   └── CounterContext.tsx   # CounterContext, CounterProvider, useCounter hook
├── components/
│   └── Counter.tsx          # Counter UI + animated toast
├── App.tsx
└── main.tsx                 # Providers: ChakraProvider → CounterProvider → App
```

## What was built

### CounterContext (`src/context/CounterContext.tsx`)

- `CounterContext` — typed React context holding `{ count, isAtMax, increment, reset }`.
- `CounterProvider` — wraps the app, owns the `count` state.
- `useCounter()` — custom hook that throws a descriptive error if used outside the provider.
- `MAX_COUNT = 9_999` — exported constant used by both context and UI.
- `reset()` — resets counter to 0 (exposed for the max-reached state).

### Counter component (`src/components/Counter.tsx`)

- Consumes `useCounter()` for state and actions.
- **Spring animation** on the +1 button via `framer-motion` `whileTap` — feels tactile, not flat.
- **Animated count number** — digits slide out up / slide in down on every increment using `AnimatePresence` with `popLayout`.
- **Toast slide-in** — the toast animates in from the right with a spring curve, not a linear fade.
- **Brand-matched focus ring** — `_focusVisible` uses `rgba(116, 200, 152, 0.45)` (the same green as the checkmark icon) instead of Chakra's default blue ring.
- **Edge cases handled**:
  - Counter is capped at `9,999` — the button becomes disabled and a warning toast is shown.
  - Numbers are formatted with `toLocaleString()` so `1000` displays as `1,000`.
  - A "Reset counter" button fades in when the cap is reached.

### Toast design

The gradient border is achieved by wrapping the inner content box with a 1 px gradient-background outer box — the most reliable cross-browser approach for gradient borders with `border-radius`. The toast itself is a `motion` component so it can animate independently of Chakra's portal.

## Tech Stack

| Tool | Version | Why |
|---|---|---|
| Vite | 5 | Fastest dev server / HMR for React |
| React | 18 | Concurrent features, automatic batching |
| TypeScript | 5 | Strict typing throughout |
| Chakra UI | 2 | Toast API, design-system primitives |
| Framer Motion | 11 | Spring physics for button, number, and toast animations |
