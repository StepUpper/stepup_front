import { createBrowserRouter } from "react-router-dom";
import Layout from "@components/layout/Layout";
import NotFound from "@pages/NotFound/NotFound";
import Chat from "@pages/Chat/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Chat />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
