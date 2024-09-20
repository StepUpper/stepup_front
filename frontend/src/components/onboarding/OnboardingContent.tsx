import { ReactNode } from "react";
import BottomButton from "@common/BottomButton";

interface OnboardingContentProps {
  onboardingImg: string;
  buttonTitle: string;
  onClick: () => void;
  children: ReactNode;
}
const OnboardingContent = (props: OnboardingContentProps) => {
  const { onboardingImg, buttonTitle, onClick, children } = props;
  return (
    <div className="flex h-screen w-full flex-col items-center justify-between px-4 pt-14 text-center">
      <h1 className="text-2xl font-extrabold leading-9">{children}</h1>
      <img src={onboardingImg} alt="온보딩 질문하기 이미지" />
      <BottomButton title={buttonTitle} onClick={onClick} />
    </div>
  );
};
export default OnboardingContent;
