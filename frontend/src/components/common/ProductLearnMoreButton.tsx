import { aiIconImg } from "@/assets/assets";
import Button from "@common/html/Button";

const ProductLearnMoreButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Button className="item-center w-full gap-[0.375rem] rounded-md border border-[#E4E4E7] px-[0.625rem] py-2">
      <img src={aiIconImg} alt="이 신발 더 알아보기 아이콘" />
      <span className="text-sm font-label">이 신발 더 알아보기</span>
    </Button>
  );
};
export default ProductLearnMoreButton;
