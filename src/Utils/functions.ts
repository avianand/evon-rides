import {User} from '../Types/interfaces';
import { UserTypes } from '../Types/types';
/* eslint-disable no-plusplus */
import { APP_RUNNING_MODE } from "./config";
import { ACCESS_TOKEN_EXPIRY_DURATION_IN_DAYS, REFRESH_TOKEN_EXPIRY_DURATION_IN_DAYS, USER_DATA_EXPIRY_DURATION_IN_DAYS } from "./constants/constants";
import { AUTH_COOKIES_DATA as AUTH_COOKIES } from "./constants/constants";

/**
 * @description : Sets and saves a cookie in a browser.
 * @param cname : Name of the cookie
 * @param cvalue : Value of the cookie
 * @param exdays : Number of days until cookie expires
 */
export function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

/**
 * @description : Sets and saves a cookie in a browser.
 * @param cname : Name of the cookie
 * @param cvalue : Value of the cookie
 * @param exdays : Number of days until cookie expires
 */
export function getCookie(cname: string) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/**
 * @description : helper to get user from cookies stored in browser
 * @returns {IUser} : User details stored in cookies in a browser
 */
export function getStoredUser() {
  const storedUser: User = {
    userId: getCookie(`${AUTH_COOKIES.userId}_${APP_RUNNING_MODE}`) ?? "",
    name: getCookie(`${AUTH_COOKIES.name}_${APP_RUNNING_MODE}`) ?? "",
    city: getCookie(`${AUTH_COOKIES.city}_${APP_RUNNING_MODE}`) ?? "",
    type: (getCookie(`${AUTH_COOKIES.type}_${APP_RUNNING_MODE}`) as UserTypes) ?? UserTypes.customer,
    accessToken: getCookie(`${AUTH_COOKIES.accessToken}_${APP_RUNNING_MODE}`) ?? "",
    refreshToken: getCookie(`${AUTH_COOKIES.refreshToken}_${APP_RUNNING_MODE}`) ?? "",
    phone: getCookie(`${AUTH_COOKIES.phone}_${APP_RUNNING_MODE}`) ?? "",
    email: getCookie(`${AUTH_COOKIES.email}_${APP_RUNNING_MODE}`) ?? "",
  };
  return storedUser;
}

/**
 * @description : Set the user data into cookies for persistence.
 * @param user : User object which contains user data.
 */
export function setStoredUser(user: ILoginResponse): void {
  const userName = user?.userName;
  const name = user?.name;
  const city = user?.city;
  const accessToken = user?.accessToken;
  const refreshToken = user?.refreshToken;
  const userId = user?.userId;
  const type = user?.type ? user.type : UserTypes.customer;
  const email = user?.email;
  const userImage = user?.userImage;
  const googleImage = user?.googleImage;

  setCookie(
    `${AUTH_COOKIES.accessToken}_${APP_RUNNING_MODE}`,
    accessToken,
    ACCESS_TOKEN_EXPIRY_DURATION_IN_DAYS
  );
  setCookie(
    `${AUTH_COOKIES.refreshToken}_${APP_RUNNING_MODE}`,
    refreshToken,
    REFRESH_TOKEN_EXPIRY_DURATION_IN_DAYS
  );
  setCookie(`${AUTH_COOKIES.userName}_${APP_RUNNING_MODE}`, userName, USER_DATA_EXPIRY_DURATION_IN_DAYS);
  setCookie(`${AUTH_COOKIES.name}_${APP_RUNNING_MODE}`, name, USER_DATA_EXPIRY_DURATION_IN_DAYS);
  setCookie(`${AUTH_COOKIES.city}_${APP_RUNNING_MODE}`, city, USER_DATA_EXPIRY_DURATION_IN_DAYS);
  setCookie(`${AUTH_COOKIES.type}_${APP_RUNNING_MODE}`, type, USER_DATA_EXPIRY_DURATION_IN_DAYS);
  setCookie(`${AUTH_COOKIES.userId}_${APP_RUNNING_MODE}`, userId, USER_DATA_EXPIRY_DURATION_IN_DAYS);
  setCookie(`${AUTH_COOKIES.email}_${APP_RUNNING_MODE}`, email, USER_DATA_EXPIRY_DURATION_IN_DAYS);
  if (userImage)
    setCookie(
      `${AUTH_COOKIES.userImage}_${APP_RUNNING_MODE}`,
      userImage,
      USER_DATA_EXPIRY_DURATION_IN_DAYS
    );
  if (googleImage)
    setCookie(
      `${AUTH_COOKIES.googleImage}_${APP_RUNNING_MODE}`,
      googleImage,
      USER_DATA_EXPIRY_DURATION_IN_DAYS
    );
}

/**
 * @description : Remove stored user data from cookies
 * @param removeCookie : Remove cookie function from react-cookie
 */
export function clearStoredUser(): void {
  setCookie(`${AUTH_COOKIES.accessToken}_${APP_RUNNING_MODE}`, "", 0);
  setCookie(`${AUTH_COOKIES.refreshToken}_${APP_RUNNING_MODE}`, "", 0);
  setCookie(`${AUTH_COOKIES.userName}_${APP_RUNNING_MODE}`, "", 0);
  setCookie(`${AUTH_COOKIES.name}_${APP_RUNNING_MODE}`, "", 0);
  setCookie(`${AUTH_COOKIES.city}_${APP_RUNNING_MODE}`, "", 0);
  setCookie(`${AUTH_COOKIES.type}_${APP_RUNNING_MODE}`, "", 0);
  setCookie(`${AUTH_COOKIES.userId}_${APP_RUNNING_MODE}`, "", 0);
  setCookie(`${AUTH_COOKIES.email}_${APP_RUNNING_MODE}`, "", 0);
  setCookie(`${AUTH_COOKIES.userImage}_${APP_RUNNING_MODE}`, "", 0);
  setCookie(`${AUTH_COOKIES.googleImage}_${APP_RUNNING_MODE}`, "", 0);
}
