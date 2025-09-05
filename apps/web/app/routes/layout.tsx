import { Outlet } from "react-router";
import Header from "../sections/home/Header";
import Footer from "../sections/home/Footer";

export default function Layout() {
  return (
    <div style={{ minWidth: 950 }}>
      <Header />
      {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      {/* <meta name="viewport" content="width=1524" /> */}
      <meta name="viewport" content="width=device-width, initial-scale=.3" />
      {/* https://stackoverflow.com/questions/31334481/how-to-force-desktop-view-on-mobile-devices */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
