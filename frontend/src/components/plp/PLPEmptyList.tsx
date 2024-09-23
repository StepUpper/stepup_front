import { shoeSearch } from "@/assets/assets";

const PLPEmptyList = () => {
  return (
    <div className="item-center -mt-20 h-[calc(100vh-347px)] flex-col py-4 pb-6 text-center">
      <img src={shoeSearch} alt="신발 검색 아이콘" />
      <p className="text-body2 font-label">필터링된 상품이 없습니다.</p>
    </div>
  );
};
export default PLPEmptyList;
