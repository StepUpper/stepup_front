import Skeleton from "../common/Skeleton";

const ShoeClosetLoading = () => {
  return (
    <>
      {/* 프로필 영역 */}
      <div className="flex items-center gap-5 px-5">
        <Skeleton isCircle={true} className="size-14" />
        <div className="flex flex-col gap-1">
          <Skeleton className="w-20" />
          <Skeleton className="w-40" />
        </div>
      </div>
      {/* 신발장 리스트 */}
      <div className="grid w-full grid-cols-3 grid-rows-3 gap-1 py-6">
        <Skeleton isSquare={true} className="size-40 rounded-md" />
        <Skeleton isSquare={true} className="size-40 rounded-md" />
        <Skeleton isSquare={true} className="size-40 rounded-md" />
      </div>
    </>
  );
};
export default ShoeClosetLoading;
