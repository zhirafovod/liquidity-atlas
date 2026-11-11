import { createFileRoute } from "@tanstack/react-router";
import { Simulator } from "@/components/simulator";
import { t } from "@/lib/copy";

export const Route = createFileRoute("/")({
  component: function Home() {
    const copy = t("en");
    return (
      <main>
        <div className="mx-auto max-w-6xl px-4 pt-8">
          <p className="text-xs font-semibold tracking-widest text-brass uppercase">{copy.home.kicker}</p>
          <h1 className="mt-1 max-w-3xl font-display text-4xl leading-tight text-ink sm:text-5xl">{copy.home.title}</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">{copy.home.lede}</p>
        </div>
        <Simulator locale="en" />
      </main>
    );
  },
});
