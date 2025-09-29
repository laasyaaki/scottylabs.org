import css from "./PacketViewer.module.css";
import sponsorPacketCover from "../assets/sponsors-page/sponsor-packet/cover.png";
import clsx from "clsx";
import { Link } from "react-router";
import { sponsors, type SponsorTypes } from "../sections/sponsors/sponsors";
const SponsorTile = ({
  imageUrl,
  type,
  websiteUrl,
}: {
  imageUrl: string;
  type: SponsorTypes;
  websiteUrl: string;
}) => {
  return (
    <a
      href={websiteUrl}
      target="_blank"
      className={clsx(
        css["sponsor"],
        type === "premier" && css["sponsor--premier"],
        type === "lowest" && css["sponsor--smaller"],
        type === "partner" && css["sponsor--partner"],
        imageUrl === undefined && css["sponsor--placeholder"],
      )}
    >
      {imageUrl && <img src={imageUrl} alt={imageUrl} key={imageUrl} />}
    </a>
  );
};
const SponsorPlaceholder = () => {
  return (
    <div className={clsx(css["sponsor"], css["sponsor--placeholder"])}></div>
  );
};
export default function PacketViewer() {
  const sponsorPacketURL =
    "https://bucket.minio.scottylabs.org/scottylabs.org/ScottyLabs_Sponsorship_Packet.pdf";
  const premierSponsors = sponsors.filter((s) => s.type === "premier");
  const partnerSponsors = sponsors.filter((s) => s.type === "partner");
  const lowestSponsors = sponsors.filter((s) => s.type === "lowest");
  return (
    <section className={"centered-section"}>
      <div className={css["main-container"]}>
        <div className={css["left-section"]}>
          <div className={css["sponsors-container"]}>
            {premierSponsors.map(({ imageUrl, type, websiteUrl }) => (
              <SponsorTile {...{ imageUrl, type, websiteUrl }} />
            ))}
            <SponsorPlaceholder />
            {partnerSponsors.map(({ imageUrl, type, websiteUrl }) => (
              <SponsorTile {...{ imageUrl, type, websiteUrl }} />
            ))}
            <SponsorPlaceholder />

            {lowestSponsors.map(({ imageUrl, type, websiteUrl }) => (
              <SponsorTile {...{ imageUrl, type, websiteUrl }} />
            ))}
          </div>
        </div>
        <div className={css["right-section"]}>
          <div className={css["right-section-sticky"]}>
            <Link to={sponsorPacketURL} target="_blank">
              <img
                className={css["sponsor-packet-cover"]}
                src={sponsorPacketCover}
                alt=""
              />
            </Link>
            <p>(Click to view)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
