import ProductList from "@common/ProductList";
import { shoeHeart } from "@assets/assets";
import userStore from "@store/auth.store";

const LikedItems = () => {
  const { likeShoes } = userStore((state) => ({
    likeShoes: state.likeShoes,
  }));

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
