import { useEffect, useState } from "react";
import Login from "./Login";
import BottomSheet from "@common/BottomSheet";
import { useLocation, useNavigate } from "react-router-dom";
import SignUp from "../signUp/SignUp";
import { useBottomSheet } from "@/store/bottomSheet.store";

const LoginBottomSheet = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState("");

  const { sheets } = useBottomSheet();

  useEffect(() => {
    setForm(location.hash.slice(1));
  }, [location]);

  return (
    <>
      {sheets["login"] && sheets["login"].isOpen && (
        <BottomSheet id="login" isDragBar={false}>
          <BottomSheet.Header isTitleOnly={true}>
            {form === "login" ? "로그인" : "회원가입"}
          </BottomSheet.Header>
          <BottomSheet.Content>
            {form === "login" && <Login />}
            {form === "signup" && <SignUp />}
          </BottomSheet.Content>
        </BottomSheet>
      )}
    </>
  );
};

export default LoginBottomSheet;
