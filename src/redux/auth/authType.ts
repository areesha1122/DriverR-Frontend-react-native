// Main State Interface
export interface AuthState {
  token: string;
  userId: string;
  phoneNumber: string;
  isNewCompany: boolean;
  profile: any;
  account_type: string;
  notificationCounter: any;
  msgCounter: any;
  language: string;
}

// Api Calls Request Input Interfaces
export interface DriverLoginData {
  phoneNumber: string;
  password: string;
}

export interface DriverRegisterData {
  phoneNumber: string;
}

export interface DriverRegisterDataa {
  phoneNumber: string;
  password: string;
}

export interface DriverVerifyOtpData {
  phoneNumber: string;
  otp: string;
}

export interface ChangePasswordData {
  phoneNumber: string | undefined;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ResetPasswordData {
  phoneNumber: any;
  newPassword: string;
  confirmNewPassword: string;
}

// All action types
export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const SET_IS_NEW_COMPANY = 'SET_IS_NEW_COMPANY';
export const SET_USER_ID = 'SET_USER_ID';
export const SET_PHONE_NUMBER = 'SET_PHONE_NUMBER';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const SET_ACCOUNT_TYPE = 'SET_ACCOUNT_TYPE';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_MSG_COUTER = 'SET_MSG_COUTER';
export const SET_NOTIFICATION_COUTER = 'SET_NOTIFICATION_COUTER';
export const RESET = 'RESET';

// Defination of all interfaces for auth actions
export interface SetUserTokenAction {
  type: typeof SET_USER_TOKEN;
  token: string;
}

export interface SetNotificationCounterAction {
  type: typeof SET_NOTIFICATION_COUTER;
  notificationCounter: any;
}

export interface SetMsgCounterAction {
  type: typeof SET_MSG_COUTER;
  msgCounter: any;
}

export interface SetIsNewCompanyAction {
  type: typeof SET_IS_NEW_COMPANY;
  isNewCompany: boolean;
}
export interface SetUserIdAction {
  type: typeof SET_USER_ID;
  userId: string;
}

export interface SetPhoneNumberAction {
  type: typeof SET_PHONE_NUMBER;
  phoneNumber: string;
}

export interface SetUserProfileAction {
  type: typeof SET_USER_PROFILE;
  profile: any;
}

export interface SetUserProfileAction {
  type: typeof SET_USER_PROFILE;
  profile: any;
}

export interface SetAccountTypeAction {
  type: typeof SET_ACCOUNT_TYPE;
  account_type: any;
}
export interface SetLanguageAction {
  type: typeof SET_LANGUAGE;
  language: any;
}
export interface resetAction {
  type: typeof RESET;
}

// Export all defined action
export type AuthAction =
  | SetUserTokenAction
  | SetIsNewCompanyAction
  | SetUserIdAction
  | SetPhoneNumberAction
  | SetUserProfileAction
  | SetLanguageAction
  | SetNotificationCounterAction
  | SetMsgCounterAction
  | resetAction
  | SetAccountTypeAction;
