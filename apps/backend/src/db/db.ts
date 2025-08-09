import { drizzle } from "drizzle-orm/node-postgres";
import env from "../env";
import * as schema from "./schema";

const db = drizzle(env.DATABASE_URL, { logger: false, schema });
export default db;
