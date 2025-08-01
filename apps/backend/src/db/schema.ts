import { integer, pgTable, text, timestamp, pgEnum, bigint } from "drizzle-orm/pg-core";

// we use bigint here because github stores its ids in 64-bit ints.

export const pullRequestTable = pgTable("pull_requests", {
  id: bigint({ mode: "number" }).primaryKey(),
  author_id: bigint({ mode: "number" })
    .notNull()
    .references(() => userTable.id),
  url: text().notNull(),
  title: text().notNull(),
  number: integer().notNull(),
  body: text(),
  base: text().notNull(),
  merged_at: timestamp({ withTimezone: true, mode: "date" }).notNull(), // recommended setting by stackoverflow (sql queries that set a timezone get the time shifted to be in that timezone)
  repo_id: bigint({ mode: "number" })
    .notNull()
    .references(() => repoTable.id),
});

export const commitTable = pgTable("commits", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sha: text().notNull(),
  author_id: bigint({ mode: "number" }).references(() => userTable.id),
  url: text().notNull(),
  message: text().notNull(),
  committed_at: timestamp({ withTimezone: true, mode: "date" }).notNull(), // recommended setting by stackoverflow (sql queries that set a timezone get the time shifted to be in that timezone)
  repo_id: bigint({ mode: "number" })
    .notNull()
    .references(() => repoTable.id),
});
export const techLeadTable = pgTable("tech_leads", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: bigint({ mode: "number" })
    .notNull()
    .references(() => userTable.id),
  repo_id: bigint({ mode: "number" })
    .notNull()
    .references(() => repoTable.id),
});
export const checkType = pgEnum("checktype", ["pull_request", "none", "commits"]);
export const repoTable = pgTable("repos", {
  id: bigint({ mode: "number" }).primaryKey(),
  check_type: checkType().notNull(),
  name: text().notNull(),
  org: text().notNull(),
  url: text().notNull(),
  pushed_at: timestamp({ withTimezone: true, mode: "date" }),
});
export const userTable = pgTable("users", {
  id: bigint({ mode: "number" }).primaryKey(),
  username: text().notNull(),
  name: text(),
  pfp_url: text().notNull(),
  account_url: text().notNull(),
});
