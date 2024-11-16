import { createElement } from "react";
import type { RouteObject } from "react-router-dom";
import Home from "../pages/home";
import BaseDashboard from "../pages/dashboard/layouts/BaseDashboard";
import Documentos from "../pages/dashboard/Documents";
import Login from "@/pages/auth/Login";
import DocumentForm from "@/pages/dashboard/CreateDocuments";
import AuthorManage from "@/pages/dashboard/CreateDocuments/AddAuthors";
import Orders from "@/pages/dashboard/Orders";

const routes: RouteObject[] = [
  {
    path: "/",
    element: createElement(Home),
  },
  {
    path: "/auth/login",
    element: createElement(Login),
  },
  {
    path: "/dashboard",
    element: createElement(BaseDashboard),
    children: [
      {
        path: "documents",
        element: createElement(Documentos),
      },
      {
        path: "document/create",
        element: createElement(DocumentForm),
      },
      {
        path: "document/edit/:id",
        element: createElement(AuthorManage),
      },
      {
        path: "orders",
        element: createElement(Orders),
      },
    ],
  },
];

export default routes;
