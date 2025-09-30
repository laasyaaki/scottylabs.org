import SponsorsSection from "../components/SponsorSection";
import css from "./sponsors.module.css";
export default function Sponsors() {
  const sponsorPacketURL =
    "https://bucket.minio.scottylabs.org/scottylabs.org/ScottyLabs_Sponsorship_Packet.pdf";

  return (
    <section className={"centered-section"}>
      <h1 className={css["header"]}>Sponsors</h1>
      <p className={css["description"]}>
        Interested in becoming a sponsor? View our{" "}
        <a href={sponsorPacketURL} target="_blank">
          sponsorship packet
        </a>{" "}
        or contact us at sponsors@scottylabs.org.
      </p>
      <SponsorsSection />;
    </section>
  );
}
