import { tsr } from "../../utils/tsr";
import css from "./ProjectPanel.module.css";
import linkIcon from "../../assets/icons/link.svg";
import type { Icon } from "./Icons";
import { Link } from "react-router";
export default function ProjectPanel({
  repoId,
  name,
  description,
  imageURLs,
  technologiesUsed,
  url,
}: {
  repoId: number;
  name: string;
  url: string;
  description: string;
  imageURLs: string[];
  technologiesUsed: Icon[];
}) {
  const lastUpdated = tsr.lastUpdated.useQuery({
    queryKey: [`last-updated-${repoId}`],
    queryData: { params: { repoId: repoId.toString() } },
  });
  return (
    <section className="centered-section">
      <div className={css["header"]}>
        <Link to={url} target="_blank" className={css["title-container"]}>
          <h2 className={css["project-title"]}>{name}</h2>
          <img src={linkIcon} className={css["project-link-icon"]} />
        </Link>
        <div className={css["project-icon-container"]}>
          {technologiesUsed.map((icon) => (
            <div className={css["project-icon"]}>
              <div className={css["project-icon__tooltip"]}>{icon.name}</div>
              <img src={icon.url} alt="" />
            </div>
          ))}
        </div>
      </div>
      {lastUpdated.data?.body?.updatedDate}
    </section>
  );
}
