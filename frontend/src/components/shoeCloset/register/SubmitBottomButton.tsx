import { useNavigate } from "react-router-dom";
import BottomButton from "@common/BottomButton";

const SubmitBottomButton = ({ onSubmit }: { onSubmit: () => void }) => {
  const navigate = useNavigate();

  return (
    <div className="p-2 pb-9">
      <BottomButton title="신발 등록하기" onClick={onSubmit} />
    </div>
  );
};

export default SubmitBottomButton;
