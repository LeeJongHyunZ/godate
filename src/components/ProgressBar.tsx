import { CONFIG } from "../config";
import { CheckIcon } from "./Icons";
import "./ProgressBar.css";

type Props = {
  /** 현재 단계 (1 ~ 4) */
  current: number;
};

type StepState = "done" | "current" | "todo";

export default function ProgressBar({ current }: Props) {
  const { steps, currentEmoji } = CONFIG.progress;

  return (
    <nav className="progress" aria-label="Progress">
      <ol className="progress__list">
        {steps.map((step, i) => {
          const n = i + 1;
          const state: StepState = n < current ? "done" : n === current ? "current" : "todo";
          return (
            <li
              key={step.label}
              className={`progress__step progress__step--${state}`}
              aria-current={state === "current" ? "step" : undefined}
            >
              <span className="progress__dot" aria-hidden="true">
                {state === "done" && <CheckIcon />}
                {state === "current" && <span className="progress__car">{currentEmoji}</span>}
                {state === "todo" && n}
              </span>
              {/* 라벨과 이모지 사이는 줄바꿈 없는 공백(NBSP): 좁은 폰에서 이모지만 다음 줄로 떨어지지 않게 */}
              <span className="progress__label">
                {step.label}
                {" "}
                {step.emoji}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
