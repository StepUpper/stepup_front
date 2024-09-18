import api from "../apis";

export const chatApi = {
  // 맞춤 상품 추천(유저 데이터 기반한 질문이기에 로그인했을 때 1회만 보여짐)
  getCustomizedProduct: () => api.get(`/shoes/recommend`),

  // 키워드 리스트(처음에 회원가입 했을 때 관심키워드 선택하는 곳에서 호출)
  getKeywordList: () => api.get(`/keywords`),

  // 질문 추천(유저 데이터 기반한 질문이기에 로그인한 사용자만 호출)
  getRecommendedQuestion: () => api.get(`/question/recommend`),

  // 브랜드 정보(아직 crocs 밖에 없는 듯 함)
  getBrandInfo: () => api.get(`/brands/:brand`),

  // 채팅 응답
  postChatResponse: (data: {
    message: {
      content: string;
    };
  }) => api.post(`/chat/completions`, data),

  // 회원가입하고 로그인 했을 때 키워드 선택했을 때의 응답
  // 뭘 선택하든 같은 응답만 옴.
  postKeywordResponse: (data: { keyword: string[] }) =>
    api.post(`/chat/completions/keywords`, data),

  // 신발 텍스트 검색
  postShoeTextSearch: (data: { text: string }) => api.post(`/shoes/find`, data),

  // 신발 이미지 검색
  postShoeImageSearch: (data: { imageUri: string }) =>
    api.post(`/shoes/find-by-image`, data),
};
