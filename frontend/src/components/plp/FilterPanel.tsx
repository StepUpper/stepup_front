import { useEffect, useState } from "react";
import { useBottomSheet } from "@store/bottomSheet.store";
import { TProduct } from "@types/plp";
import BottomSheet from "@common/BottomSheet";
import BottomButton from "@common/BottomButton";
import GenderCategorySelector, {
  GenderCategory,
} from "@components/plp/GenderCategorySelector";

interface FilterPanelProps {
  products: TProduct[];
  applyFilters: (gender: GenderCategory) => void;
}

const FilterPanel = (props: FilterPanelProps) => {
  const { products, applyFilters } = props;

  const [selectedGender, setSelectedGender] = useState<GenderCategory>("ALL");
  const [filteredCount, setFilteredCount] = useState(0);

  const { close } = useBottomSheet();

  useEffect(() => {
    if (products) {
      // 임시 성별에 따른 필터링된 상품 개수 계산
      const count = products.filter((product) => {
        if (selectedGender === "ALL") return true;
        return product.gender === selectedGender;
      }).length;
      setFilteredCount(count);
    }
  }, [selectedGender, products]);

  const handleApplyFilters = () => {
    applyFilters(selectedGender); // 임시 상태를 실제 상태로 적용
    close("FilterPanel"); // 바텀시트 닫기
  };
  return (
    <>
      <BottomSheet id="FilterPanel" isDragBar={false}>
        <BottomSheet.Header isTitleOnly={true}>필터</BottomSheet.Header>
        <BottomSheet.Content className="gap-4">
          <GenderCategorySelector
            selectedGender={selectedGender}
            onClick={(value) => setSelectedGender(value)}
          />
          <BottomButton
            title={`${filteredCount}개의 상품보기`}
            onClick={handleApplyFilters}
          ></BottomButton>
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
};
export default FilterPanel;
