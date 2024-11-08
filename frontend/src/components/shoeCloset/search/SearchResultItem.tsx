import { forwardRef, memo } from "react";
import Img from "@/components/common/html/Img";
import { shoeImg } from "@/assets/assets";
import { TShoeSearchResponse } from "@/types/product";
import { twMerge } from "tailwind-merge";

interface SearchResultItemProps extends TShoeSearchResponse {
  onClick: () => void;
  className: string;
}

const SearchResultItem = forwardRef<HTMLLIElement, SearchResultItemProps>(
  (props, ref) => {
    const { image, modelName, brand, onClick, className } = props;

    return (
      <li
        ref={ref}
        className={twMerge("flex items-center rounded-md", className)}
        onClick={onClick}
      >
        {/* 상품 이미지 영역 */}
        <div className="relative overflow-hidden rounded-[0.39rem] bg-grey-50">
          {/* 신발 이미지 */}
          <div
            className="item-center flex size-20"
            style={{ aspectRatio: "1/1" }}
          >
            <Img
              src={image}
              alt={modelName}
              fallbackSrc={shoeImg}
              className=""
              errorStyle="w-[70%] opacity-100"
            />
          </div>
        </div>
        {/* 상품 정보 영역 */}
        <div className="flex flex-col gap-2 px-2">
          <p className="text-sm"> {brand} </p>
          <p className="font-medium"> {modelName} </p>
        </div>
      </li>
    );
  }
);

SearchResultItem.displayName = "SearchResultItem";
export default memo(SearchResultItem);
