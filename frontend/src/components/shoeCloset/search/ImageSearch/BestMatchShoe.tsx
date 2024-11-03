import Button from "@components/common/html/Button";
import { retryIcon } from "@assets/assets";
import { TShoeSearchResponse } from "@type/product";

interface BestMatchShoeProps {
  shoe: TShoeSearchResponse;
  onRetry: () => void;
  onShowMoreSimilarShoes: () => void;
}

const BestMatchShoe = (props: BestMatchShoeProps) => {
  const { shoe, onRetry, onShowMoreSimilarShoes } = props;

  return (
    <>
      {/* 상단 영역 */}
      <div className="sticky left-0 top-0 bg-white">
        <Button className="flex items-center gap-2 text-xs" onClick={onRetry}>
          <img src={retryIcon} alt="다시하기 버튼" className="w-5" />
          다시하기
        </Button>
      </div>
      {/* contents */}
      <div className="flex flex-col gap-4 py-4">
        <div className="text-center">
          <Button
            className="w-fit rounded-md bg-grey-600 px-3 py-2 text-sm text-white"
            onClick={onShowMoreSimilarShoes}
          >
            비슷한 상품 더보기
          </Button>
        </div>
        <div className="flex flex-col gap-3 px-4">
          <img src={shoe.image} alt={shoe.modelName} />
          <div className="flex flex-col gap-2 text-sm">
            <span className="text-body2 font-label">{shoe.brand}</span>
            <p>{shoe.modelName}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default BestMatchShoe;
