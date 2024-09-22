import BottomSheet from "@common/BottomSheet";
import BrandPLP from "@components/plp/BrandPLP";

interface PLPBottomSheetProps {
  brandName: string | null;
}

const PLPBottomSheet = (props: PLPBottomSheetProps) => {
  const { brandName } = props;
  console.log(brandName);

  return (
    <>
      <BottomSheet id="plp" isDragBar={true}>
        <BottomSheet.Content className="w-full gap-3 overflow-y-hidden p-0">
          {/* 콘텐츠 */}
          {brandName && <BrandPLP brandName={brandName} />}
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
};
export default PLPBottomSheet;
