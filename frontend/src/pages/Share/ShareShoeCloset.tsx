import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shareShoeIcon } from "@assets/assets";
import { getShareShoeCloset } from "@apis/firebase/closetFirestore";
import { TShareUser, TShoeCloset } from "@type/shoeCloset";
import ShareView from "@components/common/ShareView";
import ShareShoeList from "@components/shoeCloset/share/ShareShoeList";
import ShareLoading from "@components/shoeCloset/share/ShareLoading";

const ShareShoeCloset = () => {
  const { id } = useParams();
  const [user, setUser] = useState<TShareUser | null>(null);
  const [shoeList, setShoeList] = useState<TShoeCloset[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getShareShoeClosetData = async (userId: string) => {
      setLoading(true);
      const data = await getShareShoeCloset(userId);

      if (data) {
        setUser(data.user);
        setShoeList(data.shoes);
        setLoading(false);
      }
    };

    if (id) getShareShoeClosetData(id);
  }, [id]);

  return (
    <>
      {loading ? (
        <ShareLoading />
      ) : (
        <ShareView
          icon={shareShoeIcon}
          title={`${user?.username}님 신발장`}
          desc={`평소 신는 사이즈 | ${user?.sneakerSize} ${user?.sizeType}`}
        >
          <div className="p-4">
            {shoeList && <ShareShoeList list={shoeList} />}
          </div>
        </ShareView>
      )}
    </>
  );
};
export default ShareShoeCloset;
