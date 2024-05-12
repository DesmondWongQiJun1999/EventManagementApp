import React from "react";
import ReactDOM from "react-dom/client";
import UserList from './UserPage/UserList';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/user",
    element: Comment,
  },
  {
    path: "/admin",
    element: Comment,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);