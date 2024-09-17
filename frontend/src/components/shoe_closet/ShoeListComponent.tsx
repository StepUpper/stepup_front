import { IProduct } from "@pages/ShoeCloset/page";
import ShoeComponent from "./ShoeComponent";
import AddShoeButton from "./AddShoeButton";
import { sortIcon } from "@assets/assets";
import { useState } from "react";
import Button from "../common/html/Button";

const ShoeListComponent = ({ list }: { list: IProduct[] }) => {
  const [sort, setSort] = useState(true);
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
      <div className="grid w-full grid-cols-3 gap-1">
        <AddShoeButton />
        {list.map((prod, idx) => (
          <ShoeComponent key={`shoe+${idx}`} id={idx} prod={prod} />
        ))}
      </div>
    </div>
  );
};

export default ShoeListComponent;
