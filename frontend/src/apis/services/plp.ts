import api from "@apis/apis";
import { chatApi } from "@apis/services/chat";

export const getBrandInfo = async (brandName: string) => {
  try {
    const response = await api.get(chatApi.getBrandInfo(brandName));
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
