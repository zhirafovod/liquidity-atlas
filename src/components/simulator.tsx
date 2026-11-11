import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useSearch } from "@tanstack/react-router";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { EPISODES } from "@/lib/episodes";
import type { Locale } from "@/lib/locale";
import { localize } from "@/lib/locale";
import { t } from "@/lib/copy";
import { PALETTE } from "@/lib/palette";
import {
  BASELINES,
  PRESET_PATCHES,
  REGION_IDS,
  mechanics,
  simulate,
  sliceTo,
  type Params,
  type RegionId,
} from "@/lib/sim";

const FIELD_KEYS = [
  "moneyGrowth",
  "productivity",
  "aiBoost",
  "immigration",
  "absorption",
  "fiscalImpulse",
] as const;

const FIELD_RANGE: Record<(typeof FIELD_KEYS)[number], { min: number; max: number; step: number }> = {
  moneyGrowth: { min: 0, max: 22, step: 0.1 },
  productivity: { min: 0, max: 8, step: 0.1 },
  aiBoost: { min: 0, max: 5, step: 0.1 },
  immigration: { min: 0, max: 2, step: 0.05 },
  absorption: { min: 0, max: 1, step: 0.01 },
  fiscalImpulse: { min: 0, max: 10, step: 0.1 },
};

function signed(n: number) {
  const v = Math.round(n * 10) / 10;
  if (Math.abs(v) < 0.05) return "0";
  return `${v > 0 ? "+" : ""}${v.toFixed(1)}`;
}

