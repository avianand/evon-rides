import {axiosNoAuth} from "../Utils/axiosInstance";
import {URLS} from "../Utils/urls";

/**
 * @description : Submit phone no for login
 * @param phone : Phone number of the user
 */
export const SubmitPhone = async (phone: number) => {
  const response = await axiosNoAuth.post(URLS.submitPhone, {phone});
  return response;
};
