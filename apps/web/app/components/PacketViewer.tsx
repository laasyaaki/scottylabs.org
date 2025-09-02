import css from "./PacketViewer.module.css";
import PacketPDF from "/ScottyLabs_Sponsorship_Packet.pdf";

export default function PacketViewer() {
  const sponsorPacketURL = "/ScottyLabs_Sponsorship_Packet.pdf";
  return (
    <div className={css["pageContent"]}>
      <div className={css["sponsorPacketContainer"]}>
        <object
          data={PacketPDF}
          type="application/pdf"
          className={css["sponsorPacket"]}
        >
          <p>
            You don&apos;t have a PDF viewer for this browser. You can{" "}
            <a href={sponsorPacketURL}>
              click here to view the sponsorship packet.
            </a>
          </p>
        </object>
      </div>
    </div>
  );
}
