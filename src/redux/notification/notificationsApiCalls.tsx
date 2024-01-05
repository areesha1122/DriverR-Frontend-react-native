import ApiPaths from 'src/helper/ApiPaths';
import Api from 'src/helper/Api';
import {TypedThunkAction} from '../AppAction';
import {reset, setNotificationCounter} from '../auth/authAction';

export const getCompanyNotifications =
  (
    id: string, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.COMPANY_NOTIFICATIONS; // Api Call path and method
    let state = getState();

    Api.request(method, url + id, state.auth?.token, undefined)
      .then(res => {
        // console.log('--------+++++>>>>>>', id, JSON.stringify(res, null, 2));
        if (res.status == true) {
          callback(true, res.result.data);
        } else {
          callback(false, res.message);

          console.log(res, 'Get Company Notifications List failed');
        }
      })
      .catch(err => {
        callback(false, 'Something went wrong');

        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Get Company Notifications List error');
      });
  };

export const getDriverNotifications =
  (
    id: string, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.DRIVER_NOTIFICATIONS; // Api Call path and method
    let state = getState();

    Api.request(method, url + id, state.auth?.token, undefined)
      .then(res => {
        // console.log('--------+++++>>>>>>', id, JSON.stringify(res, null, 2));
        if (res.status == true) {
          callback(true, res.result.data);
        } else {
          callback(false, res.message);

          console.log(res, 'Get Driver Notifications List failed');
        }
      })
      .catch(err => {
        callback(false, 'Something went wrong');

        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Get Driver Notifications List error');
      });
  };

export const markAsRead =
  (
    data: any, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.MARK_AS_READ; // Api Call path and method
    let state = getState();

    Api.request(method, url, state.auth?.token, data)
      .then(res => {
        // console.log('--------+++++>>>>>>', JSON.stringify(res, null, 2));
        if (res.status == true) {
          callback(true, res.result.data);
        } else {
          callback(false, res.message);

          console.log(res, 'Mark as read failed');
        }
      })
      .catch(err => {
        callback(false, 'Something went wrong');

        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Mark as read error');
      });
  };

export const getCompanyNotificationsCounter =
  (
    id: string, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.COMPANY_NOTIFICATIONS_COUNTER; // Api Call path and method
    let state = getState();

    Api.request(method, url + id, state.auth?.token, undefined)
      .then(res => {
        console.log('--------+++++>>>>>>', id, JSON.stringify(res, null, 2));
        if (res.status == true) {
          // console.log(
          //   '--------+++++>>>>>>----',
          //   id,
          //   JSON.stringify(res.result.data, null, 2),
          // );
          dispatch(setNotificationCounter(JSON.stringify(res.result.data)));
          callback(true, res.result.data);
        } else {
          callback(false, res.message);
          console.log(res, 'Get Company Notifications List failed');
        }
      })
      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Get Company Notifications List error');
      });
  };

export const getDriverNotificationsCounter =
  (
    id: string, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.DRIVER_NOTIFICATIONS_COUNTER; // Api Call path and method
    let state = getState();

    Api.request(method, url + id, state.auth?.token, undefined)
      .then(res => {
        console.log('--------+++++>>>>>>', id, JSON.stringify(res, null, 2));
        if (res.status == true) {
          // console.log(
          //   '--------+++++>>>>>>----',
          //   id,
          //   JSON.stringify(res.result.data, null, 2),
          // );
          dispatch(setNotificationCounter(JSON.stringify(res.result.data)));
          callback(true, res.result.data);
        } else {
          callback(false, res.message);
          console.log(res, 'Get Driver Notifications List failed');
        }
      })
      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Get Driver Notifications List error');
      });
  };
