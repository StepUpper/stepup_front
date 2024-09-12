interface UserChatMessageProps {
  title: string;
}

const ChatUserMessage = (props: UserChatMessageProps) => {
  const { title } = props;
  return (
    <div className="flex justify-end p-4">
      <div className="max-w-sm break-words rounded-md rounded-tr-none bg-black px-3.5 py-3 text-body3 text-white">
        {title}
      </div>
    </div>
  );
};

export default ChatUserMessage;
