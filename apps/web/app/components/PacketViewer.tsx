import css from "./PacketViewer.module.css";
import sponsorPacketCover from "../assets/sponsors-page/sponsor-packet/cover.png";
import { getAllImageLinksInAssetDirectory } from "../utils/files";
import clsx from "clsx";
import { Link } from "react-router";

export default function PacketViewer() {
  const sponsorPacketURL =
    "https://bucket.minio.scottylabs.org/scottylabs.org/ScottyLabs_Sponsorship_Packet.pdf";
  const logos = [
    ...getAllImageLinksInAssetDirectory("sponsor-logos-premier").map((url) => ({
      url,
      status: "premier" as const,
    })),
    ...getAllImageLinksInAssetDirectory("sponsor-logos-partner").map((url) => ({
      url,
      status: "partner" as const,
    })),
  ];
  return (
    <section className={"centered-section"}>
      <div className={css["main-container"]}>
        <div className={css["left-section"]}>
          <h1>ScottyLabs is proudly sponsored by</h1>
          <div className={css["sponsors-container"]}>
            {logos.map(({ url, status }) => (
              <img
                className={clsx(
                  css["sponsor"],
                  status === "premier" && css["sponsor--premier"],
                )}
                src={url}
                alt={url}
                key={url}
              />
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
