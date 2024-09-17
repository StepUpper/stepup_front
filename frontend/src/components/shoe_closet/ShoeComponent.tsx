import { IProduct } from "@/pages/ShoeCloset/page";

interface ShoeComponentProps {
  id: number;
  prod: IProduct;
}
const ShoeComponent = ({ id, prod }: ShoeComponentProps) => {
  return (
    <a href={`/${id}`}>
      <img src={prod.image} className="rounded-md" />
    </a>
  );
};

export default ShoeComponent;
