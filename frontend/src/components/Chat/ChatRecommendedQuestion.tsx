import { useEffect, useState } from "react";
import { addMessageToFirestore } from "@/apis/firebase/chatFirestore";
import { chatApi } from "@/apis/services/chat";
import userStore from "@/store/auth.store";
import useChatStore from "@/store/chat.store";

interface Question {
  question: string;
}

const ChatRecommendedQuestion = () => {
  const { user, isLoggedIn } = userStore();
  const { addGuestMessage, roomId, addUserMessage } = useChatStore();
  const userId = user?.uid!;

  const [isVisible, setIsVisible] = useState(true);
  const [recommendedQuestion, setRecommendedQuestion] = useState<Question[]>(
    []
  );

  useEffect(() => {
    if (isLoggedIn) {
      const userClicked = sessionStorage.getItem(
        `hasClickedQuestion_${userId}`
      );
      setIsVisible(!userClicked);
    } else {
      const guestClicked = sessionStorage.getItem("guestHasClickedQuestion");
      setIsVisible(!guestClicked);
    }
  }, [isLoggedIn, userId]);

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

  const handleRequestQuestion = async (question: string) => {
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
        message: { content: question },
      });

      if (res.status === 200) {
        if (isLoggedIn) {
          const docId = await addMessageToFirestore(
            userId,
            roomId!,
            question,
            res.data
          );
          addUserMessage({ type: "bot", content: res.data, id: docId });
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
    <div className="no-scrollbar flex space-x-2 overflow-x-auto p-4">
      {recommendedQuestion?.map((v, index) => (
        <div
          key={index}
          className="flex h-14 w-36 shrink-0 items-center justify-center rounded-xl bg-white px-3.5 py-2.5 text-center text-xs text-gray-500 shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
          onClick={() => handleRequestQuestion(v.question)}
        >
          {v.question}
        </div>
      ))}
    </div>
  );
};

export default ChatRecommendedQuestion;
