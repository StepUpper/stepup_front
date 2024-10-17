import Header from "@common/Header";
import ShoeListComponent from "@components/shoeCloset/ShoeListComponent";
import ProfileCard from "@components/shoeCloset/ProfileCard";
import EmptyShoeComponent from "@components/shoeCloset/EmptyShoeComponent";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";

export interface IProduct {
  closetId: string;
  image: string;
  modelName: string;
  updatedAt: Timestamp;
}

const ShoeCloset = () => {
  const [shoeList, setShoeList] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchShoeCloset = async () => {
    try {
      const userId = auth.currentUser?.uid!;
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
    fetchShoeCloset();
  },[]);

  if (isLoading) {
    return <div> Loading...</div>;
  }

  return (
    <div className="flex h-full flex-col">
      <Header type="back">신발장</Header>
      <main className="flex h-full flex-col gap-7 p-4">
        <ProfileCard />

        {/* shoe list comp */}
        {shoeList.length ? (
          <ShoeListComponent list={shoeList} />
        ) : (
          <EmptyShoeComponent />
        )}
      </main>
    </div>
  );
};

export default ShoeCloset;
