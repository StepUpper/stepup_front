import { createBrowserRouter } from "react-router-dom";
import Layout from "@components/layout/Layout";
import NotFound from "@pages/NotFound/NotFound";
import ShoeCloset from "@pages/ShoeCloset/page";
import Chat from "@pages/Chat/Chat";
import Review from "@/pages/Review/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Chat />,
      },
      {
        path: "/archive",
        element: <ShoeCloset />,
      },
      {
        path: "/archive/review",
        element: <Review />,
      },
      {
        path: "/archive/:id",
        element: <ShoeCloset />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
