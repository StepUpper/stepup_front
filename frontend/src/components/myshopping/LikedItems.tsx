import ProductList from "@common/ProductList";
import userStore from "@store/auth.store";
import { shoeHeart } from "@assets/assets";
import { addOrRemoveShoeFromLikes } from "@/apis/firebase/likeFirestore";

interface ProductItemProps {
  brand: string;
  title: string;
  imgUrl: string;
  link: string;
  modelNo: string;
  productId: string;
  isLiked: boolean | undefined;
}

const LikedItems = (props: ProductItemProps) => {
  const { brand, title, imgUrl, link, modelNo, productId, isLiked } = props;

  const { user, likeShoes, updateUserInfo } = userStore((state) => ({
    user: state.user,
    likeShoes: state.likeShoes,
    updateUserInfo: state.updateUserInfo,
  }));

  const handleLikeClick = async () => {
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
          <div className="justify-items-center gap-[11px] py-[16px]">
            <ProductList>
              {likeShoes.map((shoe, index) => (
                <ProductList.Item
                  key={index}
                  recSize=""
                  thumb={shoe.imgUrl}
                  brandName={shoe.brand}
                  productName={shoe.title}
                  customerImg=""
                  customerLink={shoe.link}
                  isLiked={shoe.isLiked}
                  onClick={() => handleLikeClick()}
                />
              ))}
            </ProductList>
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
export default LikedItems;
