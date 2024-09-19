import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { perfittLogo } from "@assets/assets";

const Bridge = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { customerLink, brandName, productName, customerImage } =
    location.state || {};

  useEffect(() => {
    // 고객사 링크가 있으면 3초 후에 해당 링크로 리디렉션
    const timer = setTimeout(() => {
      if (customerLink) {
        window.open(customerLink, "_blank"); // 새창
        navigate(-1); // 기존창 완료 후 이전 페이지로 이동
      } else {
        // 고객사 링크가 없으면 다른 페이지로 리디렉션 어디로...?
        navigate("/", { replace: true });
      }
    }, 3000); // 3초 후에 리디렉션

    return () => clearTimeout(timer);
  }, [customerLink, navigate]);

  return (
    <div className="item-center h-screen flex-col gap-9">
      <div className="size-[120px]">
        <img
          src={customerImage ? customerImage : perfittLogo}
          alt={brandName}
          width="100%"
        />
      </div>
      <div className="item-center w-full flex-col gap-4">
        <h1 className="text-body1 font-paragraph">
          [{brandName}] {productName}
        </h1>
        <p className="text-body1 font-label">고객사로 이동 중입니다.</p>
        <span className="text-body2 font-paragraph text-[#6B7280]">
          잠시만 기다려 주세요.
        </span>
      </div>
    </div>
  );
};

export default Bridge;
