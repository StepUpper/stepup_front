import { createBrowserRouter } from "react-router-dom";
import Layout from "@components/layout/Layout";
import NotFound from "@pages/NotFound/NotFound";
import ShoeCloset from "@pages/ShoeCloset/page";
import Chat from "@pages/Chat/Chat";
import Review from "@pages/Review/page";
import MyPage from "@pages/MyPage/MyPage";
import MyShopping from "@pages/MyShopping/MyShopping";
import MyFootInfo from "@pages/MyFootInfo/MyFootInfo";
import Bridge from "@pages/Bridge/Bridge";
import Onboarding from "@pages/Onboarding/Onboarding";

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
        {
          path: "/archive",
          element: <ShoeCloset />,
        },
        {
          path: "/archive/review",
          element: <Review />,
        },
        {
          path: "/mypage",
          element: <MyPage />,
        },
        {
          path: "/mypage/myshopping",
          element: <MyShopping />,
        },
        {
          path: "/myfootinfo",
          element: <MyFootInfo />,
        },
        {
          path: "/bridge",
          element: <Bridge />,
        },
      ],
    },
    {
      path: "onboarding",
      element: <Onboarding />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);
export default router;
