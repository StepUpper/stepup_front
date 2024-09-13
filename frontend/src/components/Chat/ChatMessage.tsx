import { perfittLogo } from "@assets/assets";

interface ChatMessageProps {
  title: string;
}

const ChatMessage = (props: ChatMessageProps) => {
  const { title } = props;
  return (
    <div className="my-2.5 flex items-center bg-white p-4">
      <div className="shrink-0">
        <img src={perfittLogo} alt="perfittLogo" className="size-7" />
      </div>
    <div className="ml-2.5 max-w-md break-words px-1 py-2 text-body3">
        {title}
      </div>
    </div>
  );
};

export default ChatMessage;
