import { closeIcon, searchIcon } from "@/assets/assets";
import Button from "@/components/common/html/Button";
import TextShoeSearch from "@/components/shoeCloset/search/TextShoeSearch";
import Header from "@components/common/Header";
import {
  clearRecentSearches,
  deleteRecentSearch,
  getRecentSearches,
} from "@/utils/storeRecentSearches";
import { useEffect, useState } from "react";

const SearchShoeCloset = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  const handleAddRecentSearch = (keyword: string) => {
    console.log("keyword: ", keyword);
    setRecentSearches((prev) => [
      keyword,
      ...prev.filter((item) => item !== keyword),
    ]);
  };

  const handleDeleteKeyword = (keyword: string) => {
    deleteRecentSearch(keyword);
    setRecentSearches(getRecentSearches());
  };

  const handleClearRecentSearches = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };
  return (
    <div className="flex h-full flex-col">
      <Header type="back">신발 검색</Header>
      <main className="flex h-full flex-col gap-7 p-4">
        <div>
          <TextShoeSearch onSearch={handleAddRecentSearch} />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <p className="text-base">최근 검색어</p>
            <Button
              className="text-sm text-gray-400 underline"
              onClick={handleClearRecentSearches}
            >
              전체삭제
            </Button>
          </div>
          {recentSearches && recentSearches.length > 0 ? (
            <ul className="px-1 py-3">
              {recentSearches?.map((keyword, index) => (
                <li key={index} className="flex items-center gap-3 py-2">
                  <div className="flex size-[26px] justify-center rounded-full bg-gray-200">
                    <img src={searchIcon} className="w-3 object-contain" />
                  </div>
                  <p className="flex-grow">{keyword}</p>
                  <img
                    src={closeIcon}
                    className="size-4 opacity-80"
                    onClick={() => handleDeleteKeyword(keyword)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>최근 검색어가 없습니다</p>
          )}
        </div>
      </main>
    </div>
  );
};
export default SearchShoeCloset;
