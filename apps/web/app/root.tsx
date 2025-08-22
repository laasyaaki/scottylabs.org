import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./index.css";
import Header from "./sections/home/Header";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { tsr } from "./utils/tsr";
import satoshiFont from "./assets/fonts/Satoshi-Regular.woff2";
import satoshiFontBold from "./assets/fonts/Satoshi-Bold.woff2";
import satoshiFontMedium from "./assets/fonts/Satoshi-Medium.woff2";
import satoshiFontBlack from "./assets/fonts/Satoshi-Black.woff2";
import jetbrainsMono from "./assets/fonts/JetBrainsMono-Regular.ttf";
import Footer from "./sections/home/Footer";
import errorCSS from "./Error.module.css";
import errorRyo from "./assets/ryo.webp";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /**
       * 5s should be enough to just keep identical query waterfalls low
       * @example if one page components uses a query that is also used further down the tree
       */
      staleTime: 5000,

      // Don't retry on 404s and other client errors
      retry: (failureCount, error) => {
        if (error instanceof Response) {
          // Don't retry on client errors (4xx)
          if (error.status >= 400 && error.status < 500) {
            return false;
          }
          // Retry on server errors (5xx)
          return failureCount < 3;
        }
        // Retry network errors
        if (error instanceof TypeError && error.message === "Failed to fetch") {
          return failureCount < 3;
        }
        return false;
      },

      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
});

export const links: Route.LinksFunction = () => [
  {
    rel: "preload",
    href: satoshiFont,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: satoshiFontBold,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: satoshiFontMedium,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: satoshiFontBlack,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: jetbrainsMono,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
];
export function meta({}: Route.MetaArgs) {
  return [
    { title: "ScottyLabs" },
    { name: "description", content: "The landing page for Scottylabs" },
  ];
}
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <StrictMode>
          <QueryClientProvider client={queryClient}>
            <tsr.ReactQueryProvider>
              <Header />
              <main>{children}</main>
              <Footer />

              <ScrollRestoration />
              <Scripts />
            </tsr.ReactQueryProvider>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </StrictMode>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className={errorCSS["error-container"]}>
      <h1 className={errorCSS["error-message"]}>{message}</h1>
      <p className={errorCSS["error-details"]}>{details}</p>
      {stack && (
        <pre className={errorCSS["error-stack"]}>
          <code>{stack}</code>
        </pre>
      )}
      <img src={errorRyo} height={400} />
    </div>
  );
}
