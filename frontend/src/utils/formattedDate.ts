// 날짜 포멧
const formattedDate = (timestamp: Date | undefined): string | null => {
  if (!timestamp) return null;

  return timestamp?.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
export default formattedDate;
