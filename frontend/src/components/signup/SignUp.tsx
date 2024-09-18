import SignUpRequired from "./SignUpRequired";
import SignUpAdditional from "./SignUpAdditional";
import userStore from "@store/auth.store.ts";
import { redirect } from "react-router-dom";

const SignUp = () => {
  const { user } = userStore((store) => ({ user: store.user }));
  if (user && user.sizeType?.length) redirect("/");
  return <>{user?.gender ? <SignUpAdditional /> : <SignUpRequired />}</>;
};
export default SignUp;
