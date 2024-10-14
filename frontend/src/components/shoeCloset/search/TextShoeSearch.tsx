import { cameraIcon, searchIcon } from "@/assets/assets";
import Input from "@/components/common/html/Input";
import { addRecentSearches } from "@/utils/storeRecentSearches";
import { shoeSearchApi } from "@/apis/services/shoeSearch";
import { useEffect, useState } from "react";
import { TShoeSearchResponse } from "@/types/product";

interface TextShoeSearchProps {
  onSearch: (keyword: string, results: TShoeSearchResponse[]) => void;
}

const TextShoeSearch = ({ onSearch }: TextShoeSearchProps) => {
  const [inputText, setInputText] = useState("");
  const [textKeyword, setTextKeyword] = useState("");

  useEffect(() => {
    if (textKeyword.trim() !== "") {
      console.log("text: ", textKeyword);
      handleSearch(textKeyword);
      addRecentSearches(textKeyword);
    }
  }, [textKeyword]);

  const handleSearch = async (keyword: string) => {
    try {
      const response = await shoeSearchApi.postShoeTextSearch({
        text: keyword,
      });
      console.log("API 응답 결과: ", response.data);
      const results = response.data;
      onSearch(keyword, results);
    } catch (error) {
      console.error("검색 실패: ", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputText.trim() !== "") {
      e.preventDefault();
      console.log("input: ", inputText.trim());
      setTextKeyword(inputText);
    }
  };

  return (
    <div>
      <div className="rounded-full border border-[#E4E4E7] px-[16px]">
        <div className="flex items-center justify-between gap-[11px]">
          <img src={searchIcon} className="size-4" />
          <Input
            className="h-[40px] grow border-none"
            placeholder="신발이름, 모델명 검색"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={inputText}
          ></Input>
          <img src={cameraIcon} className="size-5" />
        </div>
      </div>
    </div>
  );
};
export default TextShoeSearch;
