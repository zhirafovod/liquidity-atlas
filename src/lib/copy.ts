import type { Locale } from "@/lib/locale";
import type { RegionId } from "@/lib/sim";

export type FieldKey =
  | "moneyGrowth"
  | "productivity"
  | "aiBoost"
  | "immigration"
  | "absorption"
  | "fiscalImpulse";

type RegionCopy = { name: string; blurb: string; sink: string };

type Copy = {
  brand: string;
  nav: { replay: string; theory: string; economies: string; episodes: string };
  footer: string;
  langLabel: string;
  home: { kicker: string; title: string; lede: string };
  regions: Record<RegionId, RegionCopy>;
  sim: {
    region: string;
    sink: string;
    episodes: string;
    levers: string;
    year: string;
    play: string;
    pause: string;
    again: string;
    reset: string;
    baseline: string;
    vs: string;
    higher: string;
    lower: string;
    same: string;
    charts: { cpi: string; assets: string; money: string };
    series: { cpi: string; stocks: string; housing: string; gdp: string; money: string };
    stats: { cpi: string; gdp: string; stocks: string; housing: string; from: string };
    fields: Record<FieldKey, { label: string; unit: string; help: string }>;
    presets: Record<string, { label: string; hint: string }>;
    barAssets: string;
    barShops: string;
    barCaption: string;
    footnote: string;
    aiOff: string;
    pressure: string;
  };
  theory: {
    kicker: string;
    title: string;
    lede: string;
    sections: { title: string; body: string[] }[];
    rows: { name: string; text: string }[];
    tableName: string;
    tableStance: string;
    toReplay: string;
    toModels: string;
    toEpisodes: string;
  };
  models: {
    kicker: string;
    title: string;
    lede: string;
    country: string;
    read: string;
    sharedTitle: string;
    shared: string[];
  };
  episodesPage: {
    kicker: string;
    title: string;
    lede: string;
    did: string;
    happened: string;
    lesson: string;
    replay: string;
    source: string;
    money: string;
    prices: string;
    housing: string;
    chartTitle: string;
    stories: string;
    focus: string;
    series: string;
    method: string;
  };
};

