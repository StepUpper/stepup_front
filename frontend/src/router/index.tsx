import { createBrowserRouter } from "react-router-dom";
import Layout from "@components/layout/Layout";
import NotFound from "@pages/NotFound/NotFound";
import Chat from "@pages/Chat/Chat";
import MyPage from "@/pages/MyPage/MyPage";

const router = createBrowserRouter(
  [
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
    {
      path: "mypage",
      element: <MyPage />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);
export default router;
