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
import BottomButton from "@/components/common/BottomButton";
import { useNavigate } from "react-router-dom";

const SearchShoeCloset = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]); //최근 검색어 상태
  const [searchResults, setSearchResults] = useState<TShoeSearchResponse[]>([]); //검색 결과 상태
  const [selectedResult, setSelectedResult] =
    useState<TShoeSearchResponse | null>(null); //선택된 아이템 상태
  const [noResults, setNoResults] = useState(false); //검색결과 없음 상태
  const navigate = useNavigate();

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

  //인풋창 초기화 상태 전달 함수
  const handleClearInput = () => {
    setSearchResults([]);
    setNoResults(false);
  };

  //신발 선택시 상태 업데이트
  const handleItemClick = (shoe: TShoeSearchResponse) => {
    if (
      selectedResult?.brand === shoe.brand &&
      selectedResult?.modelNo === shoe.modelNo
    ) {
      setSelectedResult(null);
    } else {
      setSelectedResult(shoe);
    }
  };

  //신발 정보 전달 함수
  const handleButtonClick = () => {
    if (selectedResult) {
      navigate("/shoecloset/add", { state: selectedResult });
    }
  };

  return (
    <div className="flex h-real-screen flex-col">
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
        <div className="flex flex-col relative flex-1">
          <div className="flex-1 h-full grow p-4">
            <SearchResultList>
              {searchResults.map((product, index) => (
                <SearchResultList.Item
                  key={index}
                  image={product.image}
                  modelName={product.modelName}
                  brand={product.brand}
                  modelNo={product.modelNo}
                  productId={product.productId}
                  link={product.link}
                  className={`cursor-pointer ${selectedResult?.brand === product.brand && selectedResult?.modelNo === product.modelNo ? "border-2 border-black" : ""}`}
                  onClick={() => handleItemClick(product)}
                />
              ))}
            </SearchResultList>
          </div>
          <div className="sticky bottom-0 z-10 w-full bg-white px-4">
            <BottomButton
              title={selectedResult ? "선택 완료" : "선택해주세요"}
              className={`${
                selectedResult ? "" : "cursor-not-allowed opacity-40"
              }`}
              disabled={!selectedResult}
              onClick={handleButtonClick}
            />
          </div>
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
