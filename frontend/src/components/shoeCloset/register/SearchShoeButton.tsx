import { plusIcon } from "@/assets/assets";
import Button from "@/components/common/html/Button";
import InputField from "@/components/common/InputField";
import React from "react";

const SearchShoeButton = () => {
  return (
    <InputField title="신발을 선택해 주세요">
      <Button className="item-center w-full rounded-md bg-grey-50 p-1.5">
        <img src={plusIcon} />
      </Button>
    </InputField>
  );
};

export default SearchShoeButton;
