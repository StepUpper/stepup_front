import { ReactNode, useState } from "react";
import { backIcon, menuIcon, dotIcon } from "@assets/assets";
import Button from "@common/html/Button";
import { useNavigate } from "react-router-dom";
import SideMenu from "../sidemenu/SideMenu";

interface HeaderProps {
  // 왼쪽 버튼 타입 설정
  type: "menu" | "back";
  // 페이지 제목 & 내용..
  children?: ReactNode;
  // 추가 옵션 버튼 활성화 여부
  optionButton?: boolean;
  // 추가 옵션 버튼 클릭시 실행되는 내용
  onOptionClick?: () => void;
  // 뒤로가기 버튼 기능 지정할 때
  onBackClick?: () => void;
}

const Header = (props: HeaderProps) => {
  const {
    type,
    children,
    optionButton = false,
    onOptionClick,
    onBackClick,
  } = props;
  const navigate = useNavigate();

  const [isSideOpen, setIsSideOpen] = useState(false);
  const toggleSideMenu = () => {
    setIsSideOpen((prev) => !prev);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleClick = () => {
    if (type === "menu") {
      toggleSideMenu();
    } else if (type === "back" && onBackClick) {
      onBackClick();
    } else {
      handleBack();
    }
  };

  return (
    <>
      <header className="flex w-full items-center justify-between bg-white p-1.5 text-body1 font-label">
        <Button className="border-none" onClick={handleClick}>
          {type === "menu" ? (
            <img src={menuIcon} alt="메뉴 버튼" />
          ) : (
            <img src={backIcon} alt="뒤로가기" />
          )}
        </Button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-center">
          {children}
        </h1>
        <Button className="border-none">
          {optionButton && (
            <img src={dotIcon} alt="추가 옵션 버튼" onClick={onOptionClick} />
          )}
        </Button>
      </header>
      {isSideOpen && <SideMenu isOpen={isSideOpen} onClose={toggleSideMenu} />}
    </>
  );
};
export default Header;
