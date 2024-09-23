import { perfittLogo } from "@/assets/assets";
import React from "react";

interface ErrorProps {
  message?: string;
}

const Error = ({ message }: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 text-center">
      <img src={perfittLogo} alt="펄핏 로고" className="w-[100px] opacity-30" />
      <p className="text-gray-500">
        데이터를 불러올 수 없습니다.
        <br />
        다시 시도해 주세요.
      </p>
    </div>
  );
};

export default Error;
