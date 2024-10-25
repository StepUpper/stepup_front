import { create } from "zustand";

interface ReviewData {
  rating: number,
  reviewData : {
    len: string,
    width: string,
    height: string,
    soft: string,
    weight: string,
    recommendSize: string,
    text: string,
  };

  setRating: (rating: number) => void;
  setReviewData: (reviewData: Partial<ReviewData["reviewData"]>) => void;
  resetReviewData: () => void;
}

export const useReviewStore = create<ReviewData>((set) => ({
  rating: 0,
  reviewData : {
    len: "",
    width: "",
    height: "",
    soft: "",
    weight: "",
    recommendSize: "정사이즈",
    text: "",
  },

  setRating: (rating) => set(() => ({rating})),
  setReviewData: (newData) => set((state) => ({reviewData: { ...state.reviewData, ...newData}})),
  resetReviewData: () => 
    set(()=> ({
      rating: 0,
      reviewData : {
        len: "",
        width: "",
        height: "",
        soft: "",
        weight: "",
        recommendSize: "정사이즈",
        text: "",
      },
  })),
}))