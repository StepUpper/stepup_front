import Header from "@/components/common/Header";
import LikedItems from "@/components/myshopping/LikedItems";

const MyShopping = () => {
  const n: number = 5;

  return (
    <>
      <Header type="back" />
      <div>
        <LikedItems />
      </div>
    </>
  );
};
export default MyShopping;
