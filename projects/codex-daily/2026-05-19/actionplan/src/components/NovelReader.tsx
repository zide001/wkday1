import { RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { trackReaderEvent } from "../lib/analytics";
import type { Choice, CoinSide, ReaderSave, Story } from "../lib/story";
import { getChapter } from "../lib/story";
import { CoinGateView, type CoinStatus } from "./CoinGateView";
import { ConfigWarnings } from "./ConfigWarnings";
import { ReaderView } from "./ReaderView";

type NovelReaderProps = {
  story: Story;
  warnings?: string[];
};

function storageKey(story: Story) {
  return `interactive-reader:${story.id}`;
}

function readSave(story: Story): ReaderSave | null {
  try {
    const raw = localStorage.getItem(storageKey(story));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ReaderSave;
    if (parsed.storyId !== story.id || !story.chapters[parsed.currentChapterId]) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function NovelReader({ story, warnings = [] }: NovelReaderProps) {
  const [currentChapterId, setCurrentChapterId] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [coinStatus, setCoinStatus] = useState<CoinStatus>("idle");
  const [coinResult, setCoinResult] = useState<CoinSide | null>(null);

  useEffect(() => {
    const saved = readSave(story);
    setCurrentChapterId(saved?.currentChapterId ?? (story.coinGate ? null : story.startChapterId));
    setHistory(saved?.history ?? []);
    setCoinResult(saved?.coinSide ?? null);
    setCoinStatus("idle");
  }, [story]);

  useEffect(() => {
    if (!currentChapterId) return;

    const save: ReaderSave = {
      storyId: story.id,
      currentChapterId,
      history,
      coinSide: coinResult ?? undefined,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(storageKey(story), JSON.stringify(save));
  }, [coinResult, currentChapterId, history, story]);

  const chapter = useMemo(() => {
    if (!currentChapterId) return null;
    return getChapter(story, currentChapterId);
  }, [currentChapterId, story]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showEntry() {
    setCurrentChapterId(story.coinGate ? null : story.startChapterId);
    setHistory([]);
    setCoinResult(null);
    setCoinStatus("idle");
    localStorage.removeItem(storageKey(story));
    scrollToTop();
  }

  function tossCoin() {
    if (!story.coinGate || coinStatus === "tossing") return;

    const result: CoinSide = Math.random() > 0.5 ? "heads" : "tails";
    const route = story.coinGate[result];
    const target = route.target;

    setCoinStatus("tossing");
    setCoinResult(result);
    trackReaderEvent({
      type: "coin_result",
      storyId: story.id,
      storyTitle: story.title,
      coinSide: result,
      routeLabel: route.label,
      targetChapterId: target,
    });

    window.setTimeout(() => {
      setCoinStatus("revealed");
      window.setTimeout(() => {
        setHistory([]);
        setCurrentChapterId(target);
        scrollToTop();
      }, 900);
    }, 1300);
  }

  function choose(choice: Choice) {
    if (!chapter) return;
    const targetChapter = story.chapters[choice.target];
    const routeLabel = coinResult && story.coinGate ? story.coinGate[coinResult].label : undefined;

    trackReaderEvent({
      type: "choice",
      storyId: story.id,
      storyTitle: story.title,
      routeLabel,
      coinSide: coinResult ?? undefined,
      fromChapterId: chapter.id,
      fromChapterTitle: chapter.title,
      choiceId: choice.id,
      choiceText: choice.text,
      choiceHint: choice.hint,
      targetChapterId: choice.target,
      targetChapterTitle: targetChapter?.title ?? choice.target,
      isEnding: targetChapter ? targetChapter.choices.length === 0 : false,
    });

    setHistory((items) => [...items, chapter.id]);
    setCurrentChapterId(choice.target);
    scrollToTop();
  }

  function jumpToChapter(target: string) {
    if (chapter && chapter.id !== target) {
      setHistory((items) => [...items, chapter.id]);
    }

    setCurrentChapterId(target);
    scrollToTop();
  }

  function goBack() {
    setHistory((items) => {
      const previous = items.at(-1);
      if (previous) setCurrentChapterId(previous);
      return items.slice(0, -1);
    });
    scrollToTop();
  }

  function restart() {
    if (story.coinGate) {
      showEntry();
      return;
    }

    setHistory([]);
    setCurrentChapterId(story.startChapterId);
    scrollToTop();
  }

  if (!chapter && story.coinGate) {
    return (
      <main className="app-shell">
        <CoinGateView
          storyTitle={story.title}
          coinGate={story.coinGate}
          coinResult={coinResult}
          coinStatus={coinStatus}
          onToss={tossCoin}
        />
        <ConfigWarnings errors={warnings} />
      </main>
    );
  }

  if (!chapter) {
    return (
      <main className="app-shell app-shell--center">
        <section className="error-panel">
          <h1>章节不存在</h1>
          <p>当前进度没有找到对应章节，可以重新开始。</p>
          <button className="toss-button" type="button" onClick={showEntry}>
            <RotateCcw aria-hidden="true" />
            <span>重新开始</span>
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <ReaderView
        story={story}
        chapter={chapter}
        historyLength={history.length}
        onBack={goBack}
        onChoose={choose}
        onJump={jumpToChapter}
        onRestart={restart}
      />
      <ConfigWarnings errors={warnings} />
    </main>
  );
}
