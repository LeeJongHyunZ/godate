import type { CSSProperties } from "react";
import type { Photo } from "../config";
import Title from "./Title";
import "./PolaroidGallery.css";

type Props = {
  title: string;
  photos: Photo[];
};

/** 폴라로이드가 살짝씩 다른 각도로 붙어 있도록 (사진 순서대로 반복) */
const TILTS = [-5, 3, -2, 4, -3, 2];

export default function PolaroidGallery({ title, photos }: Props) {
  if (photos.length === 0) return null;

  return (
    <section className="gallery" aria-label={title}>
      <Title as="h2" text={title} className="gallery__title script" />

      <ul className="gallery__list">
        {photos.map((photo, i) => (
          <li
            key={photo.src}
            className="polaroid"
            style={{ "--tilt": `${TILTS[i % TILTS.length]}deg` } as CSSProperties}
          >
            <img
              className="polaroid__img"
              src={photo.src}
              alt={photo.caption}
              loading="lazy"
              draggable={false}
              style={{ objectPosition: photo.position ?? "50% 50%" }}
            />
            <span className="polaroid__caption script">{photo.caption}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
