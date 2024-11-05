import { Timestamp } from "firebase/firestore";
import { TUser } from "./auth";

// 신발장 신발
export type TShoeCloset = {
  closetId: string;
  brand: string;
  height: string;
  img: string;
  len: string;
  modelName: string;
  rating: number;
  recommendSize: string;
  soft: string;
  text: string;
  weight: string;
  width: string;
  updatedAt: Timestamp;
};

// 신발장 공유하기 사용자
export type TShareUser = Pick<TUser, "username" | "sneakerSize" | "sizeType">;
// 신발장 공유하기
export type TShareShoeCloset = TShareUser & TShoeCloset;
