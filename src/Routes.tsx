import { Hono } from "hono";
import Home from "./Pages/Home";

const routes = new Hono();

routes.route("/", Home);

export default routes;
