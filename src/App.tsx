import { RouteDefinition, Router } from "@solidjs/router";
import { lazy } from "solid-js";

const routes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import("./pages/Home")),
  },
  {
    path: "**",
    component: lazy(() => import("./pages/NotFound")),
  },
];

export default function App() {
  return (
    <>
      <nav>
        <span>Hogwarts Almanac</span>
      </nav>
      <Router>{routes}</Router>
    </>
  );
}
