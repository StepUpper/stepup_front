import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

// addOrUpdateShoesToCloset 함수는 신발을 등록하거나 업데이트 할 때 사용되는 함수이다.
// Firestore의 "merge" 옵션을 사용해 문서가 없을 때는 추가, 있을 때는 업데이트 가능
// 3개의 인자를 받는데 첫번째는 userId, 두번째는 상품에 대한 정보가 담긴 product,
// 세번째는 작성한 리뷰에 대한 정보가 담긴 review
export const addOrUpdateShoesToCloset = async (
  userId: string,
  product: {
    brand: string;
    modelName: string;
    img: string;
    modelNo: string;
  },
  review: {
    rating: number;
    len: string;
    width: string;
    height: string;
    soft: string;
    weight: string;
    recommendSize: string;
    text: string;
  }
) => {
  try {
    const closetRef = doc(
      db,
      "users",
      userId,
      "shoeCloset",
      product.brand + product.modelNo
    );

    await setDoc(
      closetRef,
      {
        // product 객체로부터
        brand: product.brand,
        modelName: product.modelName,
        img: product.img,
        // review 객체로부터
        rating: review.rating,
        len: review.len,
        width: review.width,
        height: review.height,
        soft: review.soft,
        weight: review.weight,
        recommendSize: review.recommendSize,
        text: review.text,
      },
      { merge: true }
    );
  } catch (error) {
    console.error("신발장에 신발 등록 중 에러 발생:", error);
  }
};

// auth.ts의 getUserData 함수에서 shoeCloset을 Firestore로부터 가지고 올 때 shoeId라는 프로퍼티를 추가해주는데
// 이는 zustand로 관리하는 shoeCloset 상태에 담기게 됩니다.
// shoeId를 사용하여 삭제하는 함수를 구현해주시면 될 듯 합니다.
