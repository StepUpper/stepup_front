import Img from "@/components/common/html/Img";
import { shoeImg } from "@/assets/assets";

const ShoeClosetThumb = ({
  img,
  modelName,
}: {
  img: string;
  modelName: string;
}) => {
  return (
    <div className="w-full overflow-hidden rounded-2xl bg-grey-50">
      {/* 신발 이미지 */}
      <div
        className="item-center mt-[-10px] size-full min-h-[136px]"
        style={{ aspectRatio: "1/1" }}
      >
        <Img
          src={img}
          alt={modelName}
          fallbackSrc={shoeImg}
          className="mt-[20px]"
          errorStyle="w-[60%] mt-[10px] opacity-100"
        />
      </div>
    </div>
  );
};
export default ShoeClosetThumb;
