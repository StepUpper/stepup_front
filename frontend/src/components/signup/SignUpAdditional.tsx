import React, { useRef } from "react";
import BottomButton from "@common/BottomButton";
import DropDown, { DropDownRef } from "@common/html/DropDown";
import InputField from "@common/InputField";
import OptionSelectorButton from "@common/OptionSelectorButton";
import { infoIcon } from "@assets/assets";
import userStore from "@store/auth.store";
import { updateUserData } from "@apis/firebase/auth";
import { useInput } from "@hooks/useInput";
import { useNavigate } from "react-router-dom";

const SignUpAdditional = () => {
  const navigate = useNavigate();
  const { setUserInfo, setIsLoggedIn } = userStore((store) => ({
    setUserInfo: store.setUserInfo,
    setIsLoggedIn: store.setIsLoggedIn,
  }));

  const { value: size, setValue: setSize } = useInput({
    sizeType: "",
    sneakerSize: "",
  });
  const handleSelect = (option: string, key?: string) => {
    setSize((size) => ({ ...size, [key ? key : "sneakerSize"]: option }));
  };

  const dropdownRef = useRef<DropDownRef>(null);

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

  const submitHandle = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserData("sizeType", size.sizeType);
    updateUserData("sneakerSize", +size.sneakerSize);
    setUserInfo("sizeType", size.sizeType);
    setUserInfo("sneakerSize", +size.sneakerSize);
    setIsLoggedIn(true);
    return navigate("/");
  };

  return (
    <>
      <form id="signupAdditional" className="gap-4" onSubmit={submitHandle}>
        <div className="gap-6 py-4">
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
        <div className="w-full gap-10 rounded-lg bg-blue-50 p-4 text-body2 leading-6 text-blue-700">
          <div className="flex gap-2">
            <img src={infoIcon} className="size-6" />
            <p>
              {" "}
              나에게 편한 신발 사이즈를 고려해서 추천사이즈를 알려드리기 위해
              평소 신는 스니커즈 사이즈를 받고 있어요.
            </p>
          </div>
        </div>
        <div className="mx-5 mb-[34px] mt-6 h-[114px]">
          <BottomButton type="submit" title="가입 완료" />
        </div>
      </form>
    </>
  );
};
export default SignUpAdditional;
