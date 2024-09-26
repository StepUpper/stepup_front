import { onboardingImg1, onboardingImg2 } from "@/assets/assets";
import OnboardingContent from "@/components/onboarding/OnboardingContent";
import { useNavigate, useParams } from "react-router-dom";

const Onboarding = () => {
  const { stepId } = useParams();
  const navigate = useNavigate();

  const step = parseInt(stepId ?? "1", 10);

  return (
    <>
      {step === 1 && (
        <OnboardingContent
          buttonTitle="다음"
          onboardingImg={onboardingImg1}
          onClick={() => navigate("/onboarding/2")}
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
