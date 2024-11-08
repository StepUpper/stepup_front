import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import { storage } from "@/firebase";

// 이미지 업로드
export const uploadImage = async (file: File | string, fileName: string) => {
  try {
    const storageRef = ref(storage, `images/shoe/${fileName}`);
    // 업로드
    if (typeof file === "string") {
      // Base64 문자열 처리 (촬영 이미지)
      await uploadString(storageRef, file, "data_url");
    } else {
      // File 객체 처리 (갤러리)
      await uploadBytes(storageRef, file);
    }

    const downloadURL = await getDownloadURL(storageRef); // url 가져오기
    return downloadURL;
  } catch (error) {
    console.error("스토리지에 이미지 업로드 오류:", error);
    throw error;
  }
};
