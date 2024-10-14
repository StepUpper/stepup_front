// 상품 타입
export type TProduct = {
  shoeId: string;
  productName: string;
  imgUrl: string;
  modelNo: string;
  brand: string;
  customerLink: string;
  customerImg?: string;
  price?: number | null;
};

// API 응답 - 상품 타입
export type TProductResponse = {
  brand: string;
  gender?: string;
  image: string;
  link: string;
  modelName: string;
  modelNo: string;
};

// API 응답 - 브랜드 PLP 타입
export type TBrandPLPResponse = {
  brand: string;
  brandHeaderImage: string;
  description: string;
  link: string;
  products: TProductResponse[];
};

//API 응답 - 텍스트 검색 타입
export type TShoeSearchResponse = {
  shoeId: string;
  image: string;
  link: string;
  modelName: string;
  brand: string;
  modelNo: string;
  productId: string;
};