const en: Copy = {
  brand: "Liquidity Atlas",
  nav: { replay: "Replay", theory: "Theory", economies: "Economies", episodes: "Episodes" },
  footer: "An illustrative model of where new money lands. Not a forecast and not investment advice.",
  langLabel: "RU",
  home: {
    kicker: "Interactive replay",
    title: "Where new money goes before the price tag moves.",
    lede: "Pick a country and move one lever. The sentence above the charts says whether the extra money is sitting in assets or has already reached the checkout.",
  },
  regions: {
    usa: {
      name: "United States",
      blurb: "A deep equity market can hold a lot of new money. It failed to hold the 2020 checks.",
      sink: "Stocks, then houses",
    },
    russia: {
      name: "Russia",
      blurb: "The equity market is small. Extra rubles have gone into apartments, building materials, then shop prices.",
      sink: "Apartments",
    },
    europe: {
      name: "Europe",
      blurb: "Bond purchases absorbed liquidity for years. The 2022 gas bill did not wait for that channel.",
      sink: "Bonds, then energy",
    },
    china: {
      name: "China",
      blurb: "Credit went into property and local projects for twenty years. That bid has weakened. Money growth has not.",
      sink: "Property",
    },
  },
  sim: {
    region: "Country",
    sink: "Usual landing place",
    episodes: "A real episode",
    levers: "Levers",
    year: "Year",
    play: "Play",
    pause: "Pause",
    again: "Again",
    reset: "Reset",
    baseline: "This country’s baseline",
    vs: "Against the baseline, by this year",
    higher: "higher",
    lower: "lower",
    same: "unchanged",
    charts: {
      cpi: "Shop-price inflation, this path",
      assets: "Asset indexes, 1990 = 100",
      money: "Real output and the money stock, 1990 = 100",
    },
    series: { cpi: "CPI", stocks: "Stocks", housing: "Housing", gdp: "Real GDP", money: "Money" },
    stats: { cpi: "CPI this year", gdp: "Real GDP", stocks: "Stocks", housing: "Housing", from: "from" },
    fields: {
      moneyGrowth: {
        label: "Money growth",
        unit: "% a year",
        help: "How fast the broad stock of money grows. Faster than output, and something has to rise.",
      },
      productivity: {
        label: "Productivity",
        unit: "% a year",
        help: "More real goods per worker. This is the part robots and AI are supposed to raise.",
      },
      aiBoost: {
        label: "AI after 2020",
        unit: "extra pts",
        help: "Added to productivity only from 2020. Before that year the slider does nothing.",
      },
      immigration: {
        label: "Net migration",
        unit: "% of people",
        help: "More shoppers, and partly more workers. Demand rises by more than capacity.",
      },
      absorption: {
        label: "Asset share",
        unit: "of the gap",
        help: "How much of the gap between money and output stays in stocks and housing instead of the basket.",
      },
      fiscalImpulse: {
        label: "Budget impulse",
        unit: "stimulus",
        help: "Checks, cheap mortgages, benefits. Extra spending on top of money growth.",
      },
    },
    presets: {
      path: { label: "Baseline", hint: "The country’s own post-2000 character" },
      print: { label: "Open the press", hint: "Faster money and a larger budget impulse" },
      ai: { label: "AI arrives", hint: "Real output jumps after 2020" },
      sink: { label: "Deep market", hint: "Almost all of the gap stays in assets" },
      goods: { label: "No market", hint: "The gap goes to food and rent" },
      people: { label: "More arrivals", hint: "More consumers and some more workers" },
    },
    barAssets: "Stays in assets",
    barShops: "Reaches shops",
    barCaption: "This split is the asset-share lever. It does not change how large the gap is. It changes who pays it.",
    footnote:
      "Indexes start at 100 in 1990. The path is a sketch of MV = PQ with a share parked in assets. It will not reproduce a historical CPI print. For those, open Episodes.",
    aiOff: "The AI lever is switched off until 2020.",
    pressure: "Gap this year",
  },
  theory: {
    kicker: "The mechanism",
    title: "A drain, a debt, and a pencil.",
    lede: "The argument is simple enough to draw on a napkin, and wrong in specific, dated ways. Both parts matter.",
    sections: [
      {
        title: "The napkin",
        body: [
          "Take an economy of 100. Half of it already sits on the stock exchange and yields 10 in tax. The state needs 20. Print another 100 with nowhere to put it except the checkout, and prices rise by about half. The extra tax is paid in cheaper paper.",
          "Put a drain in the stock market and those 100 units turn over once, the tax base gets larger, market value rises toward 150, and bread stays put. On this telling the public debt is a number written in the same paper that pays the coupon.",
          "Russia’s drain was not the exchange. It was the apartment, then the building site, then everything the site buys. The quantity theory answers in one line: 3% more money and the same goods, and the pencil costs 3% more while the benefit check does not. If robots double output, prices fall — or the central bank prints just enough to stop them falling, and a debt fixed in nominal currency gets cheaper in real terms. A higher GDP figure is still not dinner.",
        ],
      },
      {
        title: "What the record supports",
        body: [
          "After the large balance-sheet expansions of 2008–14, US consumer inflation stayed near 2% while equities and then houses recovered. Liquidity preferred assets. That is the episode the napkin describes.",
          "Modern monetary theory, in the version of Stephanie Kelton, Warren Mosler and L. Randall Wray, says a government that issues its own floating currency does not run out of it. The limit is real capacity and inflation. Taxes delete money. Public debt is a private financial asset.",
          "The quantity theory, from Milton Friedman to Steve Hanke, says that over a long enough window money growth above real output shows up in prices. Hanke’s version puts assets first and the basket later.",
          "Cantillon’s point is older and still the useful one: new money is not sprinkled evenly. Banks, borrowers and asset owners bid first. That is a transfer, not a free lunch.",
        ],
      },
      {
        title: "Where the napkin tears",
        body: [
          "The 2020–22 US episode tore it. M2 rose about 41% from February 2020 to March 2022, and CPI-U hit 9.1% by June 2022. The drain delayed the basket. It did not seal it, because a large share of the new deposits was handed to households.",
          "House prices are prices. Anyone who does not already own the asset pays them as rent or a down payment. Calling that a ‘sink’ does not make it painless.",
          "A coupon is a real transfer to the bondholder even when the coupon is fiat. Interest is not a rounding error just because both sides use the same currency.",
          "A shallow market routes the same printing into goods faster. Russia’s April 2022 inflation of 17.8%, with no equity market in between, is the control case. Europe’s October 2022 HICP of 10.6% is the other warning: a gas shock can do what the printing press did not finish. M3 was up about 23% over that stretch, not 41%.",
          "Velocity can rise. Governments like to spend. Productivity from AI is uneven, late, and not owed to the debt.",
        ],
      },
    ],
    tableName: "Name",
    tableStance: "On money and markets",
    rows: [
      { name: "Stephanie Kelton", text: "A deficit is fine until real capacity runs out. Inflation, not the bond market, is the stop sign." },
      { name: "Warren Mosler, L. Randall Wray", text: "The currency is a public monopoly. Taxes and spending steer demand." },
      { name: "Steve Hanke", text: "Broad-money growth leads asset prices, then goods prices. Excess growth builds bubbles." },
      { name: "Ray Dalio", text: "Long debt cycles end in deleveraging, printing, or a cheaper currency." },
      { name: "Lyn Alden", text: "Monetary inflation, asset inflation and consumer inflation are three series. They do not move together." },
      { name: "Richard Werner", text: "Bank credit, not the central-bank press alone, creates the deposits that bid for assets." },
      { name: "Olivier Blanchard", text: "A high public debt can persist while the interest rate stays below the growth rate." },
      { name: "The Austrian line", text: "Cheap money misdirects investment. The asset boom is the distortion, not a harmless drain." },
    ],
    toReplay: "Try the levers",
    toModels: "Compare the four economies",
    toEpisodes: "Read the episodes",
  },
  models: {
    kicker: "Since 2000",
    title: "Same question, four different pipes.",
    lede: "Each cell is a figure from a named series, with the date on it. Levels are in local currency. Do not rank countries by the size of the number.",
    country: "Measure",
    read: "Read across a row. The interesting comparison is the 2020–22 money jump against the 2022 price peak, not the trillion-count.",
    sharedTitle: "What the rows are saying",
    shared: [
      "Money that grows faster than real output has to land somewhere. In the United States after 2008 it landed in assets for a decade. In 2020–22 a slice of it was mailed to households, and the basket followed, with a lag: M2 up about 41% by March 2022, CPI up 9.1% by June.",
      "Europe’s money jump was smaller, about 23% from February 2020 to September 2022, and the October 2022 inflation peak of 10.6% was mostly energy. A pure printing-press story over-explains America and under-explains the euro area.",
      "Russia did not have the American drain. The secondary housing index rose about 55% from early 2020 to late 2023, and consumer prices were up 17.8% by April 2022. A subsidized mortgage is a budget impulse aimed at one price.",
      "China kept money growing — PBOC M2 was ¥340 trillion at the end of 2025, up 8.5% — while consumer prices stayed quiet. The property bid that used to absorb the credit has weakened. Inflation is the quiet tax on cash. A direct tax deletes money outright. Benefits paid to new arrivals are the same budget impulse with a different passport: consumption up, the public balance sheet wider, housing tighter.",
    ],
  },
  episodesPage: {
    kicker: "What actually happened",
    title: "Six decisions, and the prices that followed.",
    lede: "The replay on the front page is a sketch. These are the episodes it is sketching, with the figure and the source next to the claim. Open one in the model if you want to see the levers set the way that episode felt.",
    did: "What was done",
    happened: "What prices did",
    lesson: "What it does to the argument",
    replay: "Set the levers to this",
    source: "Source",
    money: "Money",
    prices: "Prices",
    housing: "Housing",
    chartTitle: "All four, on one scale",
    stories: "What each country did in this window",
    focus: "This episode",
    series: "The series behind the bars",
    method:
      "One scale for all four. Each bar is the percent change over that episode’s window, not a year-on-year rate and not a level in local currency. Housing is the only asset on the same index in every country. Equities are left off: there is no comparable series. A missing bar means that series was not comparable on those dates. A bar below the line is a fall.",
  },
};

