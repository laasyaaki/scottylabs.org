import Hero from "../sections/home/Hero";
import ImageCarousel from "../components/ImageCarousel";
import JoinUs from "../sections/home/JoinUs";
import Projects from "../sections/home/Projects";
import TartanHacks from "../sections/home/TartanHacks";
import { getAllImageLinksInAssetDirectory } from "../utils/files";

export default function Home() {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(
    navigator.userAgent,
  );

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
