import z from "zod";

const envSchema = z.object({
  VITE_BACKEND_URL: z.string(),
  VITE_PUBLIC_POSTHOG_KEY: z.string(),
  VITE_PUBLIC_POSTHOG_HOST: z.string(),
});
const env = envSchema.parse(import.meta.env);
export default env;
