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
import { addMessageToFirestore } from "@apis/firebase/chatFirestore";
import { TChatResponse } from "@type/chat";
import useFocus from "@hooks/useFocus";

const Login = () => {
  const navigate = useNavigate();
  const { updateUserInfo, isLoggedIn } = userStore();
  const { roomId, addUserMessage } = useChatStore();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { closeAll, open } = useBottomSheet();

  const goToSignUp = () => {
    closeAll();
    navigate("#signup");
    open("login");
  };

  // 자동 포커스
  const [emailRef, focusEmail, handleEmailKeyPress] =
    useFocus<HTMLInputElement>(true);
  const [passwordRef, focusPassword, handlePasswordPress] =
    useFocus<HTMLInputElement>();
  const [formButtonRef, focusFormButton] = useFocus<HTMLButtonElement>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });

    setEmailError("");
    setPasswordError("");
  };

  const submitHandle = async (e: React.FormEvent) => {
    e.preventDefault();

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        focusEmail();
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
      if (isLoginValid) focusEmail(); // 이메일 필드 자동 포커스

      setEmailError("아이디를 입력하세요");
      isLoginValid = false;
    } else if (validateEmail(loginData.email)) {
      isLoginValid = true;
    }

    if (!loginData.password) {
      //비밀번호 비어있을 때
      if (isLoginValid) focusPassword(); // 비밀번호 필드 자동 포커스

      setPasswordError("비밀번호를 입력하세요");
      isLoginValid = false;
    }

    //값 확인용
    if (isLoginValid) {
      await signInWithCredential(loginData)
        .then(() => {
          closeAll();
          navigate("/");
        })
        .catch(() => {
          setEmailError("이메일을 확인해주세요.");
          setPasswordError("비밀번호를 확인해주세요.");
        });

      // zustand로 관리하는 user가 업데이트가 바로 안이루어져서,
      // 임시 방편으로 updateUserInfo 가 userData를 반환하게끔 하고
      // 반환값을 사용하도록 하자
      // 필요한 데이터만 구조분해할당
      const { uid, username } = (await updateUserInfo()) as {
        uid: string;
        username: string;
      };

      // 여기서 맞춤상품 api 호출 처리
      try {
        const loginMent = `반갑습니다 ${username!}님! ${username!}님을 위한 맞춤 상품을 추천해 드릴께요`;
        const res = await chatApi.getCustomizedProduct();

        if (res.status === 200) {
          await addMessageToFirestore(uid!, roomId!, "", {
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
              ref={emailRef}
              isErrored={emailError}
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              className="h-[48px] w-full rounded-[4px] px-4 py-[14px]"
              value={loginData.email}
              onChange={handleInputChange}
              onKeyDown={(e) => handleEmailKeyPress(e, focusPassword)}
            />
          </InputField>
          {/*패스워드 입력 필드*/}
          <InputField title="비밀번호" error={passwordError}>
            <Input
              ref={passwordRef}
              isErrored={passwordError}
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              className="h-[48px] w-full rounded-[4px] px-4 py-[14px]"
              value={loginData.password}
              onChange={handleInputChange}
              onKeyDown={(e) => handlePasswordPress(e, focusFormButton)}
            />
          </InputField>
          <span
            className="ml-3 cursor-pointer text-xs font-bold text-[rgb(0,123,255)] hover:underline"
            onClick={goToSignUp}
          >
            아이디가 없으신가요?
          </span>
        </div>
        <div className="mt-4 px-5">
          {/*로그인 폼 제출 버튼*/}
          <BottomButton ref={formButtonRef} title="로그인" type="submit" />
        </div>
      </form>
    </>
  );
};
export default Login;
