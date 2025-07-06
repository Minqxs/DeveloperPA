import { Hono } from "hono";
import { BaseLayout } from "../Layouts/BaseLayout";

const home = new Hono();

home.get("/", (c) => {
  const html = BaseLayout({
    title: "Welcome to DeveloperPA",
    body: `<h2>Home Page</h2><p>This is the homepage of your app.</p>`,
  });
  return c.html(html);
});

export default home;
