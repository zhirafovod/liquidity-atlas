import type { RegionId } from "@/lib/sim";

export type Bars = Record<RegionId, number | null>;

export type EpisodeCompare = {
  id: string;
  window: { en: string; ru: string };
  money: Bars;
  prices: Bars;
  housing: Bars;
  note: { en: string; ru: string };
  places: Record<RegionId, { en: string; ru: string }>;
};

const b = (usa: number | null, europe: number | null, russia: number | null, china: number | null): Bars => ({
  usa,
  europe,
  russia,
  china,
});

/** Percent change over one shared window. Null means the series was not comparable on those dates. */
export const EPISODE_COMPARE: EpisodeCompare[] = [
  {
    id: "us-checks",
    window: {
      en: "Money and prices: Feb 2020–Jun 2022. Housing: Q1 2020–Q2 2022.",
      ru: "Деньги и цены: фев 2020 – июн 2022. Жильё: I кв. 2020 – II кв. 2022.",
    },
    money: b(39.6, 21.3, 35.7, null),
    prices: b(13.8, 11.9, null, null),
    housing: b(35.1, 19.5, 50.1, 2.0),
    note: {
      en: "US money is M2, euro-area money is M3, Russian money is national M2. Housing is the BIS nominal residential index for all four, so the house bars are the same object. China money is left off this chart: on a year-end basis, 2019 to 2022, that M2 rose about 34%, which is a longer window.",
      ru: "Деньги США — M2, еврозоны — M3, России — M2 в национальном определении. Жильё у всех четырёх — номинальный индекс BIS, то есть один и тот же объект. Деньги Китая на этом графике нет: с конца 2019 по конец 2022 его M2 вырос примерно на 34%, но это более длинное окно.",
    },
    places: {
      usa: {
        en: "M2 +40%. The BIS house index +35% (Case-Shiller, a different index, was about +45% to June). The CPI index +14%. Checks reached households, so the basket did move, later than the houses.",
        ru: "M2 +40%. Индекс домов BIS +35% (Case-Shiller, другой индекс, к июню был около +45%). Индекс ИПЦ +14%. Чеки дошли до домохозяйств, поэтому корзина сдвинулась, но позже домов.",
      },
      europe: {
        en: "M3 +21%, houses +19%, the HICP index +12%. Same years, a smaller money jump and a smaller house jump.",
        ru: "M3 +21%, жильё +19%, индекс HICP +12%. Те же годы, меньше скачок денег и меньше скачок жилья.",
      },
      russia: {
        en: "National M2 +36% and houses +50%. The cheap mortgage was already pushing one price. There was no equity market doing the American job.",
        ru: "M2 +36%, жильё +50%. Льготная ипотека уже давила на одну цену. Фондового рынка, который делал американскую работу, не было.",
      },
      china: {
        en: "On the same BIS house index, +2%. The money was growing, and it was not bidding up this housing measure.",
        ru: "По тому же индексу жилья BIS — плюс 2%. Деньги росли и в эту меру цен на жильё не уходили.",
      },
    },
  },
  {
    id: "us-qe",
    window: {
      en: "Money and prices: Dec 2008–Dec 2014. Housing: Q4 2008–Q4 2014.",
      ru: "Деньги и цены: дек 2008 – дек 2014. Жильё: IV кв. 2008 – IV кв. 2014.",
    },
    money: b(42.9, 9.8, 143.6, null),
    prices: b(11.8, 9.1, 56.5, 16.0),
    housing: b(16.4, -4.5, 2.8, 20.3),
    note: {
      en: "Six years, not two. The US house bar is start to end: prices fell into 2012 and only then recovered, so +16% is not a smooth boom. Russia’s money bar includes the 2014 ruble break. China’s 2008 money level is not in the verified set, so that bar is absent. Russia and China price bars are the World Bank annual index; the US bar is CPI-U and the euro-area bar is HICP.",
      ru: "Шесть лет, не два. Столбец жилья США — от начала к концу: цены падали до 2012 и только потом отыграли, так что +16% — не ровный бум. Деньги России включают слом рубля в 2014. Уровень денег Китая на 2008 год в проверенном наборе нет, поэтому столбца нет. Цены России и Китая — годовой индекс Всемирного банка; США — CPI-U, еврозона — HICP.",
    },
    places: {
      usa: {
        en: "M2 +43% over six years, the CPI index +12%, houses +16% after the bust. Reserves were the series that exploded. The basket was not.",
        ru: "M2 +43% за шесть лет, индекс ИПЦ +12%, жильё +16% после обвала. Взрывались резервы. Не корзина.",
      },
      europe: {
        en: "M3 +10%, HICP +9%, houses −4%. This was the sovereign crisis, not a repeat of a deposit boom.",
        ru: "M3 +10%, HICP +9%, жильё −4%. Это долговой кризис, а не повтор бума вкладов.",
      },
      russia: {
        en: "M2 +144% and the price index +56%, houses flat. Do not read this as quiet American QE. The window contains 2014.",
        ru: "M2 +144%, индекс цен +56%, жильё почти на месте. Это не тихое американское QE. В окно попал 2014 год.",
      },
      china: {
        en: "Houses +20% and the price index +16%. The post-2008 stimulus went into building. The money bar is withheld on purpose.",
        ru: "Жильё +20%, индекс цен +16%. Стимул после 2008 ушёл в стройку. Столбец денег специально не поставлен.",
      },
    },
  },
  {
    id: "eu-gas",
    window: {
      en: "Money and prices: Dec 2021–Dec 2023. Housing: Q4 2021–Q4 2023.",
      ru: "Деньги и цены: дек 2021 – дек 2023. Жильё: IV кв. 2021 – IV кв. 2023.",
    },
    money: b(-3.4, 3.9, 48.5, 22.7),
    prices: b(9.9, 12.4, 20.2, 2.2),
    housing: b(12.7, 2.2, 27.0, -7.3),
    note: {
      en: "The 10.6% euro-area figure and the 9.1% US figure are peak year-on-year rates. The bars are the change in the price index across the two years, which is a different number. Russia’s price bar compounds the official December year-on-year rates for 2022 and 2023. China’s price bar is the World Bank annual index, 2021 to 2023. China’s money bar uses end-2021 and end-2023 M2.",
      ru: "10,6% в еврозоне и 9,1% в США — это пиковые приросты за двенадцать месяцев. Столбцы — изменение индекса цен за два года, другая величина. Цена России — сложенные официальные декабрьские приросты за 2022 и 2023. Цена Китая — годовой индекс Всемирного банка, 2021–2023. Деньги Китая — M2 на конец 2021 и конец 2023.",
    },
    places: {
      usa: {
        en: "M2 fell 3%. The CPI index was still +10% because the 2022 jump was passing through. Houses +13%. The flood was over; the prices were not.",
        ru: "M2 снизился на 3%. Индекс ИПЦ всё ещё +10%: через него проходил скачок 2022 года. Жильё +13%. Поток кончился, цены нет.",
      },
      europe: {
        en: "M3 +4%, the HICP index +12%, houses +2%. The gas bill did what a fresh flood of money did not.",
        ru: "M3 +4%, индекс HICP +12%, жильё +2%. Счёт за газ сделал то, чего не сделал новый поток денег.",
      },
      russia: {
        en: "M2 +48%, December-to-December prices +20%, houses +27%. Money, the basket and the apartment moved together.",
        ru: "M2 +48%, цены от декабря к декабрю +20%, жильё +27%. Деньги, корзина и квартира шли вместе.",
      },
      china: {
        en: "M2 +23%, prices +2%, houses −7%. Money up, the basket quiet, the house index already falling.",
        ru: "M2 +23%, цены +2%, жильё −7%. Деньги вверх, корзина тихая, индекс жилья уже падал.",
      },
    },
  },
  {
    id: "ru-rate",
    window: {
      en: "Money and prices: Mar 2022–Sep 2022. Housing: Q1 2022–Q3 2022.",
      ru: "Деньги и цены: мар 2022 – сен 2022. Жильё: I кв. 2022 – III кв. 2022.",
    },
    money: b(-1.1, 3.0, 10.1, null),
    prices: b(3.0, 4.2, null, null),
    housing: b(2.2, 3.2, 3.4, -1.7),
    note: {
      en: "A half-year, so the bars look small next to the year-on-year headlines. US CPI was +9.1% in the year to June; the index itself rose 3% from March to September. Russia’s April print was +17.8% year on year. That is not the six-month change in the index, so it is not drawn as a bar.",
      ru: "Полгода, поэтому столбцы выглядят скромно рядом с годовыми заголовками. ИПЦ США был +9,1% за год к июню; сам индекс с марта по сентябрь вырос на 3%. Апрельский показатель России — +17,8% к прошлому году. Это не изменение индекса за шесть месяцев, поэтому столбцом оно не нарисовано.",
    },
    places: {
      usa: {
        en: "M2 was already shrinking. Houses barely moved. The year-on-year CPI peak was the echo of 2021, not a new flood in these six months.",
        ru: "M2 уже сжимался. Жильё почти не двигалось. Годовой пик ИПЦ был эхом 2021 года, а не новым потоком за эти шесть месяцев.",
      },
      europe: {
        en: "M3 +3% and the HICP index +4% in six months. The October year-on-year rate of 10.6% had been built by a year of energy, not by this half-year of deposits.",
        ru: "M3 +3%, индекс HICP +4% за шесть месяцев. Годовые 10,6% в октябре собрал год энергии, а не это полугодие вкладов.",
      },
      russia: {
        en: "M2 +10% in six months. The key rate was 20% at the start of the window and 7.5% by December. Houses +3%. The shock showed up in the year-on-year CPI, not in a house boom.",
        ru: "M2 +10% за шесть месяцев. Ключевая ставка в начале окна была 20%, к декабрю 7,5%. Жильё +3%. Удар вышел в годовой ИПЦ, не в бум квартир.",
      },
      china: {
        en: "Houses −2% on the BIS index. No monthly money figure is plotted.",
        ru: "Жильё −2% по индексу BIS. Помесячные деньги на график не поставлены.",
      },
    },
  },
  {
    id: "ru-mortgage",
    window: {
      en: "Money and prices: Dec 2019–Dec 2023. Housing: Q1 2020–Q4 2023.",
      ru: "Деньги и цены: дек 2019 – дек 2023. Жильё: I кв. 2020 – IV кв. 2023.",
    },
    money: b(35.2, 24.0, 90.4, 47.1),
    prices: b(19.4, 17.7, 36.7, 5.7),
    housing: b(42.2, 17.2, 59.5, -3.8),
    note: {
      en: "Russia’s price bar compounds the December year-on-year CPI rates for 2020, 2021, 2022 and 2023 from the Bank of Russia table. China’s price bar is the World Bank annual index. China’s money bar is M2, end-2019 to end-2023.",
      ru: "Столбец цен России — сложенные декабрьские приросты ИПЦ за 2020, 2021, 2022 и 2023 из таблицы Банка России. Столбец цен Китая — годовой индекс Всемирного банка. Деньги Китая — M2 с конца 2019 по конец 2023.",
    },
    places: {
      usa: {
        en: "M2 +35%, the CPI index +19%, houses +42%. The checks and the later rate hikes are both inside this window.",
        ru: "M2 +35%, индекс ИПЦ +19%, жильё +42%. В этом окне и чеки, и последующие повышения ставки.",
      },
      europe: {
        en: "M3 +24%, HICP +18%, houses +17%. Real, and smaller than the Russian apartment move.",
        ru: "M3 +24%, HICP +18%, жильё +17%. По-настоящему, и меньше российского движения квартир.",
      },
      russia: {
        en: "M2 +90%, December-to-December prices +37%, houses +60%. The subsidy was aimed at one price. It hit it, and the basket still moved.",
        ru: "M2 +90%, цены от декабря к декабрю +37%, жильё +60%. Субсидия целилась в одну цену. Попала, и корзина всё равно сдвинулась.",
      },
      china: {
        en: "M2 +47%, prices +6%, houses −4% by the end of the window. Credit did not land in the basket, and the house bid had already turned.",
        ru: "M2 +47%, цены +6%, жильё к концу окна −4%. Кредит в корзину не сел, а спрос на жильё уже развернулся.",
      },
    },
  },
  {
    id: "cn-property",
    window: {
      en: "Money: Dec 2021–Dec 2025. Prices: Dec 2021–Dec 2024. Housing: Q4 2021–Q4 2025.",
      ru: "Деньги: дек 2021 – дек 2025. Цены: дек 2021 – дек 2024. Жильё: IV кв. 2021 – IV кв. 2025.",
    },
    money: b(3.9, 11.0, 96.0, 42.8),
    prices: b(13.1, 15.1, 30.6, 2.4),
    housing: b(17.7, 12.0, 70.0, -20.1),
    note: {
      en: "Price bars stop at 2024 so the US CPI-U and euro-area HICP share an end date. Russia and China price bars are the World Bank annual index, 2021 to 2024. Housing runs to the fourth quarter of 2025 on the BIS index. China’s money bar is M2 from end-2021 to the PBOC’s end-2025 figure of ¥340.29 trillion.",
      ru: "Столбцы цен обрываются на 2024 годе, чтобы CPI-U США и HICP еврозоны кончались в одну дату. Цены России и Китая — годовой индекс Всемирного банка, 2021–2024. Жильё доведено до IV квартала 2025 по индексу BIS. Деньги Китая — M2 с конца 2021 до цифры НБК на конец 2025, 340,29 трлн юаней.",
    },
    places: {
      usa: {
        en: "M2 +4% across four years. Houses +18%. The CPI index +13% to the end of 2024. The exciting money growth was already over.",
        ru: "M2 +4% за четыре года. Жильё +18%. Индекс ИПЦ +13% к концу 2024. Бурный рост денег уже закончился.",
      },
      europe: {
        en: "M3 +11%, HICP +15% to December 2024, houses +12%. A normal expansion next to the other three.",
        ru: "M3 +11%, HICP +15% к декабрю 2024, жильё +12%. Обычное расширение на фоне трёх остальных.",
      },
      russia: {
        en: "M2 +96% and houses +70%. The apartment was still the sink, and a more expensive one.",
        ru: "M2 +96% и жильё +70%. Квартира всё ещё была стоком, только более дорогим.",
      },
      china: {
        en: "M2 +43%, the price index +2%, houses −20%. Money kept growing after the property bid broke. The sink ran in reverse.",
        ru: "M2 +43%, индекс цен +2%, жильё −20%. Деньги росли после того, как спрос на жильё сломался. Сток пошёл в обратную сторону.",
      },
    },
  },
];

