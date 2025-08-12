import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  GITHUB_APP_PRIVATE_KEY: z.string(),
  GITHUB_APP_ID: z.coerce.number(),
  GITHUB_APP_INSTALLATION_ID: z.coerce.number(),
  PORT: z.coerce.number().default(3000),
  ENV: z.enum(["development", "production"]).default("production"),
});
const env = envSchema.parse(process.env);
export default env;
