import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { CONFIG } from "../config";
import Title from "./Title";
import "./AskOut.css";

type Props = {
  onYes: () => void;
};

type Point = { x: number; y: number };
type Size = { w: number; h: number };

/** 마우스가 No 버튼 가장자리에서 이 거리(px) 안으로 들어오면 도망 */
const DODGE_DISTANCE = 44;
/** 연속 도망 사이 최소 간격(ms). 이동 애니메이션 중에 여러 번 튀는 것을 막음 */
const DODGE_COOLDOWN = 280;
/** 새 위치는 포인터에서 최소 이만큼(px) 떨어진 곳으로 */
const ESCAPE_RADIUS = 170;
/** 화면 가장자리 여백(px) */
const EDGE_PADDING = 16;
/** Yes 버튼이 커지는 최대 횟수와 한 번에 커지는 비율 */
const MAX_GROWTH_STEPS = 8;
const GROWTH_PER_STEP = 0.06;

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export default function AskOut({ onYes }: Props) {
  const { askOut } = CONFIG;
  const noRef = useRef<HTMLButtonElement>(null);
  const lastDodge = useRef(0);
  const [dodges, setDodges] = useState(0);
  /** No 버튼이 도망간 위치(viewport 기준). null 이면 아직 제자리 */
  const [noPos, setNoPos] = useState<Point | null>(null);
  /** No 버튼이 원래 있던 자리의 크기 — 도망간 뒤에도 레이아웃이 무너지지 않게 자리를 지켜 둠 */
  const [slot, setSlot] = useState<Size | null>(null);
  /** Yes 를 눌러 카드가 사라지는 동안 떠다니던 No 버튼도 같이 숨김 */
  const [leaving, setLeaving] = useState(false);

  const dodge = useCallback((pointer: Point | null) => {
    const btn = noRef.current;
    if (!btn) return;
    const now = performance.now();
    if (now - lastDodge.current < DODGE_COOLDOWN) return;
    lastDodge.current = now;

    const rect = btn.getBoundingClientRect();
    setSlot((s) => s ?? { w: rect.width, h: rect.height });

    const maxX = Math.max(EDGE_PADDING, window.innerWidth - rect.width - EDGE_PADDING);
    const maxY = Math.max(EDGE_PADDING, window.innerHeight - rect.height - EDGE_PADDING);

    // 포인터에서 충분히 먼 자리가 나올 때까지 몇 번 뽑아 봄
    let next: Point = { x: EDGE_PADDING, y: EDGE_PADDING };
    for (let i = 0; i < 12; i++) {
      next = { x: rand(EDGE_PADDING, maxX), y: rand(EDGE_PADDING, maxY) };
      if (!pointer) break;
      const cx = next.x + rect.width / 2;
      const cy = next.y + rect.height / 2;
      if (Math.hypot(cx - pointer.x, cy - pointer.y) >= ESCAPE_RADIUS) break;
    }

    setNoPos(next);
    setDodges((d) => d + 1);
  }, []);

  // 마우스가 가까이 오면 도망 (터치/펜은 아래 onPointerDown 에서 처리)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const btn = noRef.current;
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right);
      const dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom);
      if (Math.hypot(dx, dy) < DODGE_DISTANCE) dodge({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [dodge]);

  const growth = 1 + Math.min(dodges, MAX_GROWTH_STEPS) * GROWTH_PER_STEP;
  const noLabel = askOut.noLabels[Math.min(dodges, askOut.noLabels.length - 1)] ?? "No";

  // 도망간 뒤 문구가 길어져 버튼이 커지거나 창 크기가 바뀌어도 화면 밖으로 나가지 않게 위치를 보정
  const clampToViewport = useCallback(() => {
    const btn = noRef.current;
    if (!btn) return;
    const { width, height } = btn.getBoundingClientRect();
    const maxX = Math.max(EDGE_PADDING, window.innerWidth - width - EDGE_PADDING);
    const maxY = Math.max(EDGE_PADDING, window.innerHeight - height - EDGE_PADDING);
    setNoPos((pos) => {
      if (!pos) return pos;
      const x = Math.min(pos.x, maxX);
      const y = Math.min(pos.y, maxY);
      return x === pos.x && y === pos.y ? pos : { x, y };
    });
  }, []);

  useLayoutEffect(() => {
    if (noPos) clampToViewport();
  }, [noPos, noLabel, clampToViewport]);

  useEffect(() => {
    window.addEventListener("resize", clampToViewport);
    return () => window.removeEventListener("resize", clampToViewport);
  }, [clampToViewport]);

  function onNoPointerDown(e: ReactPointerEvent<HTMLButtonElement>) {
    // 터치는 "가까이 오는" 순간이 없으니 누르는 순간 도망
    if (e.pointerType !== "mouse") dodge({ x: e.clientX, y: e.clientY });
  }

  function onNoClick() {
    // 키보드 등으로 어떻게든 눌렀다면 그래도 도망. No 는 절대 받아들이지 않음
    dodge(null);
  }

  function onYesClick() {
    setLeaving(true);
    onYes();
  }

  const noButton = (
    <button
      ref={noRef}
      type="button"
      className={`btn btn--ghost ask__no${noPos ? " ask__no--loose" : ""}`}
      style={noPos ? { left: noPos.x, top: noPos.y } : undefined}
      onPointerDown={onNoPointerDown}
      onClick={onNoClick}
    >
      {noLabel}
    </button>
  );

  return (
    <>
      <Title text={askOut.title} className="title" />

      <div className="ask__media-wrap">
        <img className="ask__media" src={askOut.image} alt={askOut.imageAlt} draggable={false} />
      </div>

      <div className="ask__actions">
        <button
          type="button"
          className="btn btn--primary btn--lg ask__yes"
          style={{ transform: `scale(${growth})` }}
          onClick={onYesClick}
        >
          {askOut.yesLabel}
        </button>

        {/* 도망간 뒤에는 body 에 포탈로 그림. 카드의 transform 애니메이션 때문에
            position: fixed 기준점이 카드로 잡혀 화면 밖으로 나가는 것을 막기 위함 */}
        <span className="ask__no-slot" style={slot ? { width: slot.w, height: slot.h } : undefined}>
          {noPos ? (leaving ? null : createPortal(noButton, document.body)) : noButton}
        </span>
      </div>
    </>
  );
}
