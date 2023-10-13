import {axiosNoAuth} from "../Utils/axiosInstance";
import {URLS} from "../Utils/urls";

export const getRefreshToken = async () => {
  const response = await axiosNoAuth.get("refreshToken");
  return response;
};

/**
 * @description : Submit phone no for login
 * @param phone : Phone number of the user
 */
export const SubmitPhone = async (phone: number) => {
  const response = await axiosNoAuth.post(URLS.submitPhone, {phone});
  return response;
};
