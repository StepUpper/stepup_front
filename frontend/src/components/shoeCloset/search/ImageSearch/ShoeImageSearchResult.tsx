import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { TShoeSearchResponse } from "@type/product";
import BottomButton from "@components/common/BottomButton";
import { useBottomSheet } from "@store/bottomSheet.store";
import BestMatchShoe from "@components/shoeCloset/search/ImageSearch/BestMatchShoe";
import SimilarShoeList from "@components/shoeCloset/search/ImageSearch/SimilarShoeList";

interface ShoeImageSearchResultProps {
  products: TShoeSearchResponse[];
}

const ShoeImageSearchResult = (props: ShoeImageSearchResultProps) => {
  const { products } = props;
  const bestMatchShoe = products[0]; // 첫번째 값으로 처리함

  const [selectedResult, setSelectedResult] =
    useState<TShoeSearchResponse | null>(bestMatchShoe);
  const [clickedMore, setClickedMore] = useState(false);

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
    setClickedMore(true);
  };

  // 선택한 신발 정보 전달
  const handleAddSelectedShoe = () => {
    if (selectedResult) {
      navigate("/shoecloset/add", { state: selectedResult });
    }
  };

  // 신발 선택
  const handleSelectedShoe = (shoe: TShoeSearchResponse) => {
    setSelectedResult(shoe);
  };

  return (
    <div className="flex min-h-[568px] flex-col">
      <div className="flex-1 pt-8">
        {!clickedMore ? (
          <BestMatchShoe
            shoe={selectedResult!}
            onRetry={handleRetry}
            onShowMoreSimilarShoes={handleShowMoreSimilarShoes}
          />
        ) : (
          <SimilarShoeList products={products} onClick={handleSelectedShoe} />
        )}
      </div>
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
