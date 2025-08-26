import Hero from "../sections/home/Hero";
import ImageCarousel from "../components/ImageCarousel";
import JoinUs from "../sections/home/JoinUs";
import Projects from "../sections/home/Projects";
import TartanHacks from "../sections/home/TartanHacks";
import { getAllImageLinksInAssetDirectory } from "../utils/files";
import { useIsMobile } from "../hooks/useIsMobile";

export default function Home() {
  // mobile if screen width less than 768
  const isMobile = useIsMobile();

  return (
    <>
      <Hero />
      {!isMobile && (
        <ImageCarousel
          heightPx={300}
          speedPxPerSecond={-50}
          imageLinks={getAllImageLinksInAssetDirectory("carousel-images")}
        />
      )}
      <Projects />
      <TartanHacks />
      <JoinUs />
    </>
  );
}
