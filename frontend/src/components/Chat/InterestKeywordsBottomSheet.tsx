import BottomSheet from "@common/BottomSheet";

const InterestKeywordsBottomSheet = () => {
  return (
    <>
      <BottomSheet
        id="interestKeywords"
        isDragBar={false}
        isOverlayClose={false}
      >
        <BottomSheet.Header isTitleOnly={true}>관심 키워드</BottomSheet.Header>
        <BottomSheet.Content>ddd</BottomSheet.Content>
      </BottomSheet>
    </>
  );
};

export default InterestKeywordsBottomSheet;
