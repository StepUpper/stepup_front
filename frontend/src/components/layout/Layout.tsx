import { auth } from "@/firebase";
import userStore from "@/store/auth.store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { user, updateUserInfo, setIsLoggedIn } = userStore((store) => ({
    user: store.user,
    updateUserInfo: store.updateUserInfo,
    setIsLoggedIn: store.setIsLoggedIn,
  }));
  useEffect(() => {
    if (user) setIsLoggedIn(true);
    onAuthStateChanged(auth, () => {
      updateUserInfo();
    });
  }, [user?.uid]);
  return (
    <div className="flex h-screen flex-col items-center overflow-hidden">
      <div className="relative w-full min-w-80 max-w-5xl">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
