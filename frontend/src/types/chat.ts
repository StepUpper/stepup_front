// 메세지 응답형태는 3가지가 있음
// 1) message만 오거나
// 2) message와 brand(이 경우는 브랜드를 추천하는 응답)
// 3) message와 products(이 경우는 상품을 추천하는 응답)
export type TChatResponse = {
  message: string;
  brands?: {
    brand: string;
    description: string;
    link: string;
    thumbnail: string;
  }[];
  products?: {
    image: string;
    link: string;
    modelName: string;
    brand: string;
    modelNo: string;
    productId: string;
  }[];
};
