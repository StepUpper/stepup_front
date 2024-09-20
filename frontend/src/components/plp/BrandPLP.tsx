import { Link } from "react-router-dom";
import GenderCategorySelector, {
  GenderCategory,
} from "@components/plp/GenderCategorySelector";

interface BrandPLPProps {
  customerLink: string;
  brandHeaderImage: string;
  description: string;
  selectedCategory: GenderCategory;
  setSelectedCategory: (value: GenderCategory) => void;
}

const BrandPLP = (props: BrandPLPProps) => {
  const {
    customerLink,
    brandHeaderImage,
    description,
    selectedCategory,
    setSelectedCategory,
  } = props;
  return (
    <>
      <Link to={customerLink}>
        <div
          className="item-center h-[6.3rem] w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${brandHeaderImage})`,
          }}
        >
          <span className="text-body2 font-label text-white">
            {description}
          </span>
          {/* <img src="" alt={`${"brandInfo.brand"} 로고`} /> */}
        </div>
      </Link>
      <GenderCategorySelector
        selectedGender={selectedCategory}
        onClick={(value) => setSelectedCategory(value)}
      />
    </>
  );
};
export default BrandPLP;
