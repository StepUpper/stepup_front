import { ReactNode, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BottomButton from "@components/common/BottomButton";
import formattedDate from "@utils/formattedDate";

interface ShareViewProps {
  icon: string; // 표시 아이콘
  title: string; // 공유 제목
  timestamp?: Date; // 시간
  children: ReactNode; // 내용
}

const ShareView = (props: ShareViewProps) => {
  const { icon, title, timestamp, children } = props;

  const navigate = useNavigate();

  // 날짜 포멧
  const formattedTimestamp = useMemo(
    () => formattedDate(timestamp),
    [timestamp]
  );

  return (
    <>
      <div className="min-h-real-screen flex flex-col">
        <header className="h-36 border-b p-4">
          <img src={icon} alt="chatCircleIcon" className="mb-2" />
          <p className="mb-2 text-heading font-semibold">{title}</p>
          {timestamp && (
            <p className="font-[#52525B] text-body3">{formattedTimestamp}</p>
          )}
        </header>
        <main className="no-scrollbar flex-1 overflow-y-auto">{children}</main>
        <div className="flex justify-center p-4">
          <BottomButton
            className="h-14 w-full rounded-lg bg-black text-white"
            title="핏톡 시작하기"
            onClick={() => navigate("/onboarding/1")}
          />
        </div>
      </div>
    </>
  );
};
export default ShareView;
