const ShoeImageSearchLoading = () => {
  return (
    <>
      <div className="flex h-52 flex-col items-center justify-center space-y-2">
        <div className="absolute flex items-center justify-center bg-slate-500">
          {/* spinner */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute size-3 animate-dot-spin rounded-full bg-black"
              style={{
                transform: `rotate(${i * 30}deg) translate(2.5rem)`, // 각도를 회전시키고 위치 이동
                animationDelay: `${i * 0.1}s`, // 각 도트의 애니메이션 딜레이
                opacity: `${(12 - i) / 12}`, // 각 도트의 불투명도
              }}
            ></div>
          ))}
        </div>
        <p>분석중</p>
      </div>
    </>
  );
};
export default ShoeImageSearchLoading;
