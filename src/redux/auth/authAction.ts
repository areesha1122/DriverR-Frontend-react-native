import {SET_DRIVER_INTERVIEWS} from '../jobPosts/jobPostsType';
import {
  AuthAction,
  RESET,
  SET_ACCOUNT_TYPE,
  SET_IS_NEW_COMPANY,
  SET_LANGUAGE,
  SET_MSG_COUTER,
  SET_NOTIFICATION_COUTER,
  SET_PHONE_NUMBER,
  SET_USER_ID,
  SET_USER_PROFILE,
  SET_USER_TOKEN,
} from './authType';

// Define all the actions required to set values in store
export const setUserId = (userId: string): AuthAction => ({
  type: SET_USER_ID,
  userId,
});

export const setIsNewCompanyAction = (isNewCompany: boolean): AuthAction => ({
  type: SET_IS_NEW_COMPANY,
  isNewCompany,
});

export const setUserToken = (token: string): AuthAction => ({
  type: SET_USER_TOKEN,
  token,
});

export const setPhoneNumber = (phoneNumber: string): AuthAction => ({
  type: SET_PHONE_NUMBER,
  phoneNumber,
});

export const setProfile = (profile: any): AuthAction => ({
  type: SET_USER_PROFILE,
  profile,
});

export const setAccountType = (account_type: string): AuthAction => ({
  type: SET_ACCOUNT_TYPE,
  account_type,
});

export const setLanguage = (language: string): AuthAction => ({
  type: SET_LANGUAGE,
  language,
});

export const setNotificationCounter = (
  notificationCounter: any,
): AuthAction => ({
  type: SET_NOTIFICATION_COUTER,
  notificationCounter,
});

export const setMsgCounter = (msgCounter: any): AuthAction => ({
  type: SET_MSG_COUTER,
  msgCounter,
});

export const reset = (): AuthAction => ({
  type: RESET,
});
