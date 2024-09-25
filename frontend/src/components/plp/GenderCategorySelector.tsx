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
    <div className="w-full px-4">
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
