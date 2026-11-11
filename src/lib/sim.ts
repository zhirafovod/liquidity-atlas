export type RegionId = "usa" | "russia" | "europe" | "china";

export type Params = {
  moneyGrowth: number;
  productivity: number;
  aiBoost: number;
  immigration: number;
  absorption: number;
  fiscalImpulse: number;
};

export type Point = {
  year: number;
  cpi: number;
  stock: number;
  housing: number;
  gdp: number;
  debt: number;
  money: number;
  realWage: number;
};

export const REGIONS: {
  id: RegionId;
  name: string;
  blurb: string;
  sink: string;
}[] = [
  {
    id: "usa",
    name: "США",
    blurb: "Глубокие фондовые рынки впитывают большую долю новых денег ещё до кассы.",
    sink: "Акции и жильё",
  },
  {
    id: "russia",
    name: "Россия",
    blurb: "Мелкие рынки капитала. Лишние рубли бьют по квартирам, стройке, потом по ценам в магазине.",
    sink: "Недвижимость",
  },
  {
    id: "europe",
    name: "Европа",
    blurb: "QE и миграция извне вместе расширяют спрос и рабочую силу.",
    sink: "Жильё и облигации",
  },
  {
    id: "china",
    name: "Китай",
    blurb: "Очень быстрый рост денег, в основном в недвижимости и инвестициях, пока не упирается в мощности.",
    sink: "Недвижимость",
  },
];

export const BASELINES: Record<RegionId, Params> = {
  usa: {
    moneyGrowth: 6.2,
    productivity: 1.9,
    aiBoost: 1.1,
    immigration: 0.4,
    absorption: 0.72,
    fiscalImpulse: 2.4,
  },
  russia: {
    moneyGrowth: 13,
    productivity: 1.3,
    aiBoost: 0.3,
    immigration: 0.12,
    absorption: 0.26,
    fiscalImpulse: 4.6,
  },
  europe: {
    moneyGrowth: 5.1,
    productivity: 1.05,
    aiBoost: 0.7,
    immigration: 0.55,
    absorption: 0.58,
    fiscalImpulse: 2.2,
  },
  china: {
    moneyGrowth: 11.5,
    productivity: 5.2,
    aiBoost: 1.4,
    immigration: 0.04,
    absorption: 0.46,
    fiscalImpulse: 3.8,
  },
};

export const PRESETS: { id: string; label: string; hint: string; patch: Partial<Params> }[] = [
  { id: "path", label: "Базовый путь", hint: "Характер каждого региона после 2000 года", patch: {} },
  {
    id: "print",
    label: "Открыть станок",
    hint: "Быстрее деньги, сильнее фискальный импульс",
    patch: { moneyGrowth: 14, fiscalImpulse: 6 },
  },
  {
    id: "ai",
    label: "ИИ и производительность",
    hint: "Роботы поднимают реальный выпуск после 2020",
    patch: { aiBoost: 3.4, productivity: 2.4 },
  },
  {
    id: "sink",
    label: "Глубокий сток",
    hint: "Почти вся лишняя ликвидность остаётся в активах",
    patch: { absorption: 0.9 },
  },
  {
    id: "goods",
    label: "Нет финансового стока",
    hint: "Новые деньги торгуются за еду и аренду",
    patch: { absorption: 0.08 },
  },
  {
    id: "people",
    label: "Всплеск миграции",
    hint: "Больше потребителей и больше работников",
    patch: { immigration: 1.4 },
  },
];

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

/** Illustrative replay of MV = PQ with an asset-absorption share. Not a forecast. */
export function simulate(params: Params): Point[] {
  const points: Point[] = [];
  let money = 100;
  let gdp = 100;
  let debt = 55;
  let stock = 100;
  let housing = 100;
  let wage = 100;

  for (let year = 1990; year <= 2050; year++) {
    const ai = year >= 2020 ? params.aiBoost : 0;
    const gQ = (params.productivity + ai) / 100;
    const gPop = params.immigration / 100;
    const gM = params.moneyGrowth / 100;
    const fiscal = params.fiscalImpulse / 100;
    const capacity = gQ + gPop * 0.22;
    const pressure = gM + fiscal * 0.55 + gPop * 0.28 - capacity;
    const cpi = clamp(pressure * (1 - params.absorption) * 100, -2, 28);
    const asset = pressure * params.absorption * 130 + Math.max(0, cpi) * 0.22;

    money *= 1 + gM;
    gdp *= 1 + gQ + gPop * 0.2;
    stock *= 1 + asset / 100;
    housing *= 1 + (asset * 0.72 + Math.max(0, cpi) * 0.55) / 100;
    wage *= 1 + gQ * 0.55 - Math.max(0, cpi) / 100 * 0.35;
    debt = debt * (1 + Math.max(-0.02, gM * 0.42 + fiscal * 0.15 - gQ * 0.25)) + fiscal * 8;

    points.push({
      year,
      cpi: round1(cpi),
      stock: round1(stock),
      housing: round1(housing),
      gdp: round1(gdp),
      debt: round1(debt),
      money: round1(money),
      realWage: round1(wage),
    });
  }
  return points;
}

export function sliceTo(points: Point[], year: number) {
  const i = points.findIndex((p) => p.year === year);
  return points.slice(0, (i < 0 ? points.length : i) + 1);
}
