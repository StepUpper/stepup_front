import { TChatResponse } from "@/types/chat";
import { perfittLogo } from "@assets/assets";
import ChatBrandCard from "./ChatBrandCard";
import ChatProductItem from "./ChatProductItem";
import ReactMarkdown from "react-markdown";
import ChatShareDislikeBox from "./ChatShareDislikeBox";
import productAndBrandStore from "@store/productAndBrand.store";
import { useBottomSheet } from "@store/bottomSheet.store";

interface ChatMessageProps {
  title: TChatResponse;
}

const ChatMessage = (props: ChatMessageProps) => {
  const { setClickedProducts, setClickedBrand } = productAndBrandStore();
  const { title } = props;

  const { open } = useBottomSheet();

  return (
    <>
      <div className="flex items-start bg-white p-4">
        <div className="flex-shrink-0">
          <img src={perfittLogo} alt="perfittLogo" className="h-7 w-7" />
        </div>
        <ReactMarkdown
          // 각 태그별 디자인은 무엇인가....... 아래는 임시 디자인
          components={{
            h3: ({ node, ...props }) => (
              <h3 className="text-lg font-bold" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="text-paragraph" {...props} />
            ),
          }}
          className="ml-2.5 py-2 pr-1 text-sm"
        >
          {title.message}
        </ReactMarkdown>
      </div>

      {/* 브랜드 관련 응답 */}
      {title.brands && (
        <>
          <div className="no-scrollbar mt-2 flex space-x-4 overflow-x-auto pl-8">
            {title.brands.map((brand, index) => (
              <div
                key={index}
                className="inline-block"
                onClick={() => {
                  setClickedBrand(brand.brand);
                  open("brandPLP"); // 브랜드 PLP 열기
                }}
              >
                <ChatBrandCard
                  brand={brand.brand}
                  description={brand.description}
                  link={brand.link}
                  thumbnail={brand.thumbnail}
                />
              </div>
            ))}
          </div>
          <ChatShareDislikeBox />
        </>
      )}

      {/* 상품 관련 응답 */}
      {title.products && (
        <>
          <div className="no-scrollbar mt-2 flex space-x-4 overflow-x-auto pl-8">
            {title.products.map((product, index) => (
              <div
                key={index}
                className="inline-block"
                onClick={() => {
                  setClickedProducts(title);
                  open("productPLP");
                }}
              >
                <ChatProductItem
                  brand={product.brand}
                  title={product.modelName}
                  imgUrl={product.image}
                  link={product.link}
                  modelNo={product.modelNo}
                  productId={product.productId}
                />
              </div>
            ))}
          </div>
          <ChatShareDislikeBox />
        </>
      )}
    </>
  );
};

export default ChatMessage;
