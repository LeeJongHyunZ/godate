/**
 * 문장 끝에 붙은 이모지 묶음을 분리합니다.
 *   "YAYYYYY!!! ❤️✨"  →  { text: "YAYYYYY!!!", emoji: "❤️✨" }
 *   "No emoji here"    →  { text: "No emoji here", emoji: "" }
 * 좁은 화면에서 이모지들이 한 개씩 따로 줄바꿈되지 않도록, 제목을 그릴 때 이모지 묶음을 한 덩어리로 감싸는 데 씁니다.
 */
const TRAILING_EMOJI = /((?:\p{Extended_Pictographic}|\p{Emoji_Modifier}|️|‍|⃣|\s)+)$/u;

export function splitTrailingEmoji(s: string): { text: string; emoji: string } {
  const m = TRAILING_EMOJI.exec(s);
  if (!m) return { text: s, emoji: "" };
  const emoji = m[1].trim();
  if (!emoji) return { text: s.trimEnd(), emoji: "" };
  return { text: s.slice(0, m.index).trimEnd(), emoji };
}
