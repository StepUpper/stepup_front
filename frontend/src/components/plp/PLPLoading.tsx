import Skeleton from "@common/Skeleton";

interface PLPLoadingProps {
  type: "brand" | "product";
}

const PLPLoading = (props: PLPLoadingProps) => {
  const { type } = props;
  return (
    <>
      {type === "brand" && (
        <>
          {/* AD */}
          <Skeleton className="h-[260px] sm:h-32" />

          {/* 성별 카테고리 */}
          <div className="p-4">
            <Skeleton className="h-[34px] w-4/5" />
          </div>
        </>
      )}

      {/* 상품 영역 */}
      <div className="flex items-center justify-between px-4 py-[0.63rem]">
        <Skeleton className="h-[21px] w-[77px]" />
        <Skeleton className="h-[21px] w-[95px]" />
      </div>

      <div className="overflow-y-auto px-4 pb-6">
        <ul className="grid w-full grid-cols-2 gap-3 md:grid-cols-4">
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <li key={index} className="w-full min-w-[136px] list-none">
                {/* 상단 이미지 영역 */}
                <div className="relative">
                  <Skeleton
                    isSquare={true}
                    className="size-full min-h-[136px]"
                  />

                  {/* 판매처 이미지 */}
                  <Skeleton
                    isCircle={true}
                    className="absolute -bottom-3 right-1.5 size-6 rounded-full bg-gray-300"
                  />
                </div>

                {/* 하단 신발 정보 */}
                <div className="flex flex-col gap-2.5 px-0 py-2.5 text-body3 sm:px-1.5">
                  <div className="flex flex-col gap-[3px]">
                    <Skeleton className="h-[21px] w-4/5" />
                    <Skeleton className="h-[21px]" />
                  </div>
                  <Skeleton className="h-[36px] rounded-md" />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};
export default PLPLoading;
