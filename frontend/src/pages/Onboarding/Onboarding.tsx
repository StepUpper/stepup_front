import { onboardingImg1, onboardingImg2 } from "@/assets/assets";
import OnboardingContent from "@/components/onboarding/OnboardingContent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  return (
    <>
      {step === 1 && (
        <OnboardingContent
          buttonTitle="다음"
          onboardingImg={onboardingImg1}
          onClick={() => setStep(2)}
        >
          AI에게 질문만으로
          <br />
          원하는 신발을 찾아보세요!
        </OnboardingContent>
      )}
      {step === 2 && (
        <OnboardingContent
          buttonTitle="시작하기"
          onboardingImg={onboardingImg2}
          onClick={() => navigate("/")}
        >
          발촬영하면 원하는 신발의
          <br />딱 맞는 사이즈를 추천해드려요.
        </OnboardingContent>
      )}
    </>
  );
};
export default Onboarding;
