import { memo, useEffect, useRef, useState } from "react";
import PLPControls from "@components/plp/PLPControls";
import ProductItem from "@components/common/ProductItem";
import PLPEmptyList from "@components/plp/PLPEmptyList";
import userStore from "@store/auth.store";
import { TProductResponse } from "@type/product";
import { useSizeConversion } from "@hooks/useSizeConversion";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  Grid,
  GridCellProps,
} from "react-virtualized";

interface PLPProductListProps {
  products: TProductResponse[];
}

const cache = new CellMeasurerCache({
  fixedWidth: true, // 고정된 열 너비
  defaultHeight: 100, // 기본 높이 설정
});

const PLPProductList = (props: PLPProductListProps) => {
  const { products } = props;

  const { user, likeShoes } = userStore();

  const sizeType = user?.sizeType ?? "mm";
  const sneakerSize = user?.sneakerSize ?? null;

  // 신발 사이즈 변환
  const convertedSneakerSize = useSizeConversion(sizeType, sneakerSize);

  const limit = 20;
  const [itemsSize, setItemsSize] = useState(limit);
  const [displayData, setDisplayData] = useState(products.slice(0, limit));

  const observer = useRef<IntersectionObserver | null>(null);

  // 무한스크롤
  // useEffect(() => {
  //   setDisplayData(products.slice(0, itemsSize));
  //   console.log(displayData);
  // }, [products, itemsSize]);

  // const [resizeTrigger, setResizeTrigger] = useState(0);

  // // 창 크기가 변경될 때 리렌더링 트리거
  // useEffect(() => {
  //   const handleResize = () => {
  //     cache.clearAll();  // 캐시 초기화
  //     setResizeTrigger((prev) => prev + 1);  // 상태 변경으로 리렌더링 유도
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const cellRenderer = ({
    columnIndex,
    key,
    parent,
    rowIndex,
    style,
  }: GridCellProps) => {
    const columnCount = parent.props.columnCount;
    const product = products[rowIndex * columnCount + columnIndex];
    if (!product) return null;

    const shoeId = product.brand + product.modelNo;
    const isLiked = likeShoes?.some((shoe) => shoe.shoeId === shoeId);

    console.log(style);
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={columnIndex}
        key={key}
        parent={parent}
        rowIndex={rowIndex}
      >
        {({ measure, registerChild }) => (
          <div
            ref={registerChild as React.LegacyRef<HTMLDivElement>}
            style={{ ...style }}
          >
            <ProductItem
              // ref={index === displayData.length - 1 ? lastElementRef : null}
              // key={shoeId + index}
              shoeId={shoeId}
              productName={product.modelName}
              imgUrl={product.image}
              modelNo={product.modelNo}
              brand={product.brand}
              customerLink={product.link}
              isLiked={isLiked}
              sneakerSize={convertedSneakerSize}
              onImageLoad={measure}
            />
          </div>
        )}
      </CellMeasurer>
    );
  };

  return (
    <>
      <PLPControls totalItems={products.length} />
      <div className="h-[calc(100vh-200px)] w-full px-4 pb-6">
        {products.length > 0 ? (
          <AutoSizer>
            {({ height, width }) => {
              const GUTTER_SIZE = 10;
              const columnCount = width < 768 ? 2 : 4;
              const columnWidth = width / columnCount - GUTTER_SIZE; // 열 너비에서 여백 제외
              const rowCount = Math.ceil(products.length / columnCount); // 행 개수 계산
              // const rowHeight = height / rowCount - GUTTER_SIZE; // 동적 높이
              console.log("gird", width, width / columnCount - GUTTER_SIZE);

              return (
                <Grid
                  columnCount={columnCount} // 아이템 열 갯수
                  columnWidth={columnWidth} // 아이템 넓이
                  // columnWidth={({ index }) =>
                  //   Math.floor(window.innerWidth * 0.25)
                  // }
                  rowCount={rowCount} // 아아텝 행 갯수
                  rowHeight={cache.rowHeight} // 캐시된 아이템 높이 사용
                  width={width} // AutoSizer에서 가져온 동적 너비
                  height={height} // AutoSizer에서 가져온 동적 높이
                  cellRenderer={cellRenderer} // 렌더링될 아이템
                  // deferredMeasurementCache={cache}
                />
              );
            }}
          </AutoSizer>
        ) : (
          <PLPEmptyList />
        )}
      </div>
    </>
  );
};
export default memo(PLPProductList);
