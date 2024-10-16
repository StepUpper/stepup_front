const ShoeClosetDetailInfo = ({
  len,
  width,
  height,
  soft,
  weight,
  recommendSize,
  text,
}: {
  len: string;
  width: string;
  height: string;
  soft: string;
  weight: string;
  recommendSize: string;
  text: string;
}) => {
  return (
    <>
      <div className="px-4 py-1">
        {/* 신발 리뷰 항목 */}
        <table className="border-separate" style={{ borderSpacing: "0 10px" }}>
          <tr className="">
            <td className="pr-20 font-medium text-grey-400">신발 길이</td>
            <td className="font-normal text-black">{len}</td>
          </tr>
          <tr className="">
            <td className="pr-20 font-medium text-grey-400">발볼 너비</td>
            <td className="font-normal text-black">{width}</td>
          </tr>
          <tr className="">
            <td className="pr-20 font-medium text-grey-400">발등 높이</td>
            <td className="font-normal text-black">{height}</td>
          </tr>
          <tr className="">
            <td className="pr-20 font-medium text-grey-400">밑창</td>
            <td className="font-normal text-black">{soft}</td>
          </tr>
          <tr className="">
            <td className="pr-20 font-medium text-grey-400">무게</td>
            <td className="font-normal text-black">{weight}</td>
          </tr>
          <tr className="">
            <td className="pr-20 font-medium text-grey-400">사이즈 추천</td>
            <td className="font-normal text-black">{recommendSize}</td>
          </tr>
        </table>
      </div>
      <div className="flex flex-col gap-3 px-4 pb-10 pt-2">
        {/* 신발 리뷰 상세 */}
        <p className="font-medium text-grey-400"> 리뷰 </p>
        <p> {text} </p>
      </div>
    </>
  );
};
export default ShoeClosetDetailInfo;
