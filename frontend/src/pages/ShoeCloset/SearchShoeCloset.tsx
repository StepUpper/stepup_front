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
import { shoeSearchApi } from "@/apis/services/shoeSearch";
import SearchResultList from "@/components/shoeCloset/search/SearchResultList";

const SearchShoeCloset = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]); //최근 검색어 상태
  const [searchResults, setSearchResults] = useState<TShoeSearchResponse[]>([]); //검색 결과 상태
  const [noResults, setNoResults] = useState(false); //검색결과 없음 상태

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  //최근 검색어 저장 함수
  const handleAddRecentSearch = (keyword: string) => {
    console.log("keyword: ", keyword);
    setRecentSearches((prev) => [
      keyword,
      ...prev.filter((item) => item !== keyword),
    ]);
  };

  //검색 함수
  const handleSearch = async (keyword: string) => {
    try {
      const response = await shoeSearchApi.postShoeTextSearch({
        text: keyword,
      });
      const results = response.data;
      const products = results.products;
      console.log("results: ", results);
      console.log("length: ", products.length);

      if (results && products.length > 0) {
        setSearchResults(products);
        setNoResults(false);
        console.log(`${keyword}의 검색결과: `, products);
      } else {
        setSearchResults([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error("검색실패: ", error);
      setSearchResults([]);
      setNoResults(true);
    }
  };

  //특정 최근 검색어 삭제 함수
  const handleDeleteKeyword = (keyword: string) => {
    deleteRecentSearch(keyword);
    setRecentSearches(getRecentSearches());
  };

  //최근 검색어 전체 삭제 함수
  const handleClearRecentSearches = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  const handleClearInput = () => {
    setSearchResults([]);
    setNoResults(false);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 z-10 bg-white">
        <Header type="back">신발 검색</Header>
        {/* 신발 텍스트 검색창 영역 */}
        <div className="p-4">
          <TextShoeSearch
            onSearch={(keyword) => {
              handleAddRecentSearch(keyword);
              handleSearch(keyword);
            }}
            onClearInput={handleClearInput}
          />
        </div>
      </div>
      {searchResults.length > 0 ? (
        <div className="flex h-full p-4">
          <SearchResultList>
            {searchResults.map((product, index) => (
              <SearchResultList.Item
                key={index}
                shoeId={`${product.brand}-${product.modelNo}`}
                image={product.image}
                modelName={product.modelName}
                brand={product.brand}
                modelNo={product.modelNo}
                productId={product.productId}
                link={product.link}
              />
            ))}
          </SearchResultList>
        </div>
      ) : noResults ? (
        <p>검색 결과 없음</p>
      ) : (
        <div className="px-5 py-4">
          <RecentTextSearches
            recentSearches={recentSearches}
            onClearAll={handleClearRecentSearches}
            onDeleteKeyword={handleDeleteKeyword}
            onSearch={handleSearch}
          />
        </div>
      )}
    </div>
  );
};
export default SearchShoeCloset;
