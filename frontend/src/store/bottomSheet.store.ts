import { create } from "zustand";

type BottomSheetState = {
  sheets: {
    [key: string]: {
      isOpen: boolean;
      isMinimized: boolean;
    };
  };
  open: (id: string) => void;
  close: (id: string) => void;
  minimize: (id: string) => void;
  maximize: (id: string) => void;
  closeAll: () => void;
};

export const useBottomSheet = create<BottomSheetState>((set) => ({
  sheets: {}, // 바텀 시트 상태 저장 isOpen, isMinimized

  open: (id) =>
    set((state) => ({
      ...state, // 기존 상태를 유지
      sheets: {
        ...state.sheets, // 기존 시트 상태 유지
        [id]: { isOpen: true, isMinimized: false }, // 열기
      },
    })),

  close: (id) =>
    set((state) => ({
      ...state,
      sheets: {
        ...state.sheets,
        [id]: { isOpen: false, isMinimized: false }, // 닫기
      },
    })),

  minimize: (id) =>
    set((state) => ({
      ...state,
      sheets: {
        ...state.sheets,
        [id]: { ...state.sheets[id], isMinimized: true }, // 최소화 상태로 변경
      },
    })),

  maximize: (id) =>
    set((state) => ({
      ...state,
      sheets: {
        ...state.sheets,
        [id]: { ...state.sheets[id], isMinimized: false }, // 최대화 상태로 변경
      },
    })),

  closeAll: () =>
    set((state) => {
      const updatedSheets = Object.keys(state.sheets).reduce(
        (acc, key) => {
          acc[key] = {
            ...state.sheets[key],
            isOpen: false, // 모든 시트의 isOpen을 false로 설정
          };
          return acc;
        },
        {} as BottomSheetState["sheets"]
      );

      return { sheets: updatedSheets };
    }),
}));
