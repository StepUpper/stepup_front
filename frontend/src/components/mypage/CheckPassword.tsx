import React, { useState } from "react";
import InputField from "@common/InputField";
import Input from "@common/html/Input";
import BottomButton from "@common/BottomButton";
import { useInput } from "@hooks/useInput";
import { auth } from "@/firebase";

const CheckPassword = () => {
  const user = auth.currentUser;

  const { value: currentPassword, setValue: setCurrentPassword } = useInput();

  const [currentPasswordError, setCurrentPasswordError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentPassword({
      ...currentPassword,
      [name]: value,
    });

    if (name === "password") setCurrentPasswordError("");
  };

  const submitHandle = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword.password) {
      //현재 비밀번호 비어있을 때
      setCurrentPasswordError("현재 비밀번호를 입력하세요");
    }

    if (!currentPassword.password) {
      //현쟆 비밀번호 틀렸을 떄
      setCurrentPasswordError("현재 비밀번호를 바르게 입력하세요");
    }
  };

  return (
    <>
      <form className="gap-4" onSubmit={submitHandle} noValidate>
        <div className="gap-4 px-4">
          {/*현재 패스워드 입력 필드*/}
          <InputField title="현재 비밀번호" error={currentPasswordError}>
            <Input
              type="password"
              name="password"
              placeholder={
                user?.email
                  ? "소셜 로그인 회원입니다."
                  : "현재 비밀번호를 입력해주세요"
              }
              className="h-[48px] w-full rounded-[4px] px-4 py-[14px]"
              value={user?.email ? "" : currentPassword.password}
              onChange={handleInputChange}
              disabled={user?.email ? true : false}
            />
          </InputField>
        </div>
        <div className="mt-4 px-5">
          {/*현재 비밀번호 확인 버튼*/}
          <BottomButton title="확인" type="submit" onClick={() => {}} />
        </div>
      </form>
    </>
  );
};
export default CheckPassword;
