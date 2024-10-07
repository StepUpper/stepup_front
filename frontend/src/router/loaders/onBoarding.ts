import { redirect } from "react-router-dom";

export const onBoardingLoader = () => {
  const state = localStorage.getItem("setOnboardingPage");

  if (!state || state === "on") {
    localStorage.setItem("setOnboardingPage", "off");

    return redirect("/onBoarding/1");
  } else return null;
};
