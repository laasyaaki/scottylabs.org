import css from "./InProgress.module.css";
import nijika from "../assets/nijika.jpeg";
export default function InProgress() {
  return (
    <section className="centered-section">
      <div className={css["in-progress-container"]}>
        <img src={nijika} />
        We are still working on this page! Please check back later
      </div>
    </section>
  );
}
