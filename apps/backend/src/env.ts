import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  GITHUB_APP_PRIVATE_KEY: z.string(),
  GITHUB_APP_ID: z.coerce.number(),
  GITHUB_APP_INSTALLATION_ID: z.coerce.number(),
});
const env = envSchema.parse(process.env);
export default env;
