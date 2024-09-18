import Header from "@common/Header";
import Button from "@common/html/Button";
import { plusIcon } from "@/assets/assets";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfileImage from "@common/ProfileImage";
import SideChatListItem from "./SideChatListItem";

const SideMenu = () => {
  const navigate = useNavigate();
  const gotoPageHandler = (path: string) => {
    navigate(path);
  };

  const [chats, setChats] = useState([
    { id: 1, title: "채팅1", createdAt: "2024-09-17T12:30:00Z" },
    { id: 2, title: "채팅2", createdAt: "2024-09-16T12:30:00Z" },
    { id: 3, title: "채팅3", createdAt: "2024-09-15T12:30:00Z" },
    { id: 4, title: "채팅4", createdAt: "2024-09-11T12:30:00Z" },
    { id: 5, title: "채팅5", createdAt: "2024-09-13T12:30:00Z" },
    { id: 6, title: "채팅6", createdAt: "2024-09-09T12:30:00Z" },
    { id: 7, title: "채팅7", createdAt: "2024-09-17T15:30:00Z" },
  ]);

  const today = new Date();
  const checkTodayDate = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  const todayChats = chats.filter((chat) =>
    checkTodayDate(new Date(chat.createdAt), today)
  );

  const checkWithin7Days = (date: Date) => {
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    return date >= sevenDaysAgo && date < today;
  };
  const last7DaysChats = chats.filter(
    (chat) =>
      checkWithin7Days(new Date(chat.createdAt)) &&
      !checkTodayDate(new Date(chat.createdAt), today)
  );

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <div className="h-screen w-full overflow-hidden">
        {/* 어두운 영역 */}
        <Button className="visible absolute right-1/2 top-0 z-[-30] h-screen w-full translate-x-1/2 cursor-default bg-black bg-opacity-50 p-0" />
        {/* 사이드메뉴 영역 */}
        <nav className="absolute flex h-screen w-[290px] flex-col rounded-r-[8px] border bg-white">
          <Header type="menu" />
          {/* 새 채팅 버튼 */}
          <div className="relative top-0 overflow-x-auto bg-white px-[16px] py-[17px]">
            <Button
              className="flex items-center gap-[8px] rounded-full bg-grey-50 py-[6px] pl-[7px] pr-[10px] text-body2 text-grey-500"
              onClick={() => gotoPageHandler("/")}
            >
              <img src={plusIcon} className="size-[18px]" />새 채팅
            </Button>
          </div>
          {/* 채팅 리스트 */}
          <div className="flex grow flex-col gap-[25px] overflow-y-auto px-[16px] py-[17px]">
            {todayChats.length > 0 && (
              <div className="flex flex-col gap-[8px]">
                <span className="h-[24px] text-body3 text-grey-500">오늘</span>
                <ul>
                  {todayChats.map((chat) => (
                    <SideChatListItem title={chat.title} />
                  ))}
                </ul>
              </div>
            )}
            {last7DaysChats.length > 0 && (
              <div className="flex flex-col gap-[8px]">
                <span className="h-[24px] text-body3 text-grey-500">
                  지난 7일
                </span>
                <ul>
                  {last7DaysChats.map((chat) => (
                    <SideChatListItem title={chat.title} />
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* 기타 메뉴 이동 */}
          <div className="bottom-0 mt-[15px] px-[16px]">
            <div className="flex flex-col items-start gap-[14px] border-t border-t-[#E4E4E7] py-[17px] text-body2 font-normal">
              <Button className="bg-white"> 좋아요 | 최근 본 </Button>
              <Button className="bg-white"> 신발장 </Button>
              <Button className="bg-white"> 내 발 정보 </Button>
            </div>
            <div className="border-t border-t-[#E4E4E7] py-[17px]">
              <Button
                className="flex items-center gap-[8px]"
                onClick={() => gotoPageHandler("mypage")}
              >
                <ProfileImage showCameraIcon={false} className="size-[30px]" />
                <p className="text-body2 font-semibold text-black">김펄핏</p>
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default SideMenu;
