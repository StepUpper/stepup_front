import { perfittLogo } from "@assets/assets";
import Button from "../common/html/Button";
import { Link } from "react-router-dom";

const ChatLogin = () => {
  return (
    <>
      <div className="flex items-start bg-white px-4 pt-4">
        <div className="shrink-0">
          <img src={perfittLogo} alt="perfittLogo" className="size-7" />
        </div>
        <p className="ml-2.5 py-2 pr-1 text-sm">
          안녕하세요 펄핏AI 입니다!
          <br />
          맞춤 추천을 위해 먼저 로그인을 해주세요.
        </p>
      </div>
      <div className="flex flex-col gap-1.5 pb-4 pl-12 pt-1">
        <Link to="#signup" className="w-fit">
          <Button
            className="h-8 w-44 rounded-md bg-grey-50 px-4 py-1 text-sm"
          >
            구글
          </Button>
        </Link>
        <Link to="#login" className="w-fit">
          <Button className="h-8 w-44 rounded-md bg-grey-50 px-4 py-1 text-sm">
            이메일 로그인
          </Button>
        </Link>
        <div className="flex h-8 w-44 items-center justify-center">
          <p className="text-sm">또는</p>
        </div>
        <Link to="#signup" className="w-fit">
          <Button className="h-8 w-44 rounded-md bg-grey-50 px-4 py-1 text-sm">
            회원가입 하기
          </Button>
        </Link>
      </div>
    </>
  );
};
export default ChatLogin;
