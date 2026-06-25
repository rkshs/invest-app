/**
 * Демо-ответчик для презентаций. Без API: подбирает короткий ответ по ключевым словам.
 * Удалите всю папку demo/ после перехода на backend.
 */
type DemoChatContext = {
  chatId: string;
  chatTitle: string;
  partnerName: string;
};

type ResponseRule = {
  pattern: RegExp;
  replies: string[];
};

const GREETING_REPLIES = [
  'Здравствуйте! Готов обсудить портфель или идеи по бумагам.',
  'Привет! Что смотрим сегодня — акции, облигации или валюту?',
];

const RESPONSE_RULES: ResponseRule[] = [
  {
    pattern: /привет|здравств|добрый|доброго|hi|hello/i,
    replies: GREETING_REPLIES,
  },
  {
    pattern: /sber|сбер|сбербанк/i,
    replies: [
      'По SBER после отчёта базовый сценарий — удержание с акцентом на дивиденды. Следим за маржой и ставками.',
      'SBER выглядит устойчиво для дивидендной части портфеля, но рост ограничен макрофоном.',
    ],
  },
  {
    pattern: /gazp|gazprom|газпром|ga/i,
    replies: [
      'По Газпрому смотрю на дивидендную доходность и новости по экспортным пошлинам — это главный драйвер.',
      'GAZP интересен как дивидендная история, но волатильность может быть выше рынка.',
    ],
  },
  {
    pattern: /nvda|nvidia|нвиди/i,
    replies: [
      'NVDA всё ещё в фокусе на AI-тренде, но после сильного роста лучше входить частями.',
      'По NVDA держу позитивный bias, но размер позиции стоит ограничить из‑за переоценки сектора.',
    ],
  },
  {
    pattern: /moex|индекс|рынок/i,
    replies: [
      'MOEX сейчас чувствителен к ставкам и нефти. Для входа удобнее усреднение, чем один лот.',
      'По индексу базовый сценарий — боковик с возможностью роста при смягчении ставок.',
    ],
  },
  {
    pattern: /дивиденд|купон|доход/i,
    replies: [
      'Дивидендный блок можно собрать из SBER, LKOH и части облигаций — так ниже просадка.',
      'Если цель — доход, смотрю связку «голубые фишки + короткие ОФЗ» с ребалансом раз в квартал.',
    ],
  },
  {
    pattern: /портфел|распредел|доля|ребаланс/i,
    replies: [
      'Сейчас разумно 55% акции РФ, 25% облигации, 20% валюта — но под ваш риск-профиль подстроим.',
      'Предлагаю не менять всё сразу: 2–3 шага по 10% в неделю, чтобы не ловить плохую цену.',
    ],
  },
  {
    pattern: /риск|просад|волатил|страх/i,
    replies: [
      'Риск лучше резать размером позиции, а не частотой сделок. Стоп по портфелю — около 8–10%.',
      'Если некомфортно по просадке, добавьте облигации или кэш — психологически это сильно помогает.',
    ],
  },
  {
    pattern: /купить|продать|вход|лонг|шорт|сделк/i,
    replies: [
      'По сделке: сначала размер, потом цена. Вход частями на 2–3 уровня обычно комфортнее.',
      'Я бы не гнался за идеальной точкой — лучше план с уровнями и заранее прописанным стопом.',
    ],
  },
  {
    pattern: /курс|usd|eur|cny|валют|доллар|юан/i,
    replies: [
      'Валютный блок держу как хедж: часть в USD/CNY снижает зависимость от рублёвой волатильности.',
      'По курсу резких движений не жду — удобнее накапливать валюту лимитными заявками.',
    ],
  },
  {
    pattern: /отчёт|отчет|результат|прибыл|выручк/i,
    replies: [
      'После отчёта смотрю не только EPS, но и guidance и долговую нагрузку — рынок часто реагирует на прогноз.',
      'Если отчёт сильный, но бумага не растёт — возможно, ожидания были ещё выше рынка.',
    ],
  },
  {
    pattern: /помо[гщ]|подскаж|что дума|как счита|совет/i,
    replies: [
      'Кратко: определите горизонт 6–12 мес., риск на сделку и цель по доходности — дальше подберём бумаги.',
      'Могу предложить 2–3 сценария: консервативный, базовый и более агрессивный — выберем под вас.',
    ],
  },
  {
    pattern: /спасибо|благодар/i,
    replies: [
      'Всегда пожалуйста! Если нужно — соберу короткую памятку по позициям.',
      'Рад помочь. Пишите, когда будут новые идеи или вопросы по рынку.',
    ],
  },
];

const FALLBACK_REPLIES = [
  'Понял вас. Если коротко: сначала зафиксируем цель и горизонт, потом подберём бумаги под риск.',
  'Идея здравая. Я бы проверил ликвидность и новости по эмитенту за последние 2–3 дня.',
  'Согласен, тема актуальная. Могу набросать 2 сценария — базовый и осторожный.',
  'Хороший вопрос. Для презентации логики: риск → размер позиции → точки входа/выхода.',
  'Давайте так: уточните горизонт и допустимую просадку — от этого зависит структура портфеля.',
];

const SUPPORT_REPLIES = [
  'Запрос принят. Обычно отвечаем в течение 15 минут в рабочее время.',
  'Спасибо за сообщение! Передал в поддержку, скоро вернёмся с деталями.',
  'Понял запрос. Проверяю статус по вашему счёту и вернусь с ответом.',
];

const replyCounters = new Map<string, number>();

function pickNextReply(poolKey: string, replies: string[]): string {
  const currentIndex = replyCounters.get(poolKey) ?? 0;
  const reply = replies[currentIndex % replies.length];

  replyCounters.set(poolKey, currentIndex + 1);

  return reply;
}

export function generateDemoChatReply(
  userMessage: string,
  context: DemoChatContext,
): string {
  const normalizedMessage = userMessage.trim();
  const { chatId } = context;

  if (!normalizedMessage) {
    return pickNextReply(`${chatId}:fallback`, FALLBACK_REPLIES);
  }

  if (/поддерж|clearvest|запрос|статус/i.test(context.chatTitle)) {
    return pickNextReply(`${chatId}:support`, SUPPORT_REPLIES);
  }

  for (let ruleIndex = 0; ruleIndex < RESPONSE_RULES.length; ruleIndex += 1) {
    const rule = RESPONSE_RULES[ruleIndex];

    if (rule.pattern.test(normalizedMessage)) {
      return pickNextReply(`${chatId}:rule:${ruleIndex}`, rule.replies);
    }
  }

  return pickNextReply(`${chatId}:fallback`, FALLBACK_REPLIES);
}

function getDemoReplyDelayMs(): number {
  return 900 + Math.floor(Math.random() * 500);
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function waitForDemoReply(): Promise<void> {
  await delay(getDemoReplyDelayMs());
}
