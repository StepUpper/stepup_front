import ProductList from "@common/ProductList";

const LikedItems = () => {
  const n: number = 5;

  return (
    <>
      <div className="px-[16px]">
        <p className="text-body3 font-bold"> 총 {n} 개</p>
        <ProductList>
          {Array(n)
            .fill(null)
            .map((_, index) => (
              <ProductList.Item
                key={index}
                recSize=""
                thumb=""
                brandName=""
                productName=""
                customerImg=""
                customerLink=""
                isLiked={true}
              />
            ))}
        </ProductList>
        <div className="mx-auto grid grid-cols-2 justify-items-center gap-[11px] py-[16px]"></div>
      </div>
    </>
  );
};
export default LikedItems;
