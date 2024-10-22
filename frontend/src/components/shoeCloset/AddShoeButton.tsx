import { plusIcon } from "@assets/assets";
import Button from "@components/common/html/Button";
import { useNavigate } from "react-router-dom";

const AddShoeButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      className="item-center size-full rounded-md bg-zinc-200"
      onClick={() => {
        navigate("/shoecloset/add");
      }}
    >
      <img src={plusIcon} />
    </Button>
  );
};

export default AddShoeButton;
