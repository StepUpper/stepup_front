import Header from "@common/Header";
import ShoeListComponent from "@components/shoeCloset/ShoeListComponent";
import ProfileCard from "@components/shoeCloset/ProfileCard";
import EmptyShoeComponent from "@components/shoeCloset/EmptyShoeComponent";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import ShoeClosetLoading from "@/components/shoeCloset/ShoeClosetLoading";

export interface IProduct {
  closetId: string;
  image: string;
  modelName: string;
  updatedAt: Timestamp;
}

const ShoeCloset = () => {
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
        fetchShoeCloset(user.uid);
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-full flex-col">
      <Header type="back">신발장</Header>
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
    </div>
  );
};

export default ShoeCloset;