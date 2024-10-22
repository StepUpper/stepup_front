import {
  addDoc,
  query,
  where,
  getDocs,
  collection,
  serverTimestamp,
  setDoc,
  doc,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/firebase";

// addOrUpdateShoesToCloset 함수는 신발을 등록하거나 업데이트 할 때 사용되는 함수이다.
// 신발 등록시에 Firestore에서 자동으로 생성된 ID로 저장한다. -> closetId
// brand와 modelNo를 비교하여, 동일한 값을 갖고 있는 문서가 있을 경우 해당 문서가 업데이트 된다.
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
    const closetRef = collection(db, "users", userId, "shoeCloset");

    // 해당 brand와 modelNo가 존재하는지 확인하는 쿼리
    const q = query(
      closetRef,
      where("brand", "==", product.brand),
      where("modelNo", "==", product.modelNo)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // 동일한 brand와 modelNo가 존재하는 경우, 해당 문서를 업데이트 (merge)
      const closetRef = querySnapshot.docs[0].ref; // 첫 번째 매칭 문서 참조

      await setDoc(
        closetRef,
        {
          // product 정보 업데이트
          brand: product.brand,
          modelName: product.modelName,
          img: product.img,
          modelNo: product.modelNo,
          // review 정보 업데이트
          rating: review.rating,
          len: review.len,
          width: review.width,
          height: review.height,
          soft: review.soft,
          weight: review.weight,
          recommendSize: review.recommendSize,
          text: review.text,
          // 도큐먼트 업데이트 시간(서버 타임스탬프)
          updatedAt: serverTimestamp(), // 문서 sort 할때 수정일시로 비교하면 수정되는대로 최신순으로 동륵됨
        },
        { merge: true }
      );
    } else {
      // addDoc으로 자동 생성된 ID로 도큐먼트 추가
      await addDoc(closetRef, {
        // product 정보
        brand: product.brand,
        modelName: product.modelName,
        img: product.img,
        modelNo: product.modelNo,
        // review 정보
        rating: review.rating,
        len: review.len,
        width: review.width,
        height: review.height,
        soft: review.soft,
        weight: review.weight,
        recommendSize: review.recommendSize,
        text: review.text,
        // 도큐먼트 업데이트 시간(서버 타임스탬프)
        createdAt: serverTimestamp(), // 최초 작성일시
        updatedAt: serverTimestamp(), // 최근 수정일시
      });
    }
  } catch (error) {
    console.error("신발장에 신발 업데이트 중 에러 발생:", error);
  }
};

export const deleteShoesFromCloset = async(userId: string, closetId: string,) => {
  const closetRef  = doc(db, "users", userId, "shoeCloset", closetId);
  const batch  = writeBatch(db);

  try {
    batch.delete(closetRef);

    await batch.commit();
    console.log(`신발장 ${closetId} 삭제 완료`);
  } catch (error) {
    console.error("신발장 삭제 실패 : ", error);
  }
};
