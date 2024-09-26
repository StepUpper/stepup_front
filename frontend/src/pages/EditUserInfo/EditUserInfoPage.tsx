import EditUserInfo from "@components/mypage/EditUserInfo";
import Header from "@components/common/Header";

const EditUserInfoPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Header type="back">내 정보 수정</Header>
      <main className="flex h-full flex-col gap-7 py-4">
        <EditUserInfo />
      </main>
    </div>
  );
};
export default EditUserInfoPage;
