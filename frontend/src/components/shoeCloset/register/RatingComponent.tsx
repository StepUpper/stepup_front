import { starFilledIcon, starIcon } from "@/assets/assets";

const RatingComponent = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (rating: number) => void;
}) => {
  //const [rate, setRate] = useState(0);

  return (
    <div className="flex flex-col items-center gap-2.5 py-5">
      <label className="w-fit text-body1 font-label">
        신발은 마음에 드셨나요?
        <p className="mt-1.5 text-center text-caption1 font-paragraph">
          별점을 눌러 만족도를 알려주세요.
        </p>
      </label>
      <div className="flex w-fit cursor-pointer">
        <img
          src={rating > 0 ? starFilledIcon : starIcon}
          onClick={() => setRating(1)}
        />
        <img
          src={rating > 1 ? starFilledIcon : starIcon}
          onClick={() => setRating(2)}
        />
        <img
          src={rating > 2 ? starFilledIcon : starIcon}
          onClick={() => setRating(3)}
        />
        <img
          src={rating > 3 ? starFilledIcon : starIcon}
          onClick={() => setRating(4)}
        />
        <img
          src={rating > 4 ? starFilledIcon : starIcon}
          onClick={() => setRating(5)}
        />
      </div>
    </div>
  );
};
export default RatingComponent;
