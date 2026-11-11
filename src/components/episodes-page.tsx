import { EpisodeChart, REGION_FILL } from "@/components/episode-chart";
import { LocalLink } from "@/components/local-link";
import { t } from "@/lib/copy";
import { CHART_SOURCES, compareFor } from "@/lib/episode-compare";
import { EPISODES } from "@/lib/episodes";
import { localize, type Locale } from "@/lib/locale";
import type { RegionId } from "@/lib/sim";

const ORDER: RegionId[] = ["usa", "europe", "russia", "china"];

export function EpisodesPage({ locale }: { locale: Locale }) {
  const copy = t(locale);
  const page = copy.episodesPage;
  const names = {
    usa: locale === "ru" ? "США" : "US",
    europe: copy.regions.europe.name,
    russia: copy.regions.russia.name,
    china: copy.regions.china.name,
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <p className="text-xs font-semibold tracking-widest text-brass uppercase">{page.kicker}</p>
      <h1 className="mt-1 max-w-3xl font-display text-4xl text-ink">{page.title}</h1>
      <p className="mt-4 max-w-3xl text-lg text-muted">{page.lede}</p>
      <p className="mt-3 max-w-3xl text-sm text-muted">{page.method}</p>

      <div className="mt-8 flex flex-col gap-6">
        {EPISODES.map((episode) => {
          const compare = compareFor(episode.id);
          return (
            <article key={episode.id} id={episode.id} className="scroll-mt-6 rounded-2xl border border-line bg-surface p-5">
              <p className="text-xs font-semibold tracking-widest text-brass uppercase">{episode.when[locale]}</p>
              <h2 className="mt-1 font-display text-2xl">{episode.title[locale]}</h2>
              <p className="mt-3 max-w-3xl">{episode.lesson[locale]}</p>
              <p className="mt-3 max-w-3xl text-sm">
                <span className="font-semibold">{page.did}. </span>
                {episode.did[locale]}
              </p>
              <p className="mt-2 max-w-3xl text-sm">
                <span className="font-semibold">{page.happened}. </span>
                {episode.happened[locale]}
              </p>
              {compare ? (
                <>
                  <h3 className="mt-5 text-sm font-semibold tracking-wide text-brass uppercase">{page.chartTitle}</h3>
                  <EpisodeChart
                    row={compare}
                    locale={locale}
                    names={names}
                    labels={{ money: page.money, prices: page.prices, housing: page.housing }}
                  />
                  <p className="mt-3 max-w-3xl text-sm text-muted">{compare.note[locale]}</p>
                  <h3 className="mt-5 text-sm font-semibold">{page.stories}</h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {ORDER.map((id) => (
                      <div key={id} className="rounded-xl border border-line border-l-4 bg-paper px-3 py-3" style={{ borderLeftColor: REGION_FILL[id] }}>
                        <h4 className="text-sm font-semibold">
                          {copy.regions[id].name}
                          {episode.region === id ? <span className="ml-2 text-xs font-semibold text-brass">{page.focus}</span> : null}
                        </h4>
                        <p className="mt-1 text-sm text-muted">{compare.places[id][locale]}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}

              <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <a
                  className="font-semibold text-teal underline-offset-2 hover:underline"
                  href={`${localize(locale, "/")}?episode=${episode.id}`}
                >
                  {page.replay}
                </a>
                <a
                  className="text-muted underline-offset-2 hover:underline"
                  href={episode.source.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {page.source}: {episode.source.label}
                </a>
              </p>
            </article>
          );
        })}
      </div>

      <section className="mt-8">
        <h2 className="font-display text-2xl">{page.series}</h2>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {CHART_SOURCES.map((source) => (
            <li key={source.href}>
              <a className="text-teal underline-offset-2 hover:underline" href={source.href} target="_blank" rel="noreferrer">
                {source.label[locale]}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-8">
        <LocalLink locale={locale} path="/models" className="font-semibold text-teal underline-offset-2 hover:underline">
          {copy.theory.toModels}
        </LocalLink>
      </p>
    </main>
  );
}
