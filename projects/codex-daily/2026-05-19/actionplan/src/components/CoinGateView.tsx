import { Sparkles } from "lucide-react";
import type { CoinGate, CoinSide } from "../lib/story";

export type CoinStatus = "idle" | "tossing" | "revealed";

type CoinGateViewProps = {
  storyTitle: string;
  coinGate: CoinGate;
  coinResult: CoinSide | null;
  coinStatus: CoinStatus;
  onToss: () => void;
};

function routeHeroName(label: string) {
  return label.split("：")[0] || label;
}

export function CoinGateView({ storyTitle, coinGate, coinResult, coinStatus, onToss }: CoinGateViewProps) {
  const route = coinResult ? coinGate[coinResult] : null;
  const headsName = routeHeroName(coinGate.heads.label);
  const tailsName = routeHeroName(coinGate.tails.label);

  return (
    <section className="coin-stage">
      <div className="coin-copy">
        <p className="story-kicker">{storyTitle}</p>
        <h1>{coinGate.title}</h1>
        {coinGate.subtitle ? <p className="chapter-subtitle">{coinGate.subtitle}</p> : null}
      </div>

      <div className="coin-reveal">
        <div className="coin-result" aria-live="polite">
          {coinStatus === "idle" ? (
            <p>让硬币先替你开一本书。</p>
          ) : coinStatus === "tossing" ? (
            <p>硬币正在空中翻面...</p>
          ) : (
            <strong>{route?.label}</strong>
          )}
        </div>

        <button
          className="coin-button"
          type="button"
          onClick={onToss}
          disabled={coinStatus === "tossing"}
          aria-label={`抛硬币选择${headsName}或${tailsName}`}
        >
          <span
            className={[
              "coin",
              coinStatus === "tossing" ? "coin--tossing" : "",
              coinResult === "tails" && coinStatus !== "tossing" ? "coin--tails" : "coin--heads",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-hidden="true"
          >
            <span className="coin-face coin-face--heads">
              <span>{headsName}</span>
            </span>
            <span className="coin-face coin-face--tails">
              <span>{tailsName}</span>
            </span>
          </span>
        </button>
      </div>

      <button className="toss-button" type="button" onClick={onToss} disabled={coinStatus === "tossing"}>
        <Sparkles aria-hidden="true" />
        <span>{coinStatus === "tossing" ? "等待落下" : "抛硬币"}</span>
      </button>

      <div className="coin-route-grid" aria-label="硬币路线">
        <section>
          <strong>可能进入</strong>
          <span>{coinGate.heads.label}</span>
          {coinGate.heads.lines ? <small>{coinGate.heads.lines.join(" / ")}</small> : null}
        </section>
        <section>
          <strong>另一路线</strong>
          <span>{coinGate.tails.label}</span>
          {coinGate.tails.lines ? <small>{coinGate.tails.lines.join(" / ")}</small> : null}
        </section>
      </div>
    </section>
  );
}
