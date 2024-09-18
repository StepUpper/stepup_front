export type TUser = {
  uid?: string;
  username: string;
  imgUrl: string | null;
  birthDate: string;
  gender: "female" | "male" | null;
  sizeType?: "EU" | "US" | "mm" | null;
  sneakerSize?: number;
  footInfo?: string | null;
  interests?: string[] | null;
};
