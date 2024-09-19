import Header from "@common/Header";
import Button from "@common/html/Button";
import { plusIcon } from "@/assets/assets";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfileImage from "@common/ProfileImage";
import SideChatListItem from "./SideChatListItem";
import { motion, AnimatePresence } from "framer-motion";

const SideMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  //임시 로그인 분기
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const gotoPageHandler = (path: string) => {
    navigate(path);
  };

  const [chats] = useState([
    {
      id: 1,
      title: "장마철에 신기 좋은 레인부츠 브랜드 추천",
      createdAt: "2024-09-19T12:30:00+09:00",
    },
    {
      id: 2,
      title: "장마철에 신기 좋은 운동화 추천",
      createdAt: "2024-09-17T12:30:00+09:00",
    },
    {
      id: 3,
      title: "아식스에서 제일 유명한 신발",
      createdAt: "2024-09-16T12:30:00+09:00",
    },
    {
      id: 4,
      title: "20대 여성이 좋아하는 신발",
      createdAt: "2024-09-12T12:30:00+09:00",
    },
    {
      id: 5,
      title: "등산할 때 신기 좋은 가벼운 등산화",
      createdAt: "2024-09-14T12:30:00+09:00",
    },
    { id: 6, title: "채팅6", createdAt: "2024-09-10T12:30:00+09:00" },
    {
      id: 7,
      title: "요즘 유행하는 신발",
      createdAt: "2024-09-19T15:30:00+09:00",
    },
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

  const [swipedItem, setSwipedItem] = useState<number | null>(null);
  const [longPressedItem, setLongPressedItem] = useState<number | null>(null);

  const handleSwipe = (id: number) => {
    setSwipedItem(id);
    setLongPressedItem(null);
  };
  const handleLongPress = (id: number) => {
    setLongPressedItem(id);
    setSwipedItem(null);
  };

  const handleReset = () => {
    setSwipedItem(null);
    setLongPressedItem(null);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex h-screen w-full overflow-hidden">
            {/* 어두운 영역 */}
            <Button
              className="visible absolute right-1/2 top-0 -z-30 h-screen w-full translate-x-1/2 cursor-default bg-black/50 p-0"
              onClick={onClose}
            />
            {/* 사이드메뉴 영역 */}
            <motion.nav
              key="side-menu"
              className="absolute flex h-screen w-[290px] flex-col rounded-r-[8px] border bg-white"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.5 }}
            >
              <Button onClick={onClose}>
                <Header type="menu" />
              </Button>

              {isLoggedIn ? (
                <>
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
                        <span className="h-[24px] text-body3 text-grey-500">
                          오늘
                        </span>
                        <ul>
                          {todayChats.map((chat) => (
                            <SideChatListItem
                              key={chat.id}
                              title={chat.title}
                              isSwiped={swipedItem === chat.id}
                              isLongPressed={longPressedItem === chat.id}
                              onSwipe={() => handleSwipe(chat.id)}
                              onLongPress={() => handleLongPress(chat.id)}
                              onReset={handleReset}
                            />
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
                            <SideChatListItem
                              key={chat.id}
                              title={chat.title}
                              isSwiped={swipedItem === chat.id}
                              isLongPressed={longPressedItem === chat.id}
                              onSwipe={() => handleSwipe(chat.id)}
                              onLongPress={() => handleLongPress(chat.id)}
                              onReset={handleReset}
                            />
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  {/* 기타 메뉴 이동 */}
                  <div className="bottom-0 mt-[15px] px-[16px]">
                    <div className="flex flex-col items-start gap-[14px] border-t border-t-[#E4E4E7] py-[17px] text-body2 font-normal">
                      <Button
                        className="bg-white"
                        onClick={() => gotoPageHandler("/myshopping")}
                      >
                        좋아요 | 최근 본
                      </Button>
                      <Button
                        className="bg-white"
                        onClick={() => gotoPageHandler("/archive")}
                      >
                        신발장
                      </Button>
                      <Button
                        className="bg-white"
                        onClick={() => gotoPageHandler("/myfootinfo")}
                      >
                        내 발 정보
                      </Button>
                    </div>
                    
                  </div>
                </>
              ) : (
                <div className="flex grow"></div>
              )}

              {/* 프로필 */}
              
              <div className="bottom-0 px-[16px]">
                <div className="border-t border-t-[#E4E4E7] py-[17px]">
                  <Button
                    className="flex items-center gap-[8px]"
                      onClick={() => gotoPageHandler(isLoggedIn ? "/mypage" : "")}
                  >
                    <ProfileImage
                      showCameraIcon={false}
                      className="size-[30px]"
                    />
                      <p className="text-body2 font-semibold text-black">
                          {isLoggedIn ? "김펄핏" : "로그인이 필요합니다"}
                      </p>
                  </Button>
                </div>
              </div>         
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideMenu;
