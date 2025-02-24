import SignUpRequired from "@components/signup/SignUpRequired";
import SignUpAdditional from "@components/signup/SignUpAdditional";
import userStore from "@store/auth.store.ts";
import { redirect } from "react-router-dom";

const SignUp = () => {
  const { user } = userStore((store) => ({ user: store.user }));
  if (user && user.sizeType?.length) redirect("/");
  return <>{user?.gender ? <SignUpAdditional /> : <SignUpRequired />}</>;
};
export default SignUp;
