import type { CSSProperties } from "react";
import css from "./Footer.module.css";
import tartanConnectIcon from "../assets/icons/socials/tartan-connect.png";
import instagramIcon from "../assets/icons/socials/instagram.svg";
import linkedinIcon from "../assets/icons/socials/linkedin.svg";
import mediumIcon from "../assets/icons/socials/medium.svg";
import slackIcon from "../assets/icons/socials/slack.svg";
import emailIcon from "../assets/icons/socials/email.svg";
import divider from "../assets/icons/socials/social-divider.png";
// I didn't use the go.scottylabs.org links because they take over 1s to redirect you to the actual destination
// if that's fixed, I can replace these with go.scottylabs.org
const socialLinks = [
  {
    icon: tartanConnectIcon,
    name: "Tartan-Connect",
    url: "https://tartanconnect.cmu.edu/scottylabs/club_signup",
    color: "hsl(0,100%,30%)",
  },
  {
    icon: instagramIcon,
    name: "Instagram",
    url: "https://www.instagram.com/cmu.scottylabs/",
    color: "#6532D2",
  },
  {
    icon: linkedinIcon,
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/scottylabs",
    color: "#0E76A8",
  },
  {
    icon: mediumIcon,
    name: "Medium",
    url: "https://medium.com/tartanhacks",
    color: "black",
  },
  {
    icon: slackIcon,
    name: "Slack",
    url: "https://join.slack.com/t/scottylabs/shared_invite/zt-3bgp5in0l-T5KKNY70k70CvVVqLcKlDg",
    color: "#4A154B",
  },
  {
    icon: emailIcon,
    name: "Email us!",
    url: "mailto:hello@scottylabs.org",
    color: "gray",
  },
];
export default function Footer() {
  return (
    <footer className={css["footer-container"]}>
      <div className={css["footer"]}>
        <div className={css["footer__copyright"]}>
          Made with ❤️ by ScottyLabs © {new Date().getFullYear()}
        </div>
        {socialLinks.map(({ icon, name, url, color }, i) => {
          return (
            <>
              <a
                className={css["social-link"]}
                href={url}
                target="_blank"
                key={name}
                style={{ "--bg-color": color } as CSSProperties}
              >
                <div>
                  <img src={icon} alt="" />
                  <div className={css["social-link__description"]}>{name}</div>
                </div>
              </a>
              {i !== socialLinks.length - 1 && (
                <img
                  className={css["social-link-divider"]}
                  key={`${name}-divider`}
                  src={divider}
                />
              )}
            </>
          );
        })}
      </div>
    </footer>
  );
}
