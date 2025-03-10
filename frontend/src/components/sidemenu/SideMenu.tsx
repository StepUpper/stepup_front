import Header from "@common/Header";
import Button from "@common/html/Button";
import { plusIcon } from "@/assets/assets";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileImage from "@common/ProfileImage";
import SideChatListItem from "./SideChatListItem";
import { motion, AnimatePresence } from "framer-motion";
import userStore from "@store/auth.store";
import {
  createNewChatRoom,
  deleteChatRoom,
  getUserChatRooms,
} from "@apis/firebase/chatFirestore";
import useChatStore from "@store/chat.store";
import Logout from "@common/Logout";
import { useBottomSheet } from "@store/bottomSheet.store";
import { Timestamp } from "firebase/firestore";

const SideMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { isLoggedIn, user } = userStore();
  const { setRoomId, getMessagesByRoomId, roomId, loadUserMessages } =
    useChatStore();

  const { open } = useBottomSheet();

  const handleLogin = () => {
    onClose();
    navigate("#login");
    open("login");
  };

  const navigate = useNavigate();
  const [chats, setChats] = useState<
    {
      id: string;
      title?: string;
      timestamp?: Timestamp;
      roomName?: string;
      createdAt?: string;
    }[]
  >([]);

  const today = Timestamp.now();
  const checkTodayDate = (timestamp: Timestamp, today: Timestamp) => {
    const todayDate = new Date(today.seconds * 1000);
    const chatDate = new Date(timestamp.seconds * 1000);
    return (
      todayDate.getFullYear() === chatDate.getFullYear() &&
      todayDate.getMonth() === chatDate.getMonth() &&
      todayDate.getDate() === chatDate.getDate()
    );
  };

  const todayChats = chats.filter((chat) =>
    chat.timestamp ? checkTodayDate(chat.timestamp, today) : false
  );

  const checkWithin7Days = (timestamp: Timestamp, today: Timestamp) => {
    const sevenDaysAgo = new Date(today.seconds * 1000);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const chatDate = new Date(timestamp.seconds * 1000);
    return (
      chatDate >= sevenDaysAgo && chatDate < new Date(today.seconds * 1000)
    );
  };

  const last7DaysChats = chats.filter(
    (chat) =>
      chat.timestamp &&
      checkWithin7Days(chat.timestamp, today) &&
      !checkTodayDate(chat.timestamp, today)
  );

  const [swipedItem, setSwipedItem] = useState<string | null>(null);
  const [longPressedItem, setLongPressedItem] = useState<string | null>(null);

  const handleSwipe = (id: string) => {
    setSwipedItem(id);
    setLongPressedItem(null);
  };
  const handleLongPress = (id: string) => {
    setLongPressedItem(id);
    setSwipedItem(null);
  };

  const handleReset = () => {
    setSwipedItem(null);
    setLongPressedItem(null);
  };

  const handleCreateNewChat = async () => {
    if (isLoggedIn && user) {
      try {
        // 새로운 채팅방 만들고 새로운 채팅방의 id를 update
        const newRoomId = await createNewChatRoom(user.uid!);
        setRoomId(newRoomId);
        getMessagesByRoomId(user?.uid!, newRoomId);
        // 추가된 채팅방 목록들을 가져오기
        const updatedChats = await getUserChatRooms(user.uid!);
        setChats(updatedChats);
        onClose();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("로그인이 필요합니다.");
    }
  };

  const handleRemoveChatRoom = async (userId: string, deleteId: string) => {
    await deleteChatRoom(userId, deleteId);
    const updatedChats = await getUserChatRooms(user?.uid!);
    setChats(updatedChats);

    // 지우려는 방이 현재 속한 방이라면 채팅방의 내용을
    // 가장 최신 채팅이 이루어진 채팅방으로 업데이트
    // (채팅방을 삭제했을 때 채팅창에 메세지가 전부 다 사라지면 사용자 경험 측면에서 안좋으니.)
    if (deleteId === roomId) {
      loadUserMessages(userId);
    }
  };

  useEffect(() => {
    const fetchUserChatRooms = async () => {
      if (isLoggedIn && user) {
        const chatRooms = await getUserChatRooms(user?.uid!);
        setChats(chatRooms);
      }
    };

    fetchUserChatRooms();
  }, [isLoggedIn, user]);

  const handleChatRoom = (userId: string, roomId: string) => {
    getMessagesByRoomId(userId, roomId);
    console.log("getroom", roomId);
    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="h-real-screen absolute inset-0 z-50 flex w-full overflow-hidden">
            {/* 어두운 영역 */}
            <Button
              className="h-real-screen visible absolute right-1/2 top-0 -z-30 w-full translate-x-1/2 cursor-default bg-black/50 p-0"
              onClick={onClose}
            />
            {/* 사이드메뉴 영역 */}
            <motion.nav
              key="side-menu"
              className="h-real-screen absolute flex w-[290px] flex-col rounded-r-[8px] border bg-white"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.5 }}
            >
              <div onClick={onClose}>
                <Header type="menu" />
              </div>

              {isLoggedIn ? (
                <>
                  {/* 새 채팅 버튼 */}
                  <div className="no-scrollbar relative top-0 overflow-x-auto bg-white px-[16px] py-[17px]">
                    <Button
                      className="flex items-center gap-[8px] rounded-full bg-grey-50 py-[6px] pl-[7px] pr-[10px] text-body2 text-grey-500"
                      onClick={handleCreateNewChat}
                    >
                      <img src={plusIcon} className="size-[18px]" />새 채팅
                    </Button>
                  </div>
                  {/* 채팅 리스트 */}
                  <div className="no-scrollbar flex grow flex-col gap-[25px] overflow-y-auto px-[16px] py-[17px]">
                    {todayChats.length > 0 && (
                      <div className="flex flex-col gap-[8px]">
                        <span className="h-[24px] text-body3 text-grey-500">
                          오늘
                        </span>
                        <ul>
                          {todayChats.map((chat) => (
                            <SideChatListItem
                              key={chat.id}
                              title={chat.roomName || ""}
                              isSwiped={swipedItem === chat.id}
                              isLongPressed={longPressedItem === chat.id}
                              onSwipe={() => handleSwipe(chat.id)}
                              onLongPress={() => handleLongPress(chat.id)}
                              onReset={handleReset}
                              onClick={() =>
                                handleChatRoom(user?.uid!, chat.id)
                              }
                              onDelete={() =>
                                handleRemoveChatRoom(user?.uid!, chat.id)
                              }
                              isClicked={roomId === chat.id}
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
                              title={chat.roomName || ""}
                              isSwiped={swipedItem === chat.id}
                              isLongPressed={longPressedItem === chat.id}
                              onSwipe={() => handleSwipe(chat.id)}
                              onLongPress={() => handleLongPress(chat.id)}
                              onReset={handleReset}
                              onClick={() =>
                                handleChatRoom(user?.uid!, chat.id)
                              }
                              onDelete={() =>
                                handleRemoveChatRoom(user?.uid!, chat.id)
                              }
                              isClicked={roomId === chat.id}
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
                        onClick={() => navigate("/mypage/myshopping")}
                      >
                        좋아요 | 최근 본
                      </Button>
                      <Button
                        className="bg-white"
                        onClick={() => navigate("/shoecloset")}
                      >
                        신발장
                      </Button>
                      <Button
                        className="bg-white"
                        onClick={() => navigate("/myfootinfo")}
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
                  {isLoggedIn ? (
                    <>
                      <div className="flex grow justify-between gap-[10px]">
                        <Button
                          className="flex items-center gap-[8px]"
                          onClick={() => navigate("/mypage")}
                        >
                          <ProfileImage
                            showCameraIcon={false}
                            className="size-[30px]"
                          />
                          <p className="text-body2 font-semibold text-black">
                            {user?.username}
                          </p>
                        </Button>
                        <Logout onClose={onClose} />
                      </div>
                    </>
                  ) : (
                    <Button
                      className="flex items-center gap-[8px]"
                      onClick={handleLogin}
                    >
                      <ProfileImage
                        showCameraIcon={false}
                        className="size-[30px]"
                      />
                      <p className="text-body2 font-semibold text-black underline">
                        로그인이 필요합니다
                      </p>
                    </Button>
                  )}
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
