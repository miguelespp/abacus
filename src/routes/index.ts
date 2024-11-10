import { createElement } from "react";
import type { RouteObject } from "react-router-dom";
import Home from "../pages/home";
import BaseDashboard from "../pages/dashboard/layouts/BaseDashboard";
import Documentos from "../pages/dashboard/Documents";

const routes: RouteObject[] = [
  {
    path: "/",
    element: createElement(Home),
  },
  {
    path: "/dashboard",
    element: createElement(BaseDashboard),
    children: [
      {
        path: "documents",
        element: createElement(Documentos),
      },
    ],
  },
];

export default routes;
