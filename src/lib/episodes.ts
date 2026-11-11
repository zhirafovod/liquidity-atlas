import type { RegionId, Params } from "@/lib/sim";

export type Episode = {
  id: string;
  region: RegionId;
  year: number;
  patch: Partial<Params>;
  title: { en: string; ru: string };
  when: { en: string; ru: string };
  did: { en: string; ru: string };
  happened: { en: string; ru: string };
  lesson: { en: string; ru: string };
  source: { label: string; href: string };
};

export const EPISODES: Episode[] = [
  {
    id: "us-checks",
    region: "usa",
    year: 2021,
    patch: { moneyGrowth: 18, fiscalImpulse: 8, absorption: 0.7, productivity: 1.6 },
    title: { en: "Checks, then the basket", ru: "Чеки, потом касса" },
    when: { en: "United States, 2020–22", ru: "США, 2020–22" },
    did: {
      en: "The Fed bought bonds and Congress sent checks. Household deposits jumped. M2 went from $15.49 trillion in February 2020 to $21.77 trillion in March 2022, about 41%.",
      ru: "ФРС покупала облигации, Конгресс разослал чеки. Вклады домохозяйств прыгнули. M2 вырос с 15,49 трлн долларов в феврале 2020 до 21,77 трлн в марте 2022, примерно на 41%.",
    },
    happened: {
      en: "Assets moved first. The Case-Shiller national house index rose about 45% from February 2020 to June 2022. The consumer basket came later: CPI-U was up 9.1% in the year to June 2022. The funds rate was then taken to 5.25–5.50%.",
      ru: "Сначала двинулись активы. Национальный индекс домов Case-Shiller вырос примерно на 45% с февраля 2020 по июнь 2022. Корзина подошла позже: ИПЦ +9,1% за год к июню 2022. Ставку по федеральным фондам потом подняли до 5,25–5,50%.",
    },
    lesson: {
      en: "A deep stock market delays the basket. It does not cancel it when the new money is handed to households.",
      ru: "Глубокий рынок акций откладывает корзину. Он её не отменяет, если новые деньги отдают прямо домохозяйствам.",
    },
    source: { label: "FRED M2SL", href: "https://fred.stlouisfed.org/series/M2SL" },
  },
  {
    id: "us-qe",
    region: "usa",
    year: 2013,
    patch: { moneyGrowth: 6.5, fiscalImpulse: 3.2, absorption: 0.86, productivity: 1.5, immigration: 0.3 },
    title: { en: "QE that stayed in assets", ru: "QE, которое осталось в активах" },
    when: { en: "United States, 2008–14", ru: "США, 2008–14" },
    did: {
      en: "After the housing bust the Fed cut to zero and bought Treasuries and mortgage bonds. Reserves exploded. Broad money and bank lending did not, on anything like the 2020 scale.",
      ru: "После обвала жилья ФРС опустила ставку к нулю и покупала казначейские бумаги и ипотечные облигации. Резервы взорвались. Широкие деньги и кредит банков — нет, не в масштабе 2020 года.",
    },
    happened: {
      en: "Consumer inflation stayed near the 2% target for years. Equities and, later, houses recovered long before wages felt a boom. The same balance-sheet tool, a different recipient.",
      ru: "Потребительская инфляция годами стояла около цели в 2%. Акции и потом дома восстановились задолго до того, как зарплаты почувствовали бум. Тот же баланс центробанка, другой получатель.",
    },
    lesson: {
      en: "Reserves are not checks. Who receives the new money decides whether the sink holds.",
      ru: "Резервы — не чеки. Кто получает новые деньги, решает, удержит ли их рынок активов.",
    },
    source: { label: "BLS CPI, June 2022 release (the contrast)", href: "https://www.bls.gov/news.release/archives/cpi_07132022.htm" },
  },
  {
    id: "eu-gas",
    region: "europe",
    year: 2022,
    patch: { moneyGrowth: 8, fiscalImpulse: 4.5, absorption: 0.42, productivity: 0.6, immigration: 0.7 },
    title: { en: "Bond buying met a gas bill", ru: "Покупка облигаций встретила счёт за газ" },
    when: { en: "Euro area, 2021–23", ru: "Еврозона, 2021–23" },
    did: {
      en: "The ECB’s pandemic programme and cheap loans had already lifted M3. From February 2020 to September 2022 M3 rose about 23%, to €16.20 trillion — a real increase, and a smaller one than America’s.",
      ru: "Пандемийная программа ЕЦБ и дешёвые кредиты банкам уже подняли M3. С февраля 2020 по сентябрь 2022 M3 вырос примерно на 23%, до 16,20 трлн евро. Рост настоящий и меньше американского.",
    },
    happened: {
      en: "HICP hit 10.6% in October 2022. Energy, not the deposit boom alone, did most of that month. The deposit facility was later taken to 4%, and by autumn 2026 it was back at 2.50%.",
      ru: "HICP достиг 10,6% в октябре 2022. Большую часть того месяца сделала энергия, не один только рост вкладов. Ставку по депозитам потом подняли до 4%, а к осени 2026 она вернулась к 2,50%.",
    },
    lesson: {
      en: "Money and a supply shock add. A model that only has a printing press will misread 2022 in Europe.",
      ru: "Деньги и шок предложения складываются. Модель, в которой есть только печатный станок, прочитает 2022 год в Европе неверно.",
    },
    source: { label: "Eurostat HICP release, 17 Nov 2022", href: "https://ec.europa.eu/eurostat/web/products-euro-indicators/w/2-17112022-ap" },
  },
  {
    id: "ru-rate",
    region: "russia",
    year: 2022,
    patch: { moneyGrowth: 16, fiscalImpulse: 7, absorption: 0.18, productivity: 0.4, immigration: 0.05 },
    title: { en: "Twenty percent, overnight", ru: "Двадцать процентов за ночь" },
    when: { en: "Russia, spring 2022", ru: "Россия, весна 2022" },
    did: {
      en: "On 28 February 2022 the Bank of Russia set the key rate at 20% and tightened capital controls. There was no deep equity market to park the shock.",
      ru: "28 февраля 2022 Банк России поставил ключевую ставку на 20% и ужесточил контроль капитала. Глубокого рынка акций, чтобы припарковать удар, не было.",
    },
    happened: {
      en: "Consumer prices were up 17.83% in the year to April 2022. By that month the key rate was already back to 17%, and it was 7.5% by the end of the year. The inflation did not wait for a stock-market cycle.",
      ru: "К апрелю 2022 потребительские цены выросли на 17,83% за год. В том же месяце ставка была уже 17%, а к концу года 7,5%. Инфляция не стала ждать биржевого цикла.",
    },
    lesson: {
      en: "Without a large financial sink, the same impulse shows up in the shop window inside one season.",
      ru: "Без большого финансового рынка тот же импульс оказывается на ценнике за один сезон.",
    },
    source: { label: "Bank of Russia inflation and key rate", href: "https://www.cbr.ru/hd_base/infl/" },
  },
  {
    id: "ru-mortgage",
    region: "russia",
    year: 2021,
    patch: { moneyGrowth: 14, fiscalImpulse: 6.5, absorption: 0.4, productivity: 1.2, immigration: 0.1 },
    title: { en: "The subsidized mortgage", ru: "Льготная ипотека" },
    when: { en: "Russia, 2020–23", ru: "Россия, 2020–23" },
    did: {
      en: "A preferential mortgage, launched in 2020 at a rate well below the market, pushed household credit into new apartments. The budget paid the gap between the subsidized rate and the bank’s rate.",
      ru: "Льготная ипотека с 2020 года, со ставкой заметно ниже рыночной, направила кредит домохозяйств в новостройки. Разницу между льготной ставкой и ставкой банка доплачивал бюджет.",
    },
    happened: {
      en: "The Rosstat secondary-market price index (2010 = 100) went from 130.4 in the first quarter of 2020 to 202.6 in the fourth quarter of 2023, about 55%. Consumer inflation did not stay at the 4% target.",
      ru: "Индекс вторичного рынка Росстата (2010 = 100) прошёл от 130,4 в I квартале 2020 до 202,6 в IV квартале 2023, около 55%. Потребительская инфляция у цели в 4% не осталась.",
    },
    lesson: {
      en: "A cheap mortgage is a fiscal impulse aimed at one price. That price is still a price people pay.",
      ru: "Дешёвая ипотека — бюджетный импульс в одну цену. Эта цена всё равно цена, которую платят люди.",
    },
    source: {
      label: "Rosstat housing index",
      href: "https://roschart.ru/en/dataset/sdds-housing-market-price-indices-dopolnitelnye-pokazateli",
    },
  },
  {
    id: "cn-property",
    region: "china",
    year: 2023,
    patch: { moneyGrowth: 10, fiscalImpulse: 4, absorption: 0.25, productivity: 4.2, immigration: 0.02 },
    title: { en: "The property sink clogged", ru: "Канал жилья забился" },
    when: { en: "China, 2021–25", ru: "Китай, 2021–25" },
    did: {
      en: "For two decades extra credit had gone into apartments, land and local-government projects. In 2021 Beijing capped developer leverage, the ‘three red lines’. Presales and land revenue then fell.",
      ru: "Два десятилетия лишний кредит шёл в квартиры, землю и проекты местных властей. В 2021 году Пекин ограничил долг застройщиков — «три красные линии». Потом просели продажи на этапе котлована и доходы от земли.",
    },
    happened: {
      en: "Money did not stop. PBOC M2 was ¥340.29 trillion at the end of 2025, up 8.5% on the year. Consumer prices did not take off; for long stretches they sat near zero. The old sink was the thing that broke.",
      ru: "Деньги не остановились. M2 НБК на конец 2025 года — 340,29 трлн юаней, плюс 8,5% за год. Потребительские цены не взлетели: долгие отрезки они стояли около нуля. Сломался прежний канал, а не станок.",
    },
    lesson: {
      en: "A property sink can hide money growth for years. When buyers walk away, you are left with the money and without the bid.",
      ru: "Жильё может годами прятать рост денег. Когда покупатель уходит, остаются деньги и не остаётся спроса.",
    },
    source: {
      label: "PBOC financial statistics, 2025",
      href: "https://www.pbc.gov.cn/en/3688247/3688978/3709137/2026022614345032797/index.html",
    },
  },
];
