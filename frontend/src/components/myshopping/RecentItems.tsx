import ProductItem from "@common/ProductItem";

const RecentItems = () => {
  const n: number = 5;

  return (
    <>
      <div className="px-[16px]">
        <p className="py-[17px] text-body3 font-bold"> 총 {n} 개</p>
        <div className="mx-auto grid grid-cols-2 justify-items-center gap-[11px] py-[16px]">
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
export default RecentItems;
