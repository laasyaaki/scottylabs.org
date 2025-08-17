import { useEffect, useLayoutEffect, useRef, useState, type JSX } from "react";
import css from "./ImageCarousel.module.css";
import clsx from "clsx";

export default function ImageCarousel({
  imageLinks,
  speedPxPerSecond,
  heightPx,
  gapPx,
  PeriodicTileInsert,
}: {
  imageLinks: string[];
  speedPxPerSecond: number;
  heightPx: number;
  gapPx?: number;
  PeriodicTileInsert?: () => React.ReactNode;
}) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const endOfCarouselRef = useRef<HTMLDivElement | null>(null);
  const direction = speedPxPerSecond > 0 ? "right" : "left";
  const LOADING_BUFFER_PX = 500;
  const [imagesVisibleOnScreen, setImagesVisibleOnScreen] = useState(5); //approximately
  useEffect(() => {
    const updateCustomTilePositioning = () => {
      setImagesVisibleOnScreen(Math.max(2, Math.ceil(window.innerWidth / 300)));
    };
    window.addEventListener("resize", updateCustomTilePositioning);
    updateCustomTilePositioning();
    return () =>
      window.removeEventListener("resize", updateCustomTilePositioning);
  }, []);
  const [tiles, setTiles] = useState<React.ReactNode[]>(
    Array(10)
      .fill(true)
      .map(() => (
        <img
          className={css["carousel__image"]}
          src={imageLinks[Math.floor(Math.random() * imageLinks.length)]}
          alt=""
          key={Math.random()}
          // it really doesn't matter since we're never changing this element
        />
      )),
  );
  useLayoutEffect(() => {
    let prevRenderTime = document.timeline.currentTime as number;
    let totalElapsed = 0;
    let running = true;

    const updatePosition = (curRenderTime: number) => {
      if (!running) return;
      totalElapsed += Math.min(500, curRenderTime - prevRenderTime); // in case user loses focus of the tab and comes back, we don't want significant amounts of time passing in between (because then we'll trigger a billion image loads and lag the page)
      prevRenderTime = curRenderTime;
      const offsetX = (totalElapsed / 1000) * speedPxPerSecond;
      if (carouselRef.current && endOfCarouselRef.current) {
        const { left: posX } = endOfCarouselRef.current.getBoundingClientRect();

        if (
          (direction === "left" &&
            posX <= window.innerWidth + LOADING_BUFFER_PX) ||
          (direction === "right" && posX >= -LOADING_BUFFER_PX)
        ) {
          // innerWidth accounts for page zoom
          // add in an additional image (or manual tile)

          setTiles((tiles) => [
            ...tiles,
            <img
              className={css["carousel__image"]}
              src={imageLinks[Math.floor(Math.random() * imageLinks.length)]}
              alt=""
              key={Math.random()}
              // it really doesn't matter since we're never changing this element
            />,
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
  }, [speedPxPerSecond, imageLinks, LOADING_BUFFER_PX, direction]);
  // console.log(loadedImages);
  return (
    <div
      className={clsx(
        css["carousel-container"],
        direction === "right" && css["carousel-container--flipped"],
      )}
    >
      <div
        className={css["carousel"]}
        ref={carouselRef}
        style={{ height: heightPx, gap: gapPx }}
      >
        {tiles.flatMap((tile, i) => {
          if (
            (i + 2) % (imagesVisibleOnScreen - 1) === 0 &&
            PeriodicTileInsert
          ) {
            // insert tile
            return [
              tile,
              <div
                key={Math.floor(i / (imagesVisibleOnScreen - 1))}
                style={{ flexShrink: 0 }}
              >
                <PeriodicTileInsert />
              </div>,
            ];
          } else {
            return [tile];
          }
        })}
        <div ref={endOfCarouselRef} />
      </div>
    </div>
  );
}
