import Button from "@common/html/Button";
import Input from "@common/html/Input";
import { imageSelectIcon, arrowUpIcon } from "@assets/assets";
import { useState } from "react";

const ChatInput = () => {
  const [chatMsg, setChatMsg] = useState("");

  return (
    <div className="flex h-28 w-full items-center bg-gray-100 pb-10 pl-4 pr-4 pt-4">
      <img src={imageSelectIcon} alt="imageSelectIcon" className="mr-2 w-5" />

      <div className="flex flex-grow items-center rounded-full border border-gray-300 bg-white">
        <Input
          className="h-12 flex-grow border-none bg-transparent pb-3.5 pl-4 pr-1 pt-3.5 text-gray-500 outline-none"
          placeholder="궁금한 신발 정보 물어보세요!"
          onChange={(e) => setChatMsg(e.target.value)}
        />

        <Button className="mr-1 flex h-10 w-10 items-center justify-center rounded-full border-none bg-black">
          <img src={arrowUpIcon} alt="arrowUpIcon" className="w-6 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
