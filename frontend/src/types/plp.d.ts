export type TProduct = {
  brand: string;
  gender: MM | WW;
  image: string;
  link: string;
  modelName: string;
  modelNo: string;
};

export type TBrandPLPResponse = {
  brand: string;
  brandHeaderImage: string;
  description: string;
  link: string;
  products: TProduct[];
};
