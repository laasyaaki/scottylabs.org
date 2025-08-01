CREATE TYPE "public"."checktype" AS ENUM('pull_request', 'none', 'commits');--> statement-breakpoint
CREATE TABLE "commits" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "commits_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"sha" text NOT NULL,
	"author_id" bigint,
	"url" text NOT NULL,
	"message" text NOT NULL,
	"committed_at" timestamp with time zone NOT NULL,
	"repo_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pull_requests" (
	"id" bigint PRIMARY KEY NOT NULL,
	"author_id" bigint NOT NULL,
	"url" text NOT NULL,
	"title" text NOT NULL,
	"number" integer NOT NULL,
	"body" text,
	"base" text NOT NULL,
	"merged_at" timestamp with time zone NOT NULL,
	"repo_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "repos" (
	"id" bigint PRIMARY KEY NOT NULL,
	"check_type" "checktype" NOT NULL,
	"name" text NOT NULL,
	"org" text NOT NULL,
	"url" text NOT NULL,
	"pushed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "tech_leads" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tech_leads_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" bigint NOT NULL,
	"repo_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" bigint PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"name" text,
	"pfp_url" text NOT NULL,
	"account_url" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "commits" ADD CONSTRAINT "commits_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "commits" ADD CONSTRAINT "commits_repo_id_repos_id_fk" FOREIGN KEY ("repo_id") REFERENCES "public"."repos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pull_requests" ADD CONSTRAINT "pull_requests_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pull_requests" ADD CONSTRAINT "pull_requests_repo_id_repos_id_fk" FOREIGN KEY ("repo_id") REFERENCES "public"."repos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tech_leads" ADD CONSTRAINT "tech_leads_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tech_leads" ADD CONSTRAINT "tech_leads_repo_id_repos_id_fk" FOREIGN KEY ("repo_id") REFERENCES "public"."repos"("id") ON DELETE no action ON UPDATE no action;