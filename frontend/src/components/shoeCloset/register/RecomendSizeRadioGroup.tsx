import Input from "@/components/common/html/Input";
import { twMerge } from "tailwind-merge";

interface RecomendSizeRadioGroupProps {
  size: string;
  setReview: (e: string) => void;
}

const RecomendSizeRadioGroup = ({
  size,
  setReview,
}: RecomendSizeRadioGroupProps) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <ul className="flex h-2.5 w-full items-center justify-between bg-zinc-200 px-3">
        <Input
          id="horizontal-list-group-item-radio-0"
          type="radio"
          name="horizontal-list-group-item-radio"
          className="box-content size-2 appearance-none rounded-full border-2 border-zinc-300 bg-white bg-center checked:h-3 checked:w-5 checked:border-zinc-700 checked:bg-black checked:bg-no-repeat cursor-pointer"
          value="많이 작아요"
          onChange={(e) => setReview(e.target.value)}
          checked={size === "많이 작아요"}
        />

        <Input
          id="horizontal-list-group-item-radio-1"
          type="radio"
          name="horizontal-list-group-item-radio"
          className="box-content size-2 appearance-none rounded-full border-2 border-zinc-300 bg-white bg-center checked:h-3 checked:w-5 checked:border-zinc-700 checked:bg-black checked:bg-no-repeat cursor-pointer"
          value="약간 작아요"
          onChange={(e) => setReview(e.target.value)}
          checked={size === "약간 작아요"}
        />

        <Input
          id="horizontal-list-group-item-radio-2"
          type="radio"
          name="horizontal-list-group-item-radio"
          className="box-content size-2 appearance-none rounded-full border-2 border-zinc-300 bg-white bg-center checked:h-3 checked:w-5 checked:border-zinc-700 checked:bg-black checked:bg-no-repeat cursor-pointer"
          value="정사이즈"
          onChange={(e) => setReview(e.target.value)}
          checked={size === "정사이즈"}
        />

        <Input
          id="horizontal-list-group-item-radio-3"
          type="radio"
          name="horizontal-list-group-item-radio"
          className="box-content size-2 appearance-none rounded-full border-2 border-zinc-300 bg-white bg-center checked:h-3 checked:w-5 checked:border-zinc-700 checked:bg-black checked:bg-no-repeat cursor-pointer"
          value="약간 커요"
          onChange={(e) => setReview(e.target.value)}
          checked={size === "약간 커요"}
        />

        <Input
          id="horizontal-list-group-item-radio-4"
          type="radio"
          name="horizontal-list-group-item-radio"
          className="box-content size-2 appearance-none rounded-full border-2 border-zinc-300 bg-white bg-center checked:h-3 checked:w-5 checked:border-zinc-700 checked:bg-black checked:bg-no-repeat cursor-pointer"
          value="많이 커요"
          onChange={(e) => setReview(e.target.value)}
          checked={size === "많이 커요"}
        />
      </ul>
      <ul className="flex w-full justify-between text-caption1">
        <label
          htmlFor="horizontal-list-group-item-radio-0"
          className={twMerge(
            "item-center w-1/5 text-caption1 font-label",
            size === "많이 작아요" ? "text-black" : "text-grey-500"
          )}
        >
          많이 작아요
        </label>
        <label
          htmlFor="horizontal-list-group-item-radio-1"
          className={twMerge(
            "item-center w-1/5 font-label",
            size === "약간 작아요" ? "text-black" : "text-grey-500"
          )}
        >
          약간 작아요
        </label>
        <label
          htmlFor="horizontal-list-group-item-radio-2"
          className={twMerge(
            "item-center w-1/5 font-label",
            size === "정사이즈" ? "text-black" : "text-grey-500"
          )}
        >
          정사이즈
        </label>
        <label
          htmlFor="horizontal-list-group-item-radio-3"
          className={twMerge(
            "item-center w-1/5 font-label",
            size === "약간 커요" ? "text-black" : "text-grey-500"
          )}
        >
          약간 커요
        </label>
        <label
          htmlFor="horizontal-list-group-item-radio-4"
          className={twMerge(
            "item-center w-1/5 font-label",
            size === "많이 커요" ? "text-black" : "text-grey-500"
          )}
        >
          많이 커요
        </label>
      </ul>
    </div>
  );
};

export default RecomendSizeRadioGroup;
