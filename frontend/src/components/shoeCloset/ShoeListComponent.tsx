import { IProduct } from "@/pages/ShoeCloset/ShoeCloset";
import ShoeComponent from "./ShoeComponent";
import AddShoeButton from "./AddShoeButton";
import { sortIcon } from "@assets/assets";
import { useState } from "react";
import Button from "../common/html/Button";

const ShoeListComponent = ({ list }: { list: IProduct[] }) => {
  const [sort, setSort] = useState(true);

  const sortedList = list.slice().sort((a, b) => {
    const aTime =
      a.updatedAt.seconds * 1000 + a.updatedAt.nanoseconds / 1000000;
    const bTime =
      b.updatedAt.seconds * 1000 + b.updatedAt.nanoseconds / 1000000;

    return sort ? bTime - aTime : aTime - bTime;
  });
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
        <AddShoeButton />
        {sortedList.map((prod) => (
          <ShoeComponent key={prod.closetId} prod={prod} />
        ))}
      </div>
    </div>
  );
};

export default ShoeListComponent;
