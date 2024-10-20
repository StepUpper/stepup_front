import { IProduct } from "@/pages/ShoeCloset/ShoeCloset";
import Img from "@common/html/Img";
import { shoeImg } from "@/assets/assets";
import { useNavigate } from "react-router-dom";

interface ShoeComponentProps {
  prod: IProduct;
}
const ShoeComponent = ({ prod }: ShoeComponentProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/archive/${prod.closetId}`);
  };

  return (
    <div 
      className="rounded-md overflow-hidden bg-gray-50 item-center" 
      onClick={handleClick} 
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
