import Skeleton from "@components/common/Skeleton";

const ShareLoading = () => {
  return (
    <>
      <div className="min-h-real-screen flex flex-col">
        <header className="sticky top-0 w-full border-b bg-white p-4">
          <Skeleton isSquare={true} className="mb-2 w-5" />
          <Skeleton className="mb-2 w-24" />
          <Skeleton className="mb-2 w-32" />
        </header>
        <div className="p-4">
          <div className="flex justify-between text-body3">
            <Skeleton className="mb-2 w-10" />
            <Skeleton className="mb-2 w-10" />
          </div>
          <main>
            <div className="grid w-full grid-cols-3 grid-rows-3 gap-1">
              <Skeleton isSquare={true} className="size-full" />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
export default ShareLoading;
