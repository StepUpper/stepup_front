import RecentProducts from "@/components/myshopping/RecentProducts";
import Header from "@common/Header";
import Button from "@common/html/Button";
import LikedProducts from "@components/myshopping/LikedProducts";
import { useState } from "react";
import CategorySelector from "@common/CategorySelector";
import LikedBrands from "@components/myshopping/LikedBrands";

const MyShopping = () => {
  const [activeCompoenet, setActiveComponent] = useState("likedproducts");

  const showComponent = () => {
    switch (activeCompoenet) {
      case "likedproducts":
        return <LikedProducts />;
      case "likedBrands":
        return <LikedBrands />;
      case "recentItems":
        return <RecentProducts />;
      default:
        return <LikedProducts />;
    }
  };

  return (
    <>
      <Header type="back" />
      <div className="relative h-screen">
        <div className="flex w-full justify-between">
          <Button
            className={`h-[40px] grow bg-white px-[16px] py-[8px] text-body2 ${activeCompoenet === "likedproducts" || activeCompoenet === "likedBrands" ? "border-b-2 border-black font-bold" : "border-b border-[#E5E7EB] font-normal text-grey-600"}`}
            onClick={() => setActiveComponent("likedproducts")}
          >
            좋아요
          </Button>
          <Button
            className={`h-[40px] grow px-[16px] py-[8px] text-body2 ${activeCompoenet === "recentItems" ? "border-b-2 border-black font-bold" : "border-b border-[#E5E7EB] font-normal text-grey-600"}`}
            onClick={() => setActiveComponent("recentItems")}
          >
            최근 본
          </Button>
        </div>
        {/* 좋아요 탭 카테고리 셀렉터 */}
        {(activeCompoenet === "likedproducts" ||
          activeCompoenet === "likedBrands") && (
          <div className="flex gap-[5px] px-[16px] py-[17px]">
            <CategorySelector.Item
              isClicked={activeCompoenet === "likedproducts"}
              onClick={() => setActiveComponent("likedproducts")}
            >
              상품
            </CategorySelector.Item>
            <CategorySelector.Item
              isClicked={activeCompoenet === "likedBrands"}
              onClick={() => setActiveComponent("likedBrands")}
            >
              브랜드
            </CategorySelector.Item>
          </div>
        )}
        <div>{showComponent()}</div>
      </div>
    </>
  );
};
export default MyShopping;
