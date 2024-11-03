import { ReactNode } from "react";
import Img from "@/components/common/html/Img";
import { shoeImg } from "@/assets/assets";
import { TShoeSearchResponse } from "@/types/product";
import { twMerge } from "tailwind-merge";

interface SearchResultItemProps extends TShoeSearchResponse {
  onClick: () => void;
  className?: string;
}

const SearchResultList = ({ children }: { children: ReactNode }) => {
  return <ul className="no-scrollbar grid w-full gap-2">{children}</ul>;
};
export default SearchResultList;

const SearchResultItem = (props: SearchResultItemProps) => {
  const { image, modelName, brand, onClick, className } = props;
  return (
    <li
      className={twMerge(
        "flex cursor-pointer items-center rounded-md border border-white hover:border-black",
        className
      )}
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
};
SearchResultList.Item = SearchResultItem;
