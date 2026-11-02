import { CONFIG } from "../config";
import { formatDatePlan } from "../utils/format";
import Title from "./Title";
import "./PickTime.css";

type Props = {
  date: string;
  time: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onNext: () => void;
};

export default function PickTime({ date, time, onDateChange, onTimeChange, onNext }: Props) {
  const { pickTime } = CONFIG;
  // 날짜 · 시간이 둘 다 올바르게 들어왔을 때만 문자열, 아니면 null
  const summary = formatDatePlan(date, time);

  return (
    <>
      <Title text={pickTime.title} className="title" />

      <div className="field">
        <label className="field__label" htmlFor="date">
          {pickTime.dateLabel}
        </label>
        <input
          id="date"
          className="field__input"
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="time">
          {pickTime.timeLabel}
        </label>
        <input
          id="time"
          className="field__input"
          type="time"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
        />
      </div>

      {/* 둘 다 고르기 전에도 자리를 잡아 두어 버튼이 아래로 튀지 않게 함 */}
      <div className="time__summary" aria-live="polite">
        {summary && (
          <>
            <p className="time__saved script">{pickTime.savedNote}</p>
            <p className="time__when">{summary}</p>
          </>
        )}
      </div>

      <button type="button" className="btn btn--primary btn--lg" disabled={!summary} onClick={onNext}>
        {pickTime.nextLabel}
      </button>
    </>
  );
}
