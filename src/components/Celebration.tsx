import { useEffect } from "react";
import { CONFIG } from "../config";
import { startRain } from "../services/confetti";
import { SmilingHeart } from "./Icons";
import Title from "./Title";
import "./Celebration.css";

type Props = {
  /** 축하 시간이 끝나면 호출. 다음 단계로 넘어감 */
  onDone: () => void;
};

export default function Celebration({ onDone }: Props) {
  const { celebration } = CONFIG;

  useEffect(() => {
    const stopRain = startRain(celebration.durationMs);
    const timer = window.setTimeout(onDone, celebration.durationMs);
    return () => {
      stopRain();
      window.clearTimeout(timer);
    };
  }, [onDone, celebration.durationMs]);

  return (
    <section className="celebrate" aria-live="polite">
      <Title text={celebration.title} className="celebrate__title" />

      <div className="celebrate__box">
        {celebration.image ? (
          <img className="celebrate__img" src={celebration.image} alt="" />
        ) : (
          <SmilingHeart />
        )}
      </div>

      <p className="celebrate__sub">{celebration.subtitle}</p>
    </section>
  );
}
