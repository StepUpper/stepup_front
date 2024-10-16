import BottomButton from "@common/BottomButton";

const SubmitBottomButton = ({ onSubmit }: { onSubmit: () => void }) => {
  return (
    <div className="p-2 pb-9">
      <BottomButton title="신발 등록하기" onClick={onSubmit} />
    </div>
  );
};

export default SubmitBottomButton;
