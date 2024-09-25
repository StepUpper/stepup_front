import React, { useState } from "react";
import InputField from "@common/InputField";
import Input from "@common/html/Input";
import BottomButton from "@common/BottomButton";
import { useInput } from "@hooks/useInput";

const ChangePassword = () => {
  const { value: newPassword, setValue: setNewPassword } = useInput();
  const { value: confirmNewPassword, setValue: setConfirmNewPassword } =
    useInput();

  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "newPassword") {
      setNewPassword({ password: value });
      setNewPasswordError("");
    } else if (name === "confirmNewPassword") {
      setConfirmNewPassword({ password: value });
      setConfirmNewPasswordError("");
    }
  };

  const submitHandle = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword) {
      //변경할 비밀번호 비어있을 때
      setNewPasswordError("변경할 비밀번호를 입력하세요");
    }

    if (newPassword != confirmNewPassword) {
      //변경할 비밀번호 다를 떄
      setConfirmNewPasswordError("비밀번호가 다르게 입력되었습니다");
    }
  };

  return (
    <>
      <form className="gap-4" onSubmit={submitHandle} noValidate>
        <div className="gap-4 px-4">
          {/*변경할 패스워드 입력 필드*/}
          <InputField title="변경할 비밀번호" error={newPasswordError}>
            <Input
              type="password"
              name="newPassword"
              placeholder={"변경할 비밀번호를 입력해주세요"}
              className="h-[48px] w-full rounded-[4px] px-4 py-[14px]"
              value={newPassword.password || ""}
              onChange={handleInputChange}
            />
          </InputField>
          {/*변경할 패스워드 확인 필드*/}
          <InputField
            title="변경할 비밀번호 확인"
            error={confirmNewPasswordError}
          >
            <Input
              type="password"
              name="confirmNewPassword"
              placeholder={"변경할 비밀번호를 한번 더 입력해주세요"}
              className="h-[48px] w-full rounded-[4px] px-4 py-[14px]"
              value={confirmNewPassword.password || ""}
              onChange={handleInputChange}
            />
          </InputField>
        </div>
        <div className="mt-4 px-5">
          {/*비밀번호 변경 버튼*/}
          <BottomButton title="비밀번호 변경" type="submit" />
        </div>
      </form>
    </>
  );
};
export default ChangePassword;
