import Header from "./Header";
import Hero from "./Hero";
import ImageCarousel from "./ImageCarousel";
import JoinUs from "./JoinUs";
import Projects from "./Projects";
import TartanHacks from "./TartanHacks";
import { tsr } from "./utils/tsr";

function App() {
  const { data, isLoading } = tsr.getContributors.useQuery({
    queryKey: ["ok"],
    queryData: { params: { org: "scottylabs", repo: "cmueats" } },
  });

  return (
    <>
      <Header />
      <main>
        {JSON.stringify(data?.body)}
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
