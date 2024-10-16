import Header from "@/components/common/Header";
import ShoeClosetOptionMenu from "@/components/shoeCloset/details/ShoeClosetOptionMenu";
import { useState } from "react";
import ShoeClosetThumb from "@/components/shoeCloset/details/ShoeClosetThumb";
import ShoeClosetMainInfo from "@/components/shoeCloset/details/ShoeClosetMainInfo";
import ShoeClosetDetailInfo from "@/components/shoeCloset/details/ShoeClosetDetailInfo";

const detail = {
  brand: "NIKE",
  height: "타이트해요",
  img: "https://image.a-rt.com/art/product/2022/01/60008_1642143249212.jpg?shrink=580:580",
  len: "짧아요",
  modelName: "W NIKE COURT VISION ALTA LTR",
  rating: 4,
  recommendSize: "정사이즈",
  soft: "적당해요",
  text: "장단점123",
  weight: "무거워요",
  width: "잘 맞아요",
};

const ShoeClosetOverview = () => {
  const [isOptionMenuOpen, setIsOptionMenuOpen] = useState(false);

  const handleOptionClick = () => {
    setIsOptionMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex h-full flex-col">
      <Header type="back" optionButton={true} onOptionClick={handleOptionClick}>
        신발 상세
      </Header>

      <main className="p-4">
        <ShoeClosetThumb img={detail.img} modelName={detail.modelName} />
        <ShoeClosetMainInfo
          rating={detail.rating}
          brand={detail.brand}
          modelName={detail.modelName}
        />
        <ShoeClosetDetailInfo
          len={detail.len}
          width={detail.width}
          height={detail.height}
          soft={detail.soft}
          weight={detail.weight}
          recommendSize={detail.recommendSize}
          text={detail.text}
        />
      </main>
      {isOptionMenuOpen && <ShoeClosetOptionMenu onClose={handleOptionClick} />}
    </div>
  );
};
export default ShoeClosetOverview;
