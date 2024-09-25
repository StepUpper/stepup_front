import { footInfoPlaceholder } from "@assets/assets";
import BottomButton from "@common/BottomButton";

const FootInfoPlaceholder = () => {
  return (
    <>
      <div className="flex h-[calc(100vh-176px)] flex-col items-center justify-center">
        <div className="w-80">
          <img
            src={footInfoPlaceholder}
            alt="발 정보 없음 아이콘"
            width="100%"
          />
        </div>
        <div className="flex flex-col gap-2 text-center">
          <p className="text-body2 font-label leading-5">
            발 정보가 아직 없습니다
          </p>
          <span className="text-body3 font-paragraph leading-6 text-grey-400">
            발 촬영으로 내 발 리포트를 받아보세요.
          </span>
        </div>
      </div>
      <div className="w-full px-4">
        <BottomButton title="내 발 측정하기" id="perfitt_size_button" />
      </div>
    </>
  );
};
export default FootInfoPlaceholder;
