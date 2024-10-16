import Header from "@common/Header";
import ShoeRegisterInputForm from "@/components/shoeCloset/register/ShoeRegisterInputForm";
import RatingComponent from "@/components/shoeCloset/register/RatingComponent";
import SearchShoeButton from "@/components/shoeCloset/register/SearchShoeButton";
import SubmitBottomButton from "@/components/shoeCloset/register/SubmitBottomButton";

const page = () => {
  return (
    <div className="flex h-full flex-col">
      <Header type="back">신발 등록</Header>
      <main className="gap-7 overflow-y-scroll px-2">
        {/* 상품 찾기 버튼 */}
        <SearchShoeButton />
        {/* rating card */}
        <RatingComponent />
        {/* input form */}
        <ShoeRegisterInputForm />
        {/* 등록하기 버튼 */}
        <SubmitBottomButton />
      </main>
    </div>
  );
};

export default page;
