import { CONFIG } from "../config";
import Title from "./Title";
import "./FoodMission.css";

type Props = {
  /** 선택한 메뉴 이름. 아직 없으면 null */
  selected: string | null;
  onSelect: (name: string) => void;
  onNext: () => void;
};

export default function FoodMission({ selected, onSelect, onNext }: Props) {
  const { food } = CONFIG;

  return (
    <>
      <Title text={food.title} className="title" />

      <div className="food__grid" role="radiogroup" aria-label="Food">
        {food.items.map((item) => {
          const on = selected === item.name;
          return (
            <button
              key={item.name}
              type="button"
              role="radio"
              aria-checked={on}
              className={`food__item${on ? " food__item--on" : ""}`}
              onClick={() => onSelect(item.name)}
            >
              <span className="food__emoji" aria-hidden="true">
                {item.emoji}
              </span>
              <span className="food__name">{item.name}</span>
            </button>
          );
        })}
      </div>

      <button type="button" className="btn btn--primary btn--lg" disabled={!selected} onClick={onNext}>
        {food.nextLabel}
      </button>
    </>
  );
}
