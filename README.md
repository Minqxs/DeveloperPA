# 🧩 Developer Portfolio Aggregator (GraphQL API)

A API integration project that aggregates developer information from multiple public APIs and serves it through a single GraphQL endpoint.

---

## 🚀 Features

- 🌐 **GraphQL API** powered by GraphQL Yoga
- 🧩 **Multi-API Aggregation** from GitHub, JSONPlaceholder, REST Countries, OpenWeatherMap
- 🧪 **Zod Validation** for runtime-safe data
- 🛡️ **Graceful Error Handling** with fallback logic
- ⚡ Built with **TypeScript + Hono**

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/developer-pa.git
   cd developer-pa
   ```
2. Install dependencies
   npm install
3. Set up environment variables
   Create a .env file and add your OpenWeatherMap API key:

OPENWEATHER_API_KEY=your_openweather_api_key_here 4. Start the server
npm run dev

5. Visit the GraphQL Playground

- localhost:port/graphql

🔎 Example GraphQL Queries
Query: Developer Overview

query GetDeveloper {
developer(username: "octocat") {
username
profile {
name
bio
followers
}
repositories {
name
stars
language
}
stats {
totalRepos
totalStars
}
blogPosts {
title
}
location {
country
}
weather {
temperature
}
}
}

Query: Top Repositories

query GetTopRepos {
topRepositories(username: "octocat", limit: 5) {
name
description
stars
language
}
}

Example Response

{
"data": {
"developer": {
"username": "octocat",
"profile": {
"name": "The Octocat",
"bio": "Just a friendly GitHub mascot",
"followers": 1000
},
"repositories": [
{
"name": "Hello-World",
"stars": 1500,
"language": "JavaScript"
}
],
"stats": {
"totalRepos": 8,
"totalStars": 5000
},
"blogPosts": [
{
"title": "Hello JSONPlaceholder"
}
],
"location": {
"country": "United States"
},
"weather": {
"temperature": 23.5
}
}
}
}

⚠️ Error Handling Approach

Each API integration is wrapped in try/catch blocks to ensure partial failures do not crash the query.
API Fallback Behavior
GitHub Errors bubble to GraphQL (required)
Blog Posts Returns empty array []
REST Countries location returns null
OpenWeatherMap weather returns null

Console logs are added for debugging without exposing sensitive errors to the client.
🔄 Data Transformation Approach

External data is validated and shaped using Zod schemas before returning from the service layer.

    GitHub profile and repo data is transformed into a GitHubProfile and Repository[]

    JSONPlaceholder data is transformed into BlogPost[]

    REST Countries resolves human-readable location info

    OpenWeatherMap provides temperature + condition fields

    Stats are calculated: total repos + total stars

This keeps the GraphQL schema clean, type-safe, and decoupled from raw API responses.
🌐 External API Endpoints Used
API Endpoints Used
GitHub /users/{username}, /users/{username}/repos
JSONPlaceholder /posts
REST Countries /name/{country}
OpenWeatherMap /weather?q={city}
All API responses are validated with Zod and mapped into the final GraphQL schema.
