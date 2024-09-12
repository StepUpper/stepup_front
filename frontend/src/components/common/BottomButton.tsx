import Button from "@common/html/Button";

interface BottomButtonProps {
  title: string;
}

const BottomButton = (props: BottomButtonProps) => {
  const { title } = props;
  return (
    <>
      <Button className="w-full rounded bg-black px-3.5 py-4 text-white">
        {title}
      </Button>
    </>
  );
};
export default BottomButton;
