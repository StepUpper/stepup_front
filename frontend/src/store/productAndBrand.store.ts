import { TChatResponse } from "@/types/chat";
import { create } from "zustand";

interface productAndBrandState {
  clickedProducts: TChatResponse | null;
  clickedBrand: string | null;
  setClickedProducts: (product: TChatResponse | null) => void;
  setClickedBrand: (brand: string | null) => void;
}

const productAndBrandStore = create<productAndBrandState>((set) => ({
  clickedProducts: null,
  clickedBrand: null,

  setClickedProducts: (products) => set({ clickedProducts: products }),
  setClickedBrand: (brand) => set({ clickedBrand: brand }),
}));

export default productAndBrandStore;
