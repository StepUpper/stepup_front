import TextShoeSearch from "@/components/shoeCloset/search/TextShoeSearch";
import Header from "@components/common/Header";
import {
  clearRecentSearches,
  deleteRecentSearch,
  getRecentSearches,
} from "@/utils/storeRecentSearches";
import { useEffect, useState } from "react";
import RecentTextSearches from "@/components/shoeCloset/search/RecentTextSearches";
import { TShoeSearchResponse } from "@/types/product";

const SearchShoeCloset = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<TShoeSearchResponse[]>([]);

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
      <div className="sticky top-0 z-10 bg-white">
        <Header type="back">신발 검색</Header>
        {/* 신발 텍스트 검색창 영역 */}
        <div className="p-4">
          <TextShoeSearch onSearch={handleAddRecentSearch} />
        </div>
      </div>
      <div className="px-5 py-4">
        <RecentTextSearches
          recentSearches={recentSearches}
          onClearAll={handleClearRecentSearches}
          onDeleteKeyword={handleDeleteKeyword}
        />
      </div>
    </div>
  );
};
export default SearchShoeCloset;
