import z from "zod";

const envSchema = z.object({
  VITE_BACKEND_URL: z.string(),
  VITE_PUBLIC_POSTHOG_KEY: z.string(),
  VITE_PUBLIC_POSTHOG_HOST: z.string(),
  VITE_PUBLIC_CLERK_ALLOWED_REDIRECT_ORIGINS: z
    .string()
    .transform((s) => s.split(","))
    .optional(),
});
const env = envSchema.parse(import.meta.env);
export default env;
