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
    const shoeRef = doc(
      db,
      "users",
      userId,
      "likeShoes",
      product.brand + product.modelNo
    );

    const shoeDoc = await getDoc(shoeRef);

    if (!shoeDoc.exists()) {
      await setDoc(shoeRef, {
        brand: product.brand,
        title: product.title,
        imgUrl: product.imgUrl,
        customerLink: product.link,
        thumb: null,
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
