import Header from "@common/Header";
import ShoeRegisterInputForm from "@/components/shoeCloset/register/ShoeRegisterInputForm";
import RatingComponent from "@/components/shoeCloset/register/RatingComponent";
import SearchShoeButton from "@/components/shoeCloset/register/SearchShoeButton";
import SubmitBottomButton from "@/components/shoeCloset/register/SubmitBottomButton";
import SelectedShoe from "@/components/shoeCloset/register/SelectedShoe";
import { useLocation } from "react-router-dom";
import { TShoeSearchResponse } from "@/types/product";

const Review = () => {
  const location = useLocation();
  const selectedShoe = location.state as TShoeSearchResponse | undefined;

  return (
    <div className="flex h-full flex-col">
      <Header type="back">신발 등록</Header>
      <main className="gap-7 overflow-y-scroll px-2">
        {!selectedShoe ? (
          //상품 찾기 버튼
          <SearchShoeButton />
        ) : (
          //선택된 상품 컴포넌트
          <SelectedShoe
            shoeId={`${selectedShoe.brand}-${selectedShoe.modelNo}`}
            image={selectedShoe.image}
            modelName={selectedShoe.modelName}
            brand={selectedShoe.brand}
            modelNo={selectedShoe.modelNo}
            productId={selectedShoe.productId}
            link={selectedShoe.link}
          />
        )}
        {/* rating card */}
        <RatingComponent />
        {/* input form */}
        <ShoeRegisterInputForm />
        {/* 등록하기 버튼 */}
        <SubmitBottomButton />
      </main>
    </div>
  );
};

export default Review;
