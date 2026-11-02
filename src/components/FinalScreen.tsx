import { CONFIG } from "../config";
import type { DatePlan } from "../types";
import { formatDatePlan } from "../utils/format";
import PolaroidGallery from "./PolaroidGallery";
import Title from "./Title";
import "./FinalScreen.css";

type Props = {
  plan: DatePlan;
};

export default function FinalScreen({ plan }: Props) {
  const { done } = CONFIG;
  const when = formatDatePlan(plan.date, plan.time);

  return (
    <section className="done">
      <div className="done__avatar-wrap">
        <img
          className="done__avatar"
          src={done.image}
          alt=""
          style={{ objectPosition: done.imagePosition }}
          draggable={false}
        />
      </div>

      <Title text={done.title} className="title title--red done__title" />
      <p className="done__sub">{done.subtitle}</p>
      <p className="done__thanks script">{done.thanks}</p>

      {/* 스크린샷에 계획이 같이 찍히도록 한 줄 요약 */}
      {when && plan.food && (
        <p className="done__plan">
          <span>📅 {when}</span>
          <span className="done__plan-dot" aria-hidden="true">
            ·
          </span>
          <span>🍽️ {plan.food}</span>
        </p>
      )}

      <p className="done__hint">{done.hint}</p>

      <PolaroidGallery title={done.galleryTitle} photos={done.photos} />
    </section>
  );
}
