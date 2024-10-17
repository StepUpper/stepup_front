import { starFilledIcon } from "@/assets/assets";

const ShoeClosetMainInfo = ({
  rating,
  brand,
  modelName,
}: {
  rating: number;
  brand: string;
  modelName: string;
}) => {
  return (
    <div className="flex w-screen gap-6 p-4">
      {/* rating */}
      <div className="flex items-center gap-0.5">
        <img src={starFilledIcon} alt="별점" className="size-8" />
        <p className="text-3xl font-semibold">{rating}</p>
      </div>
      {/* product Info */}
      <div className="flex flex-col">
        <p className="text-sm text-gray-400">{brand}</p>
        <p>{modelName}</p>
      </div>
    </div>
  );
};
export default ShoeClosetMainInfo;
