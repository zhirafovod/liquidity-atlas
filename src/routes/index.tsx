import { createFileRoute } from "@tanstack/react-router";
import { Simulator } from "@/components/simulator";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <p className="text-xs font-semibold tracking-widest text-brass uppercase">Interactive replay</p>
        <h1 className="mt-1 max-w-3xl font-display text-4xl leading-tight text-ink sm:text-5xl">
          Where printed money goes before prices move.
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Pick a region, drag the levers, and run 1990 to 2050. Stocks can swallow liquidity. Apartments can too.
          Groceries notice last — or first, if there is no financial sink.
        </p>
      </div>
      <Simulator />
    </main>
  );
}
