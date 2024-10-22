import { createBrowserRouter } from "react-router-dom";
import Layout from "@components/layout/Layout";
import NotFound from "@pages/NotFound/NotFound";
import ShoeCloset from "@/pages/ShoeCloset/ShoeCloset";
import Chat from "@pages/Chat/Chat";
import Review from "@/pages/ShoeCloset/Review/Review";
import MyPage from "@pages/MyPage/MyPage";
import MyShopping from "@pages/MyShopping/MyShopping";
import MyFootInfo from "@pages/MyFootInfo/MyFootInfo";
import Bridge from "@pages/Bridge/Bridge";
import Onboarding from "@pages/Onboarding/Onboarding";
import { onBoardingLoader } from "@router/loaders/onBoarding";
import ChatShareView from "@components/Chat/ChatShareView";
import EditUserInfoPage from "@pages/EditUserInfo/EditUserInfoPage";
import ChangePasswordPage from "@pages/ChangePassword/ChangePasswordPage";
import SearchShoeCloset from "@/pages/ShoeCloset/SearchShoeCloset";
import ShoeClosetOverview from "@/pages/ShoeCloset/ShoeClosetOverview";
import Modify from "@/pages/ShoeCloset/Review/Modify";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Chat />,
          loader: onBoardingLoader,
        },
        {
          path: "/archive",
          element: <ShoeCloset />,
        },
        {
          path: "/archive/:closetId",
          element: <ShoeClosetOverview />,
        },
        {
          path: "/archive/search",
          element: <SearchShoeCloset />,
        },
        {
          path: "/archive/review",
          element: <Review />,
        },
        {
          path: "/archive/modify/:closetId",
          element: <Modify />,
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
          path: "/mypage/edituserinfo",
          element: <EditUserInfoPage />,
        },
        {
          path: "/mypage/changepassword",
          element: <ChangePasswordPage />,
        },
        {
          path: "/myfootinfo",
          element: <MyFootInfo />,
        },
        {
          path: "/bridge",
          element: <Bridge />,
        },
        {
          path: "/share/:messageId",
          element: <ChatShareView />,
        },
        {
          path: "/onboarding/:stepId",
          element: <Onboarding />,
        },
      ],
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
