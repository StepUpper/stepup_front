import { TShoeSearchResponse } from "@/types/product";
import SearchResultList from "@components/shoeCloset/search/SearchResultList";
import { useState } from "react";

interface SimilarShoeListProps {
  products: TShoeSearchResponse[];
  onClick: (shoe: TShoeSearchResponse) => void;
}

const SimilarShoeList = (props: SimilarShoeListProps) => {
  const { products, onClick } = props;
  const [clicked, setClicked] = useState("");

  return (
    <>
      <SearchResultList>
        {products.map((product) => (
          <SearchResultList.Item
            modelNo={product.modelNo}
            image={product.image}
            modelName={product.modelName}
            brand={product.brand}
            onClick={() => {
              setClicked(product.modelNo);
              onClick(product);
            }}
            className={clicked === product.modelNo ? "border-black" : ""}
          />
        ))}
      </SearchResultList>
    </>
  );
};
export default SimilarShoeList;
