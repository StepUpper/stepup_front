import React, { useState, useRef } from "react";
import InputField from "@common/InputField";
import Input from "@common/html/Input";
import BottomButton from "@common/BottomButton";
import DropDown, { DropDownRef } from "@common/html/DropDown";
import { signUpWithCredential, updateUserData } from "@apis/firebase/auth";
import { useInput } from "@hooks/useInput";
import userStore from "@store/auth.store";
import { auth } from "@/firebase";

const SignUpRequired = () => {
  {
    const user = auth.currentUser;
    const { updateUserInfo } = userStore((store) => ({
      updateUserInfo: store.updateUserInfo,
    }));
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

    const dropdownRef = useRef<DropDownRef>(null);

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
      for (let year = startYear; year <= endYear; year++) {
        options.push({ value: year.toString(), label: year.toString() });
      }
      return options;
    };
    const birthYearOptions = generateYearOptions(
      1900,
      new Date().getFullYear()
    );

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

    const submitHandle = (e: React.FormEvent) => {
      e.preventDefault();

      const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setEmailError("이메일 형식을 확인해주세요");
          isSignUpRequiredValid = false;
          return false;
        } else {
          setEmailError("");
          return true;
        }
      };

      let isSignUpRequiredValid = true;

      if (!signUpRequired.email) {
        //아이디 비어있을 때
        setEmailError("아이디를 입력하세요");
        isSignUpRequiredValid = false;
      } else if (validateEmail(signUpRequired.email)) {
        isSignUpRequiredValid = true;
      }

      if (!signUpRequired.password) {
        //비밀번호 비어있을 때
        setPasswordError("비밀번호를 입력하세요");
        isSignUpRequiredValid = false;
      }

      if (!signUpRequired.username) {
        setnameError("이름을 입력하세요");
        isSignUpRequiredValid = false;
      }

      if (!signUpRequired.gender) {
        setGenderError("성별을 입력하세요");
        isSignUpRequiredValid = false;
      }

      if (!signUpRequired.birthDate) {
        setBirthDateError("생년월일을 입력하세요");
        isSignUpRequiredValid = false;
      }

      //값 확인용
      if (isSignUpRequiredValid) {
        if (user) {
          updateUserData("gender", signUpRequired.gender);
          updateUserData("birthDate", signUpRequired.birthDate);

          updateUserInfo();
        } else
          signUpWithCredential({
            email: signUpRequired.email,
            password: signUpRequired.password,
            imgUrl: null,
            gender: signUpRequired.gender === "남성" ? "male" : "female",
            username: signUpRequired.username,
            birthDate: signUpRequired.birthDate,
          }).then(updateUserInfo);
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
                placeholder={user?.email || "이메일을 입력해주세요"}
                className="h-[48px] w-full rounded-[4px] px-4 py-[14px]"
                value={user?.email ? "" : signUpRequired.email}
                onChange={handleInputChange}
                disabled={user?.email ? true : false}
              />
            </InputField>
            {/*패스워드 입력 필드*/}
            <InputField title="비밀번호" error={passwordError}>
              <Input
                type="password"
                name="password"
                placeholder={
                  user?.email
                    ? "소셜 로그인 회원입니다."
                    : "비밀번호를 입력해주세요"
                }
                className="h-[48px] w-full rounded-[4px] px-4 py-[14px]"
                value={user?.email ? "" : signUpRequired.password}
                onChange={handleInputChange}
                disabled={user?.email ? true : false}
              />
            </InputField>
            {/*이름 입력 필드*/}
            <InputField title="이름" error={nameError}>
              <Input
                type="text"
                name="username"
                placeholder={user?.displayName || "이름을 입력해주세요"}
                className="h-[48px] w-full rounded-[4px] px-4 py-[14px]"
                value={user?.displayName ? "" : signUpRequired.username}
                onChange={handleInputChange}
                disabled={user?.displayName ? true : false}
              />
            </InputField>
            {/*성별 선택 필드*/}
            <InputField title="성별" error={genderError}>
              <DropDown
                ref={dropdownRef}
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
                  ref={dropdownRef}
                  className="h-[45px] gap-2 rounded-[6px] border-[#E4E4E7] px-[10px] py-[14px]"
                  placeholder="년"
                  options={birthYearOptions}
                  onChange={(value) => {
                    setBirthYear(value);
                    updateBirthDate(value, birthMonth, birthDay);
                  }}
                />
                <DropDown
                  ref={dropdownRef}
                  className="h-[45px] gap-2 rounded-[6px] border-[#E4E4E7] px-[10px] py-[14px]"
                  placeholder="월"
                  options={birthMonthOptions}
                  onChange={(value) => {
                    setBirthMonth(value);
                    updateBirthDate(birthYear, value, birthDay);
                  }}
                />
                <DropDown
                  ref={dropdownRef}
                  className="h-[45px] gap-2 rounded-[6px] border-[#E4E4E7] px-[10px] py-[14px]"
                  placeholder="일"
                  options={birthDayOptions}
                  onChange={(value) => {
                    setBirthDay(value);
                    updateBirthDate(birthYear, birthMonth, value);
                  }}
                />
              </div>
            </InputField>
          </div>
          <div className="mt-4 px-5">
            {/*회원가입 다음 페이지로 이동 버튼*/}
            <BottomButton title="다음" type="submit" />
          </div>
        </form>
      </>
    );
  }
};
export default SignUpRequired;
