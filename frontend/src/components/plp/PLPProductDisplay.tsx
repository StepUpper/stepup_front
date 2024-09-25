import PLPControls from "@components/plp/PLPControls";
import ProductList from "@common/ProductList";
import PLPEmptyList from "@components/plp/PLPEmptyList";
import userStore from "@store/auth.store";
import { TProductResponse } from "@/types/product";

interface PLPProductDisplayProps {
  products: TProductResponse[];
}

const PLPProductDisplay = (props: PLPProductDisplayProps) => {
  const { products } = props;

  const { likeShoes } = userStore();

  return (
    <>
      <PLPControls totalItems={products.length} />
      <div className="overflow-y-auto px-4 pb-6">
        {products.length > 0 ? (
          <ProductList>
            {products.map((product) => {
              const isLiked = likeShoes?.some(
                (shoe) => shoe.shoeId === product.brand + product.modelNo
              );
              const shoeId = product.brand + product.modelNo;

              return (
                <ProductList.Item
                  key={shoeId}
                  shoeId={shoeId}
                  productName={product.modelName}
                  imgUrl={product.image}
                  modelNo={product.modelNo}
                  brand={product.brand}
                  customerLink={product.link}
                  isLiked={isLiked}
                />
              );
            })}
          </ProductList>
        ) : (
          <PLPEmptyList />
        )}
      </div>
    </>
  );
};
export default PLPProductDisplay;
