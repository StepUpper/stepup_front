import { useState } from "react";
import BottomSheet from "@common/BottomSheet";
import Button from "../common/html/Button";
import BottomButton from "../common/BottomButton";
import { interestCheckIcon } from "@/assets/assets";
import { useBottomSheet } from "@/store/bottomSheet.store";
import { useNavigate } from "react-router-dom";
import useChatStore from "@/store/chat.store";
import userStore from "@/store/auth.store";
import { chatApi } from "@/apis/services/chat";
import { addMessageToFirestore } from "@/apis/firebase/chatFirestore";

const keywords = [
  "스니커즈",
  "트레킹",
  "운동",
  "산책",
  "여행",
  "운동화",
  "구두",
  "등산화",
  "샌들",
  "레인부츠",
  "슬리퍼",
];

const MAX_KEYWORDS = 5; // 최대 선택 가능 개수

const InterestKeywordsBottomSheet = () => {
  const navigate = useNavigate();
  const { close } = useBottomSheet();
  const { roomId, addUserMessage } = useChatStore();
  const { isLoggedIn, user } = userStore();
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [warningMessage, setWarningMessage] = useState("");

  const handleKeywordClick = (keyword: string) => {
    setWarningMessage("");
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter((kw) => kw !== keyword));
    } else if (selectedKeywords.length < MAX_KEYWORDS) {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const handleSubmit = async () => {
    if (selectedKeywords.length === 0) {
      setWarningMessage("최소 하나의 키워드를 선택해주세요.");
    } else {
      close("interestKeywords");

      navigate("/");

      try {
        const chatMsg = selectedKeywords.join(", ");

        addUserMessage({ type: "user", content: chatMsg });

        const res = await chatApi.postKeywordResponse({
          keyword: selectedKeywords,
        });

        if (res.status === 200) {
          if (isLoggedIn) {
            await addMessageToFirestore(user?.uid!, roomId!, chatMsg, res.data);

            addUserMessage({ type: "bot", content: res.data });
          }
        }
      } catch (error) {
        const errorMessage =
          "예기치 못한 에러가 발생하였습니다. 다시 시도해주세요.";
        if (isLoggedIn) {
          // 호출 실패하면 굳이 firestore에 저장할 필요 없으니 상태 업데이트만 해줌
          addUserMessage({ type: "bot", content: { message: errorMessage } });
        }
      } finally {
      }
    }
  };

  return (
    <>
      <BottomSheet
        id="interestKeywords"
        isDragBar={false}
        isOverlayClose={false}
      >
        <BottomSheet.Header isTitleOnly={true}>관심 키워드</BottomSheet.Header>
        <BottomSheet.Content>
          <div className="flex flex-wrap gap-2 p-4">
            {keywords.map((keyword, index) => (
              <Button
                key={index}
                className={`inline-flex items-center justify-center rounded-full border px-3 py-2 ${
                  selectedKeywords.includes(keyword)
                    ? "border-gray-100 bg-gray-100 text-gray-500"
                    : "border-gray-100"
                }`}
                onClick={() => handleKeywordClick(keyword)}
                disabled={
                  !selectedKeywords.includes(keyword) &&
                  selectedKeywords.length >= MAX_KEYWORDS
                }
              >
                {selectedKeywords.includes(keyword) && (
                  <img
                    src={interestCheckIcon}
                    alt="interestCheckIcon"
                    className="mr-2"
                  />
                )}
                {keyword}
              </Button>
            ))}
          </div>
          {warningMessage && (
            <p className="p-4 text-xs text-red">{warningMessage}</p>
          )}
        </BottomSheet.Content>
        <div className="p-4">
          <BottomButton
            title={
              selectedKeywords.length === MAX_KEYWORDS
                ? `${MAX_KEYWORDS}개 선택 완료`
                : `${MAX_KEYWORDS - selectedKeywords.length}개 더 선택 가능`
            }
            onClick={handleSubmit}
          />
        </div>
      </BottomSheet>
    </>
  );
};

export default InterestKeywordsBottomSheet;
