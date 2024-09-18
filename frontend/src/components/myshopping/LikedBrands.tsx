import Button from "@common/html/Button";
import CategorySelector from "@common/CategorySelector";
import LikeButton from "@common/LikeButton";

const mocEx = () => {
  return 1 + 1;
};

type LikedBrandsProps = {
  brandLogoImg: string;
};
const LikedBrands = (props: LikedBrandsProps) => {
  const { brandLogoImg } = props;
  const n: number = 3;

  return (
    <>
      <div className="flex w-screen justify-between">
        <Button className="h-[40px] grow border-b-2 border-black px-[16px] py-[8px] text-body2 font-bold">
          좋아요
        </Button>
        <Button className="h-[40px] grow border-b border-[#E5E7EB] px-[16px] py-[8px] text-body2 font-normal text-grey-600">
          최근 본
        </Button>
      </div>
      <div className="flex gap-[5px] px-[16px] py-[17px]">
        <CategorySelector.Item isClicked={false} onClick={() => mocEx()}>
          상품
        </CategorySelector.Item>
        <CategorySelector.Item isClicked={true} onClick={() => mocEx()}>
          브랜드
        </CategorySelector.Item>
      </div>
      <div className="px-[16px]">
        <p className="text-body3 font-bold"> 총 {n} 개</p>
        <div className="justify-items-center gap-[10px] py-[16px]">
          {Array(n)
            .fill(null)
            .map(() => (
              <Button className="mb-[10px] flex w-full items-center justify-between gap-[20px] pl-[4px]">
                {/* 브랜드 로고 이미지 */}
                <div className="h-[75px] w-[75px] rounded-full bg-grey-50">
                  <img src={brandLogoImg} />
                </div>
                {/* 브랜드명 */}
                <div className="flex flex-grow flex-col items-start gap-[6px]">
                  <span className="flex-grow text-body2 font-semibold">
                    NIKE
                  </span>
                  <span className="flex-grow text-body2 font-normal text-[#808080]">
                    나이키
                  </span>
                </div>
                <LikeButton isLiked={true} className="w-[15px]" />
              </Button>
            ))}
        </div>
      </div>
    </>
  );
};
export default LikedBrands;
