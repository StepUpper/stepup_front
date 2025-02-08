const ChatLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-15">
      <div className="flex space-x-6">
        <div className="size-3 animate-pulse rounded-full bg-gray-400" />
        <div className="animation-delay-200 size-3 animate-pulse rounded-full bg-gray-500" />
        <div className="animation-delay-400 size-3 animate-pulse rounded-full bg-gray-600" />
      </div>
    </div>
  );
};
export default ChatLoading;
