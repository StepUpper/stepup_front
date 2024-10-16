import Header from "@common/Header";
import ShoeRegisterInputForm from "@/components/shoeCloset/register/ShoeRegisterInputForm";
import RatingComponent from "@/components/shoeCloset/register/RatingComponent";
import SearchShoeButton from "@/components/shoeCloset/register/SearchShoeButton";
import SubmitBottomButton from "@/components/shoeCloset/register/SubmitBottomButton";
import SelectedShoe from "@/components/shoeCloset/register/SelectedShoe";
import { useLocation, useNavigate } from "react-router-dom";
import { TShoeSearchResponse } from "@/types/product";
import { useState } from "react";
import userStore from "@/store/auth.store";
import { addOrUpdateShoesToCloset } from "@/apis/firebase/closetFirestore";
import { auth } from "@/firebase";

const Review = () => {
  const { user } = userStore();
  const location = useLocation();
  const selectedShoe = location.state as TShoeSearchResponse | undefined; //선택된 신발
  const [rating, setRating] = useState(0);
  const [reviewData, setReviewData] = useState({
    len: "",
    width: "",
    height: "",
    soft: "",
    weight: "",
    recommendSize: "2",
    text: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!selectedShoe) return;

    const userId = auth.currentUser?.uid!;

    const product = {
      brand: selectedShoe.brand,
      modelName: selectedShoe.modelName,
      img: selectedShoe.image,
      modelNo: selectedShoe.modelNo,
    };
    const review = {
      rating,
      ...reviewData,
    };

    await addOrUpdateShoesToCloset(userId, product, review);

    console.log("userId: ", userId);
    console.log("product: ", product);
    console.log("review: ", review);
    //navigate("/archive");
  };

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
        <RatingComponent rating={rating} setRating={setRating} />
        {/* input form */}
        <ShoeRegisterInputForm
          reviewData={reviewData}
          setReviewData={setReviewData}
        />
        {/* 등록하기 버튼 */}
        <SubmitBottomButton onSubmit={handleSubmit} />
      </main>
    </div>
  );
};

export default Review;
