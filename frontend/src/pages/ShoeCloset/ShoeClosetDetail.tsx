import Header from "@/components/common/Header";
import ShoeClosetOptionMenu from "@/components/shoeCloset/details/ShoeClosetOptionMenu";
import { useEffect, useState } from "react";
import ShoeClosetThumb from "@/components/shoeCloset/details/ShoeClosetThumb";
import ShoeClosetMainInfo from "@/components/shoeCloset/details/ShoeClosetMainInfo";
import ShoeClosetDetailInfo from "@/components/shoeCloset/details/ShoeClosetDetailInfo";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { deleteShoesFromCloset } from "@/apis/firebase/closetFirestore";
import { onAuthStateChanged } from "firebase/auth";
import ShoeClosetDetailLoading from "@/components/shoeCloset/details/ShoeClosetDetailLoading";

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

const ShoeClosetDetail = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //헤더 옵션 메뉴 상태
  const [isOptionMenuOpen, setIsOptionMenuOpen] = useState(false);
  const handleOptionClick = () => {
    setIsOptionMenuOpen((prev) => !prev);
  };

  //firestore에서 신발장 정보 불러오기
  const { closetId } = useParams<{ closetId: string }>();
  const [detail, setDetail] = useState<IShoeCloset | null>(null);

  const fetchShoeClosetInfo = async (userId: string) => {
    try {
      if (!closetId) {
        throw new Error("closetId가 없습니다.");
      }

      const shoeClosetInfoRef = doc(
        db,
        "users",
        userId,
        "shoeCloset",
        closetId
      );
      const shoeClosetInfoDoc = await getDoc(shoeClosetInfoRef);

      if (shoeClosetInfoDoc.exists()) {
        const data = shoeClosetInfoDoc.data() as IShoeCloset;
        setDetail(data);
      } else {
        console.warn("등록되지 않은 신발입니다");
        alert("등록되지 않은 신발입니다");
        navigate("/shoecloset", {replace : true});
      }
    } catch (error) {
      console.error(
        "신발장 정보를 가져오는 도중 에러가 발생했습니다. : ",
        error
      );
      navigate("/shoecloset", {replace : true});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        fetchShoeClosetInfo(user.uid);
      } else {
        setIsLoggedIn(false);
        setIsLoading(false);
        navigate("/shoecloset", {replace : true});      
      }
    });

    return () => unsubscribe();
  }, [closetId]);

  const handleModifyClick = () => {
    navigate(`/shoecloset/modify/${closetId}`);
  };

  const handleDeleteClick = async (userId: string, deleteId: string) => {
    await deleteShoesFromCloset(userId, deleteId);
    navigate("/shoecloset", { replace : true });;
  };

  if (!detail) {
    return null;
  };

  if (isLoading) {
    return <ShoeClosetDetailLoading />;
  }

  return (
    <div className="flex flex-col pb-20">
      <Header type="back" optionButton={true} onOptionClick={handleOptionClick} />
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
      {isOptionMenuOpen && (
        <ShoeClosetOptionMenu
          isLoggedIn={isLoggedIn}
          onClose={handleOptionClick}
          modifyButton={true}
          onModify={handleModifyClick}
          deleteButton={true}
          onDelete={() => handleDeleteClick(auth.currentUser?.uid!, closetId!)}
          shareButton={true}
        />
      )}
    </div>
  );
};
export default ShoeClosetDetail;
