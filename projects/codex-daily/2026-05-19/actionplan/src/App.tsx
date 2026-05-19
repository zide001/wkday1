import { BookOpen } from "lucide-react";
import { NovelReader } from "./components";
import { useStory } from "./hooks/useStory";

function App() {
  const storyState = useStory();

  if (storyState.status === "loading") {
    return (
      <main className="app-shell app-shell--center">
        <div className="loading-panel">
          <BookOpen aria-hidden="true" />
          <p>正在载入故事...</p>
        </div>
      </main>
    );
  }

  if (storyState.status === "error" || !storyState.story) {
    return (
      <main className="app-shell app-shell--center">
        <section className="error-panel">
          <h1>故事配置加载失败</h1>
          {storyState.errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </section>
      </main>
    );
  }

  return <NovelReader story={storyState.story} warnings={storyState.errors} />;
}

export default App;
