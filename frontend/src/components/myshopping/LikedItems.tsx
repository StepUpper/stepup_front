import { useState } from "react";
import ProductList from "@common/ProductList";
import CategorySelector from "@common/CategorySelector";
import Button from "@common/html/Button";

const mocEx = () => {
  return 1 + 1;
};

const LikedItems = () => {
  const n: number = 5;

  const [showComponent, setShowComponent] = useState(false);
  const handleShowComponent = () => {
    setShowComponent(true);
  };

  return (
    <>
      <div className="flex w-screen justify-between">
        <Button className="h-[40px] grow border-b-2 border-black px-[16px] py-[8px] text-body2 font-bold">
          좋아요
        </Button>
        <Button className="h-[40px] grow border-b border-[#E5E7EB] px-[16px] py-[8px] text-body2 font-normal text-grey-600">
          최근 본
        </Button>
      </div>
      <div className="flex gap-[5px] px-[16px] py-[17px]">
        <CategorySelector.Item isClicked={true} onClick={() => mocEx()}>
          상품
        </CategorySelector.Item>
        <CategorySelector.Item isClicked={false} onClick={handleShowComponent}>
          브랜드
        </CategorySelector.Item>
      </div>
      <div className="px-[16px]">
        <p className="text-body3 font-bold"> 총 {n} 개</p>
        <ProductList>
          {Array(n)
            .fill(null)
            .map((_, index) => (
              <ProductList.Item
                key={index}
                recSize=""
                thumb=""
                brandName=""
                productName=""
                customerImg=""
                customerLink=""
                isLiked={true}
              />
            ))}
        </ProductList>
        <div className="mx-auto grid grid-cols-2 justify-items-center gap-[11px] py-[16px]"></div>
      </div>
    </>
  );
};
export default LikedItems;
