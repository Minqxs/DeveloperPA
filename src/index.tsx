import { serve } from "@hono/node-server";
import { schema } from "./schema";
import { createYoga } from "graphql-yoga";
import { Hono } from "hono";

const app = new Hono();
const yoga = createYoga({
  schema,
  graphqlEndpoint: "/graphql",
});

// Bring inside Hono handler
app.all("/graphql", async (c) => {
  return await yoga.fetch(c.req.raw);
});

serve({
  fetch: app.fetch,
  port: 3000, // http:localhost:3000
});
