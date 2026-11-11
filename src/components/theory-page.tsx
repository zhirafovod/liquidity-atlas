import { LocalLink } from "@/components/local-link";
import { t } from "@/lib/copy";
import type { Locale } from "@/lib/locale";

export function TheoryPage({ locale }: { locale: Locale }) {
  const copy = t(locale).theory;
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <p className="text-xs font-semibold tracking-widest text-brass uppercase">{copy.kicker}</p>
      <h1 className="mt-1 font-display text-4xl text-ink">{copy.title}</h1>
      <p className="mt-4 text-lg text-muted">{copy.lede}</p>

      {copy.sections.map((section) => (
        <section key={section.title} className="mt-8 space-y-3">
          <h2 className="font-display text-2xl">{section.title}</h2>
          {section.body.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </section>
      ))}

      <section className="mt-8">
        <h2 className="font-display text-2xl">{locale === "ru" ? "Коротко по именам" : "The names, briefly"}</h2>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="bg-paper-2 text-ink">
              <tr>
                <th className="px-3 py-2 font-semibold">{copy.tableName}</th>
                <th className="px-3 py-2 font-semibold">{copy.tableStance}</th>
              </tr>
            </thead>
            <tbody>
              {copy.rows.map((row) => (
                <tr key={row.name} className="border-t border-line align-top">
                  <td className="px-3 py-2 font-semibold">{row.name}</td>
                  <td className="px-3 py-2 text-muted">{row.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="mt-8 flex flex-wrap gap-x-3 gap-y-1">
        <LocalLink locale={locale} path="/" className="font-semibold text-teal underline-offset-2 hover:underline">
          {copy.toReplay}
        </LocalLink>
        <LocalLink locale={locale} path="/models" className="font-semibold text-teal underline-offset-2 hover:underline">
          {copy.toModels}
        </LocalLink>
        <LocalLink locale={locale} path="/episodes" className="font-semibold text-teal underline-offset-2 hover:underline">
          {copy.toEpisodes}
        </LocalLink>
      </p>
    </main>
  );
}
