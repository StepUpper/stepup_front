export const RECENT_PRODUCTS_KEY = "recentProducts";

export type TRecentProduct = {
  brandName: string;
  productName: string;
  customerImg?: string;
  customerLink: string;
};

// 최근 본 상품을 로컬 스토리지에 저장
export const addRecentProduct = (newProduct: TRecentProduct) => {
  const storedProducts = localStorage.getItem(RECENT_PRODUCTS_KEY);
  const products = storedProducts ? JSON.parse(storedProducts) : [];

  // 중복 제거 및 새로운 아이템 추가
  const updatedProducts = [
    newProduct,
    ...products.filter(
      (product: TRecentProduct) =>
        product.productName !== newProduct.productName
    ),
  ];

  localStorage.setItem(RECENT_PRODUCTS_KEY, JSON.stringify(updatedProducts));
};

// 최근 본 상품을 로컬 스토리지에서 불러오기
export const getRecentProducts = (): TRecentProduct[] => {
  const storedProducts = localStorage.getItem(RECENT_PRODUCTS_KEY);
  return storedProducts ? JSON.parse(storedProducts) : [];
};
