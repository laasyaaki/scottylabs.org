import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const contract = c.router({
  getLatestActivity: {
    method: "GET",
    path: "/github/latest",
    responses: {
      200: z.array(
        z.discriminatedUnion("type", [
          z.object({
            type: z.literal("pull_request"),
            prTitle: z.string(),
            prNumber: z.number(),
            time: z.string().refine((val) => !isNaN(Date.parse(val)), {
              message: "invalid ISO string",
            }),
            prUrl: z.string().url(),
            authorUsername: z.string(),
            authorPfpUrl: z.string().url(),
            authorUrl: z.string().url(),
            repoName: z.string(),
            repoOrg: z.string(),
            repoUrl: z.string().url(),
          }),
          z.object({
            type: z.literal("commit"),
            commitMessage: z.string(),
            commitUrl: z.string(),
            time: z.string().refine((val) => !isNaN(Date.parse(val)), {
              message: "invalid ISO string",
            }),
            authorUsername: z.string(),
            authorPfpUrl: z.string().url(),
            authorUrl: z.string().url(),
            repoName: z.string(),
            repoOrg: z.string(),
            repoUrl: z.string().url(),
          }),
        ]),
      ),
    },
    summary: "Get the latest activity for Scottylabs Tech",
  },
  getContributors: {
    method: "GET",
    path: "/github/:org/:repo/contributors",
    responses: {
      200: z.array(
        z.object({
          username: z.string(),
          name: z.string().nullable(),
          latestCommitDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: "invalid ISO string",
          }),
          pfpUrl: z.string().url(),
          accLink: z.string().url(),
          isTechLead: z.boolean(),
        }),
      ),
    },
  },
});
