import Header from "./Header";
import Hero from "./Hero";
import ImageCarousel from "./ImageCarousel";
import JoinUs from "./JoinUs";
import Projects from "./Projects";
import TartanHacks from "./TartanHacks";
import { getAllImageLinksInAssetDirectory } from "./utils/files";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ImageCarousel
          heightPx={300}
          speedPxPerSecond={-50}
          imageLinks={getAllImageLinksInAssetDirectory("carousel-images")}
        />
        <Projects />
        <TartanHacks />
        <JoinUs />
      </main>
    </>
  );
}
export default App;
