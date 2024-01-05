import {
  AuthState,
  SET_USER_TOKEN,
  SET_USER_ID,
  SET_PHONE_NUMBER,
  SET_USER_PROFILE,
  SET_ACCOUNT_TYPE,
  SET_IS_NEW_COMPANY,
  SET_LANGUAGE,
  SET_NOTIFICATION_COUTER,
  SET_MSG_COUTER,
  RESET,
} from './authType';
import {AppAction} from '../AppAction';

const initialState: AuthState = {
  userId: '',
  token: '',
  phoneNumber: '',
  isNewCompany: false,
  profile: {},
  account_type: '',
  notificationCounter: 0,
  msgCounter: 0,
  language: 'English',
};

const authReducer = function (state = initialState, action: AppAction) {
  try {
    switch (action.type) {
      case SET_USER_ID:
        return {
          ...state,
          userId: action.userId,
        };

      case SET_USER_TOKEN:
        return {
          ...state,
          token: action.token,
        };

      case SET_PHONE_NUMBER:
        return {
          ...state,
          phoneNumber: action.phoneNumber,
        };

      case SET_USER_PROFILE:
        return {
          ...state,
          profile: action.profile,
        };

      case SET_NOTIFICATION_COUTER:
        return {
          ...state,
          notificationCounter: action.notificationCounter,
        };

      case SET_MSG_COUTER:
        return {
          ...state,
          msgCounter: action.msgCounter,
        };

      case SET_ACCOUNT_TYPE:
        return {
          ...state,
          account_type: action.account_type,
        };

      case SET_LANGUAGE:
        return {
          ...state,
          language: action.language,
        };

      case SET_IS_NEW_COMPANY:
        return {
          ...state,
          isNewCompany: action.isNewCompany,
        };

      case RESET:
        return initialState;

      default:
        return state;
    }
  } catch (error) {
    console.log(`Error in reducers`, error);
  }
};
export default authReducer;
