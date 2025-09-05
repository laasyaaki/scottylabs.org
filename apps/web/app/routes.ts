import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("/projects", "routes/projects.tsx"),
    route("/events", "routes/events.tsx"),
    route("/sponsors", "routes/sponsors.tsx"),
    route("/team", "routes/team.tsx"),
  ]),
  route("sign-in/*", "routes/sign-in.tsx"),
  route("sign-up/*", "routes/sign-up.tsx"),
] satisfies RouteConfig;
