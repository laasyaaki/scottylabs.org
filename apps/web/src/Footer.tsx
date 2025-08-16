import css from "./Footer.module.css";
function getIcon(url: string) {
  return new URL(`./assets/icons/socials/${url}`, import.meta.url).href;
}
const socialLinks = [
  {
    icon: getIcon("email.svg"),
    name: "Email us!",
  },
];
export default function Footer() {
  return (
    <footer className={css["footer-container"]}>
      <div className={css["footer__copyright"]}>
        Made with ❤️ by ScottyLabs © {new Date().getFullYear()}
      </div>
      {socialLinks.map(({ icon, name }) => {
        return (
          <div className={css["social-link"]}>
            <img src={icon} alt="" />
            <div className={css["social-link__description"]}>{name}</div>
          </div>
        );
      })}
    </footer>
  );
}
