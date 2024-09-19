import { useEffect, useState } from "react";
import Login from "./Login";
import BottomSheet from "@common/BottomSheet";
import { useLocation, useNavigate } from "react-router-dom";
import SignUp from "../signup/SignUp";

const LoginBottomSheet = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState("");
  useEffect(() => {
    setForm(location.hash.slice(1));
  }, [location]);

  return (
    <BottomSheet
      onClose={() => navigate(-1)}
      isOpen={form.length > 0}
      yPosition={0}
    >
      <BottomSheet.Header isTitleOnly={true}>
        {form === "login" ? "로그인" : "회원가입"}
      </BottomSheet.Header>
      <BottomSheet.Content>
        {form === "login" && <Login />}
        {form === "signup" && <SignUp />}
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default LoginBottomSheet;
