import { shoeSearch } from "@/assets/assets";

interface ErrorProps {
  message?: string;
}

const Error = ({ message }: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 text-center">
      <img src={shoeSearch} alt="데이터 불러올 수 없음" className="w-[120px]" />
      {message ? (
        message
      ) : (
        <div className="flex flex-col gap-1">
          <p className="text-body2 font-label">데이터를 불러올 수 없습니다.</p>
          <span className="text-gray-500">다시 시도해 주세요.</span>
        </div>
      )}
    </div>
  );
};

export default Error;
