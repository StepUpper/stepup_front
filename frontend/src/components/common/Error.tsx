import { shoeSearch } from "@/assets/assets";

interface ErrorProps {
  message?: string;
}

const Error = ({ message }: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 text-center">
      <img src={shoeSearch} alt="펄핏 로고" className="w-[120px]" />
      {message ? (
        message
      ) : (
        <div>
          <p className="text-gray-500">데이터를 불러올 수 없습니다.</p>
          <span>다시 시도해 주세요.</span>
        </div>
      )}
    </div>
  );
};

export default Error;
