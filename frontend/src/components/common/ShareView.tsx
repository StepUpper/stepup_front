import { ReactNode, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BottomButton from "@components/common/BottomButton";
import formattedDate from "@utils/formattedDate";

interface ShareViewProps {
  icon: string; // 표시 아이콘
  title: string; // 공유 제목
  desc?: string; // 공유 내용
  timestamp?: Date; // 시간
  children: ReactNode; // 내용
}

const ShareView = (props: ShareViewProps) => {
  const { icon, title, desc, timestamp, children } = props;

  const navigate = useNavigate();

  // 날짜 포멧
  const formattedTimestamp = useMemo(
    () => formattedDate(timestamp),
    [timestamp]
  );

  return (
    <>
      <div className="min-h-real-screen flex flex-col">
        <header className="sticky top-0 w-full border-b bg-white p-4">
          <img src={icon} alt="chatCircleIcon" className="mb-2 w-5" />
          <p className="mb-2 text-heading font-semibold">{title}</p>
          {desc && <span className="text-body3 font-paragraph">{desc}</span>}
          {timestamp && (
            <p className="font-[#52525B] text-body3">{formattedTimestamp}</p>
          )}
        </header>
        <main className="flex-1">{children}</main>
        <div className="sticky bottom-0 flex w-full justify-center bg-white px-4">
          <BottomButton
            title="핏톡 시작하기"
            onClick={() => navigate("/onboarding/1")}
          />
        </div>
      </div>
    </>
  );
};
export default ShareView;
