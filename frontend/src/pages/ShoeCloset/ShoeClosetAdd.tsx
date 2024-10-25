import Header from "@common/Header";
import ShoeRegisterInputForm from "@/components/shoeCloset/register/ShoeRegisterInputForm";
import RatingComponent from "@/components/shoeCloset/register/RatingComponent";
import SearchShoeButton from "@/components/shoeCloset/register/SearchShoeButton";
import SubmitBottomButton from "@/components/shoeCloset/register/SubmitBottomButton";
import SelectedShoe from "@/components/shoeCloset/register/SelectedShoe";
import { useLocation, useNavigate } from "react-router-dom";
import { TShoeSearchResponse } from "@/types/product";
import { addOrUpdateShoesToCloset } from "@/apis/firebase/closetFirestore";
import { auth } from "@/firebase";
import { useReviewStore } from "@/store/review.store";

const ShoeClosetAdd = () => {
  const location = useLocation();
  const selectedShoe = location.state as TShoeSearchResponse | undefined; //선택된 신발
  
  const {rating, reviewData, setRating, setReviewData, resetReviewData } = useReviewStore();

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

    resetReviewData();

    navigate("/shoecloset");
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

export default ShoeClosetAdd;
