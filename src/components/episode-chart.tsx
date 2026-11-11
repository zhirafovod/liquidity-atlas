import { Bar, BarChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { EpisodeCompare } from "@/lib/episode-compare";
import type { Locale } from "@/lib/locale";
import { PALETTE } from "@/lib/palette";
import type { RegionId } from "@/lib/sim";

const ORDER: RegionId[] = ["usa", "europe", "russia", "china"];

export const REGION_FILL: Record<RegionId, string> = {
  usa: PALETTE.ink,
  europe: PALETTE.teal,
  russia: PALETTE.signal,
  china: PALETTE.brass,
};

const DOT: Record<RegionId, string> = {
  usa: "bg-ink",
  europe: "bg-teal",
  russia: "bg-signal",
  china: "bg-brass",
};

function signed(n: number | null) {
  if (n == null) return "—";
  const body = `${n > 0 ? "+" : ""}${n.toFixed(1)}`;
  return body;
}

export function EpisodeChart({
  row,
  locale,
  names,
  labels,
}: {
  row: EpisodeCompare;
  locale: Locale;
  names: Record<RegionId, string>;
  labels: { money: string; prices: string; housing: string };
}) {
  const metrics: { key: "money" | "prices" | "housing"; label: string }[] = [
    { key: "money", label: labels.money },
    { key: "prices", label: labels.prices },
    { key: "housing", label: labels.housing },
  ];

  const data = metrics.map(({ key, label }) => {
    const point: Record<string, string | number | null> = { metric: label };
    for (const id of ORDER) point[id] = row[key][id];
    return point;
  });

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {ORDER.map((id) => (
          <span key={id} className="inline-flex items-center gap-1.5 text-xs font-semibold">
            <span className={`inline-block h-2.5 w-2.5 rounded-sm ${DOT[id]}`} />
            {names[id]}
          </span>
        ))}
      </div>
      <div className="mt-2 h-64 w-full min-w-0 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 4, left: 0, bottom: 0 }} barCategoryGap="22%" barGap={3}>
            <CartesianGrid stroke={PALETTE.line} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="metric" tick={{ fill: PALETTE.ink, fontSize: 12 }} axisLine={{ stroke: PALETTE.line }} tickLine={false} />
            <YAxis
              tick={{ fill: PALETTE.muted, fontSize: 11 }}
              width={44}
              tickFormatter={(value: number) => `${Math.round(value)}%`}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(16, 32, 41, 0.04)" }}
              contentStyle={{
                background: PALETTE.paper,
                border: `1px solid ${PALETTE.line}`,
                borderRadius: 12,
                fontSize: 12,
              }}
              formatter={(value) => (typeof value === "number" ? `${value.toFixed(1)}%` : "—")}
            />
            <ReferenceLine y={0} stroke={PALETTE.ink} strokeWidth={1} />
            {ORDER.map((id) => (
              <Bar
                key={id}
                dataKey={id}
                name={names[id]}
                fill={REGION_FILL[id]}
                maxBarSize={26}
                radius={[3, 3, 0, 0]}
                isAnimationActive={false}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <table className="mt-3 w-full border-collapse text-xs">
        <thead>
          <tr className="text-muted">
            <th className="py-1 pr-2 text-left font-normal" />
            {ORDER.map((id) => (
              <th key={id} className="px-1 py-1 text-right font-semibold" style={{ color: REGION_FILL[id] }}>
                {names[id]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {metrics.map(({ key, label }) => (
            <tr key={key} className="border-t border-line">
              <th className="py-1.5 pr-2 text-left font-semibold text-ink">{label}</th>
              {ORDER.map((id) => (
                <td key={id} className="px-1 py-1.5 text-right tabular-nums text-ink">
                  {signed(row[key][id])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-xs text-muted">{row.window[locale]}</p>
    </div>
  );
}
