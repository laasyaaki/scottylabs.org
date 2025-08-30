import css from "./Header.module.css";
import clsx from "clsx";

import scottylabsLogo from "../../assets/scottylabs-logo.svg";
import teamIcon from "../../assets/icons/team.svg";
import projectsIcon from "../../assets/icons/projects.svg";
import eventsIcon from "../../assets/icons/events.svg";
import sponsorsIcon from "../../assets/icons/sponsors.svg";
import hamburgerIcon from "../../assets/icons/hamburger.svg?inline";
import closeIcon from "../../assets/icons/close.svg?inline";
import { NavLink, useLocation } from "react-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";

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
  const [menuOpen, setMenuIsOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setMenuIsOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={clsx(
          css["main-header-container"],
          menuOpen && css["main-header-container--mobile-menu-open"],
        )}
      >
        <div className={css["main-header-layout"]}>
          <NavLink className={css["logo"]} to={"/"} prefetch="intent">
            <img className={css["logo__img"]} src={scottylabsLogo} />

            <div className={css["logo__text"]}>ScottyLabs</div>
          </NavLink>
          <nav className={css["main-nav--desktop"]}>
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
          <img
            src={menuOpen ? closeIcon : hamburgerIcon}
            className={css["main-nav--mobile"]}
            onClick={() => {
              setMenuIsOpen((prev) => !prev);
            }}
          />
        </div>

        {/* mobile hamburger menu, expanded */}
        <motion.div
          animate={{ height: menuOpen ? "auto" : 0 }}
          style={{ overflow: "hidden" }}
          transition={
            menuOpen
              ? {
                  type: "spring",
                  damping: 15,
                  stiffness: 150,
                }
              : {}
          }
        >
          <div className={css["hamburger-menu"]}>
            {navLinks.map(({ icon, url, text }) => (
              <NavLink
                className={({ isActive }) =>
                  clsx(
                    css["nav-button-mobile"],
                    isActive && css["nav-button-mobile--active"],
                  )
                }
                to={url}
                prefetch="render"
                key={url}
              >
                <img src={icon} />
                <div>{text}</div>
              </NavLink>
            ))}
          </div>
        </motion.div>
      </header>
      {/* the most temporary of solutions to put the main content in the correct place despite the header being position:fixed */}
      {/* we could do position:sticky, but this introduces layout jank when the hamburger menu opens on mobile. */}
      <div className={css["faux-div"]}></div>
      {/* height is manually styled with css */}
    </>
  );
}

export default Header;
