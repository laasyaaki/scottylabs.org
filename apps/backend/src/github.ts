import { App } from "octokit";
import env from "./env";
const githubApp = new App({
  appId: env.GITHUB_APP_ID,
  privateKey: env.GITHUB_APP_PRIVATE_KEY,
});
const octokit = await githubApp.getInstallationOctokit(env.GITHUB_APP_INSTALLATION_ID);
type WithRequired<T, K extends (keyof T)[]> = T & { [P in K[number]]: NonNullable<T[P]> };
export async function getAllReposInOrg(org: string) {
  const repos = [];

  for (let page = 1; ; page++) {
    const { data, headers } = await octokit.rest.repos.listForOrg({
      per_page: 100,
      org,
      page,
    });

    repos.push(...data);
    if (!headers.link || !headers.link.includes('rel="next"')) {
      break;
    }
  }
  return repos;
}
export async function getMergedPRs(org: string, repoName: string) {
  const mergedPRs = [];
  for (let page = 1; ; page++) {
    const { data, headers } = await octokit.rest.pulls.list({
      owner: org,
      repo: repoName,
      state: "closed",
      per_page: 100,
      page,
    });

    const merged = data.filter(
      (pr) =>
        pr.merged_at !== null &&
        (pr.base.ref === "main" || pr.base.ref === "master" || pr.base.ref === "staging") &&
        pr.user !== null,
    ) as WithRequired<(typeof data)[0], ["user", "merged_at"]>[]; // we did a null-check on pr.user but typescript can't figure that out on its own
    mergedPRs.push(...merged);
    if (!headers.link?.includes('rel="next"')) {
      break;
    }
  }
  return mergedPRs;
}
export async function getCommitsToMain(org: string, repoName: string) {
  const commits = [];
  for (let page = 1; ; page++) {
    const { data, headers } = await octokit.rest.repos.listCommits({
      owner: org,
      repo: repoName,
      per_page: 100,
      page,
    }); // lists commits starting from default branch

    commits.push(...data);
    if (!headers.link?.includes('rel="next"')) {
      break;
    }
  }

  return commits;
}
