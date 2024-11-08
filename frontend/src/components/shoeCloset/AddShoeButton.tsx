import { useReviewStore } from "@/store/review.store";
import { plusIcon } from "@assets/assets";
import Button from "@components/common/html/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShoeClosetDraftModal from "./ShoeClosetDraftModal";
import { useSelectedShoeStore } from "@/store/selectedShoe.store";

const AddShoeButton = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { hasReviewDraft } = useReviewStore();
  const { hasShoeDraft } = useSelectedShoeStore();

  const handleClick = () => {
    if (hasReviewDraft() || hasShoeDraft()) {
      setIsModalOpen(true);
    } else {
      navigate("/shoecloset/add");
    }
  };

  const handleContinue = () => {
    setIsModalOpen(false);
    navigate("/shoecloset/add");
  };

  const handleNewStart = () => {
    setIsModalOpen(false);
    useReviewStore.getState().resetReviewData();
    useSelectedShoeStore.getState().resetSelectedShoe();
    navigate("/shoecloset/add");
  };

  return (
    <>
      <Button
        className="item-center size-full rounded-md bg-zinc-200"
        onClick={handleClick}
      >
        <img src={plusIcon} />
      </Button>

      {isModalOpen && (
        <ShoeClosetDraftModal
          onContinue={handleContinue}
          onNewStart={handleNewStart}
        />
      )}
    </>
  );
};

export default AddShoeButton;
