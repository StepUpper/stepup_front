import ProductItem from "@common/ProductItem";

const LikedItems = () => {
  const n: number = 5;

  return (
    <>
      <div className="px-[16px]">
        <p className="text-body3 font-bold"> 총 {n} 개</p>
        <div className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-s xl:grid-cols-5 justify-items-center gap-[11px] py-[16px] ">
          {Array(n)
            .fill(null)
            .map((_, index) => (
              <ProductItem
                key={index}
                recSize=""
                thumb=""
                brand=""
                brandImg=""
                title=""
                price=""
                isLiked={true}
              />
            ))}
        </div>
      </div>
    </>
  );
};
export default LikedItems;
