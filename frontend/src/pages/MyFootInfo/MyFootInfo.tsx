import { useEffect, useState } from "react";
import Header from "@common/Header";
import FootInfoPlaceholder from "@components/myFootInfo/FootInfoPlaceholder";
import FootInfoDisplay from "@components/myFootInfo/FootInfoDisplay";

interface PerfittSizeConfig {
  customerId: string; // 유저 로그인 아이디
  brand?: string; // 신발 브랜드
  modelNo?: string; // 신발 모델 번호
  gender?: "f" | "m"; // 성별 ('f'는 여성, 'm'은 남성)
}

declare global {
  interface Window {
    // TODO: 사용자 정보 추가 예정
    // initializePerfittSize: (config: PerfittSizeConfig) => void;
    initializePerfittSize: () => void;
  }
}

const MyFootInfo = () => {
  // TODO: 사용자 내 발 정보 있는지 여부에 따라 처리를 해야하는데...
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // window.initializePerfittSize({ customerId: "test" });
    window.initializePerfittSize();
  }, []);

  return (
    <>
      <Header type="back">내 발 측정하기</Header>
      <main className="container-y items-center justify-center pb-9">
        {isLoading ? <FootInfoDisplay /> : <FootInfoPlaceholder />}
      </main>
    </>
  );
};
export default MyFootInfo;
