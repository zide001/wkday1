import type { Choice, CoinSide } from "./story";

const SESSION_KEY = "interactive-reader-session-id";

type BaseAnalyticsEvent = {
  storyId: string;
  storyTitle: string;
};

export type CoinResultEvent = BaseAnalyticsEvent & {
  type: "coin_result";
  coinSide: CoinSide;
  routeLabel: string;
  targetChapterId: string;
};

export type ChoiceEvent = BaseAnalyticsEvent & {
  type: "choice";
  routeLabel?: string;
  coinSide?: CoinSide;
  fromChapterId: string;
  fromChapterTitle: string;
  choiceId: Choice["id"];
  choiceText: Choice["text"];
  choiceHint?: Choice["hint"];
  targetChapterId: string;
  targetChapterTitle: string;
  isEnding: boolean;
};

export type ReaderAnalyticsEvent = CoinResultEvent | ChoiceEvent;

function createSessionId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getReaderSessionId() {
  const existing = localStorage.getItem(SESSION_KEY);
  if (existing) return existing;

  const sessionId = createSessionId();
  localStorage.setItem(SESSION_KEY, sessionId);
  return sessionId;
}

export function trackReaderEvent(event: ReaderAnalyticsEvent) {
  const payload = {
    ...event,
    sessionId: getReaderSessionId(),
  };

  fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // Analytics must never interrupt reading.
  });
}
