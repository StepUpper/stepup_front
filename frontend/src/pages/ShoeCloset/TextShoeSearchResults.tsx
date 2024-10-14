import TextShoeSearch from "@/components/shoeCloset/search/TextShoeSearch";
import Header from "@components/common/Header";
import { useState } from "react";
import SearchResultList from "@/components/shoeCloset/search/SearchResultList";
import { TShoeSearchResponse } from "@/types/product";
import { shoeSearchApi } from "@/apis/services/shoeSearch";

const TextShoeSearchResults = () => {
  const [searchResults, setSearchResults] = useState<TShoeSearchResponse[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const handleAddRecentSearch = (keyword: string) => {
    console.log("keyword: ", keyword);
    setRecentSearches((prev) => [
      keyword,
      ...prev.filter((item) => item !== keyword),
    ]);
  };

  const handleSearch = async (keyword: string) => {
    try {
      const response = await shoeSearchApi.postShoeTextSearch({
        text: keyword,
      });
      console.log("결과 컴포넌트 API 응답 결과: ", response.data);
      const results = response.data;
      setSearchResults(results);
    } catch (error) {
      console.error("검색 실패: ", error);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 z-10 bg-white">
        <Header type="back">신발 검색</Header>
        {/* 신발 텍스트 검색창 영역 */}
        <div className="p-4">
          <TextShoeSearch onSearch={handleSearch} />
        </div>
      </div>
      <div className="flex h-full p-4">
        {searchResults.length > 0 ? (
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
        ) : (
          <p> No results </p>
        )}
      </div>
    </div>
  );
};
export default TextShoeSearchResults;
