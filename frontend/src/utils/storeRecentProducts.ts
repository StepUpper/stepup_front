export const RECENT_PRODUCTS_KEY = "recentProducts";

export type TRecentProductItem = {
  shoeId: string;
  title: string;
  imgUrl: string;
  modelNo: string;
  brand: string;
  customerLink: string;
  customerImg?: string | null;
  price?: number | null;
};

// 최근 본 상품을 로컬 스토리지에 저장
export const addRecentProduct = (newProduct: TRecentProductItem) => {
  if (!newProduct) return;

  const storedProducts = localStorage.getItem(RECENT_PRODUCTS_KEY);
  const products: TRecentProductItem[] = storedProducts
    ? JSON.parse(storedProducts)
    : [];

  // 중복 제거 및 새로운 아이템 추가
  const updatedProducts = [
    newProduct,
    ...products.filter((product) => product.shoeId !== newProduct.shoeId),
  ];

  localStorage.setItem(RECENT_PRODUCTS_KEY, JSON.stringify(updatedProducts));
};

// 최근 본 상품을 로컬 스토리지에서 불러오기
export const getRecentProducts = (): TRecentProductItem[] => {
  const storedProducts = localStorage.getItem(RECENT_PRODUCTS_KEY);
  return storedProducts ? JSON.parse(storedProducts) : [];
};
