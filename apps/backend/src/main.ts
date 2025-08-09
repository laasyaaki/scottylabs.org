import fastify from "fastify";
import { initServer } from "@ts-rest/fastify";
import { contract } from "./contract";
import cors from "@fastify/cors";
import { runContributionScrape } from "./db/refreshDb";
import { getRecentActivity, getContributors } from "./db/dbQueries";
import env from "./env";

setInterval(() => runContributionScrape("scottylabs"), 10000);

const app = fastify();
await app.register(cors, {
  origin: true, // should probably be more strict after prod deployment
});

const s = initServer();

const router = s.router(contract, {
  getLatestActivity: async () => {
    const { recentCommits, recentPRs } = await getRecentActivity();
    return {
      status: 200,
      body: [...recentCommits, ...recentPRs].sort((a, b) => b.time.localeCompare(a.time)),
    };
  },
  async getContributors({ params: { org, repo } }) {
    return {
      status: 200,
      body: await getContributors(org, repo),
    };
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
    console.log(`Ready on :${env.PORT}!`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
