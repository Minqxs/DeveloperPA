import { z } from "zod";

export const DeveloperSchema = z.object({
  username: z.string(),
  profile: z.object({
    name: z.string().nullable(),
    bio: z.string().nullable(),
    avatarUrl: z.string(),
    followers: z.number(),
    following: z.number(),
    publicRepos: z.number(),
  }),
  repositories: z.array(
    z.object({
      name: z.string(),
      description: z.string().nullable(),
      language: z.string().nullable(),
      stars: z.number(),
      forks: z.number(),
      url: z.string(),
    })
  ),
  blogPosts: z.array(
    z
      .object({
        title: z.string(),
        body: z.string(),
      })
      .nullable()
  ),
  location: z
    .object({
      city: z.string().nullable(),
      country: z.string(),
    })
    .nullable(),
  stats: z.object({
    totalRepos: z.number(),
    totalStars: z.number(),
  }),
  weather: z
    .object({
      temperature: z.number(),
      description: z.string(),
    })
    .nullable(),
});

export type Developer = z.infer<typeof DeveloperSchema>;

export const WeatherResponseSchema = z.object({
  main: z.object({
    temp: z.number(),
  }),
  weather: z
    .array(
      z.object({
        description: z.string(),
      })
    )
    .nonempty(),
});

export type WeatherResponse = z.infer<typeof WeatherResponseSchema>;

export const GitHubUserSchema = z.object({
  login: z.string(),
  name: z.string().nullable(),
  bio: z.string().nullable(),
  avatar_url: z.string().url(),
  followers: z.number(),
  following: z.number(),
  public_repos: z.number(),
  location: z.string().nullable().optional(),
});

export type GitHubUser = z.infer<typeof GitHubUserSchema>;

export const GitHubRepoSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  html_url: z.string().url(),
});

export type GitHubRepo = z.infer<typeof GitHubRepoSchema>;

export const CountrySchema = z.object({
  name: z.object({ common: z.string() }),
  capital: z.array(z.string()).optional(),
});

export type Country = z.infer<typeof CountrySchema>;

export const BlogPostSchema = z.object({
  title: z.string(),
  body: z.string(),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;
