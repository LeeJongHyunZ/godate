/** 화면 순서: ask → celebrate(전체화면) → time → food → confirm → done(전체화면) */
export type Stage = "ask" | "celebrate" | "time" | "food" | "confirm" | "done";

/** 사용자가 고른 데이트 계획 */
export type DatePlan = {
  /** <input type="date"> 값. 예: "2026-06-13" */
  date: string;
  /** <input type="time"> 값. 예: "20:10" */
  time: string;
  /** 고른 메뉴 이름. 아직 안 골랐으면 null */
  food: string | null;
};
