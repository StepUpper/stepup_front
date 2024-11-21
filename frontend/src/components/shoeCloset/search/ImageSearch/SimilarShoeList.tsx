import { TShoeSearchResponse } from "@type/product";
import SearchResultItem from "@/components/shoeCloset/search/SearchResultItem";

interface SimilarShoeListProps {
  products: TShoeSearchResponse[];
  selectedResult: TShoeSearchResponse | null;
  onSelectedShoe: (shoe: TShoeSearchResponse) => void;
}

const SimilarShoeList = (props: SimilarShoeListProps) => {
  const { products, selectedResult, onSelectedShoe } = props;

  return (
    <>
      <ul className="no-scrollbar grid w-full gap-2">
        {products.map((product) => (
          <SearchResultItem
            key={product.brand + product.modelNo}
            modelNo={product.modelNo}
            image={product.image}
            modelName={product.modelName}
            brand={product.brand}
            className={`cursor-pointer ${selectedResult?.brand === product.brand && selectedResult?.modelNo === product.modelNo ? "border border-black" : "border border-transparent"}`}
            onClick={() => onSelectedShoe(product)}
          />
        ))}
      </ul>
    </>
  );
};
export default SimilarShoeList;
