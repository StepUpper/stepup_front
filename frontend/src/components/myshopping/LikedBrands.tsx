import Button from "@common/html/Button";
import LikeButton from "@common/LikeButton";

type LikedBrandsProps = {
  brandLogoImg?: string;
};
const LikedBrands = (props: LikedBrandsProps) => {
  const { brandLogoImg } = props;
  const n: number = 3;

  return (
    <>
      <div className="px-[16px]">
        <p className="text-body3 font-bold"> 총 {n} 개</p>
        <div className="justify-items-center gap-[10px] py-[16px]">
          {Array(n)
            .fill(null)
            .map(() => (
              <Button className="mb-[10px] flex w-full items-center justify-between gap-[20px] pl-[4px]">
                {/* 브랜드 로고 이미지 */}
                <div className="size-[75px] rounded-full bg-grey-50">
                  <img src={brandLogoImg} />
                </div>
                {/* 브랜드명 */}
                <div className="flex grow flex-col items-start gap-[6px]">
                  <span className="grow text-body2 font-semibold">NIKE</span>
                  <span className="grow text-body2 font-normal text-grey-400">
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
