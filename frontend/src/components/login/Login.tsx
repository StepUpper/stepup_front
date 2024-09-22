import BottomButton from "@common/BottomButton";
import InputField from "@common/InputField";
import Input from "@common/html/Input";
import React, { useState } from "react";
import { signInWithCredential } from "@apis/firebase/auth";
import userStore from "@store/auth.store";
import { useNavigate } from "react-router-dom";
import { useBottomSheet } from "@/store/bottomSheet.store";
import useChatStore from "@/store/chat.store";
import { chatApi } from "@/apis/services/chat";
import { addMessageToFirestore } from "@/apis/firebase/chatFirestore";
import { TChatResponse } from "@/types/chat";

const Login = () => {
  const navigate = useNavigate();
  const { updateUserInfo, user, isLoggedIn } = userStore();
  const { roomId, addUserMessage } = useChatStore();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { closeAll } = useBottomSheet();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });

    if (name === "email") setEmailError("");
    if (name === "password") setPasswordError("");
  };

  const submitHandle = async (e: React.FormEvent) => {
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
      closeAll();
      navigate("/");

      // 여기서 왜 isLoggedIn이 false 일까..
      // 루트 경로로 보냈으니 Layout 컴포넌트에서 로그인 상태 변경 해줘야 하는거 아닌가??
      // 일단 급한대로 아래 try문에서 로그인 상태 확인 없이 진행
      console.log(isLoggedIn);

      // 여기서 맞춤상품 api 호출 처리
      try {
        const loginMent = `반갑습니다 ${user?.username}님! ${user?.username}님을 위한 맞춤 상품을 추천해 드릴께요`;
        const res = await chatApi.getCustomizedProduct();

        if (res.status === 200) {
          await addMessageToFirestore(user?.uid!, roomId!, "", {
            message: loginMent,
            reqProducts: res.data,
          } as TChatResponse);
          addUserMessage({
            type: "bot",
            content: {
              message: loginMent,
              reqProducts: res.data,
            } as TChatResponse,
          });
        }
      } catch (error) {
        console.log(error);
        const errorMessage =
          "예기치 못한 에러가 발생하였습니다. 다시 시도해주세요.";
        if (isLoggedIn) {
          // 호출 실패하면 굳이 firestore에 저장할 필요 없으니 상태 업데이트만 해줌
          addUserMessage({ type: "bot", content: { message: errorMessage } });
        }
      } finally {
      }
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
