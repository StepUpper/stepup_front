export const RECENT_SEARCHES_KEY = "recentSearches";

export type TRecentSearches = string[];

//최근 검색어 저장
export const addRecentSearches = (text: string) => {
  const savedKeywords = localStorage.getItem(RECENT_SEARCHES_KEY);
  let keywords: TRecentSearches = savedKeywords
    ? JSON.parse(savedKeywords)
    : [];

  //기존 검색어 확인 후 중복 제거
  keywords = keywords.filter((keyword) => keyword !== text);

  keywords.unshift(text);
  if (keywords.length > 10) keywords.pop();

  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(keywords));
};

//최근 검색어 불러오기
export const getRecentSearches = (): TRecentSearches => {
  const savedKeywords = localStorage.getItem(RECENT_SEARCHES_KEY);
  return savedKeywords ? JSON.parse(savedKeywords) : [];
};

//전체 삭제
export const clearRecentSearches = () => {
  localStorage.removeItem(RECENT_SEARCHES_KEY);
};

//특정 검색어 삭제
export const deleteRecentSearch = (keyword: string) => {
  const savedKeywords = localStorage.getItem(RECENT_SEARCHES_KEY);
  if (savedKeywords) {
    let updatekeywords: TRecentSearches = JSON.parse(savedKeywords);

    updatekeywords = updatekeywords.filter((item) => item !== keyword);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatekeywords));
  }
};
