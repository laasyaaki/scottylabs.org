import fastify from "fastify";
import { initServer } from "@ts-rest/fastify";
import { pokemonContract } from "./contract";
import cors from "@fastify/cors";
import { runContributionScrape } from "./db/refreshDb";
import { getRecentActivity, getContributors } from "./db/dbQueries";

setInterval(() => runContributionScrape("scottylabs"), 10000);

const app = fastify();
await app.register(cors, {
  origin: true, // should probably be more strict after prod deployment
});

const s = initServer();

const router = s.router(pokemonContract, {
  getPokemon: async ({ params: { id } }) => {
    // Mock pokemon data
    const pokemon = { name: "Pikachu" };

    if (id !== "1") {
      return {
        status: 404,
        body: null,
      };
    }

    return {
      status: 200,
      body: pokemon,
    };
  },
  getLatestActivity: async () => {
    const { recentCommits, recentPRs } = await getRecentActivity();
    const mappedCommits = recentCommits.map((commit) => ({
      type: "commit" as const,
      commitMessage: commit.commits.message,
      commitUrl: commit.commits.url,
      time: commit.commits.committed_at,
      authorUsername: commit.users.username,
      authorPfpUrl: commit.users.pfp_url,
      authorUrl: commit.users.account_url,
      repoName: commit.repos.name,
      repoOrg: commit.repos.org,
      repoUrl: commit.repos.url,
    }));
    const mappedPRs = recentPRs.map((pr) => ({
      type: "pull_request" as const,
      prTitle: pr.pull_requests.title,
      prNumber: pr.pull_requests.number,
      time: pr.pull_requests.merged_at,
      prUrl: pr.pull_requests.url,
      authorUsername: pr.users.username,
      authorPfpUrl: pr.users.pfp_url,
      authorUrl: pr.users.account_url,
      repoName: pr.repos.name,
      repoOrg: pr.repos.org,
      repoUrl: pr.repos.url,
    }));
    return {
      status: 200,
      body: [...mappedCommits, ...mappedPRs].sort((a, b) => b.time.getTime() - a.time.getTime()),
    };
  },
  async getContributors({ params: { org, repo } }) {
    return {
      status: 200,
      body: await getContributors(org, repo),
    };
  },
});

s.registerRouter(pokemonContract, router, app, {
  responseValidation: true,
});
const start = async () => {
  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Ready on 3000!");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
