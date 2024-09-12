import Header from '@common/Header'
import ShoeListComponent from '@/components/ShoeCloset/ShoeListComponent'
import ProfileCard from '@/components/ShoeCloset/ProfileCard'
import EmptyShoeComponent from '@/components/ShoeCloset/EmptyShoeComponent'

export interface IProduct {
  image: string;
}

// TODO: db에서 내 신발장 리스트 받아오기 @노원주
const shoeList: IProduct[] = [
  {
    image:
      "https://image.a-rt.com/art/product/2022/01/60008_1642143249212.jpg?shrink=580:580",
  },
];

const ShoeCloset = () => {
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
