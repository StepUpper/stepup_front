import LikeButton, { LikeButtonProps } from "@common/LikeButton";

interface ProductItemProps {
  recSize?: string;
  brand: string;
  title: string;
  imgUrl: string;
}

const ChatProductItem = (props: ProductItemProps) => {
  const { brand, title, imgUrl } = props;
  return (
    <div className="w-[166px] overflow-hidden rounded-md border border-grey-50">
      <div className="relative h-[155px]">
        <div className="h-[146px] overflow-hidden bg-grey-50">
          <img src={imgUrl} alt={title} className="w-full object-cover" />
        </div>
        {/* 유저 발정보가 있을때만 */}
        <span className="absolute left-2.5 top-2 flex rounded bg-gradient-to-r from-[#e8f4fe] to-[#ffecfe] p-[0.31rem]">
          <strong className="bg-gradient-to-r from-[#12C2E9] via-[#C471ED] to-[#F64F59] bg-clip-text text-caption1 font-label leading-4 text-transparent">
            240mm 추천
          </strong>
        </span>
        {/* <LikeButton className="absolute right-[0.69rem] top-2" /> */}
        <div className="absolute bottom-0.5 right-1.5 size-6 rounded-full bg-grey-400">
          <img alt={brand} />
        </div>
      </div>
      <div className="flex flex-col gap-2.5 px-1.5 py-2.5 text-body3">
        <div className="flex flex-col gap-[3px]">
          <strong className="text-caption1 font-paragraph">{brand}</strong>
          <h3 className="truncate font-label">{title}</h3>
        </div>
      </div>
    </div>
  );
};
export default ChatProductItem;
