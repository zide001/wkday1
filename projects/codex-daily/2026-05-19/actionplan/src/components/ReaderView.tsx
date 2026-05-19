import type { CSSProperties, MouseEvent } from "react";
import { useMemo, useState } from "react";
import type { Chapter, Choice, Story } from "../lib/story";
import { getAsset } from "../lib/story";
import { ReaderToolbar, type ReaderPanel } from "./ReaderToolbar";

type ReaderViewProps = {
  story: Story;
  chapter: Chapter;
  historyLength: number;
  onBack: () => void;
  onChoose: (choice: Choice) => void;
  onJump: (target: string) => void;
  onRestart: () => void;
};

const readerThemes = {
  paper: {
    label: "纸张",
    page: "#f4e5ca",
    text: "#2c241d",
    muted: "#806f5c",
  },
  green: {
    label: "护眼",
    page: "#dce8d1",
    text: "#243026",
    muted: "#60705f",
  },
  night: {
    label: "夜间",
    page: "#1e2323",
    text: "#d8d0c2",
    muted: "#92998e",
  },
};

type ReaderThemeKey = keyof typeof readerThemes;

export function ReaderView({
  story,
  chapter,
  historyLength,
  onBack,
  onChoose,
  onJump,
  onRestart,
}: ReaderViewProps) {
  const [activePanel, setActivePanel] = useState<ReaderPanel>(null);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [theme, setTheme] = useState<ReaderThemeKey>("paper");
  const [fontSize, setFontSize] = useState(20);
  const background = getAsset(story, chapter.background);
  const illustration = getAsset(story, chapter.illustration);
  const themeTokens = readerThemes[theme];
  const isEnding = chapter.choices.length === 0;
  const chapters = useMemo(() => Object.values(story.chapters), [story.chapters]);
  const currentIndex = chapters.findIndex((item) => item.id === chapter.id);
  const progressLabel = chapter.progressLabel ?? `${Math.max(currentIndex + 1, 1)}/${chapters.length}`;
  const chapterMeta = `${chapter.content.join("").length}字 · ${progressLabel}`;

  function togglePanel(panel: Exclude<ReaderPanel, null>) {
    setControlsVisible(true);
    setActivePanel((current) => (current === panel ? null : panel));
  }

  function jumpToChapter(target: string) {
    setActivePanel(null);
    setControlsVisible(false);
    onJump(target);
  }

  function chooseTarget(choice: Choice) {
    setActivePanel(null);
    setControlsVisible(false);
    onChoose(choice);
  }

  function restartReader() {
    setActivePanel(null);
    setControlsVisible(false);
    onRestart();
  }

  function handleStageClick(event: MouseEvent<HTMLElement>) {
    const target = event.target as HTMLElement;
    if (target.closest("button, .reader-side-panel")) return;

    setControlsVisible((visible) => {
      if (visible) setActivePanel(null);
      return !visible;
    });
  }

  const stageStyle = {
    "--reader-backdrop": background ? `url(${background.src})` : "none",
    "--reader-page-bg": themeTokens.page,
    "--reader-text": themeTokens.text,
    "--reader-muted": themeTokens.muted,
    "--reader-font-size": `${fontSize}px`,
  } as CSSProperties;

  return (
    <section
      className={`reader-stage reader-stage--${theme} ${controlsVisible ? "reader-stage--chrome-visible" : ""}`}
      style={stageStyle}
      onClick={handleStageClick}
    >
      {controlsVisible ? (
        <>
          <header className="reader-topbar">
            <div>
              <strong>{story.title}</strong>
              <span>{story.author ? `${story.author} · ` : ""}互动小说</span>
            </div>
            <p>{chapter.title}</p>
          </header>

          <ReaderToolbar
            canGoBack={historyLength > 0}
            activePanel={activePanel}
            onBack={onBack}
            onRestart={restartReader}
            onTogglePanel={togglePanel}
          />
        </>
      ) : null}

      <article className="reader-panel">
        <header className="story-header">
          <p className="story-kicker">
            {story.author ? `${story.author} · ` : ""}
            {story.title}
          </p>
          <h1>{chapter.title}</h1>
          <div className="chapter-meta">
            <span>{chapterMeta}</span>
            <span>阅读进度已保存</span>
          </div>
          {chapter.subtitle ? <p className="chapter-subtitle">{chapter.subtitle}</p> : null}
        </header>

        {illustration ? (
          <figure className="chapter-figure">
            <img src={illustration.src} alt={illustration.alt} />
            {illustration.caption ? <figcaption>{illustration.caption}</figcaption> : null}
          </figure>
        ) : null}

        <div className="chapter-body">
          {chapter.content.map((paragraph, index) => (
            <p key={`${chapter.id}-${index}`}>{paragraph}</p>
          ))}
        </div>

        <section className="choice-area" aria-label="章节选项">
          {isEnding ? (
            <button className="choice-button choice-button--ending" type="button" onClick={restartReader}>
              <span>回到开端</span>
              <small>这条路暂时到这里</small>
            </button>
          ) : (
            chapter.choices.map((choice) => (
              <button className="choice-button" key={choice.id} type="button" onClick={() => chooseTarget(choice)}>
                <span>{choice.text}</span>
                {choice.hint ? <small>{choice.hint}</small> : null}
              </button>
            ))
          )}
        </section>
      </article>

      {controlsVisible && activePanel ? (
        <aside className="reader-side-panel" aria-label={activePanel === "toc" ? "目录" : "阅读设置"}>
          {activePanel === "toc" ? (
            <>
              <header>
                <strong>目录</strong>
                <span>{chapters.length}章</span>
              </header>
              <div className="toc-list">
                {chapters.map((item, index) => (
                  <button
                    className={item.id === chapter.id ? "toc-item toc-item--active" : "toc-item"}
                    key={item.id}
                    type="button"
                    onClick={() => jumpToChapter(item.id)}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item.title}</strong>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <header>
                <strong>阅读设置</strong>
                <span>本地预览</span>
              </header>
              <div className="setting-group">
                <span>背景</span>
                <div className="theme-options">
                  {(Object.keys(readerThemes) as ReaderThemeKey[]).map((key) => (
                    <button
                      className={theme === key ? "theme-swatch theme-swatch--active" : "theme-swatch"}
                      key={key}
                      type="button"
                      onClick={() => setTheme(key)}
                      style={{ background: readerThemes[key].page, color: readerThemes[key].text }}
                    >
                      {readerThemes[key].label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="setting-group">
                <span>字号</span>
                <div className="font-controls">
                  <button type="button" onClick={() => setFontSize((size) => Math.max(16, size - 2))}>
                    A-
                  </button>
                  <strong>{fontSize}px</strong>
                  <button type="button" onClick={() => setFontSize((size) => Math.min(28, size + 2))}>
                    A+
                  </button>
                </div>
              </div>
            </>
          )}
        </aside>
      ) : null}

    </section>
  );
}
