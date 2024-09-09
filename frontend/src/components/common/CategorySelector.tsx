import Button from "@components/common/html/Button";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

/**
 * 카테고리별 필터링 버튼
 */
const CategorySelector = ({ children }: { children: ReactNode }) => {
  return <div className="flex gap-1">{children}</div>;
};
export default CategorySelector;

/**
 * 각 카테고리 버튼
 */
interface CategoryItemProps {
  children: ReactNode;
  isClicked: boolean;
  onClick: () => void;
}
const CategoryItem = (props: CategoryItemProps) => {
  const { isClicked = true, children, onClick } = props;
  return (
    <Button
      className={twMerge(
        "gap-1 rounded-full px-3 py-1 text-body2",
        isClicked
          ? "border-none bg-black font-bold text-white"
          : "border-[#e4e4e7] bg-white text-[#6B7280] hover:border-black hover:text-black"
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

CategorySelector.Item = CategoryItem;
