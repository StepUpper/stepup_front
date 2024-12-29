import { useState } from "react";
import { chatApi } from "@apis/services/chat";
import useAxios from "@hooks/useAxios";
import { dropDownIcon, infoIcon, noticeIcon } from "@assets/assets";
import Img from "@common/html/Img";
import { twMerge } from "tailwind-merge";

interface Question {
  question: string;
}
const ChatSampleQuestions = () => {
  const { data } = useAxios<Question[]>(chatApi.getRecommendedQuestion, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleSampleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute z-[8] w-full px-4">
      <div
        className={twMerge(
          "flex flex-col overflow-hidden rounded-lg bg-white p-4 shadow transition-[max-height] duration-500 ease-in-out",
          isOpen ? "max-h-[400px]" : "max-h-[53px]"
        )}
      >
        <div
          className="mb-4 flex cursor-pointer items-center justify-between gap-3"
          onClick={handleSampleToggle}
        >
          <div className="flex items-center gap-[.375rem]">
            <Img src={noticeIcon} alt="확성기 아이콘" className="size-[18px]" />
            <h3 className="text-body3 font-label">이 질문들로 시작해보세요!</h3>
          </div>
          <Img
            src={dropDownIcon}
            alt="펼치기"
            className={twMerge(
              "size-[14px]",
              isOpen && "scale-y-[-1] transform"
            )}
          />
        </div>

        <div className="flex flex-col gap-[.875rem]">
          <ul className="flex flex-col gap-1 px-4">
            {data?.map((q, index) => (
              <li key={index} className="list-disc text-body3 text-gray-700">
                {q.question}
              </li>
            ))}
          </ul>

          <div className="w-full rounded-lg bg-blue-50 p-3 text-body3 leading-5 text-blue-600">
            <div className="flex gap-2">
              <img src={infoIcon} className="size-5" />
              <p>
                아직 한정된 질문만 가능합니다. 위의 목록에서 질문을 선택하여
                채팅을 시작해보세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatSampleQuestions;
