import { Outlet } from "react-router";
import Header from "../sections/home/Header";
import Footer from "../sections/home/Footer";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/react-router";
export default function Layout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
