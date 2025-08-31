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
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        {/* <meta name="viewport" content="width=1524" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=.3" />
        {/* https://stackoverflow.com/questions/31334481/how-to-force-desktop-view-on-mobile-devices */}
        <Meta />
        <Links />
        <script type="text/javascript">{`
          !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
          posthog.init('${import.meta.env.VITE_PUBLIC_POSTHOG_KEY}',{api_host:'${import.meta.env.VITE_PUBLIC_POSTHOG_HOST}', defaults:'2025-05-24'})
        `}</script>
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