export function compareFor(id: string) {
  return EPISODE_COMPARE.find((row) => row.id === id);
}

/** One link each, for the series drawn on the shared chart. */
export const CHART_SOURCES: { label: { en: string; ru: string }; href: string }[] = [
  { label: { en: "US M2", ru: "M2 США" }, href: "https://fred.stlouisfed.org/series/M2SL" },
  {
    label: { en: "Euro area M3", ru: "M3 еврозоны" },
    href: "https://data.ecb.europa.eu/data/datasets/BSI/BSI.M.U2.Y.V.M30.X.1.U2.2300.Z01.E",
  },
  { label: { en: "Russia M2", ru: "M2 России" }, href: "https://www.cbr.ru/eng/statistics/macro_itm/dkfs/" },
  {
    label: { en: "China M2", ru: "M2 Китая" },
    href: "https://www.pbc.gov.cn/en/3688247/3688978/3709137/2026022614345032797/index.html",
  },
  { label: { en: "US CPI", ru: "ИПЦ США" }, href: "https://fred.stlouisfed.org/series/CPIAUCSL" },
  {
    label: { en: "Euro area HICP", ru: "HICP еврозоны" },
    href: "https://data.ecb.europa.eu/data/datasets/ICP/ICP.M.U2.N.000000.4.INX",
  },
  { label: { en: "Russia CPI", ru: "ИПЦ России" }, href: "https://www.cbr.ru/hd_base/infl/" },
  { label: { en: "World Bank CPI", ru: "ИПЦ Всемирного банка" }, href: "https://data.worldbank.org/indicator/FP.CPI.TOTL" },
  { label: { en: "BIS housing, US", ru: "Жильё BIS, США" }, href: "https://fred.stlouisfed.org/series/QUSN628BIS" },
  { label: { en: "BIS housing, euro area", ru: "Жильё BIS, еврозона" }, href: "https://fred.stlouisfed.org/series/QXMN628BIS" },
  { label: { en: "BIS housing, Russia", ru: "Жильё BIS, Россия" }, href: "https://fred.stlouisfed.org/series/QRUN628BIS" },
  { label: { en: "BIS housing, China", ru: "Жильё BIS, Китай" }, href: "https://fred.stlouisfed.org/series/QCNN628BIS" },
];
