import Button from "@common/html/Button";
import { useReviewStore } from "@store/review.store";
import { useSelectedShoeStore } from "@store/selectedShoe.store";
import { useNavigate } from "react-router-dom";

interface SaveDraftProps {
  onClose: () => void;
}

const ShoeClosetSaveDraftModal = (props: SaveDraftProps) => {
  const { onClose } = props;
  const { resetReviewData } = useReviewStore();
  const { resetSelectedShoe } = useSelectedShoeStore();
  const navigate = useNavigate();

  //임시저장 함수
  const handleSave = () => {
    navigate("/shoecloset");
  };

  //임시저장 삭제 함수
  const handleDiscard = () => {
    resetReviewData();
    resetSelectedShoe();
    navigate("/shoecloset");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[320px] rounded-lg bg-white shadow-lg">
        <div className="flex flex-col items-center justify-center gap-1 p-6">
          <p className="text-body1 font-semibold">작성 중인 글을 저장할까요?</p>
          <p className="text-body2 font-normal">
            {" "}
            삭제된 글은 복구할 수 없습니다.{" "}
          </p>
        </div>
        <div className="flex justify-between border-t">
          <Button
            onClick={handleSave}
            className="flex grow items-center justify-center border-r p-3 text-blue-600"
          >
            저장하기
          </Button>
          <Button
            onClick={handleDiscard}
            className="flex grow items-center justify-center p-3 text-red"
          >
            저장 안 함
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ShoeClosetSaveDraftModal;
