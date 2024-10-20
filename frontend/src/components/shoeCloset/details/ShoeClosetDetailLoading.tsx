import Skeleton from "@/components/common/Skeleton";

const ShoeClosetDetailLoading = () => {
  return (
    <>
      {/* thumb */}
      <Skeleton
        className="size-full min-h-[136px] rounded-2xl"
        isSquare={true}
      />
      <div className="flex w-screen gap-6 p-4">
        {/* rating */}
        <Skeleton className="h-11 w-14" />
        {/* product info */}
        <div className="flex flex-col gap-1">
          <Skeleton className="w-40" />
          <Skeleton className="w-80" />
        </div>
      </div>
      {/* detail info */}
      <div className="flex flex-col gap-3 px-6 py-4">
        <div className="flex gap-20">
          <Skeleton className="w-20" />
          <Skeleton className="w-20" />
        </div>
        <div className="flex gap-20">
          <Skeleton className="w-20" />
          <Skeleton className="w-20" />
        </div>
        <div className="flex gap-20">
          <Skeleton className="w-20" />
          <Skeleton className="w-20" />
        </div>
        <div className="flex gap-20">
          <Skeleton className="w-20" />
          <Skeleton className="w-20" />
        </div>
        <div className="flex gap-20">
          <Skeleton className="w-20" />
          <Skeleton className="w-20" />
        </div>
        <div className="flex gap-20">
          <Skeleton className="w-20" />
          <Skeleton className="w-20" />
        </div>
      </div>
      <div className="flex flex-col gap-3 px-6 pb-10 pt-3">
        <Skeleton className="w-20" />
        <div className="flex flex-col gap-3 py-1">
          <Skeleton className="w-full" />
          <Skeleton className="w-full" />
          <Skeleton className="w-1/2" />
        </div>
      </div>
    </>
  );
};
export default ShoeClosetDetailLoading;
