import api from "../apis";

export const shoeSearchApi = {
  // 신발 텍스트 검색
  postShoeTextSearch: (data: { text: string }) => api.post(`/shoes/find`, data),

  // 신발 이미지 검색
  postShoeImageSearch: (data: { imageUrl: string }) =>
    api.post(`/shoes/find-by-image`, data),
};
