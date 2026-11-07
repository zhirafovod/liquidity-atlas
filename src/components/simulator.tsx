import { useEffect, useMemo, useState, type ReactNode } from "react";
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
import { PALETTE } from "@/lib/palette";
import {
  BASELINES,
  PRESETS,
  REGIONS,
  simulate,
  sliceTo,
  type Params,
  type RegionId,
} from "@/lib/sim";

const FIELDS: { key: keyof Params; label: string; min: number; max: number; step: number; unit: string }[] = [
  { key: "moneyGrowth", label: "Money growth", min: 0, max: 22, step: 0.1, unit: "% / year" },
  { key: "productivity", label: "Productivity", min: 0, max: 8, step: 0.1, unit: "% / year" },
  { key: "aiBoost", label: "AI boost after 2020", min: 0, max: 5, step: 0.1, unit: "extra pts" },
  { key: "immigration", label: "Net migration", min: 0, max: 2, step: 0.05, unit: "% of pop" },
  { key: "absorption", label: "Asset sink", min: 0, max: 1, step: 0.01, unit: "share of excess" },
  { key: "fiscalImpulse", label: "Fiscal impulse", min: 0, max: 10, step: 0.1, unit: "stimulus" },
];

export function Simulator() {
  const [region, setRegion] = useState<RegionId>("usa");
  const [params, setParams] = useState<Params>(BASELINES.usa);
  const [preset, setPreset] = useState("path");
  const [year, setYear] = useState(2026);
  const [playing, setPlaying] = useState(false);

  const series = useMemo(() => simulate(params), [params]);
  const visible = useMemo(() => sliceTo(series, year), [series, year]);
  const now = visible[visible.length - 1];
  const start = series[0];
  const meta = REGIONS.find((r) => r.id === region)!;

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

  function pickRegion(id: RegionId) {
    setRegion(id);
    setParams({ ...BASELINES[id] });
    setPreset("path");
    setPlaying(false);
  }

  function applyPreset(id: string) {
    const found = PRESETS.find((p) => p.id === id);
    if (!found) return;
    setPreset(id);
    setParams({ ...BASELINES[region], ...found.patch });
  }

  function setField(key: keyof Params, value: number) {
    setPreset("custom");
    setParams((p) => ({ ...p, [key]: value }));
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[320px_1fr]">
      <aside className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest text-brass uppercase">Region</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {REGIONS.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => pickRegion(r.id)}
                className={
                  r.id === region
                    ? "rounded-xl bg-ink px-3 py-3 text-left text-sm font-semibold text-paper"
                    : "rounded-xl border border-line bg-surface px-3 py-3 text-left text-sm font-semibold text-ink"
                }
              >
                {r.name}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted">{meta.blurb}</p>
          <p className="mt-1 text-sm">
            Primary sink: <span className="font-semibold text-teal">{meta.sink}</span>
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest text-brass uppercase">Scenarios</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => applyPreset(p.id)}
                className={
                  preset === p.id
                    ? "rounded-full bg-teal px-3 py-2 text-sm font-semibold text-paper"
                    : "rounded-full border border-line bg-surface px-3 py-2 text-sm font-semibold text-ink"
                }
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-4">
          {FIELDS.map((f) => (
            <label key={f.key} className="mb-3 block last:mb-0">
              <span className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-semibold">{f.label}</span>
                <span className="tabular-nums text-brass">
                  {params[f.key].toFixed(f.step < 0.1 ? 2 : 1)}
                  <span className="ml-1 font-normal text-muted">{f.unit}</span>
                </span>
              </span>
              <input
                className="mt-1 h-8 w-full accent-teal"
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={params[f.key]}
                onChange={(e) => setField(f.key, Number(e.target.value))}
                aria-label={f.label}
              />
            </label>
          ))}
        </div>
      </aside>

      <section className="flex flex-col gap-4">
        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-widest text-brass uppercase">Playhead</p>
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
                {playing ? "Pause" : year >= 2050 ? "Replay" : "Play"}
              </button>
              <button
                type="button"
                className="rounded-full border border-line px-4 py-2 text-sm font-semibold"
                onClick={() => {
                  setPlaying(false);
                  setYear(1990);
                }}
              >
                Reset
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
            aria-label="Year"
          />
          <div className="mt-1 flex justify-between text-xs text-muted">
            <span>1990</span>
            <span>2000</span>
            <span>2020</span>
            <span>2050</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="CPI this year" value={`${now.cpi.toFixed(1)}%`} tone={now.cpi > 6 ? "signal" : "ink"} />
          <Stat label="Real GDP index" value={now.gdp.toFixed(0)} note={`from ${start.gdp.toFixed(0)}`} />
          <Stat label="Stock index" value={now.stock.toFixed(0)} tone="teal" />
          <Stat label="Housing index" value={now.housing.toFixed(0)} tone="brass" />
        </div>

        <ChartCard title="Shop-price inflation">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={visible} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={PALETTE.line} strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fill: PALETTE.muted, fontSize: 12 }} />
              <YAxis tick={{ fill: PALETTE.muted, fontSize: 12 }} width={36} unit="%" />
              <Tooltip />
              <Line type="monotone" dataKey="cpi" name="CPI %" stroke={PALETTE.signal} dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Where the money landed">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={visible} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={PALETTE.line} strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fill: PALETTE.muted, fontSize: 12 }} />
              <YAxis tick={{ fill: PALETTE.muted, fontSize: 12 }} width={48} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="stock" name="Stocks" stroke={PALETTE.teal} dot={false} strokeWidth={2} />
              <Line type="monotone" dataKey="housing" name="Housing" stroke={PALETTE.brass} dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="grid gap-3 md:grid-cols-2">
          <ChartCard title="Real output and broad money">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={visible} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={PALETTE.line} strokeDasharray="3 3" />
                <XAxis dataKey="year" tick={{ fill: PALETTE.muted, fontSize: 12 }} />
                <YAxis tick={{ fill: PALETTE.muted, fontSize: 12 }} width={44} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="gdp" name="Real GDP" stroke={PALETTE.ink} dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="money" name="Money" stroke={PALETTE.brass} dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Debt stock and real wage">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={visible} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={PALETTE.line} strokeDasharray="3 3" />
                <XAxis dataKey="year" tick={{ fill: PALETTE.muted, fontSize: 12 }} />
                <YAxis tick={{ fill: PALETTE.muted, fontSize: 12 }} width={44} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="debt" name="Debt" stroke={PALETTE.signal} dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="realWage" name="Real wage" stroke={PALETTE.teal} dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <p className="text-sm text-muted">
          Indexes start at 100 in 1990. A higher asset sink keeps more of the new money in stocks and housing, so
          shop-price inflation stays quieter — until productivity fails to keep up, or the sink is shallow, as in the
          Russian baseline. Migration adds both shoppers and workers. Inflation here is the indirect tax on cash.
        </p>
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
