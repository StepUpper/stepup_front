import Button from "@common/html/Button";
import LikeButton from "@common/LikeButton";
import userStore from "@store/auth.store";
import { shoeHeart } from "@/assets/assets";
import { addOrRemoveShoeFromLikes } from "@/apis/firebase/likeFirestore";

type LikedBrandsProps = {
  brandLogoImg?: string;
};

const LikedBrands = (props: LikedBrandsProps) => {
  const { brandLogoImg } = props;

  const { user, likeShoes, updateUserInfo } = userStore((state) => ({
    user: state.user,
    likeShoes: state.likeShoes,
    updateUserInfo: state.updateUserInfo,
  }));

  const handleLikeClick = async (shoe: any[]) => {
    try {
      if (!user || !user.uid) {
        throw new Error("사용자 정보가 없습니다. 로그인이 필요합니다.");
      }

      await addOrRemoveShoeFromLikes(user.uid, {
        brand,
        title,
        imgUrl,
        link,
        modelNo,
        productId,
      });

      updateUserInfo(); // 좋아요 정보 업데이트
    } catch (error) {
      console.error("좋아요 처리 중 오류:", error);
    }
  };

  return (
    <>
      <div className="px-[16px]">
        <p className="text-body3 font-bold"> 총 {likeShoes?.length} 개</p>
        {likeShoes && likeShoes.length > 0 ? (
          <div className="justify-items-center gap-[10px] py-[16px]">
            {likeShoes.map((shoe, index) => (
              <Button
                className="mb-[10px] flex w-full items-center justify-between gap-[20px] pl-[4px]"
                key={index}
              >
                {/* 브랜드 로고 이미지 */}
                <div className="size-[75px] rounded-full bg-grey-50">
                  <img src={brandLogoImg} />
                </div>
                {/* 브랜드명 */}
                <div className="flex grow flex-col items-start gap-[6px]">
                  <span className="grow text-body2 font-semibold">
                    {shoe.brand}
                  </span>
                  {/* 아직 한글명 없음 이슈.... */}
                  <span className="grow text-body2 font-normal text-grey-400">
                    {shoe.brand}
                  </span>
                </div>
                <LikeButton
                  isLiked={true}
                  className="w-[15px]"
                  onClick={() => handleLikeClick}
                />
              </Button>
            ))}
          </div>
        ) : (
          <div className="item-center left-1/2 h-[50vh] flex-col gap-4">
            <img src={shoeHeart} />
            <p className="font-semibold"> 좋아요한 상품이 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default LikedBrands;
