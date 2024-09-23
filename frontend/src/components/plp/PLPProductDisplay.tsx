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

  // TODO: 데이터 확인 필요
  const { user } = userStore();
  const userFootSize = user?.footInfo || null;
  // console.log(user)

  return (
    <>
      <PLPControls totalItems={products.length} />
      <div className="overflow-y-auto px-4 pb-6">
        {products.length > 0 ? (
          <ProductList>
            {products.map((product, index) => (
              <ProductList.Item
                key={`${product.modelNo}-${index}`}
                recSize={userFootSize}
                thumb={product.image}
                brandName={product.brand}
                productName={product.modelName}
                isLiked={false}
                customerLink={product.link}
              />
            ))}
          </ProductList>
        ) : (
          <PLPEmptyList />
        )}
      </div>
    </>
  );
};
export default PLPProductDisplay;
