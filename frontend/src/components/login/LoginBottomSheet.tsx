import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BottomSheet from "@common/BottomSheet";
import Login from "@components/login/Login";
import SignUp from "@components/signUp/SignUp";

const LoginBottomSheet = () => {
  const location = useLocation();

  const [form, setForm] = useState("");

  useEffect(() => {
    setForm(location.hash.slice(1));
  }, [location]);

  return (
    <>
      <BottomSheet id="login" isDragBar={false}>
        <BottomSheet.Header isTitleOnly={true}>
          {form === "login" ? "로그인" : "회원가입"}
        </BottomSheet.Header>
        <BottomSheet.Content>
          {form === "login" && <Login />}
          {form === "signup" && <SignUp />}
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
};

export default LoginBottomSheet;
