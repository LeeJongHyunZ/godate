import { splitTrailingEmoji } from "../utils/text";

type Props = {
  /** 제목 문구 (CONFIG 의 문자열 그대로) */
  text: string;
  className?: string;
  as?: "h1" | "h2";
};

/**
 * 필기체 제목. 문구 끝의 이모지 묶음은 줄바꿈되지 않는 한 덩어리로 감싸서,
 * 좁은 폰에서 "❤️" 와 "✨" 가 서로 다른 줄로 흩어지지 않게 합니다.
 */
export default function Title({ text, className, as: Tag = "h1" }: Props) {
  const { text: body, emoji } = splitTrailingEmoji(text);
  return (
    <Tag className={className}>
      {body}
      {emoji && (
        <>
          {" "}
          <span className="title__emoji">{emoji}</span>
        </>
      )}
    </Tag>
  );
}
