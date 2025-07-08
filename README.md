🚀 Features

    🌐 GraphQL API powered by GraphQL Yoga

    🔗 Multi-API Aggregation from GitHub, JSONPlaceholder, REST Countries, OpenWeatherMap

    🧪 Runtime Validation using Zod schemas

    🛡️ Graceful Error Handling with per-API fallback logic

    ⚡ Built with TypeScript + Hono

🛠️ Getting Started

    Clone the repo
    git clone https://github.com/your-username/developer-pa.git
    cd developer-pa

Install dependencies
    
     npm install

Set up environment variables
      
      Create a .env file in the root and add your OpenWeatherMap API key:
      OPENWEATHER_API_KEY=your_openweather_api_key_here

Start the development server
    
     npm run dev

Access the GraphQL Playground

    http://localhost:3000/graphql

🔍 Example GraphQL Queries
🎯 Developer Overview
      
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

⭐ Top Repositories
      
      query GetTopRepos {
      topRepositories(username: "octocat", limit: 5) {
      name
      description
      stars
      language
     }
    }


✅ Example Response

      {
        "data": {
        "developer": {
           "username": "octocat",
            "profile": {
               "name": "The Octocat",
               "bio": "Just a friendly GitHub mascot",
               "followers": 1000},
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

⚠️ Error Handling Strategy

Each external API is wrapped in a safeFetch utility with try/catch and fallback values:

Console warnings are logged for debugging without exposing internal errors to the client.

🔄 Data Transformation with Zod

All third-party data is validated and transformed before being returned through the GraphQL schema:

    GitHub: Transforms into GitHubProfile and Repository[]

    JSONPlaceholder: Transforms into BlogPost[]

    REST Countries: Extracts capital city and country name

    OpenWeatherMap: Extracts temperature and description

    Stats: Calculates totalRepos and totalStars from raw data

This ensures:

    Strict typing

    Clean separation from external formats

    Safer developer and client experience

🌐 External API Endpoints Used
Service Endpoints
         
      GitHub /users/{username}, /users/{username}/repos
      JSONPlaceholder /posts
      REST Countries /name/{country}
      OpenWeatherMap /weather?q={city}
All responses are validated using Zod before being used in resolvers.
