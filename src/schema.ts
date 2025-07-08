import { makeExecutableSchema } from "@graphql-tools/schema";
import { getBlogPosts, getUserBlogPosts } from "./APIs/BlogApi";
import { getCountryInfo } from "./APIs/CountriesApi";
import { getWeatherByCity } from "./APIs/WeatherApi";
import { getGitHubRepos, getGitHubUser } from "./APIs/GithubApi";
import { getDeveloper } from "./Services/DeveloperService";

const typeDefs = `
  type Developer {
    username: String!
    profile: GitHubProfile!
    repositories: [Repository!]!
    blogPosts: [BlogPost!]!
    location: LocationInfo
    weather: WeatherInfo
    stats: DeveloperStats!
  }

  type GitHubProfile {
    name: String
    bio: String
    avatarUrl: String
    followers: Int!
    following: Int!
    publicRepos: Int!
  }

  type Repository {
    name: String!
    description: String
    language: String
    stars: Int!
    forks: Int!
    url: String!
  }

  type BlogPost {
    title: String!
    body: String!
  }

  type LocationInfo {
    city: String
    country: String
  }

  type WeatherInfo {
    temperature: Float
    description: String
  }

  type DeveloperStats {
    totalRepos: Int!
    totalStars: Int!
  }

  type Query {
    developer(username: String!): Developer
    topRepositories(username: String!, limit: Int = 10): [Repository!]!

    
    gitHubProfile(username: String!): GitHubProfile
    gitHubRepos(username: String!): [Repository!]!
    blogPosts: [BlogPost!]!
    userBlogPosts(userId: Int!): [BlogPost!]!
    countryInfo(country: String!): LocationInfo
    weatherByCity(city: String!): WeatherInfo
  }
`;

const resolvers = {
  Query: {
    gitHubProfile: async (_: any, { username }: { username: string }) => {
      return await getGitHubUser(username);
    },
    developer: async (_: any, { username }: { username: string }) => {
      return await getDeveloper(username);
    },
    topRepositories: async (
      _: any,
      { username, limit }: { username: string; limit: number }
    ) => {
      const repos = await getGitHubRepos(username);
      return (
        repos &&
        repos
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, limit)
          .map((repo) => ({
            name: repo.name,
            description: repo.description,
            language: repo.language,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            url: repo.html_url,
          }))
      );
    },
    gitHubRepos: async (_: any, { username }: { username: string }) => {
      return await getGitHubRepos(username);
    },
    blogPosts: async () => {
      return await getBlogPosts();
    },
    userBlogPosts: async (_: any, { userId }: { userId: number }) => {
      await getUserBlogPosts(userId);
      return await getUserBlogPosts(userId);
    },
    countryInfo: async (_: any, { country }: { country: string }) => {
      return await getCountryInfo(country);
    },
    weatherByCity: async (_: any, { city }: { city: string }) => {
      return await getWeatherByCity(city);
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
