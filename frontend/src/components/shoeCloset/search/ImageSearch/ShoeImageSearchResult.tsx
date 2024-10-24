import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { TShoeSearchResponse } from "@type/product";
import BottomButton from "@components/common/BottomButton";
import { useBottomSheet } from "@store/bottomSheet.store";
import BestMatchShoe from "@components/shoeCloset/search/ImageSearch/BestMatchShoe";

interface ShoeImageSearchResultProps {
  products: TShoeSearchResponse[];
}

const ShoeImageSearchResult = (props: ShoeImageSearchResultProps) => {
  const { products } = props;
  const bestMatchShoe = products[0];

  const [selectedResult, setSelectedResult] =
    useState<TShoeSearchResponse | null>(bestMatchShoe);

  const navigate = useNavigate();
  const { close } = useBottomSheet();

  // 다시하기
  const handleRetry = () => {
    navigate("/shoecloset/search/image", { replace: true });
    setSelectedResult(null);
    close("imageSearch");
  };

  // 비슷한 상품 더보기
  const handleShowMoreSimilarShoes = () => {
    setSelectedResult(null);
  };

  // 선택한 신발 정보 전달
  const handleAddSelectedShoe = () => {
    if (selectedResult) {
      navigate("/shoecloset/add", { state: selectedResult });
    }
  };

  // TODO: 신발 선택
  const handleSelectedShoe = (shoe: TShoeSearchResponse) => {
    setSelectedResult(shoe);
  };

  return (
    <div>
      {selectedResult ? (
        <BestMatchShoe
          shoe={bestMatchShoe}
          onRetry={handleRetry}
          onShowMoreSimilarShoes={handleShowMoreSimilarShoes}
        />
      ) : (
        // TODO 리스트
        "리스트 자리"
      )}

      <div className="sticky bottom-0 z-10 w-full bg-white">
        <BottomButton
          title="선택 완료"
          className={twMerge(
            selectedResult ? "" : "cursor-not-allowed opacity-40"
          )}
          disabled={!selectedResult}
          onClick={handleAddSelectedShoe}
        />
      </div>
    </div>
  );
};
export default ShoeImageSearchResult;
