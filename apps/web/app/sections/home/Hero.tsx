import Button from "../../components/Button";
import css from "./Hero.module.css";
import heroBg from "../../assets/hero-bg.svg?inline"; // basically gets embedded into the source code so there's not a moment where the bg image is blank.
import scottylabsLogo from "../../assets/scottylabs-logo-grey.svg?inline";
import ImageFader from "../../components/ImageFader";
import { getAllImageLinksInAssetDirectory } from "../../utils/files";
function Hero() {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(
    navigator.userAgent,
  );

  return isMobile ? (
    <section className={css["hero-container"]}>
      <div className="centered-section-mobile centered-section--relative">
        <div className={css["hero-section-mobile"]}>
          <div className={css["title-container"]}>
            <span className={css["title-mobile"]}>ScottyLabs</span>
          </div>
          <div className={css["subtitle-mobile"]}>
            The best place to build software @ CMU
          </div>
          <div className={css["marketing-text-mobile"]}>
            We’re a student-run organization dedicated to building tech that
            enhances campus life—empowering the CMU community to create,
            collaborate, and solve real-world problems through apps and events.
          </div>

          <div className={css["action-buttons-mobile"]}>
            <Button
              label="View Products"
              variant="primary"
              className={css["button-mobile"]}
            />
            <Button
              label="Join Us"
              variant="outlined"
              className={css["button-mobile"]}
            />
          </div>

          <link rel="preload" href={heroBg} as="image" />
        </div>
        <div className={css["hero-background-mobile"]}>
          <img src={scottylabsLogo} alt="" fetchPriority="high" />
        </div>
      </div>
      <div className={css["image-fader-container"]}>
        <ImageFader
          imageLinks={getAllImageLinksInAssetDirectory("carousel-images")}
          displayDuration={5000}
          heightPx={300}
        />
      </div>
      <div className={css["events-container"]}>
        <div className="centered-section-mobile">
          <div className={css["events"]}>
            {[
              "Read about demo day",
              "Register for TartanHacks",
              "Check out CMUCal",
            ].map((txt) => (
              <button className={css["events__button-mobile"]} key={txt}>
                {txt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section className={css["hero-container"]}>
      <div className="centered-section centered-section--relative">
        <div className={css["hero-section"]}>
          <div className={css["title-container"]}>
            <span className={css["title"]}>
              ScottyLabs
              <div className={css["decoration"]}>
                <div className={css["decoration__line"]}></div>
                <div className={css["decoration__line"]}></div>
                <div className={css["decoration__line"]}></div>
                <div className={css["decoration__line"]}></div>
                <div className={css["decoration__tooltip"]}>
                  font-family: Satoshi; <br />
                  font-size: 3.75rem;
                  <br />
                  font-weight: 700;
                  <div className={css["decoration__tooltip__arrow"]} />
                </div>
              </div>
            </span>
          </div>
          <div className={css["subtitle"]}>
            The best place to build software @ CMU
          </div>
          <div className={css["marketing-text"]}>
            We’re a student-run organization dedicated to building tech that
            enhances campus life—empowering the CMU community to create,
            collaborate, and solve real-world problems through apps and events.
          </div>

          <div className={css["action-buttons"]}>
            <Button label="View Products" variant="primary" />
            <Button label="Join Us" variant="outlined" />
          </div>

          <link rel="preload" href={heroBg} as="image" />
        </div>
        <div className={css["hero-background"]}>
          <img src={heroBg} alt="" fetchPriority="high" />
        </div>
      </div>
      <div className={css["events-container"]}>
        <div className="centered-section">
          <div className={css["events"]}>
            {[
              "Read about demo day",
              "Register for TartanHacks",
              "Check out CMUCal",
            ].map((txt) => (
              <button className={css["events__button"]} key={txt}>
                {txt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default Hero;
