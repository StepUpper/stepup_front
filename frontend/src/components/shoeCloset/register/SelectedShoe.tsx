import { shoeImg } from "@/assets/assets";
import Img from "@/components/common/html/Img";
import { TShoeSearchResponse } from "@/types/product";

const SelectedShoe = (props: TShoeSearchResponse) => {
  const { image, modelName, brand } = props;
  return (
    <div className="flex items-center p-1.5">
      {/* 상품 이미지 영역 */}
      <div className="relative overflow-hidden rounded-[0.39rem] bg-grey-50">
        {/* 신발 이미지 */}
        <div
          className="item-center flex size-20"
          style={{ aspectRatio: "1/1" }}
        >
          <Img
            src={image}
            alt={modelName}
            fallbackSrc={shoeImg}
            className=""
            errorStyle="w-[70%] opacity-100"
          />
        </div>
      </div>
      {/* 상품 정보 영역 */}
      <div className="flex flex-col gap-2 px-2">
        <p className="text-sm"> {brand} </p>
        <p className="font-medium"> {modelName} </p>
      </div>
    </div>
  );
};
export default SelectedShoe;
