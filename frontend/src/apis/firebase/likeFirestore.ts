import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";

export const addOrRemoveShoeFromLikes = async (
  userId: string,
  product: {
    brand: string;
    title: string;
    imgUrl: string;
    link: string;
    modelNo: string;
    productId: string;
    customerImg?: string;
  }
) => {
  try {
    const shoeRef = doc(db, "users", userId, "likeShoes", product.productId);

    const shoeDoc = await getDoc(shoeRef);

    if (!shoeDoc.exists()) {
      await setDoc(shoeRef, {
        title: product.title,
        imgUrl: product.imgUrl,
        modelNo: product.modelNo,
        brand: product.brand,
        customerLink: product.link,
        customerImg: null,
        price: null,
      });
    } else {
      await deleteDoc(shoeRef);
    }
  } catch (error) {
    console.error("좋아요 상품 추가/제거 중 에러 발생:", error);
  }
};
