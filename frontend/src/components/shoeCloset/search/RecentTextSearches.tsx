import { closeIcon, searchIcon } from "@/assets/assets";
import Button from "@/components/common/html/Button";

interface RecentTextSearchesProps {
  recentSearches: string[];
  onClearAll: () => void;
  onDeleteKeyword: (keyword: string) => void;
  onSearch: (keyword: string) => void;
}

const RecentTextSearches = ({
  recentSearches,
  onClearAll,
  onDeleteKeyword,
  onSearch,
}: RecentTextSearchesProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-base">최근 검색어</p>
        <Button
          className="text-sm text-gray-400 underline"
          onClick={onClearAll}
        >
          전체삭제
        </Button>
      </div>
      {recentSearches && recentSearches.length > 0 ? (
        <ul className="px-1 py-3">
          {recentSearches?.map((keyword, index) => (
            <li key={index} className="flex items-center gap-3 py-2">
              <div className="flex size-[26px] justify-center rounded-full bg-gray-200">
                <img src={searchIcon} className="w-3 object-contain" />
              </div>
              <p className="grow" onClick={() => onSearch(keyword)}>
                {keyword}
              </p>
              <img
                src={closeIcon}
                className="size-4 opacity-80"
                onClick={() => onDeleteKeyword(keyword)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>최근 검색어가 없습니다</p>
      )}
    </div>
  );
};
export default RecentTextSearches;
