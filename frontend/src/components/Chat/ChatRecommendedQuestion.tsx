import { addMessageToFirestore } from "@/apis/firebase/chatFirestore";
import { chatApi } from "@/apis/services/chat";
import userStore from "@/store/auth.store";
import useChatStore from "@/store/chat.store";
import { useEffect, useState } from "react";

interface Question {
  question: string;
}

const ChatRecommendedQuestion = () => {
  const { user, isLoggedIn } = userStore();
  const { addGuestMessage, roomId, addUserMessage } = useChatStore();
  const userId = user?.uid!;

  // 상태가 변경될 때마다 불필요하게 sessionStorage를 조회하지 않기 위해, 이 작업을 최초 렌더링에서 한 번만 수행
  const [isVisible, setIsVisible] = useState(() => {
    if (isLoggedIn) {
      const userClicked = sessionStorage.getItem(
        `hasClickedQuestion_${userId}`
      );
      // 값이 없다면 null이 담김
      return !userClicked;
      // 따라서 isVisible에는 true가 할당
    } else {
      const guestClicked = sessionStorage.getItem("guestHasClickedQuestion");
      return !guestClicked;
    }
  });

  const [recommendedQuestion, setRecommendedQuestion] = useState<Question[]>(
    []
  );

  const getRecommendedQuestion = async () => {
    try {
      const res = await chatApi.getRecommendedQuestion();
      if (res.status === 200) {
        setRecommendedQuestion(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecommendedQuestion();
  }, []);

  const handlereqQuestion = async (question: string) => {
    if (isLoggedIn) {
      sessionStorage.setItem(`hasClickedQuestion_${userId}`, "true");
    } else {
      sessionStorage.setItem("guestHasClickedQuestion", "true");
    }
    setIsVisible(false);

    try {
      if (isLoggedIn) {
        addUserMessage({ type: "user", content: question });
      } else {
        addGuestMessage({ type: "user", content: question });
      }

      const res = await chatApi.postChatResponse({
        message: {
          content: question,
        },
      });

      if (res.status === 200) {
        if (isLoggedIn) {
          await addMessageToFirestore(userId, roomId!, question, res.data);
          addUserMessage({ type: "bot", content: res.data });
        } else {
          addGuestMessage({ type: "bot", content: res.data });
        }
      }
    } catch (error) {
      const errorMessage =
        "예기치 못한 에러가 발생하였습니다. 다시 시도해주세요.";
      if (isLoggedIn) {
        addUserMessage({ type: "bot", content: { message: errorMessage } });
      } else {
        addGuestMessage({ type: "bot", content: { message: errorMessage } });
      }
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="no-scrollbar flex space-x-2 overflow-x-auto p-4">
        {recommendedQuestion?.map((v, index) => (
          <div
            key={index}
            className="flex h-14 w-36 flex-shrink-0 items-center justify-center rounded-xl bg-white px-3.5 py-2.5 text-center text-xs text-gray-500 shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
            onClick={() => handlereqQuestion(v.question)}
          >
            {v.question}
          </div>
        ))}
      </div>
    </>
  );
};
export default ChatRecommendedQuestion;
