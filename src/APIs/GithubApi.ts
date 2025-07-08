import axios from "axios";
import { z } from "zod";
import { GitHubRepo, GitHubRepoSchema, GitHubUserSchema } from "../types";
import { safeFetch } from "../helpers";

export async function getGitHubUser(username: string) {
  return await safeFetch(
    async () => {
      const res = await axios.get(`https://api.github.com/users/${username}`);
      return GitHubUserSchema.parse(res.data);
    },
    null,
    `GitHub user '${username}'`
  );
}

export async function getGitHubRepos(username: string) {
  return await safeFetch(
    async () => {
      let allRepos: GitHubRepo[] = [];
      let page = 1;
      const perPage = 100;

      while (true) {
        const res = await axios.get(
          `https://api.github.com/users/${username}/repos`,
          {
            params: { per_page: perPage, page },
          }
        );

        const parsed = z.array(GitHubRepoSchema).parse(res.data);
        allRepos = [...allRepos, ...parsed];

        if (parsed.length < perPage) break;
        page++;
      }

      return allRepos;
    },
    [],
    `GitHub repos for '${username}'`
  );
}
