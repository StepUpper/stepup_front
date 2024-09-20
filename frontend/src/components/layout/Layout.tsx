import { auth } from "@/firebase";
import userStore from "@/store/auth.store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { updateUserInfo, setIsLoggedIn } = userStore((store) => ({
    updateUserInfo: store.updateUserInfo,
    setIsLoggedIn: store.setIsLoggedIn,
  }));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        updateUserInfo();
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, [setIsLoggedIn, updateUserInfo]);

  return (
    <div className="flex h-screen flex-col items-center overflow-hidden">
      <div className="relative w-full min-w-80 max-w-5xl">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
