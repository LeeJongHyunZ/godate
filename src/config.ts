// ─────────────────────────────────────────────────────────────────────────────
//  CONFIG — 사이트의 모든 문구 · 사진 · 메뉴를 이 파일 하나에서 바꿉니다.
//
//  · 사진은 public/photos/ 폴더에 넣고 "/photos/파일명.jpg" 처럼 적습니다.
//  · GIF 를 쓰고 싶으면 그 자리에 GIF 주소(https://....gif)를 넣으면 됩니다.
//  · 문구는 따옴표 안의 내용만 바꾸면 됩니다. 이모지도 자유롭게.
//  · 저장하면 개발 서버(npm run dev)에서는 바로 반영됩니다.
// ─────────────────────────────────────────────────────────────────────────────

export type MenuItem = {
  /** 카드에 크게 보이는 이모지 */
  emoji: string;
  /** 메뉴 이름 (확인 화면에도 그대로 표시됨) */
  name: string;
};

export type Photo = {
  /** 사진 경로 또는 주소 */
  src: string;
  /** 폴라로이드 아래에 손글씨로 들어갈 한 줄 */
  caption: string;
  /** 정사각형으로 잘릴 때 어디를 중심으로 보여줄지 (CSS object-position). 기본 "50% 50%" */
  position?: string;
};

export type ProgressStep = {
  label: string;
  emoji: string;
};

export type Config = {
  progress: {
    steps: [ProgressStep, ProgressStep, ProgressStep, ProgressStep];
    /** 현재 단계 동그라미에 들어가는 이모지 (모험 컨셉 = 자동차) */
    currentEmoji: string;
  };
  askOut: {
    title: string;
    /** 제목 아래 이미지 (사진 또는 GIF 주소) */
    image: string;
    imageAlt: string;
    yesLabel: string;
    /** No 버튼을 누르려 할 때마다 순서대로 바뀌는 문구. 하나만 남기면 항상 같은 문구 */
    noLabels: string[];
  };
  celebration: {
    title: string;
    subtitle: string;
    /** GIF 주소를 넣으면 기본 웃는 하트 대신 그 이미지를 보여줍니다. 비우면("") 기본 하트 */
    image: string;
    /** 축하 화면이 떠 있는 시간(ms). 지나면 자동으로 2단계로 넘어감 */
    durationMs: number;
  };
  pickTime: {
    title: string;
    dateLabel: string;
    timeLabel: string;
    savedNote: string;
    nextLabel: string;
  };
  food: {
    title: string;
    /** 3열 그리드. 6개면 딱 2행 */
    items: MenuItem[];
    nextLabel: string;
  };
  confirm: {
    title: string;
    eyebrow: string;
    dateLabel: string;
    timeLabel: string;
    foodLabel: string;
    note: string;
    sendLabel: string;
  };
  done: {
    /** 맨 위 동그란 사진 (사진 또는 GIF 주소) */
    image: string;
    /** 동그라미 안에서 사진의 어느 부분을 보여줄지 */
    imagePosition: string;
    title: string;
    subtitle: string;
    thanks: string;
    hint: string;
    /** 폴라로이드 갤러리 제목. 사진이 없으면 갤러리 자체가 숨겨짐 */
    galleryTitle: string;
    photos: Photo[];
  };
};

export const CONFIG: Config = {
  progress: {
    steps: [
      { label: "Ask Out", emoji: "❤️" },
      { label: "Pick a Time", emoji: "📅" },
      { label: "Food Mission", emoji: "🍜" },
      { label: "Confirm", emoji: "💌" },
    ],
    currentEmoji: "🚗",
  },

  askOut: {
    title: "Will you go on a date with me? 🥺",
    image: "/photos/01-karaoke.jpg",
    imageAlt: "Us at karaoke",
    yesLabel: "Yes! ❤️",
    noLabels: ["No 😢", "Are you sure? 🥺", "Really?? 😭", "Think again 🙏", "Pretty please 💕"],
  },

  celebration: {
    title: "YAYYYYY!!! ❤️✨",
    subtitle: "You just made someone very happy.",
    image: "",
    durationMs: 2500,
  },

  pickTime: {
    title: "When should our adventure begin? 🌸",
    dateLabel: "Pick a date 📅",
    timeLabel: "Choose a time ⏰",
    savedNote: "Perfect! I'll save that special moment 💖",
    nextLabel: "Next Adventure →",
  },

  food: {
    title: "Most important question... what shall we eat? 😋",
    items: [
      { emoji: "🍗", name: "Jollibee" },
      { emoji: "🍜", name: "Ramen" },
      { emoji: "🍕", name: "Pizza" },
      { emoji: "🍲", name: "Hot Pot" },
      { emoji: "🥩", name: "BBQ" },
      { emoji: "🍚", name: "Cơm Tấm" },
    ],
    nextLabel: "Continue →",
  },

  confirm: {
    title: "Almost there... 💖",
    eyebrow: "OUR DATE PLAN",
    dateLabel: "Date",
    timeLabel: "Time",
    foodLabel: "Food",
    note: "Everything looks perfect. One final tap and this date plan will be sent straight to your favorite person ❤️",
    sendLabel: "Confirm & Send 💌",
  },

  done: {
    image: "/photos/02-hangang.jpg",
    imagePosition: "50% 28%",
    title: "IT'S A DATE!!! ❤️🎉",
    subtitle: "I can't wait to see you.",
    thanks: "Thank you for saying yes 💖",
    hint: "Now go take a screenshot and send this to your favorite human ✨",
    galleryTitle: "Our adventures so far 📸",
    photos: [
      { src: "/photos/01-karaoke.jpg", caption: "Karaoke night 🎤" },
      { src: "/photos/02-hangang.jpg", caption: "Han River lights 💐", position: "50% 30%" },
      { src: "/photos/03-game.jpg", caption: "Player 2 joined 🎮" },
      { src: "/photos/04-cafe.jpg", caption: "Coffee & stars ☕" },
      { src: "/photos/05-cinema.jpg", caption: "Movie night 🎬", position: "50% 35%" },
    ],
  },
};
