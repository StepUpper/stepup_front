import { createBrowserRouter } from "react-router-dom";
import Layout from "@components/layout/Layout";
import HomePage from "@pages/Home/HomePage";
import NotFound from "@pages/NotFound/NotFound";
import Chat from "@pages/Chat/Chat";
import MyPage from "@pages/MyPage/MyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
