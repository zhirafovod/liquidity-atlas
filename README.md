# Liquidity Atlas

Interactive replay of money, markets and inflation for the United States, Russia, Europe and China, 1990–2050.

The model is an illustration of quantity-theory arithmetic (`MV = PQ`) with an asset-absorption share — the “drain” that can send new money into stocks and housing instead of the shop. It is not a forecast and not investment advice.

## Pages

- `/` — region, scenario presets, sliders, playhead, charts
- `/analysis` — the conversation, MMT, quantity theory, Cantillon effects, objections
- `/models` — what each economy did with money since 2000

## Source map

- `src/lib/sim.ts` — baselines and the year-by-year model
- `src/components/simulator.tsx` — replay UI
- `src/routes/analysis.tsx`, `src/routes/models.tsx` — the essays

Built as a TanStack Start app. `npm install` then `npm run dev`.
