import type { RegionId } from "@/lib/sim";

export type Cell = { en: string; ru: string; source: string; href: string };

export type FactRow = {
  id: string;
  en: string;
  ru: string;
  cells: Record<RegionId, Cell>;
};

const fred = "https://fred.stlouisfed.org/series/M2SL";
const bls = "https://www.bls.gov/news.release/archives/cpi_07132022.htm";
const cs = "https://fred.stlouisfed.org/series/CSUSHPINSA";
const sp = "https://press.spglobal.com/2022-08-30-S-P-CORELOGIC-CASE-SHILLER-INDEX-DECELERATED-IN-JUNE";
const ecb = "https://data.ecb.europa.eu/data/datasets/BSI/BSI.M.U2.Y.V.M30.X.1.U2.2300.Z01.E";
const bdF = "https://webstat.banque-france.fr/en/catalogue/bsi/BSI.M.U2.Y.V.M30.X.1.U2.2300.Z01.E";
const hicp = "https://ec.europa.eu/eurostat/web/products-euro-indicators/w/2-17112022-ap";
const cbrM2 = "https://www.cbr.ru/vfs/eng/statistics/credit_statistics/monetary_agg_e.xlsx";
const cbrPage = "https://www.cbr.ru/eng/statistics/macro_itm/dkfs/";
const cbrInf = "https://www.cbr.ru/hd_base/infl/";
const rosstatHousing = "https://rosstat.gov.ru/statistics/price";
const housingMirror = "https://roschart.ru/en/dataset/sdds-housing-market-price-indices-dopolnitelnye-pokazateli";
const pboc = "https://www.pbc.gov.cn/en/3688247/3688978/3709137/2026022614345032797/index.html";
const wb = "https://data.worldbank.org/indicator/FM.LBL.BMNY.CN";
const rates = "https://www.interestrates.help/";
const fed = "https://www.federalreserve.gov/monetarypolicy/openmarket.htm";
const ecbRates = "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/key_ecb_interest_rates/html/index.en.html";
const cbrRate = "https://www.cbr.ru/hd_base/KeyRate/";
const lpr = "https://www.pbc.gov.cn/en/3688006/index.html";

