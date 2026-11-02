import confetti from "canvas-confetti";

/** 사이트 톤에 맞춘 핑크 계열 */
const PINKS = ["#e84a7f", "#ff7eb3", "#ffb3cd", "#ffd9e5", "#ffffff"];

const base: confetti.Options = {
  colors: PINKS,
  // 전체화면 레이어(축하 / 최종 화면) 위에 뿌려지도록 충분히 높게
  zIndex: 500,
  // 시스템에서 "동작 줄이기"를 켠 사용자에게는 뿌리지 않음
  disableForReducedMotion: true,
};

/** 버튼을 눌렀을 때 한 번 팡 터지는 효과 */
export function burst(origin: { x: number; y: number } = { x: 0.5, y: 0.6 }): void {
  void confetti({ ...base, particleCount: 90, spread: 75, startVelocity: 38, origin });
  void confetti({
    ...base,
    particleCount: 40,
    spread: 120,
    startVelocity: 25,
    scalar: 0.8,
    shapes: ["circle"],
    origin,
  });
}

/**
 * 화면 전체에 컨페티가 흩날리는 효과. durationMs 동안 위에서 계속 떨어집니다.
 * 반환된 함수를 부르면 더 이상 새 컨페티를 만들지 않습니다 (이미 떨어지는 것은 자연스럽게 사라짐).
 */
export function startRain(durationMs: number): () => void {
  burst({ x: 0.5, y: 0.45 });

  const end = Date.now() + durationMs;
  const timer = window.setInterval(() => {
    if (Date.now() >= end) {
      window.clearInterval(timer);
      return;
    }
    for (let i = 0; i < 3; i++) {
      void confetti({
        ...base,
        particleCount: 5,
        angle: 270,
        spread: 110,
        startVelocity: 12,
        gravity: 0.75,
        drift: (Math.random() - 0.5) * 1.2,
        ticks: 380,
        scalar: 0.9,
        shapes: ["square", "circle"],
        origin: { x: Math.random(), y: -0.05 },
      });
    }
  }, 90);

  return () => window.clearInterval(timer);
}
