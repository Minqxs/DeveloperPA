import { serve } from "@hono/node-server";
import routes from "./Routes";

const app = routes;

serve({
  fetch: app.fetch,
  port: 3000,
});
