import { ArrowLeft, BookMarked, Menu, RotateCcw, SlidersHorizontal } from "lucide-react";

export type ReaderPanel = "toc" | "settings" | null;

type ReaderToolbarProps = {
  canGoBack: boolean;
  activePanel: ReaderPanel;
  onBack: () => void;
  onRestart: () => void;
  onTogglePanel: (panel: Exclude<ReaderPanel, null>) => void;
};

export function ReaderToolbar({ canGoBack, activePanel, onBack, onRestart, onTogglePanel }: ReaderToolbarProps) {
  return (
    <nav className="reader-toolbar" aria-label="阅读工具">
      <button
        className="icon-button"
        type="button"
        onClick={onBack}
        disabled={!canGoBack}
        aria-label="返回上一章"
        title="返回上一章"
      >
        <ArrowLeft aria-hidden="true" />
        <span>返回</span>
      </button>
      <button
        className={`icon-button ${activePanel === "toc" ? "icon-button--active" : ""}`}
        type="button"
        onClick={() => onTogglePanel("toc")}
        aria-label="目录"
        title="目录"
      >
        <Menu aria-hidden="true" />
        <span>目录</span>
      </button>
      <button
        className={`icon-button ${activePanel === "settings" ? "icon-button--active" : ""}`}
        type="button"
        onClick={() => onTogglePanel("settings")}
        aria-label="阅读设置"
        title="阅读设置"
      >
        <SlidersHorizontal aria-hidden="true" />
        <span>设置</span>
      </button>
      <div className="dock-status" title="阅读进度已自动保存" aria-label="阅读进度已自动保存">
        <BookMarked aria-hidden="true" />
        <span>书签</span>
      </div>
      <button className="icon-button" type="button" onClick={onRestart} aria-label="重新开始" title="重新开始">
        <RotateCcw aria-hidden="true" />
        <span>重开</span>
      </button>
    </nav>
  );
}
