import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./pages/Main/App.tsx";
import { AdminPage } from "./pages/Admin/AdminPage.tsx";
import { GamePage } from "./pages/Game/GamePage.tsx";
import { PlayerPage } from "./pages/Player/PlayerPage.tsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/admin",
      element: <AdminPage />,
    },
    {
      path: "/game",
      element: <GamePage />,
    },
    {
      path: "/player",
      element: <PlayerPage />,
    },
  ],
  {
    basename: "/twl",
  }
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
