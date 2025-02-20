import SignUpRequired from "@components/signUp/SignUpRequired";
import SignUpAdditional from "@components/signUp/SignUpAdditional";
import userStore from "@store/auth.store.ts";
import { redirect } from "react-router-dom";

const SignUp = () => {
  const { user } = userStore((store) => ({ user: store.user }));
  if (user && user.sizeType?.length) redirect("/");
  return <>{user?.gender ? <SignUpAdditional /> : <SignUpRequired />}</>;
};
export default SignUp;
