// src/apis/github.ts
import axios from "axios";
import { z } from "zod";
import { GitHubRepoSchema, GitHubUserSchema } from "../types";

export async function getGitHubUser(username: string) {
  const res = await axios.get(`https://api.github.com/users/${username}`);
  return GitHubUserSchema.parse(res.data);
}

export async function getGitHubRepos(username: string) {
  const res = await axios.get(`https://api.github.com/users/${username}/repos`);
  return z.array(GitHubRepoSchema).parse(res.data);
}
