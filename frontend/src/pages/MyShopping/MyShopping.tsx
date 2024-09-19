import RecentItems from "@/components/myshopping/RecentItems";
import Header from "@common/Header";
import Button from "@common/html/Button";
import LikedItems from "@components/myshopping/LikedItems";
import { useState } from "react";
import CategorySelector from "@common/CategorySelector";
import LikedBrands from "@components/myshopping/LikedBrands";

const MyShopping = () => {
  const [activeCompoenet, setActiveComponent] = useState("likedItems");

  const showComponent = () => {
    switch (activeCompoenet) {
      case "likedItems":
        return <LikedItems />;
      case "likedBrands":
        return <LikedBrands />;
      case "recentItems":
        return <RecentItems />;
      default:
        return <LikedItems />;
    }
  };

  return (
    <>
      <Header type="back" />
      <div>
        <div className="flex w-screen justify-between">
          <Button
            className={`h-[40px] grow px-[16px] py-[8px] text-body2 ${activeCompoenet === "likedItems" || activeCompoenet === "likedBrands" ? "border-b-2 border-black font-bold" : "border-b border-[#E5E7EB] font-normal text-grey-600"}`}
            onClick={() => setActiveComponent("likedItems")}
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
        {(activeCompoenet === "likedItems" ||
          activeCompoenet === "likedBrands") && (
          <div className="flex gap-[5px] px-[16px] py-[17px]">
            <CategorySelector.Item
              isClicked={activeCompoenet === "likedItems"}
              onClick={() => setActiveComponent("likedItems")}
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