export const FACTS: FactRow[] = [
  {
    id: "m2000",
    en: "Broad money, around 2000",
    ru: "Широкие деньги, около 2000",
    cells: {
      usa: {
        en: "$4.67 trillion. M2, January 2000.",
        ru: "4,67 трлн долларов. M2, январь 2000.",
        source: "FRED M2SL",
        href: fred,
      },
      europe: {
        en: "€4.71 trillion. M3, January 2000.",
        ru: "4,71 трлн евро. M3, январь 2000.",
        source: "ECB BSI",
        href: ecb,
      },
      russia: {
        en: "₽1.15 trillion. National M2, December 2000.",
        ru: "1,15 трлн рублей. M2 в национальном определении, декабрь 2000.",
        source: "Bank of Russia",
        href: cbrM2,
      },
      china: {
        en: "Not shown. The 2000 PBOC M2 vintage is not the series used in the later rows.",
        ru: "Не ставим. Винтаж M2 НБК за 2000 год — не тот ряд, что в строках ниже.",
        source: "PBOC",
        href: pboc,
      },
    },
  },
  {
    id: "m2020",
    en: "Broad money, before the pandemic",
    ru: "Широкие деньги перед пандемией",
    cells: {
      usa: {
        en: "$15.49 trillion. M2, February 2020.",
        ru: "15,49 трлн долларов. M2, февраль 2020.",
        source: "FRED M2SL",
        href: fred,
      },
      europe: {
        en: "€13.14 trillion. M3, February 2020.",
        ru: "13,14 трлн евро. M3, февраль 2020.",
        source: "ECB BSI",
        href: ecb,
      },
      russia: {
        en: "₽51.66 trillion. National M2, December 2019.",
        ru: "51,66 трлн рублей. M2, декабрь 2019.",
        source: "Bank of Russia",
        href: cbrM2,
      },
      china: {
        en: "¥214.8 trillion. World Bank broad money, 2020. Not identical to PBOC M2.",
        ru: "214,8 трлн юаней. Широкие деньги Всемирного банка, 2020. Это не M2 НБК.",
        source: "World Bank",
        href: wb,
      },
    },
  },
  {
    id: "mnow",
    en: "Broad money, latest reading",
    ru: "Широкие деньги, последнее чтение",
    cells: {
      usa: {
        en: "$23.41 trillion. M2, September 2026.",
        ru: "23,41 трлн долларов. M2, сентябрь 2026.",
        source: "FRED M2SL",
        href: fred,
      },
      europe: {
        en: "€17.72 trillion. M3, September 2026.",
        ru: "17,72 трлн евро. M3, сентябрь 2026.",
        source: "ECB via Banque de France",
        href: bdF,
      },
      russia: {
        en: "₽137.57 trillion. National M2, September 2026.",
        ru: "137,57 трлн рублей. M2, сентябрь 2026.",
        source: "Bank of Russia",
        href: cbrPage,
      },
      china: {
        en: "¥340.29 trillion. PBOC M2, end-December 2025, up 8.5% on the year.",
        ru: "340,29 трлн юаней. M2 НБК на конец декабря 2025, плюс 8,5% за год.",
        source: "PBOC",
        href: pboc,
      },
    },
  },
  {
    id: "jump",
    en: "How far money moved, early 2020 to the 2022 high",
    ru: "Насколько выросли деньги с начала 2020 до пика 2022",
    cells: {
      usa: {
        en: "About +41%. From $15.49 trillion in February 2020 to $21.77 trillion in March 2022.",
        ru: "Около +41%. С 15,49 трлн долларов в феврале 2020 до 21,77 трлн в марте 2022.",
        source: "FRED M2SL",
        href: fred,
      },
      europe: {
        en: "About +23%. M3 from €13.14 trillion in February 2020 to €16.20 trillion in September 2022.",
        ru: "Около +23%. M3 с 13,14 трлн евро в феврале 2020 до 16,20 трлн в сентябре 2022.",
        source: "ECB BSI",
        href: ecb,
      },
      russia: {
        en: "From ₽51.66 trillion in December 2019 to ₽66.25 trillion in December 2021, about +28%. The faster jump came with the 2022–24 budgets.",
        ru: "С 51,66 трлн рублей в декабре 2019 до 66,25 трлн в декабре 2021, около +28%. Более резкий рост пришёл с бюджетами 2022–24.",
        source: "Bank of Russia",
        href: cbrM2,
      },
      china: {
        en: "No matching PBOC span on this page. By end-2025 M2 was still growing at 8.5%, not a 2022 blow-off.",
        ru: "Сопоставимого отрезка M2 НБК здесь нет. К концу 2025 M2 всё ещё рос на 8,5%, без американского скачка 2022 года.",
        source: "PBOC",
        href: pboc,
      },
    },
  },
  {
    id: "cpi",
    en: "Consumer prices, 2022 peak",
    ru: "Потребительские цены, пик 2022",
    cells: {
      usa: {
        en: "CPI-U +9.1% in the year to June 2022. Highest since November 1981.",
        ru: "ИПЦ +9,1% за год к июню 2022. Выше не было с ноября 1981.",
        source: "BLS",
        href: bls,
      },
      europe: {
        en: "HICP +10.6% in October 2022. Energy did more than half of that peak.",
        ru: "HICP +10,6% в октябре 2022. Больше половины пика дала энергия.",
        source: "Eurostat",
        href: hicp,
      },
      russia: {
        en: "+17.83% in April 2022. The key rate that month was 17%, after 20% in February.",
        ru: "+17,83% в апреле 2022. Ключевая ставка в том месяце 17%, после 20% в феврале.",
        source: "Bank of Russia / Rosstat",
        href: cbrInf,
      },
      china: {
        en: "No comparable spike. Prices later sat near zero while money kept growing. See the property episode.",
        ru: "Сопоставимого скачка не было. Позже цены стояли около нуля, а деньги росли. См. эпизод с жильём.",
        source: "PBOC",
        href: pboc,
      },
    },
  },
  {
    id: "assets",
    en: "Where the 2020–22 money showed up",
    ru: "Куда сели деньги 2020–22",
    cells: {
      usa: {
        en: "Houses first. Case-Shiller national index from 213.2 in February 2020 to 308.1 in June 2022, about +45%. The year to June 2022 alone was +18.0%.",
        ru: "Сначала дома. Национальный Case-Shiller с 213,2 в феврале 2020 до 308,1 в июне 2022, около +45%. За год к июню 2022 индекс вырос на 18,0%.",
        source: "FRED CSUSHPINSA / S&P",
        href: cs,
      },
      europe: {
        en: "Sovereign bonds while the ECB was buying, then the energy bill. HICP does not include owner-occupied housing.",
        ru: "Гособлигации, пока ЕЦБ покупал, потом счёт за энергию. HICP не включает жильё, в котором живут собственники.",
        source: "Eurostat",
        href: hicp,
      },
      russia: {
        en: "Apartments. Rosstat secondary-market index (2010 = 100) from 130.4 in Q1 2020 to 202.6 in Q4 2023, about +55%.",
        ru: "Квартиры. Индекс вторичного рынка Росстата (2010 = 100) со 130,4 в I кв. 2020 до 202,6 в IV кв. 2023, около +55%.",
        source: "Rosstat via Roschart",
        href: housingMirror,
      },
      china: {
        en: "Property and investment, until the 2021 rules on developer leverage. Consumer prices did not take the hit.",
        ru: "Недвижимость и инвестиции, пока в 2021 году не ограничили долг застройщиков. Потребительские цены удар не приняли.",
        source: "PBOC",
        href: pboc,
      },
    },
  },
  {
    id: "rate",
    en: "Policy rate now",
    ru: "Ставка сейчас",
    cells: {
      usa: {
        en: "Federal funds target 3.75–4.00%. Held on 28 October 2026, after a hike in September. The 2023 peak was 5.25–5.50%.",
        ru: "Цель по федеральным фондам 3,75–4,00%. Удержана 28 октября 2026 после повышения в сентябре. Пик 2023 года был 5,25–5,50%.",
        source: "Fed / rate calendars",
        href: fed,
      },
      europe: {
        en: "Deposit facility 2.50%. Held on 29 October 2026. The 2023 peak was 4.00%.",
        ru: "Ставка по депозитам 2,50%. Удержана 29 октября 2026. Пик 2023 года был 4,00%.",
        source: "ECB",
        href: ecbRates,
      },
      russia: {
        en: "Key rate 14%. Last cut on 27 July 2026, held in October. Far below the 20% of February 2022.",
        ru: "Ключевая ставка 14%. Последнее снижение 27 июля 2026, в октябре удержали. Далеко от 20% февраля 2022.",
        source: "Bank of Russia",
        href: cbrRate,
      },
      china: {
        en: "One-year loan prime rate 3.00%, five-year 3.50%. Unchanged on 20 October 2026.",
        ru: "Годовая LPR 3,00%, пятилетняя 3,50%. Без изменений 20 октября 2026.",
        source: "PBOC",
        href: lpr,
      },
    },
  },
];

