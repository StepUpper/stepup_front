import BottomButton from "@components/common/BottomButton";
import EmptyShoeCard from "./EmptyShoeCard";
import { useNavigate } from "react-router-dom";

const EmptyShoeComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="item-center relative h-full">
      <EmptyShoeCard />
      <div className="absolute bottom-0 w-full">
        <BottomButton
          title="신발 등록하기"
          onClick={() => {
            navigate("/archive/review");
          }}
        />
      </div>
    </div>
  );
};

export default EmptyShoeComponent;
