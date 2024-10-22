import BottomButton from "@components/common/BottomButton";
import EmptyShoeCard from "./EmptyShoeCard";
import { useNavigate } from "react-router-dom";

const EmptyShoeComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="item-center flex flex-1 flex-col">
      <EmptyShoeCard />
      <div className="bottom-0 w-full">
        <BottomButton
          title="신발 등록하기"
          onClick={() => {
            navigate("/shoecloset/add");
          }}
        />
      </div>
    </div>
  );
};

export default EmptyShoeComponent;
