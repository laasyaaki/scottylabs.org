import { useEffect, useState } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHP } from "posthog-js/react";
import env from "../utils/env";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    posthog.init(env.VITE_PUBLIC_POSTHOG_KEY, {
      api_host: env.VITE_PUBLIC_POSTHOG_HOST,
      defaults: "2025-05-24",
    });

    setHydrated(true);
  }, []);

  if (!hydrated) return <>{children}</>;
  return <PHP client={posthog}>{children}</PHP>;
}
