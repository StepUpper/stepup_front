import { GENDER_CATEGORIES } from "@constants/categories";
import CategorySelector from "@common/CategorySelector";

export type GenderCategory = (typeof GENDER_CATEGORIES)[number]["value"];

interface GenderCategorySelectorProps {
  selectedGender: GenderCategory;
  onClick: (value: GenderCategory) => void;
}

const GenderCategorySelector = (props: GenderCategorySelectorProps) => {
  const { selectedGender, onClick } = props;
  return (
    <div className="flex flex-col gap-[0.625rem]">
      <label className="pb-1 text-[15px] font-label">성별</label>
      <CategorySelector>
        {GENDER_CATEGORIES.map((category) => (
          <CategorySelector.Item
            key={category.value}
            isClicked={category.value === selectedGender}
            onClick={() => onClick(category.value)}
          >
            {category.label}
          </CategorySelector.Item>
        ))}
      </CategorySelector>
    </div>
  );
};
export default GenderCategorySelector;