const ru: Copy = {
  brand: "Атлас ликвидности",
  nav: { replay: "Модель", theory: "Теория", economies: "Сравнение", episodes: "Эпизоды" },
  footer: "Учебная модель: куда садятся новые деньги. Не прогноз и не инвестиционный совет.",
  langLabel: "EN",
  home: {
    kicker: "Модель по годам",
    title: "Куда деваются новые деньги, пока ценник ещё стоит.",
    lede: "Выберите страну и сдвиньте один рычаг. Фраза над графиками сразу говорит, осели лишние деньги в активах или уже дошли до кассы.",
  },
  regions: {
    usa: {
      name: "США",
      blurb: "Фондовый рынок может долго держать новые деньги. Чеки 2020 года он не удержал.",
      sink: "Сначала акции, потом дома",
    },
    russia: {
      name: "Россия",
      blurb: "Рынок акций маленький. Лишние рубли шли в квартиры, потом в стройку, потом в магазин.",
      sink: "Квартиры",
    },
    europe: {
      name: "Европа",
      blurb: "Покупки облигаций годами забирали ликвидность. Счёт за газ в 2022-м этого канала не ждал.",
      sink: "Облигации, потом энергия",
    },
    china: {
      name: "Китай",
      blurb: "Двадцать лет кредит шёл в жильё и местные стройки. Этот спрос ослаб. Рост денег — нет.",
      sink: "Жильё",
    },
  },
  sim: {
    region: "Страна",
    sink: "Куда обычно садятся",
    episodes: "Настоящий эпизод",
    levers: "Рычаги",
    year: "Год",
    play: "Пуск",
    pause: "Пауза",
    again: "Ещё раз",
    reset: "Сброс",
    baseline: "База этой страны",
    vs: "К этому году против базы",
    higher: "выше",
    lower: "ниже",
    same: "без изменений",
    charts: {
      cpi: "Инфляция в магазине на этом пути",
      assets: "Индексы активов, 1990 = 100",
      money: "Реальный выпуск и запас денег, 1990 = 100",
    },
    series: { cpi: "ИПЦ", stocks: "Акции", housing: "Жильё", gdp: "Реальный ВВП", money: "Деньги" },
    stats: { cpi: "ИПЦ в этом году", gdp: "Реальный ВВП", stocks: "Акции", housing: "Жильё", from: "со" },
    fields: {
      moneyGrowth: {
        label: "Рост денег",
        unit: "% в год",
        help: "Как быстро растёт широкая денежная масса. Быстрее выпуска — и что-то обязано подорожать.",
      },
      productivity: {
        label: "Производительность",
        unit: "% в год",
        help: "Больше реальных товаров на работника. Именно это обещают роботы и ИИ.",
      },
      aiBoost: {
        label: "ИИ после 2020",
        unit: "доп. п.п.",
        help: "Прибавка к производительности только с 2020 года. Раньше рычаг молчит.",
      },
      immigration: {
        label: "Чистый приток",
        unit: "% людей",
        help: "Больше покупателей и отчасти больше работников. Спрос растёт сильнее, чем мощности.",
      },
      absorption: {
        label: "Доля активов",
        unit: "от разрыва",
        help: "Какая часть разрыва между деньгами и выпуском остаётся в акциях и жилье, а не в корзине.",
      },
      fiscalImpulse: {
        label: "Бюджетный импульс",
        unit: "стимул",
        help: "Чеки, льготная ипотека, пособия. Расходы сверх роста денежной массы.",
      },
    },
    presets: {
      path: { label: "База", hint: "Характер страны после 2000 года" },
      print: { label: "Открыть станок", hint: "Быстрее деньги и больше бюджетных расходов" },
      ai: { label: "Приходит ИИ", hint: "Реальный выпуск прыгает после 2020" },
      sink: { label: "Глубокий рынок", hint: "Почти весь разрыв остаётся в активах" },
      goods: { label: "Нет рынка", hint: "Разрыв уходит в еду и аренду" },
      people: { label: "Больше приехавших", hint: "Больше потребителей и немного больше работников" },
    },
    barAssets: "Остаётся в активах",
    barShops: "Доходит до кассы",
    barCaption: "Эта полоска — рычаг «доля активов». Он не меняет размер разрыва. Он меняет, кто его платит.",
    footnote:
      "Индексы равны 100 в 1990 году. Путь — набросок MV = PQ с долей, которая остаётся в активах. Исторический ИПЦ он не повторит. Для этого откройте «Эпизоды».",
    aiOff: "Рычаг ИИ молчит до 2020 года.",
    pressure: "Разрыв в этом году",
  },
  theory: {
    kicker: "Механизм",
    title: "Сток, долг и карандаш.",
    lede: "Аргумент рисуется на салфетке. И в нескольких датированных местах он неверен. Нужны обе части.",
    sections: [
      {
        title: "Салфетка",
        body: [
          "Экономика на 100. Половина уже лежит на бирже и даёт 10 налога, а казне нужно 20. Напечатать ещё 100, и если этим деньгам некуда деться кроме кассы, цены вырастают примерно наполовину. Лишний налог уплачен подешевевшими бумажками.",
          "Если те же 100 уходят на рынок акций, они один раз проходят через экономику, база налога становится больше, капитализация растёт к 150, а хлеб стоит столько же. В этой схеме госдолг — цифра в той же бумаге, которой платят купон.",
          "В России таким рынком была не биржа, а квартира, потом стройка, потом всё, что стройка покупает. Количественная теория отвечает одной фразой: денег на 3% больше, товаров столько же — карандаш на 3% дороже, а пособие то же. Если роботы удваивают выпуск, цены падают. Либо центробанк печатает ровно столько, чтобы они не падали, и долг, записанный в рублях, в реальном выражении дешевеет. Большая цифра ВВП — всё ещё не ужин.",
        ],
      },
      {
        title: "Что подтверждается",
        body: [
          "После расширения баланса в 2008–14 годах потребительская инфляция в США годами стояла около 2%, а акции и потом дома восстановились. Ликвидность предпочитала активы. Это как раз эпизод с салфетки.",
          "Современная денежная теория у Стефани Келтон, Уоррена Мослера и Л. Рэндалла Рэя говорит: правительство со своей плавающей валютой не может её «закончить». Предел — реальные мощности и инфляция. Налоги уничтожают деньги. Госдолг — финансовый актив частного сектора.",
          "Количественная теория, от Милтона Фридмана до Стива Ханке, говорит, что на длинном окне рост денег сверх выпуска выходит в цены. У Ханке сначала активы, потом корзина.",
          "Кантильон старше и до сих пор полезнее: новые деньги не разбрасывают поровну. Первыми торгуются банки, заёмщики и владельцы активов. Это передача, не бесплатный обед.",
        ],
      },
      {
        title: "Где салфетка рвётся",
        body: [
          "Эпизод США 2020–22 её порвал. M2 вырос примерно на 41% с февраля 2020 по март 2022, а ИПЦ к июню 2022 был +9,1%. Сток отложил корзину. Он её не закрыл, потому что заметную долю новых вкладов отдали домохозяйствам.",
          "Цена квартиры — это цена. Кто актива ещё не имеет, платит её арендой или первым взносом. Назвать это «стоком» не значит сделать безболезненным.",
          "Купон — реальная передача держателю облигации, даже если купон фиатный. Процент не становится мелочью от того, что обе стороны считают в одной валюте.",
          "Мелкий рынок проводит ту же эмиссию в товары быстрее. Инфляция в России в апреле 2022 года, 17,8%, без фондового рынка посередине — это контрольный случай. Другое предупреждение — HICP еврозоны в октябре 2022, 10,6%: газовый шок доделал то, чего не доделал станок. M3 за тот отрезок вырос примерно на 23%, не на 41%.",
          "Скорость обращения может вырасти. Государствам нравится тратить. Производительность от ИИ неравномерна, запаздывает и долгу ничего не должна.",
        ],
      },
    ],
    tableName: "Имя",
    tableStance: "О деньгах и рынках",
    rows: [
      { name: "Стефани Келтон", text: "Дефицит допустим, пока не кончились реальные мощности. Стоп-кран — инфляция, не рынок облигаций." },
      { name: "Уоррен Мослер, Л. Рэндалл Рэй", text: "Валюта — общественная монополия. Налоги и расходы направляют спрос." },
      { name: "Стив Ханке", text: "Рост широких денег ведёт цены активов, потом цены товаров. Избыток растит пузыри." },
      { name: "Рэй Далио", text: "Длинные долговые циклы кончаются расчисткой, печатью или более дешёвой валютой." },
      { name: "Лин Олден", text: "Денежная, активовая и потребительская инфляция — три разных ряда. Они не ходят вместе." },
      { name: "Ричард Вернер", text: "Банковский кредит, а не один станок центробанка, создаёт вклады, которые торгуются за активы." },
      { name: "Оливье Бланшар", text: "Высокий госдолг может держаться, пока ставка ниже темпа роста." },
      { name: "Австрийская линия", text: "Дешёвые деньги сбивают инвестиции. Бум активов — само искажение, а не безобидный сток." },
    ],
    toReplay: "Подвигать рычаги",
    toModels: "Сравнить четыре экономики",
    toEpisodes: "Открыть эпизоды",
  },
  models: {
    kicker: "С 2000 года",
    title: "Один вопрос, четыре разные трубы.",
    lede: "В каждой клетке цифра из названного ряда и дата. Уровни в своей валюте. Страны по размеру числа не ранжируют.",
    country: "Показатель",
    read: "Читайте строку слева направо. Сравнивать стоит скачок денег 2020–22 с ценовым пиком 2022, а не число триллионов.",
    sharedTitle: "Что говорят эти строки",
    shared: [
      "Деньги, которые растут быстрее реального выпуска, должны куда-то сесть. В США после 2008 они десятилетие сидели в активах. В 2020–22 часть из них отправили домохозяйствам, и корзина подошла с лагом: M2 примерно +41% к марту 2022, ИПЦ +9,1% к июню.",
      "В Европе скачок денег был меньше, около 23% с февраля 2020 по сентябрь 2022, а пик инфляции в октябре 2022, 10,6%, был в основном энергией. История «одного только станка» слишком много объясняет в Америке и слишком мало в еврозоне.",
      "У России американского стока не было. Индекс вторичного жилья вырос примерно на 55% с начала 2020 до конца 2023, а потребительские цены к апрелю 2022 были +17,8%. Льготная ипотека — бюджетный импульс в одну цену.",
      "Китай деньги расти не перестал: M2 НБК на конец 2025 года 340 трлн юаней, плюс 8,5%, а потребительские цены оставались тихими. Спрос на жильё, который раньше забирал кредит, ослаб. Инфляция — тихий налог на наличные. Прямой налог уничтожает деньги сразу. Пособия тем, кто только приехал, — тот же бюджетный импульс с другим паспортом: потребление выше, баланс шире, жилья меньше.",
    ],
  },
  episodesPage: {
    kicker: "Как было на самом деле",
    title: "Шесть решений и цены, которые за ними пришли.",
    lede: "Модель на первой странице — набросок. Здесь эпизоды, которые она набрасывает: цифра и источник рядом с утверждением. Можно открыть эпизод в модели и увидеть рычаги так, как этот эпизод ощущался.",
    did: "Что сделали",
    happened: "Что сделали цены",
    lesson: "Что это делает с аргументом",
    replay: "Поставить рычаги так",
    source: "Источник",
    money: "Деньги",
    prices: "Цены",
    housing: "Жильё",
    chartTitle: "Все четыре, одна шкала",
    stories: "Что было в каждой стране за это окно",
    focus: "Этот эпизод",
    series: "Ряды, из которых взяты столбцы",
    method:
      "Одна шкала на всех. Столбец — изменение в процентах за окно эпизода, не годовой прирост и не сумма в местной валюте. Из активов общий индекс есть только у жилья. Акции не нарисованы: сопоставимого ряда нет. Нет столбца — на эти даты ряд не сопоставим. Столбец ниже линии — это падение.",
  },
};

export const COPY: Record<Locale, Copy> = { en, ru };

export function t(locale: Locale) {
  return COPY[locale];
}
