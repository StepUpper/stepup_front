import Button from "@common/html/Button";

interface ResumeDraftModalProps {
  onContinue: () => void;
  onNewStart: () => void;
}

const ShoeClosetResumeDraftModal = (props: ResumeDraftModalProps) => {
  const { onContinue, onNewStart } = props;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[320px] rounded-lg bg-white shadow-lg">
        <div className="flex flex-col items-center justify-center gap-1 p-6">
          <p className="text-body1 font-semibold">
            이전에 작성 중이던 내용이 있습니다.
          </p>
          <p className="text-body2 font-normal"> 이어서 쓰시겠습니까? </p>
        </div>
        <div className="flex justify-between border-t">
          <Button
            onClick={onContinue}
            className="flex grow items-center justify-center border-r p-3 text-blue-600"
          >
            이어서 쓰기
          </Button>
          <Button
            onClick={onNewStart}
            className="flex grow items-center justify-center p-3 text-red"
          >
            새로 쓰기
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ShoeClosetResumeDraftModal;
