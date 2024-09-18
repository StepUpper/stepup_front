import BottomButton from "@common/BottomButton";
import InputField from "@common/InputField";
import Input from "@common/html/Input";
import React, { useState } from "react";
import { signInWithCredential } from "@apis/firebase/auth";
import userStore from "@store/auth.store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { updateUserInfo, setIsLoggedIn } = userStore((store) => ({
    updateUserInfo: store.updateUserInfo,
    setIsLoggedIn: store.setIsLoggedIn,
  }));
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });

    if (name === "email") setEmailError("");
    if (name === "password") setPasswordError("");
  };

  const submitHandle = (e: React.FormEvent) => {
    e.preventDefault();

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("이메일 형식을 확인해주세요");
        isLoginValid = false;
        return false;
      } else {
        setEmailError("");
        return true;
      }
    };

    let isLoginValid = true;

    if (!loginData.email) {
      //아이디 비어있을 때
      setEmailError("아이디를 입력하세요");
      isLoginValid = false;
    } else if (validateEmail(loginData.email)) {
      isLoginValid = true;
    }

    if (!loginData.password) {
      //비밀번호 비어있을 때
      setPasswordError("비밀번호를 입력하세요");
      isLoginValid = false;
    }

    //값 확인용
    if (isLoginValid) {
      signInWithCredential(loginData).then(updateUserInfo);
      setIsLoggedIn(true);

      return navigate("/");
    }
  };

  return (
    <>
      <form className="gap-4" onSubmit={submitHandle} noValidate>
        <div className="gap-4 px-4">
          {/*아이디 입력 필드*/}
          <InputField title="아이디" error={emailError}>
            <Input
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              className="h-[48px] w-full rounded-[4px] px-4 py-[14px]"
              value={loginData.email}
              onChange={handleInputChange}
            />
          </InputField>
          {/*패스워드 입력 필드*/}
          <InputField title="비밀번호" error={passwordError}>
            <Input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              className="h-[48px] w-full rounded-[4px] px-4 py-[14px]"
              value={loginData.password}
              onChange={handleInputChange}
            />
          </InputField>
        </div>
        <div className="mt-4 px-5">
          {/*로그인 폼 제출 버튼*/}
          <BottomButton title="로그인" type="submit" />
        </div>
      </form>
    </>
  );
};
export default Login;
