import { useLayoutEffect, useRef, useState } from "react";
import css from "./ImageCarousel.module.css";
import { getAllImageLinksInAssetDirectory } from "./utils/files";

export default function ImageCarousel() {
  const imageLinks = getAllImageLinksInAssetDirectory("carousel-images");
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const CAROUSEL_SPEED_PX_PER_SECOND = -50;
  const [loadedImages, setLoadedImages] = useState<string[]>(
    Array(10)
      .fill(true)
      .map(() => imageLinks[Math.floor(Math.random() * imageLinks.length)]),
  );
  useLayoutEffect(() => {
    const zero = document.timeline.currentTime as number;
    let running = true;
    const updatePosition = (ts: number) => {
      if (!running) return;
      const elapsed = ts - zero;

      const offsetX = (elapsed / 1000) * CAROUSEL_SPEED_PX_PER_SECOND - 2000;
      if (carouselRef.current) {
        const rightX = carouselRef.current.getBoundingClientRect().right;
        if (rightX <= window.innerWidth + 500) {
          // innerWidth accounts for page zoom
          setLoadedImages((loadedImages) => [
            ...loadedImages,
            imageLinks[Math.floor(Math.random() * imageLinks.length)],
          ]);
        }
        carouselRef.current.style.translate = `${offsetX}px`;
      }
      requestAnimationFrame(updatePosition);
    };
    requestAnimationFrame(updatePosition);
    return () => {
      running = false;
    };
  }, [CAROUSEL_SPEED_PX_PER_SECOND]);
  // console.log(loadedImages);
  return (
    <section className={css["carousel-container"]}>
      <div className="centered-section">
        <div className={css["carousel"]} ref={carouselRef}>
          {loadedImages.map((url, i) => (
            <img className={css["carousel__image"]} src={url} key={i} alt="" />
          ))}
        </div>
      </div>
    </section>
  );
}