export function Simulator({ locale }: { locale: Locale }) {
  const copy = t(locale);
  const s = copy.sim;
  const search = useSearch({ strict: false }) as { episode?: string };
  const [region, setRegion] = useState<RegionId>("usa");
  const [params, setParams] = useState<Params>(BASELINES.usa);
  const [preset, setPreset] = useState("path");
  const [episodeId, setEpisodeId] = useState("");
  const [year, setYear] = useState(2026);
  const [playing, setPlaying] = useState(false);

  const series = useMemo(() => simulate(params), [params]);
  const baseline = useMemo(() => simulate(BASELINES[region]), [region]);
  const visible = useMemo(() => sliceTo(series, year), [series, year]);
  const now = visible[visible.length - 1];
  const baseNow = baseline.find((p) => p.year === year) ?? baseline[baseline.length - 1];
  const start = series[0];
  const meta = copy.regions[region];
  const mech = mechanics(params, year);
  const episode = EPISODES.find((e) => e.id === episodeId);

  function applyEpisode(id: string, push: boolean) {
    const found = EPISODES.find((e) => e.id === id);
    if (!found) return;
    setRegion(found.region);
    setParams({ ...BASELINES[found.region], ...found.patch });
    setYear(found.year);
    setPreset("episode");
    setEpisodeId(id);
    setPlaying(false);
    if (push) {
      const url = `${localize(locale, "/")}?episode=${encodeURIComponent(id)}`;
      window.history.replaceState({}, "", url);
    }
  }

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setYear((y) => {
        if (y >= 2050) {
          setPlaying(false);
          return 2050;
        }
        return y + 1;
      });
    }, 90);
    return () => window.clearInterval(id);
  }, [playing]);

  useEffect(() => {
    const fromRouter = typeof search.episode === "string" ? search.episode : "";
    const fromUrl = new URLSearchParams(window.location.search).get("episode") ?? "";
    const id = fromRouter || fromUrl;
    if (id) applyEpisode(id, false);
    // Read the address directly: the /ru layout does not always surface unknown search params.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.episode]);

  function pickRegion(id: RegionId) {
    setRegion(id);
    setParams({ ...BASELINES[id] });
    setPreset("path");
    setEpisodeId("");
    setPlaying(false);
  }

  function applyPreset(id: string) {
    const found = PRESET_PATCHES.find((p) => p.id === id);
    if (!found) return;
    setPreset(id);
    setEpisodeId("");
    setParams({ ...BASELINES[region], ...found.patch });
  }

  function setField(key: keyof Params, value: number) {
    setPreset("custom");
    setEpisodeId("");
    setParams((p) => ({ ...p, [key]: value }));
  }

  const shopShare = Math.round((1 - params.absorption) * 100);
  const assetShare = 100 - shopShare;
  const pointsUnit = locale === "ru" ? "п.п." : "pts";
  const compareLine =
    locale === "ru"
      ? `К этому году против базы страны инфляция в магазине ${signed(now.cpi - baseNow.cpi)} ${pointsUnit}, индекс акций ${now.stock.toFixed(0)} вместо ${baseNow.stock.toFixed(0)}.`
      : `By this year, against this country’s baseline, shop inflation is ${signed(now.cpi - baseNow.cpi)} points and the stock index is ${now.stock.toFixed(0)} instead of ${baseNow.stock.toFixed(0)}.`;

  const sentence =
    locale === "ru"
      ? `В ${year} году спрос со стороны денег и бюджета — ${mech.demand.toFixed(1)}% в год, мощности — ${(mech.demand - mech.pressure).toFixed(1)}%. Разрыв ${mech.pressure.toFixed(1)} п.п. Активы забирают ${assetShare}% этого разрыва, поэтому цены в магазине в этом году ${mech.cpi >= 0 ? "плюс" : "минус"} ${Math.abs(mech.cpi).toFixed(1)}%.`
      : `In ${year}, money and the budget pull demand at ${mech.demand.toFixed(1)}% a year. Capacity grows at ${(mech.demand - mech.pressure).toFixed(1)}%. The gap is ${mech.pressure.toFixed(1)} points. Assets take ${assetShare}% of it, so shop prices ${mech.cpi >= 0 ? "rise" : "fall"} ${Math.abs(mech.cpi).toFixed(1)}% this year.`;

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[320px_1fr]">
      <aside className="order-2 flex flex-col gap-4 lg:order-1">
        <div>
          <p className="text-xs font-semibold tracking-widest text-brass uppercase">{s.region}</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {REGION_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => pickRegion(id)}
                className={
                  id === region
                    ? "rounded-xl bg-ink px-3 py-3 text-left text-sm font-semibold text-paper"
                    : "rounded-xl border border-line bg-surface px-3 py-3 text-left text-sm font-semibold text-ink"
                }
              >
                {copy.regions[id].name}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted">{meta.blurb}</p>
          <p className="mt-1 text-sm">
            {s.sink}: <span className="font-semibold text-teal">{meta.sink}</span>
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest text-brass uppercase">{s.episodes}</p>
          <div className="mt-2 flex flex-col gap-2">
            {EPISODES.filter((e) => e.region === region).map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => applyEpisode(e.id, true)}
                className={
                  episodeId === e.id
                    ? "rounded-xl bg-teal px-3 py-2 text-left text-sm font-semibold text-paper"
                    : "rounded-xl border border-line bg-surface px-3 py-2 text-left text-sm font-semibold text-ink"
                }
              >
                {e.title[locale]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest text-brass uppercase">{s.levers}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {PRESET_PATCHES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => applyPreset(p.id)}
                className={
                  preset === p.id
                    ? "rounded-full bg-ink px-3 py-2 text-sm font-semibold text-paper"
                    : "rounded-full border border-line bg-surface px-3 py-2 text-sm font-semibold text-ink"
                }
              >
                {s.presets[p.id].label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-4">
          {FIELD_KEYS.map((key) => {
            const field = s.fields[key];
            const range = FIELD_RANGE[key];
            return (
              <label key={key} className="mb-4 block last:mb-0">
                <span className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-semibold">{field.label}</span>
                  <span className="tabular-nums text-brass">
                    {params[key].toFixed(range.step < 0.1 ? 2 : 1)}
                    <span className="ml-1 font-normal text-muted">{field.unit}</span>
                  </span>
                </span>
                <input
                  className="mt-1 h-8 w-full accent-teal"
                  type="range"
                  min={range.min}
                  max={range.max}
                  step={range.step}
                  value={params[key]}
                  onChange={(e) => setField(key, Number(e.target.value))}
                  aria-label={field.label}
                />
                <span className="mt-0.5 block text-xs leading-snug text-muted">{field.help}</span>
              </label>
            );
          })}
        </div>
      </aside>

      <section className="order-1 flex flex-col gap-4 lg:order-2">
        <div className="rounded-2xl border border-line bg-ink p-4 text-paper">
          {episode ? (
            <p className="text-xs font-semibold tracking-widest text-brass uppercase">{episode.when[locale]}</p>
          ) : (
            <p className="text-xs font-semibold tracking-widest text-brass uppercase">{meta.name}</p>
          )}
          <p className="mt-2 text-lg leading-snug">{episode ? episode.lesson[locale] : sentence}</p>
          {episode ? <p className="mt-2 text-sm leading-snug text-paper/80">{sentence}</p> : null}
          {!mech.aiOn ? <p className="mt-2 text-sm text-brass">{s.aiOff}</p> : null}
        </div>

        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="font-semibold">{s.pressure}</span>
            <span className="tabular-nums text-brass">
              {mech.pressure.toFixed(1)} {pointsUnit}
            </span>
          </div>
          {mech.pressure > 0.2 ? (
            <>
              <div className="mt-2 flex h-3 overflow-hidden rounded-full bg-paper-2">
                <div className="bg-teal" style={{ width: `${assetShare}%` }} />
                <div className="bg-signal" style={{ width: `${shopShare}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted">
                <span>
                  {s.barAssets} {assetShare}%
                </span>
                <span>
                  {s.barShops} {shopShare}%
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{s.barCaption}</p>
            </>
          ) : (
            <p className="mt-2 text-sm text-muted">
              {locale === "ru"
                ? "Разрыва нет: выпуск поспевает за деньгами. Делить нечего, и доля активов почти ничего не решает."
                : "There is no gap to split. Output is keeping up with money, so the asset share barely matters."}
            </p>
          )}
          <p className="mt-2 text-sm">{compareLine}</p>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-widest text-brass uppercase">{s.year}</p>
              <p className="font-display text-5xl leading-none text-ink">{year}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper"
                onClick={() => {
                  if (year >= 2050) setYear(1990);
                  setPlaying((v) => !v);
                }}
              >
                {playing ? s.pause : year >= 2050 ? s.again : s.play}
              </button>
              <button
                type="button"
                className="rounded-full border border-line px-4 py-2 text-sm font-semibold"
                onClick={() => {
                  setPlaying(false);
                  setYear(1990);
                }}
              >
                {s.reset}
              </button>
            </div>
          </div>
          <input
            className="mt-4 h-8 w-full accent-ink"
            type="range"
            min={1990}
            max={2050}
            value={year}
            onChange={(e) => {
              setPlaying(false);
              setYear(Number(e.target.value));
            }}
            aria-label={s.year}
          />
          <div className="mt-1 flex justify-between text-xs text-muted">
            <span>1990</span>
            <span>2000</span>
            <span>2020</span>
            <span>2050</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label={s.stats.cpi} value={`${now.cpi.toFixed(1)}%`} tone={now.cpi > 6 ? "signal" : "ink"} />
          <Stat label={s.stats.gdp} value={now.gdp.toFixed(0)} note={`${s.stats.from} ${start.gdp.toFixed(0)}`} />
          <Stat label={s.stats.stocks} value={now.stock.toFixed(0)} tone="teal" />
          <Stat label={s.stats.housing} value={now.housing.toFixed(0)} tone="brass" />
        </div>

        <ChartCard title={s.charts.cpi}>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={visible} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={PALETTE.line} strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fill: PALETTE.muted, fontSize: 12 }} />
              <YAxis tick={{ fill: PALETTE.muted, fontSize: 12 }} width={36} unit="%" />
              <Tooltip />
              <Line type="monotone" dataKey="cpi" name={s.series.cpi} stroke={PALETTE.signal} dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title={s.charts.assets}>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={visible} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={PALETTE.line} strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fill: PALETTE.muted, fontSize: 12 }} />
              <YAxis tick={{ fill: PALETTE.muted, fontSize: 12 }} width={48} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="stock" name={s.series.stocks} stroke={PALETTE.teal} dot={false} strokeWidth={2} />
              <Line type="monotone" dataKey="housing" name={s.series.housing} stroke={PALETTE.brass} dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title={s.charts.money}>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={visible} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={PALETTE.line} strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fill: PALETTE.muted, fontSize: 12 }} />
              <YAxis tick={{ fill: PALETTE.muted, fontSize: 12 }} width={44} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="gdp" name={s.series.gdp} stroke={PALETTE.ink} dot={false} strokeWidth={2} />
              <Line type="monotone" dataKey="money" name={s.series.money} stroke={PALETTE.brass} dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <p className="text-sm text-muted">{s.footnote}</p>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  note,
  tone = "ink",
}: {
  label: string;
  value: string;
  note?: string;
  tone?: "ink" | "signal" | "teal" | "brass";
}) {
  const color =
    tone === "signal" ? "text-signal" : tone === "teal" ? "text-teal" : tone === "brass" ? "text-brass" : "text-ink";
  return (
    <div className="rounded-2xl border border-line bg-surface px-3 py-3">
      <p className="text-xs text-muted">{label}</p>
      <p className={`font-display text-3xl leading-none ${color}`}>{value}</p>
      {note ? <p className="mt-1 text-xs text-muted">{note}</p> : null}
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-3">
      <h2 className="mb-2 px-1 text-base font-semibold">{title}</h2>
      {children}
    </div>
  );
}
