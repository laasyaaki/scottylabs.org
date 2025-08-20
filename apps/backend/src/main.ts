import fastify from "fastify";
import { initServer } from "@ts-rest/fastify";
import { contract } from "./contract";
import cors from "@fastify/cors";
import { runContributionScrape } from "./db/refreshDb";
import { getRecentActivity, getContributors, getLatestUpdate } from "./db/dbQueries";
import env from "./env";

setInterval(() => runContributionScrape("scottylabs"), 10000);
const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
};
const app = fastify({ logger: envToLogger[env.ENV] });
await app.register(cors, {
  origin: true, // should probably be more strict after prod deployment
});

const s = initServer();

const router = s.router(contract, {
  getLatestActivity: async () => {
    const { recentCommits, recentPRs } = await getRecentActivity();
    const mergedData = [...recentCommits, ...recentPRs].sort((a, b) => b.time.localeCompare(a.time));
    return {
      status: 200,
      body: mergedData.filter(
        (data, i) => mergedData.findIndex((arData) => arData.authorUsername === data.authorUsername) === i,
      ), // get the first occurring contrib, github usernames are unique so this is fine
    };
  },
  async getContributors({ params: { org, repo } }) {
    return {
      status: 200,
      body: await getContributors(org, repo),
    };
  },
  async lastUpdated({ query: { repoIds } }) {
    const lastUpdate = await getLatestUpdate(repoIds);
    if (lastUpdate === undefined) {
      return {
        status: 404,
        body: {},
      };
    }
    return { status: 200, body: lastUpdate };
  },
});

s.registerRouter(contract, router, app, {
  responseValidation: true,
});
app.get("/", (req, res) => {
  res.redirect("https://bucket-production-718d.up.railway.app/miku/videoplayback%20(52).mp4");
});
const start = async () => {
  try {
    await app.listen({ port: env.PORT, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
