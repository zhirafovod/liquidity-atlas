import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/analysis")({ component: Analysis });

function Analysis() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <p className="text-xs font-semibold tracking-widest text-brass uppercase">The mechanism</p>
      <h1 className="mt-1 font-display text-4xl text-ink">The drain, the debt, and the pencil.</h1>
      <p className="mt-4 text-lg text-muted">
        Can a central bank keep expanding money if AI lifts real output — and why the same expansion shows up in shop
        prices in one country and in asset prices in another?
      </p>

      <section className="mt-8 space-y-4">
        <h2 className="font-display text-2xl">A stock-market drain</h2>
        <p>
          Start with a 100-unit economy, half of it already sitting on the stock exchange, throwing off 10 in tax. The
          state needs 20. Print 100 with no drain and you get a 50% rise in prices: the extra tax is paid in cheaper
          paper. Put a drain in the stock market and those 100 units turn the economy once, raise real tax take, and
          lift market capitalization toward 150, while bread stays put. Debt, on this telling, is a number people like
          to discuss. Interest is paid in the same paper.
        </p>
        <p>
          Russia’s drain is not the exchange. It is apartments, then construction, then the rest of the chain. Pour in
          100 and consumer inflation leaves the ground. The quantity-theory reply is simpler: if money rises 3% and
          output does not, the pencil costs 3% more and benefits do not. If robots double output, prices fall, or the
          central bank can print enough to stop them falling — and fixed nominal debt gets cheaper in real terms. A
          nominal transaction is not a meal. GDP can rise on paper without anyone eating better.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl">What lines up</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong>Financialization.</strong> After the big balance-sheet expansions, stocks and houses often moved
            long before the consumer basket. Liquidity preferred assets while velocity in the goods economy stayed low.
          </li>
          <li>
            <strong>Modern monetary theory</strong> (Stephanie Kelton, Warren Mosler, L. Randall Wray): a government
            that issues its own floating currency does not run out of that currency. The constraint is real resources
            and inflation. Taxes delete money. Debt is the private sector’s financial asset.
          </li>
          <li>
            <strong>Quantity theory</strong> (Milton Friedman, Steve Hanke): over a long enough window, money growth
            above real output shows up as higher prices. Hanke’s lag story puts assets first and the basket later.
          </li>
          <li>
            <strong>Cantillon effects.</strong> New money does not arrive evenly. Banks and asset owners bid first.
            That is a distribution, not a free lunch.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl">Where it breaks</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            The 2020–22 surge in broad money plus checks to households did reach the basket. US consumer inflation
            peaked near 9%. The sink is a delay, not a seal.
          </li>
          <li>House prices are prices. People who do not already own the asset pay them as rent or a down payment.</li>
          <li>Coupon payments are a real transfer to bondholders even when the coupon is fiat.</li>
          <li>
            A shallow market (Russia, preferential mortgages included) routes the same printing into goods faster.
            High policy rates then have to chase it.
          </li>
          <li>Velocity can rise. Politics likes to spend. Productivity from AI is uneven and not owed to anyone.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl">Economists, briefly</h2>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="bg-paper-2 text-ink">
              <tr>
                <th className="px-3 py-2 font-semibold">Name</th>
                <th className="px-3 py-2 font-semibold">Stance on money and markets</th>
              </tr>
            </thead>
            <tbody>
              <Row name="Stephanie Kelton" text="Deficits are fine until real capacity runs out. Inflation, not the bond vigilante, is the stop sign." />
              <Row name="Warren Mosler / Wray" text="Sovereign currency is a public monopoly. Taxes and spending steer demand." />
              <Row name="Steve Hanke" text="Broad money growth leads asset prices, then goods prices. Excess growth builds bubbles." />
              <Row name="Ray Dalio" text="Debt cycles end in deleveraging, printing, or a cheaper currency." />
              <Row name="Lyn Alden" text="Separate monetary inflation, asset inflation and consumer inflation. They do not move together." />
              <Row name="Richard Werner" text="Bank credit, not the printing press alone, creates the deposits that bid for assets." />
              <Row name="Olivier Blanchard" text="High public debt can persist when the interest rate stays under the growth rate." />
              <Row name="Austrian line" text="Cheap money misdirects investment. The asset boom is the distortion, not a harmless sink." />
            </tbody>
          </table>
        </div>
      </section>

      <p className="mt-8">
        <Link to="/" className="font-semibold text-teal underline-offset-2 hover:underline">
          Try it on the replay
        </Link>
        {" · "}
        <Link to="/models" className="font-semibold text-teal underline-offset-2 hover:underline">
          Four economies since 2000
        </Link>
      </p>
    </main>
  );
}

function Row({ name, text }: { name: string; text: string }) {
  return (
    <tr className="border-t border-line align-top">
      <td className="px-3 py-2 font-semibold">{name}</td>
      <td className="px-3 py-2 text-muted">{text}</td>
    </tr>
  );
}
