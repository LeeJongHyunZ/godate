// 이모지는 기기마다 모양이 달라서, 핵심 그림은 어디서나 같은 SVG 로 그립니다.

type IconProps = { size?: number };

/** 축하 화면의 빨간 상자 안에 들어가는 웃는 하트 */
export function SmilingHeart({ size = 112 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="heart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff6b6b" />
          <stop offset="1" stopColor="#f03a3a" />
        </linearGradient>
      </defs>
      <path
        d="M50 88C50 88 9 61 9 34c0-14 10-24 22-24 9 0 15 5 19 12 4-7 10-12 19-12 12 0 22 10 22 24 0 27-41 54-41 54z"
        fill="url(#heart-fill)"
      />
      {/* 눈: 웃어서 감긴 모양 */}
      <path
        d="M31 44c3-6 8-6 11 0M58 44c3-6 8-6 11 0"
        fill="none"
        stroke="#7a1414"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      {/* 입 */}
      <path
        d="M39 55c6 9 16 9 22 0"
        fill="none"
        stroke="#7a1414"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      {/* 반짝이는 하이라이트 */}
      <ellipse cx="69" cy="25" rx="6.5" ry="4" fill="#fff" opacity="0.85" transform="rotate(-30 69 25)" />
    </svg>
  );
}

/** 진행 바의 완료 표시 */
export function CheckIcon({ size = 13 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 12.5l5 5L20 7" />
    </svg>
  );
}
