import Header from "@common/Header";
import ShoeListComponent from "@components/shoeCloset/ShoeListComponent";
import ProfileCard from "@components/shoeCloset/ProfileCard";
import EmptyShoeComponent from "@components/shoeCloset/EmptyShoeComponent";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import ShoeClosetLoading from "@components/shoeCloset/ShoeClosetLoading";
import { twMerge } from "tailwind-merge";
import ShoeClosetOptionMenu from "@components/shoeCloset/details/ShoeClosetOptionMenu";
import useToggle from "@hooks/useToggle";
import ShareModal from "@components/common/ShareModal";
import { shareShoeIcon } from "@assets/assets";
import userStore from "@/store/auth.store";

export interface IProduct {
  closetId: string;
  image: string;
  modelName: string;
  updatedAt: Timestamp;
}

const ShoeCloset = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = userStore();

  //헤더 옵션 메뉴 상태
  const { isOpen: isOptionMenuOpen, toggle: toggleOptionMenu } = useToggle();
  // 모달 상태
  const {
    isOpen: isShareModalOpen,
    open: openShareModal,
    close: closeShareModal,
  } = useToggle();

  const [shoeList, setShoeList] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchShoeCloset = async (userId: string) => {
    try {
      const shoeClosetRef = collection(db, "users", userId, "shoeCloset");

      const shoeDocs = await getDocs(shoeClosetRef);
      const shoes = shoeDocs.docs.map((doc) => ({
        closetId: doc.id,
        image: doc.data().img,
        modelName: doc.data().modelName,
        updatedAt: doc.data().updatedAt,
      }));

      setShoeList(shoes);
    } catch (error) {
      console.error("데이터를 가져오는 중 에러 발생: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        fetchShoeCloset(user.uid);
      } else {
        setIsLoading(false);
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleShareShoeCloset = () => {
    if (shoeList.length === 0) {
      return alert("신발장에 등록된 신발이 없습니다. 신발을 등록해주세요.");
    }
    openShareModal();
  };

  return (
    <div
      className={twMerge(
        "flex flex-col",
        shoeList.length ? "" : "h-real-screen"
      )}
    >
      <Header type="back" optionButton={true} onOptionClick={toggleOptionMenu}>
        신발장
      </Header>
      <main className="flex h-full flex-col gap-7 p-4">
        {isLoading ? (
          <ShoeClosetLoading />
        ) : (
          <>
            <ProfileCard />
            {/* shoe list comp */}
            {shoeList.length ? (
              <ShoeListComponent list={shoeList} />
            ) : (
              <EmptyShoeComponent />
            )}
          </>
        )}
      </main>
      {isOptionMenuOpen && (
        <ShoeClosetOptionMenu
          isLoggedIn={isLoggedIn}
          onClose={toggleOptionMenu}
          shareButton={true}
          onShare={handleShareShoeCloset}
        />
      )}
      {/* 공유하기 */}
      {isShareModalOpen && user?.uid && (
        <ShareModal
          icon={shareShoeIcon}
          id={user.uid}
          desc={`신발장 공개 링크가 생성되었습니다. 친구들에게 나만의 신발 컬렉션을 공개해 보세요.`}
          link="/share/shoecloset"
          content={`${user.username}님의 신발장이 열렸습니다!`}
          onClose={closeShareModal}
        />
      )}
    </div>
  );
};

export default ShoeCloset;
