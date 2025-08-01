import { sql, eq, desc, and } from "drizzle-orm";
import db from "./db";
import { commitTable, repoTable, userTable, pullRequestTable, techLeadTable } from "./schema";

export async function getRecentActivity() {
  // gets latest commit for per user, per repo (to avoid activity hogging on the homepage)
  const latestCommitsQuery = db
    .select({
      author_id: commitTable.author_id,
      latest_commit_time: sql`MAX(${commitTable.committed_at})`.as("latest_commit_time"),
      repo_id: commitTable.repo_id,
    })
    .from(commitTable)
    .innerJoin(repoTable, eq(commitTable.repo_id, repoTable.id))
    .where(eq(repoTable.check_type, "commits")) // only get commit activity for repos with commit tracking (as opposed to PR tracking for more mature projects)
    .groupBy(commitTable.repo_id, commitTable.author_id) // the condensing part
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
        eq(commitTable.repo_id, latestCommitsQuery.repo_id),
      ),
    )
    .innerJoin(userTable, eq(commitTable.author_id, userTable.id))
    .innerJoin(repoTable, eq(commitTable.repo_id, repoTable.id));

  const latestPRsQuery = db
    .select({
      author_id: pullRequestTable.author_id,
      repo_id: pullRequestTable.repo_id,
      latest_merged_at: sql`MAX(${pullRequestTable.merged_at})`.as("latest_merged_at"),
    })
    .from(pullRequestTable)
    .innerJoin(repoTable, eq(pullRequestTable.repo_id, repoTable.id))
    .where(eq(repoTable.check_type, "pull_request"))
    .groupBy(pullRequestTable.repo_id, pullRequestTable.author_id)
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
        eq(pullRequestTable.repo_id, latestPRsQuery.repo_id),
        eq(pullRequestTable.merged_at, latestPRsQuery.latest_merged_at),
      ),
    )
    .innerJoin(userTable, eq(pullRequestTable.author_id, userTable.id))
    .innerJoin(repoTable, eq(pullRequestTable.repo_id, repoTable.id));
  return { recentCommits, recentPRs };
}

export async function getContributors(repoOrg: string, repoName: string) {
  const repo = await db.query.repoTable.findFirst({
    where: and(eq(repoTable.org, repoOrg), eq(repoTable.name, repoName)),
  });
  if (repo === undefined) return [];
  const contributorSubquery = db
    .select({
      author_id: commitTable.author_id,
      latest_commit_date: sql<string>`MAX(${commitTable.committed_at})`.as("latest_commit_date"),
    })
    .from(commitTable)
    .where(eq(commitTable.repo_id, repo.id))
    .groupBy(commitTable.author_id)
    .as("data");
  const techLeadSubquery = db.select().from(techLeadTable).where(eq(techLeadTable.repo_id, repo.id)).as("tech_lead");
  const contributors = await db
    .select()
    .from(contributorSubquery)
    .innerJoin(userTable, eq(contributorSubquery.author_id, userTable.id))
    .leftJoin(techLeadSubquery, eq(contributorSubquery.author_id, techLeadSubquery.user_id));

  return contributors.map((contributor) => ({
    username: contributor.users.username,
    name: contributor.users.name,
    latestCommitDate: new Date(contributor.data.latest_commit_date),
    pfpUrl: contributor.users.pfp_url,
    accLink: contributor.users.account_url,
    isTechLead: contributor.tech_lead !== null,
  }));
}
