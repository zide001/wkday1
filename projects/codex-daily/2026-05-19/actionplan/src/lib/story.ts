export type AssetRole = "background" | "illustration" | "portrait";

export type StoryAsset = {
  id: string;
  role: AssetRole;
  src: string;
  alt: string;
  caption?: string;
  position?: string;
  overlay?: number;
};

export type Choice = {
  id: string;
  text: string;
  target: string;
  hint?: string;
};

export type CoinSide = "heads" | "tails";

export type CoinGateRoute = {
  label: string;
  target: string;
  lines?: string[];
};

export type CoinGate = {
  title: string;
  subtitle?: string;
  heads: CoinGateRoute;
  tails: CoinGateRoute;
};

export type Chapter = {
  id: string;
  title: string;
  subtitle?: string;
  progressLabel?: string;
  background?: string;
  illustration?: string;
  content: string[];
  choices: Choice[];
};

export type Story = {
  id: string;
  title: string;
  author?: string;
  startChapterId: string;
  coinGate?: CoinGate;
  assets: Record<string, StoryAsset>;
  chapters: Record<string, Chapter>;
};

export type ReaderSave = {
  storyId: string;
  currentChapterId: string;
  history: string[];
  coinSide?: CoinSide;
  updatedAt: string;
};

export function getChapter(story: Story, chapterId: string): Chapter {
  return story.chapters[chapterId] ?? story.chapters[story.startChapterId];
}

export function getAsset(story: Story, assetId?: string): StoryAsset | undefined {
  if (!assetId) return undefined;
  return story.assets[assetId];
}

export function countEndings(story: Story): number {
  return Object.values(story.chapters).filter((chapter) => chapter.choices.length === 0).length;
}

export function validateStory(story: Story): string[] {
  const errors: string[] = [];

  if (!story.id) errors.push("缺少 story.id");
  if (!story.title) errors.push("缺少 story.title");
  if (!story.startChapterId) errors.push("缺少 startChapterId");
  if (!story.chapters?.[story.startChapterId]) {
    errors.push(`起始章节不存在：${story.startChapterId}`);
  }

  if (story.coinGate) {
    (["heads", "tails"] as const).forEach((side) => {
      const route = story.coinGate?.[side];
      if (!route?.target || !story.chapters?.[route.target]) {
        errors.push(`硬币${side === "heads" ? "正面" : "反面"}指向不存在的章节：${route?.target ?? "空"}`);
      }
    });
  }

  Object.values(story.chapters ?? {}).forEach((chapter) => {
    chapter.choices.forEach((choice) => {
      if (!story.chapters[choice.target]) {
        errors.push(`${chapter.title} 的选项「${choice.text}」指向不存在的章节：${choice.target}`);
      }
    });
  });

  return errors;
}
