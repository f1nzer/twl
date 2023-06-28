import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { AdminPage } from "./pages/Admin/AdminPage.tsx";
import { GamePage } from "./pages/Game/GamePage.tsx";
import { PlayerPage } from "./pages/Player/PlayerPage.tsx";
import { CssBaseline } from "@mui/material";
import { PeerContextProvider } from "./contexts/PeerContextProvider.tsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const router = createHashRouter([
  {
    path: "/",
    element: <GamePage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/player",
    element: <PlayerPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <PeerContextProvider>
      <RouterProvider router={router} />
    </PeerContextProvider>
  </React.StrictMode>
);
