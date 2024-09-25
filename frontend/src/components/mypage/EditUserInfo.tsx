import React, { useState, useRef } from "react";
import InputField from "@common/InputField";
import Input from "@common/html/Input";
import BottomButton from "@common/BottomButton";
import DropDown, { DropDownRef } from "@common/html/DropDown";
import { useInput } from "@hooks/useInput";
// import userStore from "@store/auth.store";
import { auth } from "@/firebase";
import OptionSelectorButton from "@common/OptionSelectorButton";
// import { useNavigate } from "react-router-dom";

const EditUserInfo = () => {
  // const navigate = useNavigate();

  const { value: size, setValue: setSize } = useInput({
    sizeType: "",
    sneakerSize: "",
  });

  const user = auth.currentUser;
  // const { updateUserInfo } = userStore((store) => ({
  //   updateUserInfo: store.updateUserInfo,
  // }));
  const { value: editUserInfo, setValue: setEditUserInfo } = useInput({
    username: user?.displayName || "",
    gender: "",
    birthDate: "",
    sizeType: "",
    sneakerSize: "",
  });

  const [nameError, setnameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");

  const dropdownRef = useRef<DropDownRef>(null);

  const genderOptions: { value: string; label: string }[] = [
    { value: "남성", label: "남성" },
    { value: "여성", label: "여성" },
  ];

  const handleGenderChange = (value: string) => {
    setEditUserInfo({ ...editUserInfo, gender: value });
    setGenderError("");
  };

  const generateYearOptions = (startYear: number, endYear: number) => {
    const options: { value: string; label: string }[] = [];
    for (let year = startYear; year <= endYear; year++) {
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
      setEditUserInfo({ ...editUserInfo, birthDate: formattedBirthDate });
      setBirthDateError("");
    }
  };

  const handleSelect = (option: string, key?: string) => {
    setSize((size) => ({ ...size, [key ? key : "sneakerSize"]: option }));
  };

  const mmOptions: { value: string; label: string }[] = [];
  for (let i = 220; i <= 295; i += 5) {
    mmOptions.push({ value: i.toString(), label: i.toString() });
  }
  const euOptions: { value: string; label: string }[] = [];
  for (let i = 35; i <= 45.5; i += 0.5) {
    euOptions.push({ value: i.toString(), label: i.toString() });
  }
  const usOptions: { value: string; label: string }[] = [];
  for (let i = 5; i <= 11.5; i += 0.5) {
    usOptions.push({ value: i.toString(), label: i.toString() });
  }

  const getOptionsBySizeType = () => {
    switch (size.sizeType) {
      case "mm":
        return mmOptions;
      case "EU":
        return euOptions;
      case "US":
        return usOptions;
      default:
        return [];
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUserInfo({
      ...editUserInfo,
      [name]: value,
    });

    if (name === "username") setnameError("");
  };

  const submitHandle = (e: React.FormEvent) => {
    e.preventDefault();

    // let isEditUserInfoValid = true;

    // if (!editUserInfo.username) {
    //   setnameError("이름을 입력하세요");
    //   isEditUserInfoValid = false;
    // }

    // if (!editUserInfo.gender) {
    //   setGenderError("성별을 입력하세요");
    //   isEditUserInfoValid = false;
    // }

    // if (!editUserInfo.birthDate) {
    //   setBirthDateError("생년월일을 입력하세요");
    //   isEditUserInfoValid = false;
    // }
  };

  return (
    <>
      <form className="gap-4" onSubmit={submitHandle} noValidate>
        <div className="gap-4 px-4">
          {/*이름 입력 필드*/}
          <InputField title="이름" error={nameError}>
            <Input
              type="text"
              name="username"
              placeholder={user?.displayName || "이름을 입력해주세요"}
              className="h-[48px] w-full rounded-[4px] px-4 py-[14px]"
              value={user?.displayName ? "" : editUserInfo.username}
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
                menuPlacement="top"
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
                menuPlacement="top"
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
          <InputField title="사이즈 타입">
            <div className="flex h-11 justify-center space-x-2 text-body2 font-semibold">
              <OptionSelectorButton
                title="mm"
                isSelected={size.sizeType === "mm"}
                onClick={() => handleSelect("mm", "sizeType")}
              />
              <OptionSelectorButton
                title="EU"
                isSelected={size.sizeType === "EU"}
                onClick={() => handleSelect("EU", "sizeType")}
              />
              <OptionSelectorButton
                title="US"
                isSelected={size.sizeType === "US"}
                onClick={() => handleSelect("US", "sizeType")}
              />
            </div>
          </InputField>
          <InputField title="평소 신는 스니커즈 사이즈">
            <DropDown
              ref={dropdownRef}
              className="gap-2 rounded-[4px] border-[#E4E4E7] px-4 py-[14px]"
              placeholder="사이즈를 선택해 주세요"
              options={getOptionsBySizeType()}
              onChange={handleSelect}
            />
          </InputField>
        </div>
        <div className="mt-4 px-5">
          {/*내 정보 수정 제출 버튼*/}
          <BottomButton title="수정 완료" type="submit" />
        </div>
      </form>
    </>
  );
};
export default EditUserInfo;
