import { useEffect, useLayoutEffect, useRef, useState } from "react";
import css from "./Projects.module.css";
import { AnimatePresence, motion } from "motion/react";
import { getAllImageLinksInAssetDirectory } from "./utils/files";
import clsx from "clsx";
import { tsr } from "./utils/tsr";
import { DateTime, Interval } from "luxon";
import type { contract } from "@apps/backend/contract";
import type z from "zod";
import { FastAverageColor } from "fast-average-color";
import prIcon from "./assets/icons/pr.svg";
import commitIcon from "./assets/icons/commit.svg";
import spinnerIcon from "./assets/icons/spinner.svg";
const fac = new FastAverageColor();

const featuredProjects = [
  {
    name: "CMU Courses",
    assetFolder: "cmu-courses",
    description: `CMU Courses is a course browser built by and for CMU students.
          Bringing together course information, schedules and FCE data, it makes
          it possible for CMU students to plan their semesters and browse for
          courses. lmao what is this description`,
    link: "https://www.cmucourses.com/",
  },
  {
    name: "CMU Eats",
    assetFolder: "cmu-eats",
    description:
      "CMUEats is your one-stop-shop for finding out what campus dining locations are open right now.",
    link: "https://cmueats.com/",
  },
  {
    name: "CMU Maps",
    assetFolder: "cmu-maps",
    description: "Providing indoor maps and navigation for the CMU campus.",
    link: "https://cmumaps.com/",
  },
];