export const RATE_NOTE = {
  en: "Policy rates are the setting reported for early November 2026. The official series are linked; a later decision will move them.",
  ru: "Ставки — как они стояли в начале ноября 2026. Ссылки ведут на официальные ряды: следующее решение их сдвинет.",
};

export const DEFINITION_NOTE = {
  en: "These are not one money measure in four currencies. US figures are the Fed’s M2 (FRED M2SL). In May 2020 savings deposits were reclassified into M1; M2SL is the continuous stock. Euro-area figures are ECB M3, seasonally and working-day adjusted, in millions of euro. Russia is the Bank of Russia national-definition M2, ruble cash and ruble deposits only, in billions of rubles. China mixes two labels on purpose: the 2020 cell is World Bank broad money, the latest cell is the PBOC’s own M2. Do not subtract one from the other.",
  ru: "Это не одна денежная масса в четырёх валютах. США — M2 ФРС (FRED M2SL). В мае 2020 сберегательные вклады перенесли в M1; M2SL — непрерывный запас. Еврозона — M3 ЕЦБ, с поправкой на сезон и рабочие дни, в миллионах евро. Россия — M2 Банка России в национальном определении: только рублёвая наличность и рублёвые вклады, в миллиардах рублей. У Китая две разные подписи нарочно: 2020 год — широкие деньги Всемирного банка, последняя клетка — собственный M2 НБК. Вычитать одно из другого нельзя.",
};

export const HOUSING_NOTE = {
  en: "The US house figure uses FRED CSUSHPINSA (213.175 in February 2020, 308.055 in June 2022). The +18.0% is the separate year-on-year print in the S&P release for June 2022, not the two-year change. The Russian apartment figure is the Rosstat secondary-market price index, 2010 = 100, as republished from the official SDDS table.",
  ru: "Цифра по домам США — FRED CSUSHPINSA (213,175 в феврале 2020 и 308,055 в июне 2022). Плюс 18,0% — отдельный годовой прирост в релизе S&P за июнь 2022, не изменение за два года. Цифра по квартирам России — индекс цен вторичного рынка Росстата, 2010 = 100, как он перепечатан из официальной таблицы ССРД.",
};

export { sp, rosstatHousing, rates };
