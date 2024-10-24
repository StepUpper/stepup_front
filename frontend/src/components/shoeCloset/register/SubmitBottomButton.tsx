import { useNavigate } from "react-router-dom";
import BottomButton from "@common/BottomButton";

const SubmitBottomButton = () => {
  const navigate = useNavigate();

  return (
    <div className="p-2 pb-9">
      <BottomButton
        title="신발 등록하기"
        onClick={() => navigate("/archive")}
      />
    </div>
  );
};

export default SubmitBottomButton;
