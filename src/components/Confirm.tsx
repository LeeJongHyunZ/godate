import { CONFIG } from "../config";
import type { DatePlan } from "../types";
import { formatDateLong, normalizeTimeInput } from "../utils/format";
import Title from "./Title";
import "./Confirm.css";

type Props = {
  plan: DatePlan;
  onConfirm: () => void;
};

export default function Confirm({ plan, onConfirm }: Props) {
  const { confirm } = CONFIG;

  const rows = [
    { icon: "📅", label: confirm.dateLabel, value: formatDateLong(plan.date) ?? "—" },
    { icon: "⏰", label: confirm.timeLabel, value: normalizeTimeInput(plan.time) ?? "—" },
    { icon: "🍽️", label: confirm.foodLabel, value: plan.food ?? "—" },
  ];

  return (
    <>
      <Title text={confirm.title} className="title title--pink confirm__title" />
      <p className="confirm__eyebrow">{confirm.eyebrow}</p>

      <ul className="confirm__rows">
        {rows.map((row) => (
          <li key={row.label} className="confirm__row">
            <span className="confirm__icon" aria-hidden="true">
              {row.icon}
            </span>
            <span className="confirm__text">
              <span className="confirm__label">{row.label}</span>
              <span className="confirm__value">{row.value}</span>
            </span>
          </li>
        ))}
      </ul>

      <p className="confirm__note script">{confirm.note}</p>

      <button type="button" className="btn btn--primary btn--lg btn--block" onClick={onConfirm}>
        {confirm.sendLabel}
      </button>
    </>
  );
}
