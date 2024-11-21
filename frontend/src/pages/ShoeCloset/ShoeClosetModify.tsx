import Header from "@common/Header";
import ShoeRegisterInputForm from "@/components/shoeCloset/register/ShoeRegisterInputForm";
import RatingComponent from "@/components/shoeCloset/register/RatingComponent";
import SubmitBottomButton from "@/components/shoeCloset/register/SubmitBottomButton";
import SelectedShoe from "@/components/shoeCloset/register/SelectedShoe";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addOrUpdateShoesToCloset } from "@/apis/firebase/closetFirestore";
import { auth, db } from "@/firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";

interface ISelectedShoe {
  brand: string;
  createdAt: Timestamp;
  height: string;
  img: string;
  len: string;
  modelName: string;
  modelNo: string;
  rating: number;
  recommendSize: string;
  soft: string;
  text: string;
  updatedAt: Timestamp;
  weight: string;
  width: string;
}

const ShoeClosetModify = () => {
  const { closetId } = useParams<{ closetId: string }>();

  const [selectedShoe, setSelectedShoe] = useState<ISelectedShoe | null>(null);
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

  // firestore에서 closetId에 해당하는 신발 데이터 가져오기
  const fetchShoeData = async () => {
    if (!closetId) {
      console.error("closetId가 없습니다.");
      return;
    }

    const userId = auth.currentUser?.uid!;
    if (!userId) {
      console.error("userId가 없습니다.");
      return;
    }

    const closetDocRef = doc(db, "users", userId, "shoeCloset", closetId);
    const closetDocSnap = await getDoc(closetDocRef);

    if (closetDocSnap.exists()) {
      const shoeReviewData = closetDocSnap.data() as ISelectedShoe;
      console.log("저장된 리뷰", shoeReviewData);
      setSelectedShoe(shoeReviewData);
      setRating(shoeReviewData.rating);
      setReviewData({
        len: shoeReviewData.len,
        width: shoeReviewData.width,
        height: shoeReviewData.height,
        soft: shoeReviewData.soft,
        weight: shoeReviewData.weight,
        recommendSize: shoeReviewData.recommendSize,
        text: shoeReviewData.text,
      });
    } else {
      console.log("문서를 찾을 수 없습니다");
    }
  };

  useEffect(() => {
    if (closetId) {
      fetchShoeData();
    }
  }, [closetId]);

  const handleSubmit = async () => {
    if (!selectedShoe) return;

    const userId = auth.currentUser?.uid!;

    const product = {
      brand: selectedShoe.brand,
      modelName: selectedShoe.modelName,
      img: selectedShoe.img,
      modelNo: selectedShoe.modelNo,
    };
    const review = {
      rating,
      ...reviewData,
    };

    await addOrUpdateShoesToCloset(userId, product, review);

    console.log("신발장 업데이트 : ", { userId, product, review });
    navigate(`/shoecloset/${closetId}`);
  };

  if (!selectedShoe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full flex-col">
      <Header type="back">신발 등록</Header>
      <main className="gap-7 overflow-y-scroll px-2">
        {/* shoe info */}
        <SelectedShoe
          image={selectedShoe.img}
          modelName={selectedShoe.modelName}
          brand={selectedShoe.brand}
          modelNo={selectedShoe.modelNo}
        />
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

export default ShoeClosetModify;
