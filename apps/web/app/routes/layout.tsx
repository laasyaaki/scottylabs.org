import { Outlet } from "react-router";
import Header from "../sections/home/Header";
import Footer from "../sections/home/Footer";

export default function Layout() {
  return (
    <div style={{ minWidth: 950 }}>
      <Header />

      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
