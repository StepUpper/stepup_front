import { shoeSearch } from "@assets/assets";

const EmptyShoeCard = () => {
  return (
    <div className="item-center flex-col gap-4">
      <img src={shoeSearch} />
      <label className="whitespace-nowrap text-center text-body2 font-label">
        아직 신발장에 <br />
        등록한 신발이 없습니다.
      </label>
      <p className="whitespace-nowrap text-center text-body3 font-paragraph text-grey-400">
        신어본 신발을 등록하고
        <br />더 자세한 추천을 받아보세요.
      </p>
    </div>
  );
};

export default EmptyShoeCard;
