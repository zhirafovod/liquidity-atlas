# Liquidity Atlas

Interactive replay of money, markets and inflation for the United States, Russia, Europe and China, 1990–2050. English is the default. Russian is at `/ru`.

The model is an illustration of quantity-theory arithmetic (`MV = PQ`) with a share of the gap parked in assets. It is not a forecast and not investment advice. Dated figures on the comparison and episode pages cite the series they come from.

## Pages

- `/` — levers, a sentence that says where the gap went, charts
- `/episodes` — six policy episodes and what prices did
- `/analysis` — the mechanism, and where it fails
- `/models` — one comparison table, four countries
- `/ru`, `/ru/episodes`, `/ru/analysis`, `/ru/models` — the same pages in Russian

## Source map

- `src/lib/sim.ts` — baselines and the year-by-year model
- `src/lib/facts.ts` — comparison figures and source links
- `src/lib/episodes.ts` — the six episodes
- `src/lib/copy.ts` — English and Russian interface copy
- `src/components/simulator.tsx` — replay UI

Built as a TanStack Start app. `npm install` then `npm run dev`.
