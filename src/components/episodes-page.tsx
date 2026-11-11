import { LocalLink } from "@/components/local-link";
import { t } from "@/lib/copy";
import { EPISODES } from "@/lib/episodes";
import { localize, type Locale } from "@/lib/locale";

export function EpisodesPage({ locale }: { locale: Locale }) {
  const page = t(locale).episodesPage;
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <p className="text-xs font-semibold tracking-widest text-brass uppercase">{page.kicker}</p>
      <h1 className="mt-1 font-display text-4xl text-ink">{page.title}</h1>
      <p className="mt-4 text-lg text-muted">{page.lede}</p>

      <div className="mt-8 flex flex-col gap-5">
        {EPISODES.map((episode) => (
          <article key={episode.id} className="rounded-2xl border border-line bg-surface p-5">
            <p className="text-xs font-semibold tracking-widest text-brass uppercase">{episode.when[locale]}</p>
            <h2 className="mt-1 font-display text-2xl">{episode.title[locale]}</h2>
            <h3 className="mt-4 text-sm font-semibold">{page.did}</h3>
            <p className="mt-1 text-muted">{episode.did[locale]}</p>
            <h3 className="mt-3 text-sm font-semibold">{page.happened}</h3>
            <p className="mt-1 text-muted">{episode.happened[locale]}</p>
            <h3 className="mt-3 text-sm font-semibold">{page.lesson}</h3>
            <p className="mt-1">{episode.lesson[locale]}</p>
            <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <a className="font-semibold text-teal underline-offset-2 hover:underline" href={`${localize(locale, "/")}?episode=${episode.id}`}>
                {page.replay}
              </a>
              <a className="text-muted underline-offset-2 hover:underline" href={episode.source.href} target="_blank" rel="noreferrer">
                {page.source}: {episode.source.label}
              </a>
            </p>
          </article>
        ))}
      </div>

      <p className="mt-8">
        <LocalLink locale={locale} path="/models" className="font-semibold text-teal underline-offset-2 hover:underline">
          {t(locale).theory.toModels}
        </LocalLink>
      </p>
    </main>
  );
}
