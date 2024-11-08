import { TShoeSearchResponse } from "@/types/product";
import SearchResultItem from "@/components/shoeCloset/search/SearchResultItem";
import { useState } from "react";

interface SimilarShoeListProps {
  products: TShoeSearchResponse[];
  onClick: (shoe: TShoeSearchResponse) => void;
}

const SimilarShoeList = (props: SimilarShoeListProps) => {
  const { products } = props;

  const [selectedResult, setSelectedResult] =
    useState<TShoeSearchResponse | null>(null); //선택된 아이템 상태

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

  return (
    <>
      <ul className="no-scrollbar grid w-full gap-2">
        {products.map((product) => (
          <SearchResultItem
            key={product.modelNo}
            modelNo={product.modelNo}
            image={product.image}
            modelName={product.modelName}
            brand={product.brand}
            className={`cursor-pointer ${selectedResult?.brand === product.brand && selectedResult?.modelNo === product.modelNo ? "border border-black" : "border border-transparent"}`}
            onClick={() => handleItemClick(product)}
          />
        ))}
      </ul>
    </>
  );
};
export default SimilarShoeList;
