import { IProduct } from "@/pages/ShoeCloset/ShoeCloset";
import Img from "@common/html/Img";
import { shoeImg } from "@/assets/assets";

interface ShoeComponentProps {
  prod: IProduct;
  onClick: (closetId: string) => void;
}
const ShoeComponent = ({ prod, onClick }: ShoeComponentProps) => {
  return (
    <div
      className="item-center cursor-pointer overflow-hidden rounded-md bg-gray-50"
      onClick={() => onClick(prod.closetId)}
      style={{ aspectRatio: "1/1" }}
    >
      <Img
        src={prod.image}
        alt={prod.modelName}
        fallbackSrc={shoeImg}
        className=""
        errorStyle="w-[60%] mt-[10px] opacity-100"
      />
    </div>
  );
};

export default ShoeComponent;
