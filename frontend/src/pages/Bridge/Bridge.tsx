import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Img from "@common/html/Img";
import { useBottomSheet } from "@/store/bottomSheet.store";
import productAndBrandStore from "@/store/productAndBrand.store";

const Bridge = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = Object.fromEntries(new URLSearchParams(location.search));
  const { type, brandName, productName, customerImg, customerLink } = params;

  const { sheets } = useBottomSheet();

  const { clickedProducts, clickedBrand } = productAndBrandStore();

  const BottomSheetState = {
    sheets,
    type: type,
    data: type === "brand" ? clickedBrand : clickedProducts,
  };

  useEffect(() => {
    // 고객사 링크가 있으면 3초 후에 해당 링크로 리디렉션
    const timer = setTimeout(() => {
      if (customerLink) {
        // 바텀 상태 저장
        sessionStorage.setItem(
          "BottomSheetState",
          JSON.stringify(BottomSheetState)
        );

        // window.location.href = customerLink;
        window.location.replace(customerLink);
      } else {
        // 고객사 링크가 없으면 다른 페이지로 리디렉션 어디로...?
        navigate(-1); // 이전 페이지로..
      }
    }, 2000); // 2초 후에 리디렉션

    return () => clearTimeout(timer);
  }, [customerLink, navigate]);

  console.log(customerImg);
  return (
    <div className="item-center h-screen flex-col gap-9">
      <div className="size-[120px]">
        <Img
          src={customerImg}
          alt={brandName}
          className="rounded-full"
          errorStyle="w-full"
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
