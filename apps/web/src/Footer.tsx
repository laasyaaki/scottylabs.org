import type { CSSProperties } from "react";
import css from "./Footer.module.css";
function getIcon(url: string) {
  return new URL(`./assets/icons/socials/${url}`, import.meta.url).href;
}

// I didn't use the go.scottylabs.org links because they take over 1s to redirect you to the actual destination
// if that's fixed, I can replace these with go.scottylabs.org
const socialLinks = [
  {
    icon: getIcon("tartan-connect.png"),
    name: "Tartan Connect",
    url: "https://tartanconnect.cmu.edu/scottylabs/club_signup",
    color: "hsl(0,100%,30%)",
  },
  {
    icon: getIcon("instagram.svg"),
    name: "Instagram",
    url: "https://www.instagram.com/cmu.scottylabs/",
    color: "#6532D2",
  },
  {
    icon: getIcon("linkedin.svg"),
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/scottylabs",
    color: "#0E76A8",
  },
  {
    icon: getIcon("medium.svg"),
    name: "Medium",
    url: "https://medium.com/tartanhacks",
    color: "black",
  },
  {
    icon: getIcon("slack.svg"),
    name: "Slack",
    url: "https://join.slack.com/t/scottylabs/shared_invite/zt-3bgp5in0l-T5KKNY70k70CvVVqLcKlDg",
    color: "#4A154B",
  },
  {
    icon: getIcon("email.svg"),
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
                  src={getIcon("social-divider.png")}
                />
              )}
            </>
          );
        })}
      </div>
    </footer>
  );
}
