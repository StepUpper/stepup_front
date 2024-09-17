import { starFilledIcon, starIcon } from "@/assets/assets";
import { useState } from "react";

const RatingComponent = () => {
  const [rate, setRate] = useState(0);

  return (
    <div className="flex flex-col items-center gap-2.5 py-5">
      <label className="w-fit text-body1 font-label">
        신발은 마음에 드셨나요?
        <p className="mt-1.5 text-center text-caption1 font-paragraph">
          별점을 눌러 만족도를 알려주세요.
        </p>
      </label>
      <div className="flex w-fit">
        <img
          src={rate > 0 ? starFilledIcon : starIcon}
          onClick={() => setRate(1)}
        />
        <img
          src={rate > 1 ? starFilledIcon : starIcon}
          onClick={() => setRate(2)}
        />
        <img
          src={rate > 2 ? starFilledIcon : starIcon}
          onClick={() => setRate(3)}
        />
        <img
          src={rate > 3 ? starFilledIcon : starIcon}
          onClick={() => setRate(4)}
        />
        <img
          src={rate > 4 ? starFilledIcon : starIcon}
          onClick={() => setRate(5)}
        />
      </div>
    </div>
  );
};
export default RatingComponent;
