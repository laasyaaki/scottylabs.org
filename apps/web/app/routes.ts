import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/projects", "routes/projects.tsx"),
  route("/events", "routes/events.tsx"),
  route("/sponsors", "routes/sponsors.tsx"),
  route("/team", "routes/team.tsx"),
] satisfies RouteConfig;
