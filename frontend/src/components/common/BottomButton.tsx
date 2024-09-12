import Button from "@common/html/Button";

interface BottomButtonProps {
  title: string;
  onClick: ()=>void;
}

const BottomButton = (props: BottomButtonProps) => {
  const { title, onClick } = props;
  return (
    <>
      <Button className="w-full rounded bg-black px-3.5 py-4 text-white" onClick={onClick}>
        {title}
      </Button>
    </>
  );
};
export default BottomButton;