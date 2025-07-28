import Header from "./Header";
import Hero from "./Hero";
import ImageCarousel from "./ImageCarousel";
import JoinUs from "./JoinUs";
import Projects from "./Projects";
import TartanHacks from "./TartanHacks";
import { tsr } from "./utils/tsr";

function App() {
  const { data, isLoading } = tsr.getPokemon.useQuery({
    queryKey: ["ok"],
    queryData: { params: { id: "1" } },
  });

  return (
    <>
      <Header />
      <main>
        {data?.body.name}
        <Hero />
        <ImageCarousel />
        <Projects />
        <TartanHacks />
        <JoinUs />
      </main>
    </>
  );
}
export default App;
