import { getBlogPosts } from "../APIs/BlogApi";
import { getCountryInfo } from "../APIs/CountriesApi";
import { getGitHubUser, getGitHubRepos } from "../APIs/GithubApi";
import { getWeatherByCity } from "../APIs/WeatherApi";

import { Developer } from "../types";

export async function getDeveloper(username: string): Promise<Developer> {
  const user = await getGitHubUser(username);
  const repos = await getGitHubRepos(username);
  const blogPosts = await getBlogPosts();

  const profile = {
    name: user.name,
    bio: user.bio,
    avatarUrl: user.avatar_url,
    followers: user.followers,
    following: user.following,
    publicRepos: user.public_repos,
  };

  const repositories = repos.map((repo) => ({
    name: repo.name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    url: repo.html_url,
  }));

  const stats = {
    totalRepos: repos.length,
    totalStars: repos.reduce((acc, repo) => acc + repo.stargazers_count, 0),
  };

  const rawLocation = user.location;

  let city = "";
  let country = "";

  if (typeof rawLocation === "string" && rawLocation.includes(",")) {
    [city, country] = rawLocation.split(",").map((s) => s.trim());
  }

  const location = country ? await getCountryInfo(country) : null;
  const weather = city ? await getWeatherByCity(city) : null;

  return {
    username: user.login,
    profile,
    repositories,
    blogPosts,
    location,
    stats,
    weather,
  };
}
