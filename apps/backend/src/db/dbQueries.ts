import { sql, eq, desc, and } from "drizzle-orm";
import db from "./db";
import { commitTable, repoTable, userTable, pullRequestTable, techLeadTable } from "./schema";

export async function getRecentActivity() {
  // gets latest commit for per user, per repo (to avoid activity hogging on the homepage)
  const latestCommitsQuery = db
    .select({
      author_id: commitTable.author_id,
      latest_commit_time: sql`MAX(${commitTable.committed_at})`.as("latest_commit_time"),
    })
    .from(commitTable)
    .innerJoin(repoTable, eq(commitTable.repo_id, repoTable.id))
    .where(eq(repoTable.check_type, "commits")) // only get commit activity for repos with commit tracking (as opposed to PR tracking for more mature projects)
    .groupBy(commitTable.author_id) // the condensing part
    .orderBy(desc(sql`latest_commit_time`))
    .limit(10)
    .as("t");

  const recentCommits = await db
    .select()
    .from(commitTable)
    .innerJoin(
      latestCommitsQuery,
      and(
        eq(commitTable.author_id, latestCommitsQuery.author_id),
        eq(commitTable.committed_at, latestCommitsQuery.latest_commit_time),
      ),
    )
    .innerJoin(userTable, eq(commitTable.author_id, userTable.id))
    .innerJoin(repoTable, eq(commitTable.repo_id, repoTable.id));

  const latestPRsQuery = db
    .select({
      author_id: pullRequestTable.author_id,
      latest_merged_at: sql`MAX(${pullRequestTable.merged_at})`.as("latest_merged_at"),
    })
    .from(pullRequestTable)
    .innerJoin(repoTable, eq(pullRequestTable.repo_id, repoTable.id))
    .where(eq(repoTable.check_type, "pull_request"))
    .groupBy(pullRequestTable.author_id)
    .orderBy(desc(sql`latest_merged_at`))
    .limit(10)
    .as("t");
  const recentPRs = await db
    .select()
    .from(pullRequestTable)
    .innerJoin(
      latestPRsQuery,
      and(
        eq(pullRequestTable.author_id, latestPRsQuery.author_id),
        eq(pullRequestTable.merged_at, latestPRsQuery.latest_merged_at),
      ),
    )
    .innerJoin(userTable, eq(pullRequestTable.author_id, userTable.id))
    .innerJoin(repoTable, eq(pullRequestTable.repo_id, repoTable.id));
  return {
    recentCommits: recentCommits.map((commit) => ({
      type: "commit" as const,
      commitMessage: commit.commits.message,
      commitUrl: commit.commits.url,
      time: commit.commits.committed_at.toISOString(),
      authorUsername: commit.users.username,
      authorPfpUrl: commit.users.pfp_url,
      authorUrl: commit.users.account_url,
      repoName: commit.repos.name,
      repoOrg: commit.repos.org,
      repoUrl: commit.repos.url,
    })),
    recentPRs: recentPRs.map((pr) => ({
      type: "pull_request" as const,
      prTitle: pr.pull_requests.title,
      prNumber: pr.pull_requests.number,
      time: pr.pull_requests.merged_at.toISOString(),
      prUrl: pr.pull_requests.url,
      authorUsername: pr.users.username,
      authorPfpUrl: pr.users.pfp_url,
      authorUrl: pr.users.account_url,
      repoName: pr.repos.name,
      repoOrg: pr.repos.org,
      repoUrl: pr.repos.url,
    })),
  };
}

export async function getContributors(repoIds: number[]) {
  const contributorsFromThoseReposTable = db
    .select({
      author_id: commitTable.author_id,
      latest_commit_date: sql<string>`MAX(${commitTable.committed_at})`.as("latest_commit_date"),
    })
    .from(commitTable)
    .where(sql`${commitTable.repo_id} IN ${repoIds}`)
    .groupBy(commitTable.author_id)
    .as("data");
  const techLeadsFromThoseReposTable = db
    .select({ user_id: techLeadTable.user_id })
    .from(techLeadTable)
    .where(sql`${techLeadTable.repo_id} IN ${repoIds}`)
    .groupBy(techLeadTable.user_id)
    .as("tech_lead");
  const contributors = await db
    .select()
    .from(contributorsFromThoseReposTable)
    .innerJoin(userTable, eq(contributorsFromThoseReposTable.author_id, userTable.id))
    .leftJoin(
      techLeadsFromThoseReposTable,
      eq(contributorsFromThoseReposTable.author_id, techLeadsFromThoseReposTable.user_id),
    );

  return contributors.map((contributor) => ({
    username: contributor.users.name ?? contributor.users.username, // default to actual name, if exists
    latestCommitDate: contributor.data.latest_commit_date, // this is actually not ISO date format but whatever format Drizzle decided to spit out when doing a GROUP BY query. still parsable tho.
    pfpUrl: contributor.users.pfp_url,
    accLink: contributor.users.account_url,
    isTechLead: contributor.tech_lead !== null,
  }));
}
export async function getLatestUpdate(repoIds: number[]) {
  const userQuery = db.select().from(userTable).as("u");
  const latestCommits = db
    .select({
      repo_id: commitTable.repo_id,
      last_commit_time: sql`MAX(${commitTable.committed_at})`.as("alias"),
    })
    .from(commitTable)
    .groupBy(commitTable.repo_id);
  const result = (
    await db
      .select()
      .from(commitTable)
      .innerJoin(
        userQuery,
        and(
          eq(commitTable.author_id, userQuery.id),
          sql`${commitTable.repo_id} IN ${repoIds}`,
          sql`(${commitTable.repo_id},${commitTable.committed_at}) IN ${latestCommits}`,
        ),
      )
      .orderBy(desc(commitTable.committed_at))
      .limit(1)
  ).map((entry) => ({
    updatedDate: entry.commits.committed_at.toISOString(),
    author: entry.u.name ?? entry.u.username,
    authorURL: entry.u.account_url,
  }));
  if (result.length === 0) return undefined;
  return result[0];
}
