import React, { useState } from "react";
import InputField from "@common/InputField";
import Input from "@common/html/Input";
import BottomButton from "@common/BottomButton";
import DropDown, { DropDownRef } from "@common/html/DropDown";
import {
  availableAccount,
  signUpWithCredential,
  updateUserData,
} from "@apis/firebase/auth";
import { useInput } from "@hooks/useInput";
import userStore from "@store/auth.store";
import { auth } from "@/firebase";
import useFocus from "@hooks/useFocus";
import { useBottomSheet } from "@/store/bottomSheet.store";
import { useNavigate } from "react-router-dom";

const SignUpRequired = () => {
  const user = auth.currentUser;
  const { updateUserInfo } = userStore((store) => ({
    updateUserInfo: store.updateUserInfo,
  }));
  const { closeAll, open } = useBottomSheet();
  const { value: signUpRequired, setValue: setSignUpRequired } = useInput({
    email: user?.email || "",
    password: user ? "blocked" : "",
    username: user?.displayName || "",
    gender: "",
    birthDate: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setnameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");

  // 포커스 처리.. 드롭다운은.. 다음에 키보드 컨트롤까지 해서 해야할 듯..
  const [emailRef, focusEmail, handleEmailPress] =
    useFocus<HTMLInputElement>(true);
  const [passwordRef, focusPassword, handlePasswordPress] =
    useFocus<HTMLInputElement>();
  const [userNameRef, focusUserName, handleUserNamePress] =
    useFocus<HTMLInputElement>();
  const [genderRef, focusGender] = useFocus<DropDownRef>();

  const genderOptions: { value: string; label: string }[] = [
    { value: "남성", label: "남성" },
    { value: "여성", label: "여성" },
  ];

  const handleGenderChange = (value: string) => {
    setSignUpRequired({ ...signUpRequired, gender: value });
    setGenderError("");
  };

  const generateYearOptions = (startYear: number, endYear: number) => {
    const options: { value: string; label: string }[] = [];
    for (let year = endYear; year >= startYear; year--) {
      options.push({ value: year.toString(), label: year.toString() });
    }
    return options;
  };
  const birthYearOptions = generateYearOptions(1900, new Date().getFullYear());

  const birthMonthOptions: { value: string; label: string }[] = [];
  for (let i = 1; i <= 12; i++) {
    birthMonthOptions.push({ value: i.toString(), label: i.toString() });
  }

  const birthDayOptions: { value: string; label: string }[] = [];
  for (let i = 1; i <= 31; i++) {
    birthDayOptions.push({ value: i.toString(), label: i.toString() });
  }

  const [birthYear, setBirthYear] = useState<string>("");
  const [birthMonth, setBirthMonth] = useState<string>("");
  const [birthDay, setBirthDay] = useState<string>("");

  const updateBirthDate = (year: string, month: string, day: string) => {
    if (year && month && day) {
      const formattedBirthDate = `${year}-${month}-${day}`;
      setSignUpRequired({ ...signUpRequired, birthDate: formattedBirthDate });
      setBirthDateError("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpRequired({
      ...signUpRequired,
      [name]: value,
    });

    if (name === "email") setEmailError("");
    if (name === "password") setPasswordError("");
    if (name === "username") setnameError("");
  };

  const checkValidate = () => {
    let isvalid = true;
    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        focusEmail(); // 이메일 필드 자동 포커스
        setEmailError("이메일 형식을 확인해주세요");
      }
    };

    if (!signUpRequired.email) {
      //아이디 비어있을 때
      focusEmail(); // 이메일 필드 자동 포커스
      setEmailError("아이디를 입력하세요");
      isvalid = false;
    } else if (emailError.length > 0) {
      focusEmail();
      isvalid = false;
    } else validateEmail(signUpRequired.email);

    if (!signUpRequired.password) {
      //비밀번호 비어있을 때
      if (isvalid) focusPassword(); // 비밀번호 필드 자동 포커스
      isvalid = false;
      setPasswordError("비밀번호를 입력하세요");
    }

    if (!signUpRequired.username) {
      if (isvalid) focusUserName(); // 이름 필드 자동 포커스
      isvalid = false;
      setnameError("이름을 입력하세요");
    }

    if (!signUpRequired.gender) {
      if (isvalid) focusGender(); // 성별 필드 자동 포커스
      isvalid = false;
      setGenderError("성별을 입력하세요");
    }

    if (!signUpRequired.birthDate) {
      if (!birthYear) {
        // focusBirthYear(); // 년도 필드에 포커스
        setBirthDateError("년도를 선택하세요");
      } else if (!birthMonth) {
        // focusBirthMonth(); // 월 필드에 포커스
        setBirthDateError("월을 선택하세요");
      } else if (!birthDay) {
        // focusBirthDay(); // 일 필드에 포커스
        setBirthDateError("일을 선택하세요");
      }
    }
  };

  const submitHandle = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      emailError.length === 0 &&
      passwordError.length === 0 &&
      genderError.length === 0 &&
      birthDateError.length === 0 &&
      nameError.length === 0
    ) {
      if (user) {
        updateUserData("gender", signUpRequired.gender);
        updateUserData("birthDate", signUpRequired.birthDate);
        console.log(166);
        updateUserInfo();
      } else
        signUpWithCredential({
          email: signUpRequired.email,
          password: signUpRequired.password,
          imgUrl: null,
          gender: signUpRequired.gender === "남성" ? "male" : "female",
          username: signUpRequired.username,
          birthDate: signUpRequired.birthDate,
        })
          .then(() => {
            updateUserInfo();
            console.log(179);
          })
          .catch((data) => {
            if (data.code === "auth/email-already-in-use")
              setEmailError("이미 사용중인 이메일입니다");
            else if (data.code === "auth/weak-password") {
              setPasswordError("비밀번호는 6자 이상이어야합니다");
            }
          });
    }
  };

  const navigate = useNavigate();

  const goToLogin = () => {
    closeAll();
    navigate("#login");
    open("login");
  };

  return (
    <>
      <form className="gap-4" onSubmit={submitHandle} noValidate>
        <div className="gap-4 px-4">
          {/*아이디 입력 필드*/}
          <InputField title="아이디" error={emailError}>
            <Input
              ref={emailRef}
              type="email"
              name="email"
              placeholder={user?.email || "이메일을 입력해주세요"}
              className={`h-[48px] w-full rounded-[4px] px-4 py-[14px]`}
              isErrored={!!emailError}
              value={user?.email ? "" : signUpRequired.email}
              onChange={handleInputChange}
              disabled={user?.email ? true : false}
              onKeyDown={(e) => handleEmailPress(e, focusPassword)} // 다음 패스워드 포커스
              onBlur={async (e) => {
                const isAvailable = await availableAccount(e.target.value);

                if (!isAvailable) {
                  setEmailError("이미 사용중인 이메일입니다");
                }
              }}
            />
          </InputField>
          {/*패스워드 입력 필드*/}
          <InputField title="비밀번호" error={passwordError}>
            <Input
              ref={passwordRef}
              type="password"
              name="password"
              isErrored={!!passwordError}
              placeholder={
                user?.email
                  ? "소셜 로그인 회원입니다."
                  : "비밀번호를 입력해주세요"
              }
              className="h-[48px] w-full rounded-[4px] px-4 py-[14px]"
              value={user?.email ? "" : signUpRequired.password}
              onChange={handleInputChange}
              disabled={user?.email ? true : false}
              onKeyDown={(e) => handlePasswordPress(e, focusUserName)} // 다음 이름 포커스
            />
          </InputField>
          {/*이름 입력 필드*/}
          <InputField title="이름" error={nameError}>
            <Input
              ref={userNameRef}
              type="text"
              name="username"
              isErrored={!!nameError}
              placeholder={user?.displayName || "이름을 입력해주세요"}
              className="h-[48px] w-full rounded-[4px] px-4 py-[14px]"
              value={user?.displayName ? "" : signUpRequired.username}
              onChange={handleInputChange}
              disabled={user?.displayName ? true : false}
              onKeyDown={(e) => handleUserNamePress(e, focusGender)} // 다음 성별 포커스
            />
          </InputField>
          {/*성별 선택 필드*/}
          <InputField title="성별" error={genderError}>
            <DropDown
              ref={genderRef}
              className="gap-2 rounded-[4px] border-[#E4E4E7] px-4 py-[14px]"
              placeholder="성별을 선택해 주세요"
              options={genderOptions}
              onChange={handleGenderChange}
            />
          </InputField>
          {/* 생년월일 선택 필드*/}
          <InputField title="생년월일" error={birthDateError}>
            <div className="flex w-full justify-between space-x-1">
              <DropDown
                className="h-[45px] gap-2 rounded-[6px] border-[#E4E4E7] px-[10px] py-[14px]"
                menuPlacement="top"
                placeholder="년"
                options={birthYearOptions}
                onChange={(value) => {
                  setBirthYear(value);
                  updateBirthDate(value, birthMonth, birthDay);
                }}
              />
              <DropDown
                className="h-[45px] gap-2 rounded-[6px] border-[#E4E4E7] px-[10px] py-[14px]"
                menuPlacement="top"
                placeholder="월"
                options={birthMonthOptions}
                onChange={(value) => {
                  setBirthMonth(value);
                  updateBirthDate(birthYear, value, birthDay);
                }}
              />
              <DropDown
                className="h-[45px] gap-2 rounded-[6px] border-[#E4E4E7] px-[10px] py-[14px]"
                menuPlacement="top"
                placeholder="일"
                options={birthDayOptions}
                onChange={(value) => {
                  setBirthDay(value);
                  updateBirthDate(birthYear, birthMonth, value);
                }}
              />
            </div>
          </InputField>
          <span
            className="ml-3 cursor-pointer text-xs font-bold text-[rgb(0,123,255)] hover:underline"
            onClick={goToLogin}
          >
            이미 아이디가 있으신가요?
          </span>
        </div>
        <div className="mt-4 px-5">
          {/*회원가입 다음 페이지로 이동 버튼*/}
          <BottomButton title="다음" type="submit" onClick={checkValidate} />
        </div>
      </form>
    </>
  );
};
export default SignUpRequired;
