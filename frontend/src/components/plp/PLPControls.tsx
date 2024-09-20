import { filterIcon, selectArrowIcon } from "@assets/assets";
import { useBottomSheet } from "@/store/bottomSheet.store";

interface PLPControlsProps {
  totalItems: number;
}
const PLPControls = (props: PLPControlsProps) => {
  const { totalItems } = props;

  const { open } = useBottomSheet();

  return (
    <>
      <div className="flex items-center justify-between px-4 py-[0.63rem]">
        {/* 상품 갯수 */}
        <span className="text-body3">
          <strong className="font-label">{totalItems}</strong>개 상품
        </span>
        <div className="flex gap-[0.32rem]">
          {/* 정렬 */}
          <div className="relative inline-block">
            <select
              name="languages"
              id="lang"
              className="cursor-pointer appearance-none pr-3 text-body3 font-medium text-grey-400"
            >
              <option value="latest">최신상품순</option>
              <option value="oldest">오래된순</option>
            </select>
            {/* 화살표 아이콘 커스텀 */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
              <img src={selectArrowIcon} alt="정렬 옵션 선택" />
            </div>
          </div>
          {/* 필터 */}
          <div
            className="item-center cursor-pointer"
            onClick={() => open("FilterPanel")}
          >
            <img src={filterIcon} alt="필터 옵션 선택" />
          </div>
        </div>
      </div>
    </>
  );
};
export default PLPControls;
