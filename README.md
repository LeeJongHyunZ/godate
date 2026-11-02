# GoDate — 데이트 신청 웹사이트 💌

"Will you go on a date with me?" 로 시작해서 날짜 · 시간 · 메뉴를 고르면 "IT'S A DATE!!!" 로 끝나는 4단계 데이트 신청 사이트예요. `No` 버튼은 마우스가 가까이 가면 도망가서 절대 누를 수 없고, `Yes` 는 피할수록 커집니다. 마지막 화면에는 둘이 찍은 사진이 폴라로이드로 걸립니다.

React 18 + TypeScript + Vite 로 만들었고, GitHub 에 올린 뒤 Vercel 에 연결하면 바로 배포됩니다.

## 로컬 실행

```powershell
npm install
npm run dev
```

브라우저에서 http://127.0.0.1:5173 접속. 파일을 저장하면 바로 반영돼요.

## 빌드

```powershell
npm run build     # 타입 검사(tsc) + dist/ 생성
npm run preview   # 빌드 결과 미리보기 (http://127.0.0.1:4173)
```

## 문구 · 사진 · 메뉴 바꾸기

전부 [`src/config.ts`](src/config.ts) 한 파일에 모여 있어요. 따옴표 안의 글자만 바꾸면 됩니다.

| 항목 | 위치 | 비고 |
| --- | --- | --- |
| 1단계 이미지 (GIF 가능) | `askOut.image` | `"/photos/파일명.jpg"` 또는 `"https://....gif"` |
| No 버튼 문구 변화 | `askOut.noLabels` | 배열에 하나만 남기면 고정 |
| 축하 화면 하트 → GIF | `celebration.image` | 비우면(`""`) 기본 웃는 하트 |
| 축하 화면 시간 | `celebration.durationMs` | 기본 2500ms 뒤 자동 다음 단계 |
| 메뉴 6개 | `food.items` | 이모지 + 이름. 3열 그리드 |
| 최종 화면 동그란 사진 | `done.image`, `done.imagePosition` | 얼굴 위치에 맞춰 `"50% 30%"` 식으로 조정 |
| 폴라로이드 사진 · 캡션 | `done.photos` | 비우면 갤러리 자체가 숨겨짐 |

사진은 `public/photos/` 에 넣고 `/photos/파일명.jpg` 로 적어 주세요. 지금 들어 있는 5장은 긴 변 1400px · JPEG 품질 82 로 줄이고 EXIF(위치 정보 포함)를 제거한 것이에요. 새 사진도 1~2MB 넘지 않게 줄여서 넣는 걸 권해요.

## 모바일

모바일 우선으로 만들었고, 헤드리스 Edge 터치 에뮬레이션으로 아래 화면 크기에서 6단계 전부를 확인했어요 (가로 스크롤 없음, 요소가 화면 밖으로 나가지 않음, No 버튼 탭 시 도망, 메뉴 카드 3×2 유지, 폴라로이드 가로 스와이프).

| 기기 | 크기 |
| --- | --- |
| iPhone SE | 320 × 568 |
| 안드로이드 소형 | 360 × 740 |
| iPhone 일반 | 390 × 844 |
| iPhone Pro Max | 430 × 932 |
| 가로 모드 | 844 × 390 |

모바일용 처리: 제목은 `clamp()` 유동 크기, 입력칸 글자 16px(iOS 자동 확대 방지), 터치 영역 44px 이상, `100dvh` + safe-area 여백, 터치 기기에서는 hover 효과 끔(`@media (hover: hover)`), `touch-action: manipulation` 으로 더블탭 지연 제거.

## GitHub + Vercel 배포

1. GitHub 에 새 저장소를 만들고 이 폴더를 푸시 (`node_modules/`, `dist/` 는 `.gitignore` 로 제외됨)
2. https://vercel.com → "Add New → Project" → 저장소 선택
3. 프레임워크는 자동으로 **Vite** 감지 (Build: `npm run build`, Output: `dist`) — 그대로 Deploy
4. 환경 변수는 없음

배포되면 `프로젝트이름.vercel.app` 주소가 나와요. 이후엔 `git push` 만 하면 Vercel 이 자동으로 다시 빌드해요.

## 파일 구조

| 파일 | 역할 |
| --- | --- |
| `src/config.ts` | 문구 · 사진 · 메뉴 설정 (여기만 고치면 됨) |
| `src/App.tsx` | 단계 전환(ask → celebrate → time → food → confirm → done)과 선택값 보관 |
| `src/components/ProgressBar.tsx` | 상단 4단계 진행 바 (🚗 현재 / ✓ 완료 / 숫자 예정) |
| `src/components/AskOut.tsx` | 1단계. 도망가는 No 버튼, 커지는 Yes 버튼 |
| `src/components/Celebration.tsx` | Yes 직후 전체화면 축하 + 핑크 컨페티 |
| `src/components/PickTime.tsx` | 2단계. 날짜 · 시간 입력, "Saturday, June 13 at 20:10" 미리보기 |
| `src/components/FoodMission.tsx` | 3단계. 메뉴 3×2 그리드 단일 선택 |
| `src/components/Confirm.tsx` | 4단계. 요약 카드 + Confirm & Send |
| `src/components/FinalScreen.tsx` | 최종 화면. 동그란 사진, IT'S A DATE!!!, 폴라로이드 갤러리 |
| `src/components/PolaroidGallery.tsx` | 사진 폴라로이드 (모바일 가로 스크롤 / PC 줄바꿈) |
| `src/components/Title.tsx` | 필기체 제목. 끝의 이모지 묶음을 한 덩어리로 묶어 좁은 폰에서 흩어지지 않게 함 |
| `src/services/confetti.ts` | canvas-confetti 핑크 설정 (팡 / 흩날림) |
| `src/utils/format.ts` | 날짜 · 시간 파싱과 영문 포맷 |
| `src/utils/text.ts` | 제목 끝 이모지 분리 |

## 기술 스택

- React 18 + TypeScript + Vite 6
- canvas-confetti
- Google Fonts: Great Vibes (제목 필기체) · Nunito (본문)
