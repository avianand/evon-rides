import axios, {HttpStatusCode, InternalAxiosRequestConfig} from "axios";
import {APP_RUNNING_MODE} from "./config";
import {User} from "../Types/interfaces";
import {getRefreshToken} from "../Api/authApis";
import {devBackendBaseUrl} from "./urls";
import {getCookie, setCookie} from "./functions";
import {
  ACCESS_TOKEN_EXPIRY_DURATION_IN_DAYS,
  AUTH_COOKIES_DATA,
  REFRESH_TOKEN_EXPIRY_DURATION_IN_DAYS
} from "./constants/constants";

const axiosInstance = axios.create({
  baseURL: devBackendBaseUrl,
  timeout: 5000
});

export const axiosNoAuth = axios.create({
  baseURL: devBackendBaseUrl,
  timeout: 5000,
  headers: {
    Authorization: "NO_TOKEN"
  }
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config?.headers?.Authorization) {
      config.headers = config.headers ?? {
        "Content-Type": "multipart/form-data"
      };
      const accessToken = getCookie(
        `${AUTH_COOKIES_DATA.accessToken}_${APP_RUNNING_MODE}`
      );
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        throw new Error("Please login.");
      }
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: any) => response,
  async (error: {config: any; response: {status: number}}) => {
    const prevRequest = error?.config;
    if (
      (error?.response?.status === HttpStatusCode.Unauthorized ||
        error?.response?.status === 422 ||
        error?.response?.status === 500) &&
      !prevRequest?.sent
    ) {
      prevRequest.sent = true;
      const response = await getRefreshToken();
      if (response.status === HttpStatusCode.Created) {
        prevRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setCookie(
          `${AUTH_COOKIES_DATA.refreshToken}_${APP_RUNNING_MODE}`,
          response.data.refreshToken,
          REFRESH_TOKEN_EXPIRY_DURATION_IN_DAYS
        );
        setCookie(
          `${AUTH_COOKIES_DATA.accessToken}_${APP_RUNNING_MODE}`,
          response.data.accessToken,
          ACCESS_TOKEN_EXPIRY_DURATION_IN_DAYS
        );
        return axiosInstance(prevRequest);
      }
      // todo handle invalid refresh token scenario
      return Promise.reject(new Error("please login again"));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

export function getJWTHeader(user: User): Record<string, string> {
  return {Authorization: `Bearer ${user.accessToken}`};
}
