import { chevRightIcon, likeStrokeIcon, smileIcon } from "@assets/assets";
import Header from "@components/common/Header"
import Button from "@components/common/html/Button";
import ProfileImage from "@components/common/ProfileImage";

const MyPage = () => {
  return (
    <>
      <Header type="back" />
      <div className="w-full bg-grey-50">
        {/* 프로필 영역 */}
        <div className="flex w-full grow flex-col items-center space-y-0 bg-white">
          <div>
            <ProfileImage showCameraIcon={true} />
          </div>
          <div className="py-[17px] text-center">
            <p className="text-[15px]"> 안녕하세요! </p>
            <p className="text-heading tracking-widest"> 김이름 님 </p>
          </div>
        </div>
        {/* 좋아요, 신발장 버튼 */}
        <div className="mt-[6px] flex items-center justify-between space-x-0.5">
          <Button className="flex h-[60px] grow place-content-center items-center gap-[10px] bg-white p-[10px]">
            <img src={likeStrokeIcon} className="w-[14px]" />
            <span className="text-body3 font-medium"> 좋아요 </span>
          </Button>
          <Button className="flex h-[60px] grow place-content-center items-center gap-[10px] bg-white p-[10px]">
            <img src={smileIcon} className="w-[14px]" />
            <span className="text-body3 font-medium"> 신발장 </span>
          </Button>
        </div>
        {/* */}
        <div className="mt-[6px] w-full gap-[15px] bg-white px-[16px] py-[25px]">
          <span className="text-body3 font-medium"> 내 정보 </span>
          <table className="w-[196px] border-separate border-spacing-y-4">
            <tbody>
              <tr>
                <td className="text-body3 font-medium text-grey-400">이름 </td>
                <td className="text-body3 font-normal text-black">
                  {"김이름"}
                </td>
              </tr>
              <tr className="">
                <td className="text-body3 font-medium text-grey-400">성별 </td>
                <td className="text-body3 font-normal text-black"> {"여"} </td>
              </tr>
              <tr className="">
                <td className="text-body3 font-medium text-grey-400">
                  생년월일
                </td>
                <td className="text-body3 font-normal text-black">
                  {"1999" + "." + "10" + "." + "11"}
                </td>
              </tr>
              <tr className="">
                <td className="text-body3 font-medium text-grey-400">
                  평소사이즈
                </td>
                <td className="text-body3 font-normal text-black">
                  {"235" + "mm"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* */}
        <div className="mt-[6px] bg-white pt-[25px]">
          <div className="space-y-0.5 bg-gray-200">
            <Button className="flex h-[49px] w-full grow items-center justify-between bg-white p-4 text-body3 font-medium">
              내 정보 수정
              <img src={chevRightIcon} className="h-[6px] w-[3px]" />
            </Button>
            <Button className="flex h-[49px] w-full grow items-center justify-between bg-white p-4 text-body3 font-medium">
              비밀번호 변경
              <img src={chevRightIcon} className="h-[6px] w-[3px]" />
            </Button>
            <Button className="flex h-[49px] w-full grow items-center justify-between bg-white p-4 text-body3 font-medium">
              고객센터
              <img src={chevRightIcon} className="h-[6px] w-[3px]" />
            </Button>
          </div>
          <div className="flex justify-between space-x-5 px-[120px] py-[39px] text-body3 font-normal text-gray-400">
            <Button className="h-[17px]">회원탈퇴</Button>
            <Button className="h-[17px]">고객약관</Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyPage;
