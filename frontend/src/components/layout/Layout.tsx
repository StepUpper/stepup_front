import { auth } from "@/firebase";
import userStore from "@/store/auth.store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { updateUserInfo, setIsLoggedIn } = userStore((store) => ({
    updateUserInfo: store.updateUserInfo,
    setIsLoggedIn: store.setIsLoggedIn,
  }));

  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // onAuthStateChanged는 Firebase Auth가 제공하는 상태 변화 감지 메서드
  // 사용자가 로그인하거나 로그아웃할 때 이벤트를 트리거
  // user 객체는 로그인된 사용자의 정보이며, 로그아웃 상태일 때는 null
  // unmount시 Firebase Auth의 상태 변화 구독을 중지
  // 이를 통해 메모리 누수와 불필요한 상태 업데이트를 방지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        updateUserInfo();
      } else {
        // 로그인 된 상태면 여기 안탄다.(깜빡임도 존재하지 않음)
        setIsLoggedIn(false);
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full min-w-80 max-w-5xl">
        <Outlet context={{ isAuthLoading }} />
      </div>
    </div>
  );
};

export default Layout;
