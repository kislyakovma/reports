import React from "react";
import Login from "../Pages/Auth/Auth";
import Reports from "../Pages/Reports/Reports";

const routes = [
  {
    path: "/login",
    component: Login,
    isPrivate: false,
  },
  {
    path: "/reports",
    component: Reports,
    isPrivate: true,
  },
  {
    path: "/*",
    component: <h1>404</h1>,
    isPrivate: true,
  },
];

export default routes;
