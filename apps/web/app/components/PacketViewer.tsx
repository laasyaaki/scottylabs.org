import css from "./PacketViewer.module.css";

export default function PacketViewer() {
  const sponsorPacketURL =
    "https://bucket.minio.scottylabs.org/scottylabs.org/ScottyLabs_Sponsorship_Packet.pdf";
  return (
    <section className={"centered-section"}>
      <object
        data={sponsorPacketURL}
        type="application/pdf"
        className={css["sponsor-packet"]}
      >
        <p>
          You don&apos;t have a PDF viewer for this browser. You can{" "}
          <a href={sponsorPacketURL}>
            click here to view the sponsorship packet.
          </a>
        </p>
      </object>
    </section>
  );
}
