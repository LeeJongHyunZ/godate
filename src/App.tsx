import { useCallback, useEffect, useRef, useState } from "react";
// 공통 스타일(.title, .btn, .field)을 컴포넌트 CSS 보다 먼저 불러와야
// 각 컴포넌트의 .done__title 같은 덮어쓰기가 나중에 적용됨 (CSS 는 같은 우선순위면 뒤가 이김)
import "./App.css";
import type { DatePlan, Stage } from "./types";
import ProgressBar from "./components/ProgressBar";
import AskOut from "./components/AskOut";
import Celebration from "./components/Celebration";
import PickTime from "./components/PickTime";
import FoodMission from "./components/FoodMission";
import Confirm from "./components/Confirm";
import FinalScreen from "./components/FinalScreen";
import { burst } from "./services/confetti";

/** 진행 바에 표시되는 단계 번호. 전체화면 단계(celebrate / done)에는 진행 바가 없음 */
const STEP_OF: Partial<Record<Stage, number>> = { ask: 1, time: 2, food: 3, confirm: 4 };

/** 카드가 빠져나가는 애니메이션 길이(ms). App.css 의 card-out / screen-out 과 같은 값이어야 함 */
const EXIT_MS = 220;

function App() {
  const [stage, setStage] = useState<Stage>("ask");
  const [exiting, setExiting] = useState(false);
  const [plan, setPlan] = useState<DatePlan>({ date: "", time: "", food: null });
  const exitTimer = useRef(0);

  // 현재 화면이 먼저 빠져나간 뒤(EXIT_MS) 다음 화면이 들어오도록 두 단계로 전환
  const goTo = useCallback((next: Stage) => {
    if (exitTimer.current) return; // 전환 중 중복 클릭 무시
    setExiting(true);
    exitTimer.current = window.setTimeout(() => {
      exitTimer.current = 0;
      setExiting(false);
      setStage(next);
    }, EXIT_MS);
  }, []);

  useEffect(() => () => window.clearTimeout(exitTimer.current), []);

  const onYes = useCallback(() => goTo("celebrate"), [goTo]);
  const onCelebrated = useCallback(() => goTo("time"), [goTo]);
  const onConfirm = useCallback(() => {
    burst();
    goTo("done");
  }, [goTo]);

  const step = STEP_OF[stage];
  const exitClass = exiting ? " is-exiting" : "";

  return (
    <div className="app">
      {step !== undefined && <ProgressBar current={step} />}

      <main className={`stage${step === undefined ? " stage--full" : ""}`}>
        {stage === "celebrate" && (
          <div className={`screen${exitClass}`}>
            <Celebration onDone={onCelebrated} />
          </div>
        )}

        {stage === "done" && (
          <div className={`screen${exitClass}`}>
            <FinalScreen plan={plan} />
          </div>
        )}

        {step !== undefined && (
          // key 가 바뀌면 카드가 새로 마운트되어 들어오는 애니메이션이 다시 재생됨
          <div key={stage} className={`card${exitClass}`}>
            {stage === "ask" && <AskOut onYes={onYes} />}

            {stage === "time" && (
              <PickTime
                date={plan.date}
                time={plan.time}
                onDateChange={(date) => setPlan((p) => ({ ...p, date }))}
                onTimeChange={(time) => setPlan((p) => ({ ...p, time }))}
                onNext={() => goTo("food")}
              />
            )}

            {stage === "food" && (
              <FoodMission
                selected={plan.food}
                onSelect={(food) => setPlan((p) => ({ ...p, food }))}
                onNext={() => goTo("confirm")}
              />
            )}

            {stage === "confirm" && <Confirm plan={plan} onConfirm={onConfirm} />}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
