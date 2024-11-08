import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sortIcon } from "@assets/assets";
import Button from "@components/common/html/Button";
import ShoeComponent from "@components/shoeCloset/ShoeComponent";
import { TShoeCloset } from "@type/shoeCloset";
import userStore from "@store/auth.store";

const ShareShoeList = ({ list }: { list: TShoeCloset[] }) => {
  const [sort, setSort] = useState(true);

  const { isLoggedIn } = userStore();
  const navigate = useNavigate();

  const sortedList = list.slice().sort((a, b) => {
    const aTime =
      a.updatedAt.seconds * 1000 + a.updatedAt.nanoseconds / 1000000;
    const bTime =
      b.updatedAt.seconds * 1000 + b.updatedAt.nanoseconds / 1000000;

    return sort ? bTime - aTime : aTime - bTime;
  });

  // TODO: 로그인 상태일 때 신발 리뷰 볼 수 있도록 처리
  // TODO: 안내 모달창 UI 작업 필요
  const handleShoeClick = () => {
    if (!isLoggedIn) {
      const userConfirmed = confirm(
        "신발에 대한 자세한 정보를 보려면 로그인해 주세요. 로그인하시겠습니까?"
      );
      if (userConfirmed) {
        navigate("/");
      } else {
        console.log("사용자가 로그인을 취소했습니다.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-body3">
        <p className="font-label">총 {list.length}개</p>
        <Button
          className="flex items-center gap-1.5 border-0 font-medium text-grey-400"
          onClick={() => setSort((sort) => !sort)}
        >
          {sort ? "최신순" : "오래된순"}
          <img src={sortIcon} className={`${sort || "rotate-180"}`} />
        </Button>
      </div>
      <div className="grid w-full grid-cols-3 grid-rows-3 gap-1">
        {sortedList.map((product) => (
          <ShoeComponent
            key={product.closetId}
            prod={{
              closetId: product.closetId,
              image: product.img,
              modelName: product.modelName,
              updatedAt: product.updatedAt,
            }}
            onClick={handleShoeClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ShareShoeList;
