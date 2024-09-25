import { twMerge } from "tailwind-merge";

interface SkeletonProps {
  className?: string;
  isSquare?: boolean; // 정사각 1:1 비율
  isCircle?: boolean; // 원형
}

const Skeleton: React.FC<SkeletonProps> = ({
  isSquare = false,
  isCircle = false,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "h-5 w-full animate-pulse rounded-[0.39rem] bg-gray-200",
        isCircle && "rounded-full",
        className
      )}
      style={isSquare ? { aspectRatio: "1 / 1" } : undefined}
    />
  );
};

export default Skeleton;
