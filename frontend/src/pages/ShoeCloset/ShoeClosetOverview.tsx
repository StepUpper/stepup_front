import Header from "@/components/common/Header";
import ShoeClosetOptionMenu from "@/components/shoeCloset/details/ShoeClosetOptionMenu";
import { useEffect, useState } from "react";
import ShoeClosetThumb from "@/components/shoeCloset/details/ShoeClosetThumb";
import ShoeClosetMainInfo from "@/components/shoeCloset/details/ShoeClosetMainInfo";
import ShoeClosetDetailInfo from "@/components/shoeCloset/details/ShoeClosetDetailInfo";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

interface IShoeCloset {
  brand: string;
  height: string;
  img: string;
  len: string;
  modelName: string;
  rating: number;
  recommendSize: string;
  soft: string;
  text: string;
  weight: string;
  width: string;
}

//TODO: 신발 상세 페이지에서 그냥 새로고침 하면 
const ShoeClosetOverview = () => {
  const navigate = useNavigate();

  //헤더 옵션 메뉴 상태
  const [isOptionMenuOpen, setIsOptionMenuOpen] = useState(false);
  const handleOptionClick = () => {
    setIsOptionMenuOpen((prev) => !prev);
  };

  //firestore에서 신발장 정보 불러오기
  const { closetId } = useParams<{ closetId: string }>();
  const [detail, setDetail] = useState<IShoeCloset | null>(null);
  
  const fetchShoeClosetInfo = async () => {
    if (!closetId) {
      console.error("closetId가 없습니다.");
      return;
    }
    const userId = auth.currentUser?.uid!;

    const shoeClosetInfoRef = doc(db, "users", userId, "shoeCloset", closetId);
    const shoeClosetInfoDoc = await getDoc(shoeClosetInfoRef);

    if(shoeClosetInfoDoc.exists()) {
      const data = shoeClosetInfoDoc.data() as IShoeCloset
      setDetail(data);
    } else {
      <div> 등록되지 않은 신발입니다 </div>
    }
  };

  useEffect(() => {
    fetchShoeClosetInfo();
  },[closetId]);

  if (!detail) {
    return <div>로딩 중...</div>;
  }

  const handleModifyClick = () => {
    navigate(`/archive/modify/${closetId}`);
  }

  return (
    <div className="flex h-full flex-col">
      <Header type="back" optionButton={true} onOptionClick={handleOptionClick}>
        신발 상세
      </Header>

      <main className="p-4">
        <ShoeClosetThumb img={detail.img} modelName={detail.modelName} />
        <ShoeClosetMainInfo
          rating={detail.rating}
          brand={detail.brand}
          modelName={detail.modelName}
        />
        <ShoeClosetDetailInfo
          len={detail.len}
          width={detail.width}
          height={detail.height}
          soft={detail.soft}
          weight={detail.weight}
          recommendSize={detail.recommendSize}
          text={detail.text}
        />
      </main>
      {isOptionMenuOpen && 
        <ShoeClosetOptionMenu 
          onClose={handleOptionClick} 
          goToModify={handleModifyClick} 
        />}
    </div>
  );
};
export default ShoeClosetOverview;
