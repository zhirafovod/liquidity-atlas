import { createFileRoute } from "@tanstack/react-router";
import { Simulator } from "@/components/simulator";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <p className="text-xs font-semibold tracking-widest text-brass uppercase">Интерактивный прогон</p>
        <h1 className="mt-1 max-w-3xl font-display text-4xl leading-tight text-ink sm:text-5xl">
          Куда уходят напечатанные деньги, прежде чем сдвинутся цены.
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Выберите регион, подвиньте рычаги и прогоните 1990–2050. Акции могут поглотить ликвидность. Квартиры тоже.
          Продукты замечают последними — или первыми, если финансового стока нет.
        </p>
      </div>
      <Simulator />
    </main>
  );
}
