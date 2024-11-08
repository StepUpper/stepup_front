import { TShoeSearchResponse } from "@/types/product";
import { create } from "zustand";

interface SelectedShoeState {
  selectedShoe: TShoeSearchResponse | null;
  setSelectedShoe: (shoe: TShoeSearchResponse | null) => void;
  resetSelectedShoe: () => void;
  hasShoeDraft: () => boolean;
}

export const useSelectedShoeStore = create<SelectedShoeState>((set, get) => ({
  selectedShoe: null,
  setSelectedShoe: (shoe) => set({ selectedShoe: shoe }),
  resetSelectedShoe: () => set({ selectedShoe: null }),
  hasShoeDraft: () => {
    const { selectedShoe } = get();
    return selectedShoe !== null;
  },
}));
