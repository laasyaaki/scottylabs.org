import Hero from "../sections/Hero";
import ImageCarousel from "../sections/ImageCarousel";
import JoinUs from "../sections/JoinUs";
import Projects from "../sections/Projects";
import TartanHacks from "../sections/TartanHacks";
import { getAllImageLinksInAssetDirectory } from "../utils/files";

export default function Home() {
  return (
    <>
      <Hero />
      <ImageCarousel
        heightPx={300}
        speedPxPerSecond={-50}
        imageLinks={getAllImageLinksInAssetDirectory("carousel-images")}
      />
      <Projects />
      <TartanHacks />
      <JoinUs />
    </>
  );
}
