import { TProduct } from "@type/plp";
import PLPControls from "@components/plp/PLPControls";
import ProductList from "@common/ProductList";
import PLPEmptyList from "@components/plp/PLPEmptyList";
import userStore from "@store/auth.store";

interface PLPProductDisplayProps {
  products:
    | TProduct[]
    | {
        image: string;
        link: string;
        modelName: string;
        brand: string;
        modelNo: string;
        productId: string;
      }[];
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
            {products.map((product, index) => {
              const isLiked = likeShoes?.some(
                (shoe) => shoe.shoeId === product.productId
              );

              const productKey =
                product.productId || `${product.modelNo}_${index}`;
              return (
                <ProductList.Item
                  key={productKey}
                  productId={product.productId || productKey}
                  modelNo={product.modelNo}
                  thumb={product.image}
                  brandName={product.brand}
                  productName={product.modelName}
                  isLiked={isLiked}
                  customerLink={product.link}
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
