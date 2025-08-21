import { tsr } from "../../utils/tsr";
import css from "./ProjectPanel.module.css";
import linkIcon from "../../assets/icons/link.svg";
import type { Icon } from "./Icons";
import { Link } from "react-router";
import { getTimeDeltaFromNow } from "../../utils/time";
import { DateTime } from "luxon";
import { useEffect, useRef, useState } from "react";
import { useSpring, motion } from "motion/react";
import clsx from "clsx";

function LastUpdatedString({ repoIds }: { repoIds: number[] }) {
  const lastUpdated = tsr.lastUpdated.useQuery({
    queryKey: [`last-updated-${repoIds.join(",")}`],
    queryData: { query: { repoIds: repoIds.join(",") } },
  });
  const [now, setNow] = useState(DateTime.now());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(DateTime.now());
    }, 1000);
    return () => clearInterval(intervalId);
  });
  if (lastUpdated.isLoading) {
    return <>Last updated: Loading</>;
  }
  if (lastUpdated.data?.status !== 200) {
    return <>Repo not found</>;
  }
  const { author, authorURL, updatedDate } = lastUpdated.data.body;
  return (
    <>
      Last updated{" "}
      {getTimeDeltaFromNow(
        DateTime.fromISO(updatedDate, {
          zone: "local",
        }),
        now,
      )}{" "}
      by{" "}
      <a href={authorURL} target="_blank">
        {author}
      </a>
    </>
  );
}
/**
 *
 * @param imageOffsetsFromLeftX left X positions of images, relative to current container (0 is at leftmost point of fixed carousel container, not leftmost point of window)
 * @param carouselDirection direction that the carousel is moving in (ex. if you're swiping right, carouselDirection will be left)
 */
function getBestImageOffset(
  imageOffsetsFromLeftX: number[],
  carouselDirection: "left" | "right" | "none",
) {
  switch (carouselDirection) {
    case "left":
      return (
        imageOffsetsFromLeftX.findLast((x) => x <= 0) ??
        imageOffsetsFromLeftX[0]
      );

    case "right":
      return (
        imageOffsetsFromLeftX.find((x) => x >= 0) ??
        imageOffsetsFromLeftX[imageOffsetsFromLeftX.length - 1]
      );
    case "none": {
      let closestToZeroPos = Infinity;
      for (let i = 0; i < imageOffsetsFromLeftX.length; i++) {
        if (Math.abs(imageOffsetsFromLeftX[i]) < Math.abs(closestToZeroPos)) {
          closestToZeroPos = imageOffsetsFromLeftX[i];
        }
      }
      return closestToZeroPos;
    }
  }
}
function ProjectImages({ imageURLs }: { imageURLs: string[] }) {
  const leftOffset = useSpring(0, { mass: 0.01 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  return (
    <div style={{ overflow: "hidden" }}>
      <div
        className={clsx("centered-section", css["project-images-container"])}
      >
        <motion.div
          className={css["project-images"]}
          drag="x"
          style={{ x: leftOffset }}
          ref={containerRef}
          onDragEnd={(ev, info) => {
            if (!containerRef.current) return;

            const parentContainerLeftOffset =
              containerRef.current.parentElement!.getBoundingClientRect().x;

            const childrenXOffsets = [...containerRef.current.childNodes].map(
              (imgNode) =>
                (imgNode as HTMLImageElement).getBoundingClientRect().x -
                parentContainerLeftOffset,
            );
            if (childrenXOffsets.length === 0) return;

            const indexToGoTo = 0;

            console.log(indexToGoTo, info.velocity.x);

            leftOffset.set(
              leftOffset.get() -
                getBestImageOffset(
                  childrenXOffsets,
                  info.velocity.x === 0
                    ? "none"
                    : info.velocity.x > 0
                      ? "left"
                      : "right",
                ),
            );
          }}
          dragMomentum={false}
        >
          {imageURLs.map((url, i) => (
            <img className={css[""]} src={url} alt="" key={i} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
export default function ProjectPanel({
  repoIds,
  name,
  description,
  imageURLs,
  technologiesUsed,
  url,
}: {
  repoIds: number[];
  name: string;
  url: string;
  description: string;
  imageURLs: string[];
  technologiesUsed: Icon[];
}) {
  return (
    <section>
      <div className="centered-section">
        <div className={css["header"]}>
          <Link to={url} target="_blank" className={css["title-container"]}>
            <h2 className={css["project-title"]}>{name}</h2>
            <img src={linkIcon} className={css["project-link-icon"]} />
          </Link>
          <div className={css["project-icon-container"]}>
            {technologiesUsed.map((icon) => (
              <div className={css["project-icon"]} key={icon.name}>
                <div className={css["project-icon__tooltip"]}>{icon.name}</div>
                <img src={icon.url} alt={icon.name} />
              </div>
            ))}
          </div>
        </div>
        <div className={css["last-updated"]}>
          <LastUpdatedString repoIds={repoIds} />
        </div>
        <div className={css["project-description"]}>{description}</div>
      </div>
      <ProjectImages imageURLs={imageURLs} />
    </section>
  );
}
