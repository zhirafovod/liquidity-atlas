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
  { key: "moneyGrowth", label: "Рост денег", min: 0, max: 22, step: 0.1, unit: "% в год" },
  { key: "productivity", label: "Производительность", min: 0, max: 8, step: 0.1, unit: "% в год" },
  { key: "aiBoost", label: "ИИ после 2020", min: 0, max: 5, step: 0.1, unit: "доп. п.п." },
  { key: "immigration", label: "Чистая миграция", min: 0, max: 2, step: 0.05, unit: "% населения" },
  { key: "absorption", label: "Сток в активы", min: 0, max: 1, step: 0.01, unit: "доля избытка" },
  { key: "fiscalImpulse", label: "Фискальный импульс", min: 0, max: 10, step: 0.1, unit: "стимул" },
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
          <p className="text-xs font-semibold tracking-widest text-brass uppercase">Регион</p>
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
            Основной сток: <span className="font-semibold text-teal">{meta.sink}</span>
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest text-brass uppercase">Сценарии</p>
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
              <p className="text-xs font-semibold tracking-widest text-brass uppercase">Год</p>
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
                {playing ? "Пауза" : year >= 2050 ? "Заново" : "Играть"}
              </button>
              <button
                type="button"
                className="rounded-full border border-line px-4 py-2 text-sm font-semibold"
                onClick={() => {
                  setPlaying(false);
                  setYear(1990);
                }}
              >
                Сброс
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
            aria-label="Год"
          />
          <div className="mt-1 flex justify-between text-xs text-muted">
            <span>1990</span>
            <span>2000</span>
            <span>2020</span>
            <span>2050</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="ИПЦ в этом году" value={`${now.cpi.toFixed(1)}%`} tone={now.cpi > 6 ? "signal" : "ink"} />
          <Stat label="Реальный ВВП" value={now.gdp.toFixed(0)} note={`с ${start.gdp.toFixed(0)}`} />
          <Stat label="Индекс акций" value={now.stock.toFixed(0)} tone="teal" />
          <Stat label="Индекс жилья" value={now.housing.toFixed(0)} tone="brass" />
        </div>

        <ChartCard title="Инфляция потребительских цен">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={visible} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={PALETTE.line} strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fill: PALETTE.muted, fontSize: 12 }} />
              <YAxis tick={{ fill: PALETTE.muted, fontSize: 12 }} width={36} unit="%" />
              <Tooltip />
              <Line type="monotone" dataKey="cpi" name="ИПЦ %" stroke={PALETTE.signal} dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Куда осели деньги">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={visible} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={PALETTE.line} strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fill: PALETTE.muted, fontSize: 12 }} />
              <YAxis tick={{ fill: PALETTE.muted, fontSize: 12 }} width={48} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="stock" name="Акции" stroke={PALETTE.teal} dot={false} strokeWidth={2} />
              <Line type="monotone" dataKey="housing" name="Жильё" stroke={PALETTE.brass} dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="grid gap-3 md:grid-cols-2">
          <ChartCard title="Реальный выпуск и широкие деньги">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={visible} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={PALETTE.line} strokeDasharray="3 3" />
                <XAxis dataKey="year" tick={{ fill: PALETTE.muted, fontSize: 12 }} />
                <YAxis tick={{ fill: PALETTE.muted, fontSize: 12 }} width={44} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="gdp" name="Реальный ВВП" stroke={PALETTE.ink} dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="money" name="Деньги" stroke={PALETTE.brass} dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Долг и реальная зарплата">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={visible} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={PALETTE.line} strokeDasharray="3 3" />
                <XAxis dataKey="year" tick={{ fill: PALETTE.muted, fontSize: 12 }} />
                <YAxis tick={{ fill: PALETTE.muted, fontSize: 12 }} width={44} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="debt" name="Долг" stroke={PALETTE.signal} dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="realWage" name="Реальная зарплата" stroke={PALETTE.teal} dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <p className="text-sm text-muted">
          Индексы равны 100 в 1990 году. Чем выше сток в активы, тем больше новых денег остаётся в акциях и жилье,
          и тем тише инфляция в магазине — пока производительность не отстаёт или сток не мелкий, как в российском
          базовом пути. Миграция добавляет и покупателей, и работников. Инфляция здесь — косвенный налог на наличные.
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
