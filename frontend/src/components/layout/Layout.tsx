import userStore from "@/store/auth.store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { user, updateUserInfo } = userStore((store) => ({
    updateUserInfo: store.updateUserInfo,
    user: store.user,
  }));
  useEffect(() => {
    updateUserInfo();
  }, [user?.uid]);
  return (
    <div className="flex h-screen flex-col items-center overflow-hidden">
      <div className="w-full min-w-80 max-w-5xl">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