function IconDecoration() {
  const designIcons = getAllImageLinksInAssetDirectory("design-app-icons");
  const codeIcons = getAllImageLinksInAssetDirectory("code-app-icons");
  return (
    <div>
      {designIcons.slice(0, 4).map((icon) => (
        <motion.img
          drag
          dragSnapToOrigin
          className={clsx(
            css["tool-logo-slot"],
            icon.includes("/ai") && css["tool-logo-slot--ai-san"],
          )}
          src={icon}
          alt=""
          key={icon}
        />
      ))}
      {codeIcons.slice(0, 4).map((icon) => (
        <motion.img
          drag
          dragSnapToOrigin
          className={css["tool-logo-slot"]}
          src={icon}
          alt=""
          key={icon}
        />
      ))}
    </div>
  );
}
function DesignBoxDecoration() {
  return (
    <div className={css["decoration"]}>
      <div className={css["decoration__line"]} />
      <div className={css["decoration__line"]} />
      <div className={css["decoration__line"]} />
      <div className={css["decoration__line"]} />
      <div className={css["decoration__square"]} />
      <div className={css["decoration__square"]} />
      <div className={css["decoration__square"]} />
      <div className={css["decoration__square"]} />
    </div>
  );
}
function plurality(intervalOfTime: number, singularUnit: string) {
  if (intervalOfTime === 1) {
    return `${intervalOfTime} ${singularUnit}`;
  } else {
    return `${intervalOfTime} ${singularUnit}s`;
  }
}
function getTimeDeltaFromNow(pastDate: DateTime, now: DateTime) {
  const interval = Interval.fromDateTimes(pastDate, now);
  const daysCovered = interval.count("day");
  const duration = interval.toDuration([
    "days",
    "hours",
    "minutes",
    "seconds",
    "milliseconds",
  ]);
  if (daysCovered === 1) {
    if (duration.hours > 0) {
      return `${plurality(duration.hours, "hour")} ago`;
    }
    if (duration.minutes > 0) {
      return `${plurality(duration.minutes, "minute")} ago`;
    }
    return `${plurality(duration.seconds, "second")} ago`;
  } else {
    return daysCovered - 1 === 1 ? "yesterday" : `${daysCovered - 1} days ago`;
  }
}
function ContributionPopup({
  contribution,
}: {
  contribution: z.infer<
    (typeof contract.getLatestActivity)["responses"]["200"]
  >[number];
}) {
  const [now, setNow] = useState(DateTime.now());
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const popupRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const nudgePopupsToBeInViewport = () => {
      if (!popupRef.current) return;
      popupRef.current.style.transform = `translateX(50%)`; // temporarily reset it to get new offsets
      const boundingBox = popupRef.current.getBoundingClientRect();
      console.log(boundingBox.left, window.innerWidth);
      if (boundingBox.left < 0) {
        popupRef.current.style.transform = `translateX(calc(50% + ${-boundingBox.left}px))`;
      } else if (boundingBox.right > window.innerWidth - 20) {
        // innerWidth accounts for zoom, while outerWidth doesn't
        popupRef.current.style.transform = `translateX(calc(50% - ${boundingBox.right - window.innerWidth + 20}px))`;
      }
    };
    nudgePopupsToBeInViewport();
    window.addEventListener("resize", () => nudgePopupsToBeInViewport());
    return () =>
      window.removeEventListener("resize", () => nudgePopupsToBeInViewport());
  }, []);
  useEffect(() => {
    fac
      .getColorAsync(contribution.authorPfpUrl)
      .then((result) => setBgColor(result.hex));
  }, [contribution.authorPfpUrl]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(DateTime.now());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div
      className={css["contribution"]}
      style={{ "--bg-color": bgColor } as React.CSSProperties}
      ref={popupRef}
    >
      <a href={contribution.authorUrl} target="_blank">
        <img
          className={css["contribution__pfp"]}
          src={contribution.authorPfpUrl}
          alt=""
        />
      </a>
      <div className={css["contribution-description"]}>
        <a
          href={
            contribution.type === "commit"
              ? contribution.commitUrl
              : contribution.prUrl
          }
          target="_blank"
        >
          <span className={css["contribution-description__title"]}>
            {contribution.type === "pull_request" ? (
              <span>
                <img
                  className={css["contribution-description__title__icon"]}
                  src={prIcon}
                  alt=""
                />
                {contribution.prTitle}
                <span
                  className={css["contribution-description__title__pr-number"]}
                >
                  {" "}
                  #{contribution.prNumber}
                </span>
              </span>
            ) : (
              <span>
                <img
                  className={css["contribution-description__title__icon"]}
                  src={commitIcon}
                  alt=""
                />
                {contribution.commitMessage}
              </span>
            )}
          </span>
        </a>
        <span className={css["contribution-description__footer"]}>
          <a href={contribution.repoUrl} target="_blank">
            <span className={css["footer__repo"]}>
              {contribution.repoOrg}/{contribution.repoName}
            </span>
          </a>
          <span className={css["footer__time"]}>
            {getTimeDeltaFromNow(
              DateTime.fromISO(contribution.time, { zone: "local" }),
              now,
            )}
          </span>
        </span>
      </div>
    </div>
  );
}
function ContributorRow() {
  const { data, error, isLoading } = tsr.getLatestActivity.useQuery({
    queryKey: ["latestActivity"],
  });
  if (error !== null) {
    console.error(error);
    return <div>error</div>;
  }

  return (
    <div>
      <div className={css["contributor-row-container"]}>
        <span className={css["contributor-pill-container__text"]}>
          Recent contributors:
        </span>

        {data ? (
          data.body.slice(0, 5).map((contribution) => {
            return (
              <div className={css["contributor-pill-wrapper"]}>
                <a
                  className={css["contributor-pill"]}
                  href={contribution.authorUrl}
                  target="_blank"
                >
                  <img src={contribution.authorPfpUrl} />
                  {contribution.authorUsername}
                </a>
                <ContributionPopup contribution={contribution} />
              </div>
            );
          })
        ) : isLoading ? (
          Array.from(Array(5)).map((_, i) => {
            return (
              <div className={css["contributor-pill-wrapper"]} key={i}>
                <a
                  className={clsx(
                    css["contributor-pill"],
                    css["contributor-pill--inactive"],
                  )}
                >
                  <img
                    src={spinnerIcon}
                    alt=""
                    className={css["contributor-pill__loading-icon"]}
                  />
                  Loading...
                </a>
              </div>
            );
          })
        ) : (
          <div className={css["contributor-pill-container__error"]}>
            Error loading
          </div>
        )}
      </div>
    </div>
  );
}
export default function Projects() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  return (
    <section className="centered-section">
      <div className={css["title-section"]}>
        <h1 className={css["title-section__header"]}>
          From{" "}
          <span className={css["title-section__header__design-text"]}>
            Design
            <DesignBoxDecoration />
          </span>{" "}
          to{" "}
          <span className={css["title-section__header__code-block"]}>
            {"<"}
          </span>
          Development
          <span className={css["title-section__header__code-block"]}>
            {"/>"}
          </span>
          <IconDecoration />
        </h1>
        <p className={css["title-section__desc"]}>
          We bring to life a variety of tech services geared towards improving
          the CMU campus experience and inspiring the community!
        </p>
        <ContributorRow />
      </div>
      <ul className={css["project-tabs"]} role="tablist">
        {featuredProjects.map(({ name, assetFolder }, i) => {
          return (
            <button
              className={css["tab"]}
              role="tab"
              aria-selected={i === selectedProjectIndex ? "true" : "false"}
              onClick={() => setSelectedProjectIndex(i)}
              key={assetFolder}
            >
              <img
                className={css["tab__image"]}
                src={
                  new URL(
                    `./assets/projects/${assetFolder}/icon.png`,
                    import.meta.url,
                  ).href
                }
                alt=""
              />
              <div className={css["tab__name"]}>{name}</div>
            </button>
          );
        })}
        <button className={css["tab"]}>
          <img
            className={css["tab__image"]}
            src={new URL("./assets/icons/go-to-icon.svg", import.meta.url).href}
            alt=""
            style={{ height: "1em" }}
          />
          <div className={css["tab__name"]}>See more</div>
        </button>
      </ul>
      <div className={css["panel-container"]}>
        <AnimatePresence>
          <motion.div
            className={css["panel"]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={selectedProjectIndex}
          >
            <a
              href={featuredProjects[selectedProjectIndex].link}
              target="_blank"
            >
              <img
                className={css["panel__img"]}
                src={
                  new URL(
                    `./assets/projects/${featuredProjects[selectedProjectIndex].assetFolder}/main.png`,
                    import.meta.url,
                  ).href
                }
                alt=""
              />
            </a>
            <div className={css["panel__footer"]}>
              {featuredProjects[selectedProjectIndex].description}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
