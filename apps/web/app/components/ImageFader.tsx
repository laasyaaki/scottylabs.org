import { useEffect, useMemo, useState } from "react";
import css from "./ImageFader.module.css";
import clsx from "clsx";

function shuffleArray(ar: string[]) {
  const shuffledAr = [...ar];
  const N = shuffledAr.length;
  for (let i = 0; i < N; i++) {
    const randI = Math.floor(Math.random() * (N - i)) + i; // rand([i,N-1])
    [shuffledAr[i], shuffledAr[randI]] = [shuffledAr[randI], shuffledAr[i]];
  }
  return shuffledAr;
}
export default function ImageFader({
  imageLinks,
  displayDuration,
  heightPx,
  PeriodicTileInsert,
}: {
  imageLinks: string[];
  displayDuration: number;
  heightPx: number;
  PeriodicTileInsert?: () => React.ReactNode;
}) {
  const FADE_DURATION_MS = 800;
  const shuffledImageLinks = useMemo(
    () => shuffleArray(imageLinks),
    [imageLinks],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"fade-in" | "fade-out">("fade-in");
  const [showPeriodicTile, setShowPeriodicTile] = useState(false);

  // useEffect(() => {
  //   let fadeTimeout: number;
  //   let displayTimeout: number;
  //   if (fadeState === "fade-in") {
  //     fadeTimeout = setTimeout(() => {
  //       setFadeState("fade-out");
  //     }, displayDuration);
  //   } else {
  //     fadeTimeout = setTimeout(() => {
  //       // Show periodic tile if needed
  //       if (
  //         PeriodicTileInsert &&
  //         (currentIndex + 1) %
  //           Math.max(2, Math.ceil(window.innerWidth / 300) - 1) ===
  //           0
  //       ) {
  //         setShowPeriodicTile(true);
  //         displayTimeout = setTimeout(() => {
  //           setShowPeriodicTile(false);
  //           setCurrentIndex((i) => (i + 1) % shuffledImageLinks.length);
  //           setFadeState("fade-in");
  //         }, displayDuration);
  //       } else {
  //         setCurrentIndex((i) => (i + 1) % shuffledImageLinks.length);
  //         setFadeState("fade-in");
  //       }
  //     }, FADE_DURATION_MS);
  //   }
  //   return () => {
  //     clearTimeout(fadeTimeout);
  //     clearTimeout(displayTimeout);
  //   };
  // }, [
  //   fadeState,
  //   currentIndex,
  //   PeriodicTileInsert,
  //   shuffledImageLinks.length,
  //   displayDuration,
  // ]);

  return (
    <div
      className={clsx(css["carousel-container"])}
      style={{ height: heightPx, position: "relative", overflow: "hidden" }}
    >
      <img
        src={shuffledImageLinks[currentIndex]}
        alt=""
        className={css["carousel__image"]}
        style={{
          opacity: fadeState === "fade-in" ? 1 : 0,
          transition: `opacity ${FADE_DURATION_MS}ms`,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {showPeriodicTile && PeriodicTileInsert && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.2)",
          }}
        >
          <PeriodicTileInsert />
        </div>
      )}
    </div>
  );
}
