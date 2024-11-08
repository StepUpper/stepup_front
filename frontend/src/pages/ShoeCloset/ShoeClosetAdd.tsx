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
import { useSelectedShoeStore } from "@/store/selectedShoe.store";
import { useEffect, useState } from "react";
import ShoeClosetSaveDraftModal from "@/components/shoeCloset/ShoeClosetSaveDraftModal";

const ShoeClosetAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const {
    rating,
    reviewData,
    setRating,
    setReviewData,
    resetReviewData,
    hasReviewDraft,
  } = useReviewStore();
  const { selectedShoe, setSelectedShoe, resetSelectedShoe, hasShoeDraft } =
    useSelectedShoeStore();

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
    resetSelectedShoe();

    navigate("/shoecloset", { replace: true });
  };

  const handleBackClick = () => {
    if (hasReviewDraft() || hasShoeDraft()) {
      setIsModalOpen(true);
    } else {
      navigate("/shoecloset", { replace: true });
    }
  };

  useEffect(() => {
    const locationShoe = location.state as TShoeSearchResponse | undefined; //선택된 신발
    if (locationShoe) setSelectedShoe(locationShoe);
  }, [location.state, setSelectedShoe]);

  return (
    <div className="flex h-full flex-col">
      <Header type="back" onBackClick={handleBackClick}>
        신발 등록
      </Header>
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

        {/* 임시저장 모달 */}
        {isModalOpen && (
          <ShoeClosetSaveDraftModal onClose={() => setIsModalOpen(false)} />
        )}
      </main>
    </div>
  );
};

export default ShoeClosetAdd;
