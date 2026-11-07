import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/models")({ component: Models });

const BLOCKS = [
  {
    name: "United States",
    sink: "Equities, then houses",
    rows: [
      ["Broad money", "About $4.7T in 2000, $15.5T in early 2020, a jump past $21T by 2022, near $23T later."],
      ["Consumer prices", "Mostly 1–2% through the QE years, then a spike near 9% in 2022."],
      ["Assets", "The S&P and Case-Shiller both ran far ahead of the basket. Post-2020 housing jumped hard."],
      ["The Fed", "Zero rates and three QE rounds, a pandemic blast of purchases plus fiscal checks, then a fast hiking cycle."],
      ["People", "Immigration lifts headcount and spending, which lets more money exist per existing resident — and bids for housing."],
    ],
  },
  {
    name: "Russia",
    sink: "Apartments",
    rows: [
      ["Broad money", "Long stretches of double-digit growth. The ruble aggregate kept expanding through the 2020s."],
      ["Consumer prices", "A 4% target after the 2014 float, then renewed high single digits and worse when fiscal policy dominated."],
      ["Assets", "Secondary housing rose many times over in nominal rubles. Preferential mortgages were the policy sink."],
      ["The Bank of Russia", "Inflation targeting, a free float, then very high policy rates and capital controls."],
      ["Why it differs", "Without a deep equity market, the same injection reaches construction and the shop faster."],
    ],
  },
  {
    name: "Europe",
    sink: "Housing and sovereign bonds",
    rows: [
      ["Money", "Steady M3 growth and a balance sheet swollen by APP and the pandemic programme."],
      ["Consumer prices", "A long quiet period, then an energy-plus-money spike toward 10%."],
      ["The ECB", "Negative deposit rates, large-scale purchases, then hikes. Periphery debt stayed a political fact."],
      ["People", "Migration from outside the union added workers and consumers, which cushioned wages and strained rent."],
    ],
  },
  {
    name: "China",
    sink: "Property and investment",
    rows: [
      ["Broad money", "The largest stock in the world, growing much faster than US money for most of the period, slower recently."],
      ["Consumer prices", "Often subdued, and at times close to deflation, even while money was abundant."],
      ["Property", "A multi-decade boom that became a large share of activity, then a long correction."],
      ["The PBOC", "Reserve-ratio cuts, relending, mortgage relief. More rate-based tools, still heavy quantitative habits."],
    ],
  },
];

function Models() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <p className="text-xs font-semibold tracking-widest text-brass uppercase">Since 2000</p>
      <h1 className="mt-1 font-display text-4xl text-ink">Four money markets, four sinks.</h1>
      <p className="mt-4 text-lg text-muted">
        Same arithmetic, different plumbing. Figures are orders of magnitude from public series (central banks, FRED,
        World Bank), not a live feed. The replay uses these characters as baselines you can break.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {BLOCKS.map((b) => (
          <article key={b.name} className="rounded-2xl border border-line bg-surface p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl">{b.name}</h2>
              <p className="text-sm font-semibold text-teal">{b.sink}</p>
            </div>
            <dl className="mt-3 space-y-3">
              {b.rows.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-sm font-semibold">{k}</dt>
                  <dd className="text-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      <section className="mt-8 space-y-3">
        <h2 className="font-display text-2xl">Shared mechanics</h2>
        <p>
          Money growth above real output has to land somewhere. A deep market (US equities) soaks it as asset
          inflation. A property-heavy market (China, and Russia’s subsidized mortgages) soaks it as houses until the
          stock of unsold floors or angry buyers forces a stop. Immigration is a demand tool and a labor tool at once:
          more consumption, which justifies more money, and more workers, which raises capacity. Subsidies — checks,
          cheap mortgages, benefits paid to people who just arrived — pull that demand forward.
        </p>
        <p>
          Inflation is the indirect tax: it shrinks the real value of cash and of fixed nominal claims. A direct tax
          deletes money outright. Social spending does the opposite unless taxes rise with it. Illegal or irregular
          migration on those benefits is the same fiscal impulse with a different passport: consumption up, public
          balance sheet wider, housing tighter.
        </p>
      </section>

      <p className="mt-8">
        <Link to="/" className="font-semibold text-teal underline-offset-2 hover:underline">
          Open the replay
        </Link>
      </p>
    </main>
  );
}
