import { auth } from "@/firebase";
import userStore from "@/store/auth.store";
import Button from "@common/html/Button";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Logout = ({ onClose }: { onClose: () => void }) => {
  const { setIsLoggedIn, updateUserInfo } = userStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      updateUserInfo();
      onClose();
      navigate("/");
    } catch (error) {
      console.error("로그아웃 중 오류 발생: ", error);
    }
  };
  return (
    <Button
      className="text-caption1 text-[#A1A1A1] underline"
      onClick={handleLogout}
    >
      로그아웃
    </Button>
  );
};
export default Logout;
