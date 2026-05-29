# Yendou Counter — Take-Home Assignment

A React + TypeScript counter application with a global context, custom hook, and Chakra UI toast notifications.

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
│   └── Counter.tsx          # Counter UI + custom-styled toast
├── App.tsx
└── main.tsx                 # Providers: ChakraProvider → CounterProvider → App
```

### CounterContext (`src/context/CounterContext.tsx`)

- `CounterContext` — typed React context holding `{ count, increment }`.
- `CounterProvider` — wraps the app, owns the `count` state.
- `useCounter()` — custom hook that throws a descriptive error if used outside the provider, keeping mis-use easy to debug.

### Counter component (`src/components/Counter.tsx`)

- Consumes `useCounter()` for state and the `increment` action.
- Fires a Chakra UI toast on every click, rendered with a custom `CounterToast` component that matches the Figma design.
- The gradient border on the toast is achieved by wrapping the inner box with a 1 px gradient-background outer box, which is the most reliable cross-browser approach for gradient borders with `border-radius`.

## Tech Stack

| Tool | Version | Why |
|---|---|---|
| Vite | 5 | Fastest dev server / HMR for React |
| React | 18 | Concurrent features, automatic batching |
| TypeScript | 5 | Strict typing throughout |
| Chakra UI | 2 | Toast API, design-system primitives |
