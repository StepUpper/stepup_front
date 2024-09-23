import { TChatResponse } from "@/types/chat";
import {
  arrowRightIcon,
  perfittLogo,
  showBrandProductIcon,
} from "@assets/assets";
import ChatBrandCard from "./ChatBrandCard";
import ChatProductItem from "./ChatProductItem";
import ReactMarkdown from "react-markdown";
import ChatShareDislikeBox from "./ChatShareDislikeBox";
import productAndBrandStore from "@store/productAndBrand.store";
import { useBottomSheet } from "@store/bottomSheet.store";
import ChatReqProdItem from "./ChatReqProdItem";
import userStore from "@/store/auth.store";

interface ChatMessageProps {
  title: TChatResponse;
}

const ChatMessage = (props: ChatMessageProps) => {
  const { setClickedProducts, setClickedBrand } = productAndBrandStore();
  const { likeShoes } = userStore();
  const { title } = props;

  const { open } = useBottomSheet();

  return (
    <>
      <div className="flex items-start bg-white p-4">
        <div className="shrink-0">
          <img src={perfittLogo} alt="perfittLogo" className="size-7" />
        </div>
        <ReactMarkdown
          components={{
            h3: ({ node, ...props }) => (
              <h3 className="text-body2 font-bold" {...props} />
            ),
            p: ({ node, ...props }) => <p className="font-normal" {...props} />,
            li: ({ node, ...props }) => (
              <div className="flex items-start">
                <span className="mr-2">•</span>
                <li className="list-none text-caption1" {...props} />
              </div>
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
                className="inline-block cursor-pointer"
                onClick={() => {
                  setClickedBrand(brand.brand); // 브랜드 PLP 열기
                  setClickedProducts(null);
                  open("plp");
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
            {title.products.map((product) => {
              const isLiked = likeShoes?.some(
                (shoe) => shoe.shoeId === product.productId
              );

              return (
                <div
                  key={product.productId}
                  className="inline-block cursor-pointer"
                  onClick={() => {
                    setClickedProducts(title);
                    setClickedBrand(null);
                    open("plp"); // 상품 plp
                  }}
                >
                  <ChatProductItem
                    brand={product.brand}
                    title={product.modelName}
                    imgUrl={product.image}
                    link={product.link}
                    modelNo={product.modelNo}
                    productId={product.productId}
                    isLiked={isLiked}
                  />
                </div>
              );
            })}

            {/* 더보기 버튼 */}
            <div className="flex w-12 min-w-[48px] flex-col items-center justify-center text-[9px]">
              <div
                className="mb-1 flex size-6 cursor-pointer items-center justify-center rounded-full bg-black"
                onClick={() => {
                  setClickedProducts(title);
                  setClickedBrand(null);
                  open("plp"); // 상품 plp
                }}
              >
                <img
                  src={arrowRightIcon}
                  alt="더보기"
                  className="size-4 text-white"
                />
              </div>
              <span>더보기</span>
            </div>
          </div>

          <ChatShareDislikeBox />
        </>
      )}

      {/* 맞춤상품 관련 응답 */}
      {title.reqProducts && (
        <>
          <div className="mb-3 ml-8 h-60 w-56 rounded-md border border-gray-100 bg-white p-2">
            {/* 제목 */}
            <p className="mb-2 text-body3 font-label">맞춤 상품 추천</p>

            {/* 추천 상품 리스트 */}
            <div className="space-y-1.5">
              {title.reqProducts.slice(0, 3).map((product, index) => (
                <ChatReqProdItem
                  key={index}
                  imgUrl={product.image}
                  brand={product.brand}
                  title={product.modelName}
                  link={product.link}
                  className="cursor-pointer"
                  onClick={() => {
                    setClickedProducts(title);
                    setClickedBrand(null);
                    open("plp"); // 상품 plp
                  }}
                />
              ))}
            </div>

            <div
              className="flex cursor-pointer items-center justify-center px-4 py-3 text-caption1 text-gray-600"
              onClick={() => {
                setClickedProducts(title);
                setClickedBrand(null);
                open("plp"); // 상품 plp
              }}
            >
              더보기
              <img
                src={showBrandProductIcon}
                alt="showBrandProductIcon"
                className="ml-2.5 h-2.5 w-1"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChatMessage;
