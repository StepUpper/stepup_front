import ProductList from "@common/ProductList";

const RecentItems = () => {
  const n: number = 5;

  return (
    <>
      <div className="px-[16px]">
        <p className="py-[17px] text-body3 font-bold"> 총 {n} 개</p>
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
                isLiked={false}
              />
            ))}
        </ProductList>
      </div>
    </>
  );
};
export default RecentItems;
