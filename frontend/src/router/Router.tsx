import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import NotFound from "../pages/NotFound";
import ArtistId from "@/pages/ArtistId";
import AlbumId from "@/pages/AlbumId";

const router = createBrowserRouter([
  {
    // Huvudlayout som omsluter alla routes
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/SignIn",
        element: <SignIn />,
      },
      {
        path: "/artist/:id",
        element: <ArtistId />,
      },
      {
        path: "/album/:id",
        element: <AlbumId />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
