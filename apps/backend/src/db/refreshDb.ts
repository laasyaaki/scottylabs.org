import { sql, eq } from "drizzle-orm";
import { getMergedPRs, getCommitsToMain, getAllReposInOrg } from "../github";
import db from "./db";
import { repoTable, userTable, pullRequestTable, commitTable } from "./schema";
let scrapeIsRunningFlag = false;
// console.log(await octokit.rest.repos.getContributorsStats({ repo: "dining-api", owner: "scottylabs" }));
async function populateRepositoryListAndGetChangedRepos(org: string) {
  const existingRepoData = await db.select().from(repoTable);
  const currentRepoData = (await getAllReposInOrg(org)).map((repo) => ({
    id: repo.id,
    check_type: "pull_request" as const,
    name: repo.name,
    url: repo.html_url,
    pushed_at: repo.pushed_at ? new Date(repo.pushed_at) : null,
    org,
  }));

  // console.log(repos[0].pushed_at);

  const insertedRows = await db
    .insert(repoTable)
    .values(currentRepoData)
    .onConflictDoUpdate({
      target: repoTable.id,
      set: {
        name: sql.raw(`excluded.${repoTable.name.name}`),
        org: sql.raw(`excluded.${repoTable.org.name}`),
        url: sql.raw(`excluded.${repoTable.url.name}`),
        // check_type: sql.raw(`excluded.${repoTable.check_type.name}`), // don't override this one
      },
    })
    .returning();
  console.log(`inserted/updated ${insertedRows.length} repos`); // we don't delete anything lol
  const reposToUpdate = currentRepoData
    .filter(
      (repo) =>
        repo.pushed_at === null ||
        repo.pushed_at.getTime() !==
          existingRepoData.find((existingRepo) => existingRepo.id === repo.id)?.pushed_at?.getTime(),
    )
    .map((repo) => ({ name: repo.name, org: repo.org, id: repo.id }));
  console.log(`need to refresh ${reposToUpdate.length} repos`);

  return {
    reposToUpdate,
    onSuccessDoRepoUpdate: async () => {
      await db
        .insert(repoTable)
        .values(currentRepoData)
        .onConflictDoUpdate({
          target: repoTable.id,
          set: {
            pushed_at: sql.raw(`excluded.${repoTable.pushed_at.name}`),
          },
        })
        .returning();
      console.log(`updated pushed_at times for repo table`);
    },
  };
}
async function updateUserTable(users: { id: number; login: string; avatar_url: string; html_url: string }[]) {
  return await db
    .insert(userTable)
    .values(
      users.map((user) => ({
        id: user.id,
        username: user.login,
        pfp_url: user.avatar_url,
        account_url: user.html_url,
      })),
    )
    .onConflictDoUpdate({
      target: userTable.id,
      set: {
        username: sql.raw(`excluded.${userTable.username.name}`),
        pfp_url: sql.raw(`excluded.${userTable.pfp_url.name}`),
        account_url: sql.raw(`excluded.${userTable.account_url.name}`),
      },
    })
    .returning();
}
async function populatePRs(repo: { id: number; org: string; name: string }) {
  const mergedPRs = await getMergedPRs(repo.org, repo.name).catch((e) => {
    console.error(e);
    return [];
  });
  if (mergedPRs.length) {
    // we need this check because drizzle does not accept [] as an argument for values()
    const userMap: { [id: string]: (typeof mergedPRs)[number]["user"] } = mergedPRs.reduce(
      (users, pr) => ({ [pr.user.id]: pr.user, ...users }),
      {},
    );
    const updatedUsers = await updateUserTable(Object.values(userMap));
    await db
      .transaction(async (tx) => {
        await tx.execute(sql`LOCK TABLE ${pullRequestTable} IN ACCESS EXCLUSIVE MODE`); // prevent reads while this transaction is in process
        // we could do some diff checking and preserve unchanged rows while deleting commits that no longer exist, but this is a lot simpler
        await tx.delete(pullRequestTable).where(eq(pullRequestTable.repo_id, repo.id));
        const insertedPRs = await tx
          .insert(pullRequestTable)
          .values(
            mergedPRs.map((pr) => ({
              id: pr.id,
              author_id: pr.user.id,
              url: pr.html_url,
              title: pr.title,
              number: pr.number,
              body: pr.body,
              base: pr.base.ref,
              merged_at: new Date(pr.merged_at),
              repo_id: repo.id,
            })),
          )
          .returning();
        console.log(`${repo.name}: Updated ${updatedUsers.length} users and added ${insertedPRs.length} PRs`);
      })
      .catch(console.error);
  } else {
    console.log(`${repo.name}: No PRs found, leaving data as-is`);
  }
}
async function populateCommits(repo: { id: number; org: string; name: string }) {
  const commits = await getCommitsToMain(repo.org, repo.name).catch((e) => {
    console.error(e);
    return [];
  });
  if (commits.length) {
    const userMap: { [id: string]: Exclude<NonNullable<(typeof commits)[number]["author"]>, Record<string, never>> } =
      commits
        .filter((commit) => commit.author !== null && Object.values(commit.author).length > 0) // we can only make the above type assertion because of this filter
        .reduce((users, pr) => ({ [pr.author!.id]: pr.author, ...users }), {});
    const updatedUsers = await updateUserTable(Object.values(userMap));
    await db
      .transaction(async (tx) => {
        await tx.execute(sql`LOCK TABLE ${commitTable} IN ACCESS EXCLUSIVE MODE`); // prevent reads while this transaction is in process
        await tx.delete(commitTable).where(eq(commitTable.repo_id, repo.id));
        const insertedCommits = await tx
          .insert(commitTable)
          .values(
            commits.map((commit) => ({
              sha: commit.sha,
              author_id: commit.author?.id ?? null,
              url: commit.html_url,
              message: commit.commit.message,
              committed_at: new Date(commit.commit.author?.date ?? 0), // don't ask me why the commit date can be null... github thinks so anyways
              repo_id: repo.id,
            })),
          )
          .returning();
        console.log(`${repo.name}: Updated ${updatedUsers.length} users and added ${insertedCommits.length} commits`);
      })
      .catch(console.error);
  } else {
    console.log(`${repo.name}: No commits found, leaving data as-is`);
  }
}
export async function runContributionScrape(org: string) {
  if (scrapeIsRunningFlag) {
    return;
  }
  scrapeIsRunningFlag = true;
  console.log("_____________");
  console.log(`beginning scrape on org ${org}`);
  try {
    // yay top-level error handling! :3
    const { reposToUpdate, onSuccessDoRepoUpdate } = await populateRepositoryListAndGetChangedRepos(org);
    const promises = reposToUpdate.map(async (repo) => {
      await populatePRs(repo);
      await populateCommits(repo);
    });
    await Promise.all(promises);

    await onSuccessDoRepoUpdate(); // updated the pushed_at time so we know not to re-scrape it on next function invocation
  } catch (e) {
    console.log(`Scrape failed with error ${e}`);
  }
  console.log("_____________");
  scrapeIsRunningFlag = false;
}
