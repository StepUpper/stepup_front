import Button from "@common/html/Button";
import ProductItem from "@common/ProductItem";

const RecentItems = () => {
  const n: number = 5;

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
