import css from "./Header.module.css";
import clsx from "clsx";

import scottylabsLogo from "../../assets/scottylabs-logo.svg";
import teamIcon from "../../assets/icons/team.svg";
import projectsIcon from "../../assets/icons/projects.svg";
import eventsIcon from "../../assets/icons/events.svg";
import sponsorsIcon from "../../assets/icons/sponsors.svg";
import hamburgerIcon from "../../assets/icons/hamburger.svg";
import closeIcon from "../../assets/icons/close.svg";
import { NavLink, useLocation } from "react-router";
import { useCallback, useState } from "react";
const navLinks = [
  {
    icon: projectsIcon,
    url: "/projects",
    text: "Projects",
  },
  {
    icon: eventsIcon,
    url: "/events",
    text: "Events",
  },
  {
    icon: teamIcon,
    url: "/team",
    text: "Team",
  },
  {
    icon: sponsorsIcon,
    url: "/sponsors",
    text: "Sponsors",
  },
];
function Header() {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(
    navigator.userAgent,
  );

  const [isOpen, setIsOpen] = useState(false);

  const toggleHamburger = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return isMobile ? (
    <header
      className={clsx(
        css["main-header-container"],
        isMobile && isOpen && css["main-header-container-mobile"],
      )}
    >
      <div className={css["main-header-layout"]}>
        <NavLink
          className={css["logo"]}
          to={"/"}
          // onClick={() =>
          //   window.scrollTo({
          //     top: 0,
          //     left: 0,
          //     behavior: "smooth",
          //   })
          // }
          prefetch="intent"
        >
          <img className={css["logo__img"]} src={scottylabsLogo} />

          <div className={css["logo__text"]}>ScottyLabs</div>
        </NavLink>
        <img
          src={isOpen ? closeIcon : hamburgerIcon}
          className={css["hamburger-icon"]}
          onClick={toggleHamburger}
        />
      </div>
      {isOpen && (
        <div className={css["hamburger-menu"]}>
          {navLinks.map(({ icon, url, text }, i) => (
            <>
              <NavLink
                className={({ isActive }) =>
                  clsx(
                    css["nav-button-mobile"],
                    isActive && css["nav-button--active"],
                  )
                }
                to={url}
                prefetch="intent"
                key={url}
              >
                <img className={css["nav-button__icon"]} src={icon} />
                <div className={css["nav-button__text"]}>{text}</div>
              </NavLink>
              {i === navLinks.length - 1 ? null : (
                <hr className={css["hamburger-divider"]} />
              )}
            </>
          ))}
        </div>
      )}
    </header>
  ) : (
    <header className={css["main-header-container"]}>
      <div className={css["main-header-layout"]}>
        <NavLink
          className={css["logo"]}
          to={"/"}
          // onClick={() =>
          //   window.scrollTo({
          //     top: 0,
          //     left: 0,
          //     behavior: "smooth",
          //   })
          // }
          prefetch="intent"
        >
          <img className={css["logo__img"]} src={scottylabsLogo} />

          <div className={css["logo__text"]}>ScottyLabs</div>
        </NavLink>
        <nav className={css["main-nav"]}>
          {navLinks.map(({ icon, url, text }) => (
            <NavLink
              className={({ isActive }) =>
                clsx(css["nav-button"], isActive && css["nav-button--active"])
              }
              to={url}
              prefetch="intent"
              key={url}
            >
              <img className={css["nav-button__icon"]} src={icon} />
              <div className={css["nav-button__text"]}>{text}</div>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
