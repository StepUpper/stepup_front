import { chatApi } from "@/apis/services/chat";
import { useEffect, useState } from "react";

interface Question {
  question: string;
}

// 로그인 된 사용자에게만
const ChatRecommendedQuestion = () => {
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

  const handlereqQuestion = (question: string) => {
    // 추천 질문 하나를 누르면 그에 해당하는 value를 postChatResponse보냄.
    // 요청 보냄과 동시에 store에 있는 addMessage를 가져와서 ChatInput에서와
    // 같은 맥락으로 동작을 수행한다.
    // 세션이 유지되는동안 단 1회만 실행됐으면 하니 sessionStorage에 저장한다.(눌렀는지 여부를)
  };

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
