import axios, {
  AxiosError,
  AxiosRequestConfig,
  HttpStatusCode,
  InternalAxiosRequestConfig
} from "axios";
import {APP_RUNNING_MODE} from "./config";
import {User} from "../Types/interfaces";
import {devBackendBaseUrl} from "./urls";
import {getCookie} from "./functions";
import {AUTH_COOKIES_DATA} from "./constants/constants";

const abortController = new AbortController();
// Define a custom AxiosRequestConfig interface that includes the 'sent' property
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  sent?: boolean;
}

const getNewAccessToken = async () => {
  const response = await axiosNoAuth.get("refreshToken");
  return response;
};

const axiosInstance = axios.create({
  baseURL: devBackendBaseUrl,
  timeout: 5000,
  signal: abortController.signal
});

export const axiosNoAuth = axios.create({
  baseURL: devBackendBaseUrl,
  timeout: 5000,
  headers: {
    Authorization: "NO_TOKEN"
  },
  signal: abortController.signal
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
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
        try {
          const newAccessToken = await getNewAccessToken();
          // Set access token on request header
          config.headers.Authorization = `Bearer ${newAccessToken}`;
        } catch (error) {
          // Redirect to the login page
          console.error("Failed to refresh access token:", error);
          // window.location.replace("/login");
        }
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const prevRequest: CustomAxiosRequestConfig = error?.config || {};
    if (error.response) {
      if (
        [
          HttpStatusCode.Unauthorized,
          HttpStatusCode.UnprocessableEntity,
          HttpStatusCode.InternalServerError
        ].includes(error.response.status) &&
        !prevRequest?.sent
      ) {
        prevRequest.sent = true;
        try {
          const newAccessToken = await getNewAccessToken();

          prevRequest.headers = prevRequest.headers || {};
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return await axiosInstance(prevRequest);
        } catch (refreshError) {
          // Remove cookies in app
          //  clearStoredUser();

          // Redirect to the login page
          // window.location.replace("/login");

          // Log the error
          console.error("Failed to refresh access token:", refreshError);
          return Promise.reject(
            new Error("Failed to refresh access token, redirecting to login")
          );
        }
      } else {
        // Handle other error responses
        return Promise.reject(error);
      }
    } else if (error.request) {
      // Handle network errors
      return Promise.reject(error);
    } else {
      // Handle other errors
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;

export function getJWTHeader(user: User): Record<string, string> {
  return {Authorization: `Bearer ${user.accessToken}`};
}
