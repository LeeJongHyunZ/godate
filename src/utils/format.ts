/**
 * <input type="date"> 값("2026-06-13")을 로컬 날짜로 파싱합니다.
 * new Date("2026-06-13") 은 UTC 자정으로 해석돼 시간대에 따라 하루가 밀릴 수 있어서 직접 쪼갭니다.
 * 형식이 틀리거나 존재하지 않는 날짜(2월 31일 등)면 null.
 */
export function parseDateInput(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const date = new Date(y, mo - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== mo - 1 || date.getDate() !== d) return null;
  return date;
}

/** <input type="time"> 값을 "HH:MM" 로 정리합니다 (초가 붙어 오면 잘라냄). 잘못된 값이면 null */
export function normalizeTimeInput(value: string): string | null {
  const m = /^(\d{2}):(\d{2})(?::\d{2})?$/.exec(value);
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return `${m[1]}:${m[2]}`;
}

/** "2026-06-13" → "Saturday, June 13" */
export function formatDateLong(value: string, locale = "en-US"): string | null {
  const date = parseDateInput(value);
  if (!date) return null;
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
}

/** "2026-06-13" + "20:10" → "Saturday, June 13 at 20:10". 둘 중 하나라도 비어 있으면 null */
export function formatDatePlan(dateValue: string, timeValue: string, locale = "en-US"): string | null {
  const date = formatDateLong(dateValue, locale);
  const time = normalizeTimeInput(timeValue);
  if (!date || !time) return null;
  return `${date} at ${time}`;
}
