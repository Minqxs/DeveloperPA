import axios from "axios";
import { z } from "zod";
import { GitHubRepo, GitHubRepoSchema, GitHubUserSchema } from "../types";

export async function getGitHubUser(username: string) {
  const res = await axios.get(`https://api.github.com/users/${username}`);
  return GitHubUserSchema.parse(res.data);
}

export async function getGitHubRepos(username: string) {
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

    if (parsed.length < perPage) break; // No more pages
    page++;
  }

  return allRepos;
}
