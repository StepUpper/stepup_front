import { redirect } from "react-router-dom";

export const onBoadingLoader = () => {
  const state = localStorage.getItem("setOnboadingPage");

  if (!state || state === "on") {
    localStorage.setItem("setOnboadingPage", "off");

    return redirect("/onboading");
  } else return null;
};
