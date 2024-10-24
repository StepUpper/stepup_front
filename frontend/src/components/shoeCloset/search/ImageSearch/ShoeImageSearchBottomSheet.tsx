import { shoeSearchApi } from "@/apis/services/shoeSearch";
import useAxios from "@/hooks/useAxios";
import BottomSheet from "@components/common/BottomSheet";
import ImageSearchLoading from "@/components/shoeCloset/search/ImageSearch/ShoeImageSearchLoading";
import { useLocation } from "react-router-dom";
import ShoeImageSearchResult from "./ShoeImageSearchResult";

const ShoeImageSearchBottomSheet = () => {
  const location = useLocation();
  const imageUrl = location.state;

  // TODO: 에러처리
  const { data, isLoading, isError } = useAxios(
    shoeSearchApi.postShoeImageSearch,
    null,
    { imageUrl: imageUrl }
  );

  return (
    <>
      <BottomSheet id="imageSearch" isDragBar={false} isOverlayClose={false}>
        <BottomSheet.Content>
          {isLoading ? (
            <ImageSearchLoading />
          ) : (
            <ShoeImageSearchResult products={data.products} />
          )}
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
};
export default ShoeImageSearchBottomSheet;
