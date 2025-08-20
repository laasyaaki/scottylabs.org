import { tsr } from "../../utils/tsr";
import css from "./ProjectPanel.module.css";
import linkIcon from "../../assets/icons/link.svg";
import type { Icon } from "./Icons";
import { Link } from "react-router";
import { getTimeDeltaFromNow } from "../../utils/time";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
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
    <section className="centered-section">
      <div className={css["header"]}>
        <Link to={url} target="_blank" className={css["title-container"]}>
          <h2 className={css["project-title"]}>{name}</h2>
          <img src={linkIcon} className={css["project-link-icon"]} />
        </Link>
        <div className={css["project-icon-container"]}>
          {technologiesUsed.map((icon) => (
            <div className={css["project-icon"]} key={icon.name}>
              <div className={css["project-icon__tooltip"]}>{icon.name}</div>
              <img src={icon.url} alt="" />
            </div>
          ))}
        </div>
      </div>
      <div className={css["last-updated"]}>
        <LastUpdatedString repoIds={repoIds} />
      </div>
    </section>
  );
}
