import InputField from "@/components/common/InputField";
import ReviewOptionSelectorButton from "./ReviewOptionSelectorButton";
import RecomendSizeRadioGroup from "./RecomendSizeRadioGroup";
//import { useInput } from "@/hooks/useInput";

interface IReviewData {
  len: string;
  width: string;
  height: string;
  soft: string;
  weight: string;
  recommendSize: string;
  text: string;
}
const ShoeRegisterInputForm = ({
  reviewData,
  setReviewData,
}: {
  reviewData: IReviewData;
  setReviewData: (review: IReviewData) => void;
}) => {
  /*
  const { value: review, setValue: setReview } = useInput({
    len: "",
    width: "",
    height: "",
    soft: "",
    weight: "",
    size: "2",
    text: "",
  });
  */

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const { name, value } = target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const { name, value } = target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };

  return (
    <div className="overflow-visible">
      <InputField title="신발 길이가 잘 맞나요?">
        <div className="flex gap-2">
          {["짧아요", "잘 맞아요", "길어요"].map((opt, idx) => (
            <ReviewOptionSelectorButton
              key={`${idx}`}
              name="len"
              value={opt}
              isSelected={reviewData.len === opt}
              onClick={onClickHandler}
            />
          ))}
        </div>
      </InputField>
      <InputField title="발볼 너비가 잘 맞아요?">
        <div className="flex gap-2">
          {["좁아요", "잘 맞아요", "넓어요"].map((opt, idx) => (
            <ReviewOptionSelectorButton
              key={`${idx}`}
              name="width"
              value={opt}
              isSelected={reviewData.width === opt}
              onClick={onClickHandler}
            />
          ))}
        </div>
      </InputField>
      <InputField title="발등 높이는 어떤가요?">
        <div className="flex gap-2">
          {["타이트해요", "적당해요", "넉넉해요"].map((opt, idx) => (
            <ReviewOptionSelectorButton
              key={`${idx}`}
              name="height"
              value={opt}
              isSelected={reviewData.height === opt}
              onClick={onClickHandler}
            />
          ))}
        </div>
      </InputField>
      <InputField title="밑창은 푹신한가요?">
        <div className="flex gap-2">
          {["딱딱해요", "적당해요", "푹신해요"].map((opt, idx) => (
            <ReviewOptionSelectorButton
              key={`${idx}`}
              name="soft"
              value={opt}
              isSelected={reviewData.soft === opt}
              onClick={onClickHandler}
            />
          ))}
        </div>
      </InputField>
      <InputField title="신발 무게는 어떤가요?">
        <div className="flex gap-2">
          {["가벼워요", "적당해요", "무거워요"].map((opt, idx) => (
            <ReviewOptionSelectorButton
              key={`${idx}`}
              name="weight"
              value={opt}
              isSelected={reviewData.weight === opt}
              onClick={onClickHandler}
            />
          ))}
        </div>
      </InputField>
      <InputField title="이 신발의 추천 사이즈는 무엇인가요?">
        <RecomendSizeRadioGroup
          size={reviewData.recommendSize}
          setReview={(e) => setReviewData({ ...reviewData, recommendSize: e })}
        />
      </InputField>
      <InputField title="자세한 사용기를 적어주세요">
        <textarea
          className="h-52 rounded-md border border-zinc-200 p-4 font-paragraph leading-6 placeholder:text-grey-400 focus:outline-none"
          placeholder="이 신발을 신으면서 느꼈던 장점 및 단점을 솔직하게 알려주세요."
          value={reviewData.text}
          name="text"
          onChange={onChangeHandler}
        />
      </InputField>
    </div>
  );
};

export default ShoeRegisterInputForm;
