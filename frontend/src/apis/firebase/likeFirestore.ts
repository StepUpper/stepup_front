import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";

export const addOrRemoveShoeFromLikes = async (
  userId: string,
  product: {
    brand: string;
    productName: string;
    imgUrl: string;
    modelNo: string;
    customerLink: string;
    customerImg?: string;
    price?: number | null;
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
        productName: product.productName,
        imgUrl: product.imgUrl,
        modelNo: product.modelNo,
        customerLink: product.customerLink,
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
