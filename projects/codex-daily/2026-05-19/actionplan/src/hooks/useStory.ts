import { useEffect, useState } from "react";
import type { Story } from "../lib/story";
import { validateStory } from "../lib/story";

type StoryState =
  | { status: "loading"; story: null; errors: string[] }
  | { status: "ready"; story: Story; errors: string[] }
  | { status: "error"; story: null; errors: string[] };

export function useStory(src = "/stories/demo-story.json"): StoryState {
  const [state, setState] = useState<StoryState>({
    status: "loading",
    story: null,
    errors: [],
  });

  useEffect(() => {
    let active = true;

    async function loadStory() {
      try {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`无法加载故事配置：${response.status}`);
        }

        const story = (await response.json()) as Story;
        const errors = validateStory(story);

        if (active) {
          setState({ status: "ready", story, errors });
        }
      } catch (error) {
        if (active) {
          setState({
            status: "error",
            story: null,
            errors: [error instanceof Error ? error.message : "未知错误"],
          });
        }
      }
    }

    loadStory();

    return () => {
      active = false;
    };
  }, [src]);

  return state;
}
