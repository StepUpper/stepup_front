import ChangePassword from "@/components/mypage/ChangePassword";
import Header from "@components/common/Header";

const ChangePasswordPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Header type="back">비밀번호 변경</Header>
      <main className="flex h-full flex-col gap-7 py-4">
        <ChangePassword />
      </main>
    </div>
  );
};
export default ChangePasswordPage;
