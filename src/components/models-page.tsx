import { DEFINITION_NOTE, FACTS, HOUSING_NOTE, RATE_NOTE } from "@/lib/facts";
import { t } from "@/lib/copy";
import type { Locale } from "@/lib/locale";
import { REGION_IDS } from "@/lib/sim";

export function ModelsPage({ locale }: { locale: Locale }) {
  const copy = t(locale);
  const page = copy.models;
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <p className="text-xs font-semibold tracking-widest text-brass uppercase">{page.kicker}</p>
      <h1 className="mt-1 max-w-3xl font-display text-4xl text-ink">{page.title}</h1>
      <p className="mt-4 max-w-3xl text-lg text-muted">{page.lede}</p>
      <p className="mt-2 max-w-3xl text-sm text-muted">{page.read}</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[64rem] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-paper-2 text-ink">
              <th className="sticky left-0 z-10 bg-paper-2 px-3 py-3 font-semibold">{page.country}</th>
              {REGION_IDS.map((id) => (
                <th key={id} className="min-w-56 px-3 py-3 align-bottom font-semibold">
                  <span className="block font-display text-xl">{copy.regions[id].name}</span>
                  <span className="mt-1 block text-xs font-medium text-teal">{copy.regions[id].sink}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FACTS.map((row) => (
              <tr key={row.id} className="border-t border-line align-top">
                <th className="sticky left-0 z-10 bg-surface px-3 py-3 text-left font-semibold">{locale === "ru" ? row.ru : row.en}</th>
                {REGION_IDS.map((id) => {
                  const cell = row.cells[id];
                  return (
                    <td key={id} className="px-3 py-3">
                      <p>{locale === "ru" ? cell.ru : cell.en}</p>
                      <a
                        className="mt-1 inline-block text-xs font-semibold text-teal underline-offset-2 hover:underline"
                        href={cell.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {cell.source}
                      </a>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 max-w-3xl space-y-2 text-sm text-muted">
        <p>{DEFINITION_NOTE[locale]}</p>
        <p>{HOUSING_NOTE[locale]}</p>
        <p>{RATE_NOTE[locale]}</p>
      </div>

      <section className="mt-8 max-w-3xl space-y-3">
        <h2 className="font-display text-2xl">{page.sharedTitle}</h2>
        {page.shared.map((p) => (
          <p key={p.slice(0, 48)}>{p}</p>
        ))}
      </section>
    </main>
  );
}
