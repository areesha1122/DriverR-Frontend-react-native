import {createSelector} from 'reselect';
import {AppState} from '../AppReducer';

// Get data present in store
export const getToken = createSelector(
  (state: AppState) => state.auth?.token,
  token => token,
);

export const getIsNewCompany = createSelector(
  (state: AppState) => state.auth?.isNewCompany,
  isNewCompany => isNewCompany,
);

export const getUserId = createSelector(
  (state: AppState) => state.auth?.userId,
  id => id,
);

export const getPhoneNumber = createSelector(
  (state: AppState) => state.auth?.phoneNumber,
  phoneNumber => phoneNumber,
);

export const getProfile = createSelector(
  (state: AppState) => state.auth?.profile,
  phoneNumber => phoneNumber,
);

export const getAccountType = createSelector(
  (state: AppState) => state.auth?.account_type,
  account_type => account_type,
);

export const getLanguage = createSelector(
  (state: AppState) => state.auth?.language,
  language => language,
);

export const getNotificationCouterr = createSelector(
  (state: AppState) => state.auth?.notificationCounter,
  notificationCounter => notificationCounter,
);

export const getMsgCouterr = createSelector(
  (state: AppState) => state.auth?.msgCounter,
  msgCounter => msgCounter,
);
