import { create } from "zustand";

interface ReviewData {
  rating: number;
  reviewData: {
    len: string;
    width: string;
    height: string;
    soft: string;
    weight: string;
    recommendSize: string;
    text: string;
  };

  setRating: (rating: number) => void;
  setReviewData: (reviewData: Partial<ReviewData["reviewData"]>) => void;
  resetReviewData: () => void;
  hasReviewDraft: () => boolean;
}

const initialReviewData = {
  len: "",
  width: "",
  height: "",
  soft: "",
  weight: "",
  recommendSize: "정사이즈",
  text: "",
};

export const useReviewStore = create<ReviewData>((set, get) => ({
  rating: 0,
  reviewData: { ...initialReviewData },

  setRating: (rating) => set(() => ({ rating })),
  setReviewData: (newData) =>
    set((state) => ({ reviewData: { ...state.reviewData, ...newData } })),

  resetReviewData: () =>
    set(() => ({
      rating: 0,
      reviewData: { ...initialReviewData },
    })),

  hasReviewDraft: () => {
    const { rating, reviewData } = get();
    const isRatingChanged = rating !== 0;
    const isReviewChanged =
      JSON.stringify(reviewData) !== JSON.stringify(initialReviewData);
    return isRatingChanged || isReviewChanged;
  },
}));
