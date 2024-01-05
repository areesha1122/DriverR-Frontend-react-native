import ApiPaths from 'src/helper/ApiPaths';
import Api from 'src/helper/Api';
import {TypedThunkAction} from '../AppAction';
import {SetUserChats, reset} from './chatsAction';
import {
  setMsgCounter,
  setProfile,
  setUserId,
  setUserToken,
} from '../auth/authAction';

export const getMessagesList =
  (
    id: string, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.MESSAGES_LIST; // Api Call path and method
    let state = getState();

    Api.request(method, url + id, state.auth?.token, undefined)
      .then(res => {
        // console.log('--------+++++>>>>>>', id, JSON.stringify(res, null, 2));
        if (res.status == true) {
          dispatch(SetUserChats(res.result.data));
          callback(true, res.result.data);
        } else {
          callback(false, res.message);

          console.log(res, 'Get Messages List failed');
        }
      })
      .catch(err => {
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        callback(false, 'Something went wrong');
        console.log(err, 'Get Messages List error');
      });
  };

export const getChat =
  (
    id: any, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.MESSAGE_CHAT; // Api Call path and method
    let state = getState();
    // console.log(JSON.stringify(data, null, 2), state.auth?.token);
    Api.request(method, url + id, state.auth?.token, undefined)
      .then(res => {
        // console.log(
        //   '--------+++++>>>>>>',
        //   JSON.stringify(res, null, 2),
        //   undefined,
        // );
        if (res.status == true) {
          callback(true, res.result.data);
        } else {
          callback(false, res.message);

          console.log(res, 'Get Chat failed');
        }
      })
      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Get Chat error');
      });
  };

export const getChatByIds =
  (
    company: any,
    driver: any,
    // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.MESSAGE_CHAT_BY_IDS; // Api Call path and method
    let state = getState();
    // console.log(JSON.stringify(data, null, 2), state.auth?.token);
    Api.request(
      method,
      url + company + '&driver=' + driver,
      state.auth?.token,
      undefined,
    )
      .then(res => {
        console.log(
          '--------+++++>>>>>>',
          JSON.stringify(url + company + '&driver=' + driver, null, 2),
          undefined,
        );
        if (res.status == true) {
          callback(true, res.result.data);
        } else {
          callback(false, res.message);

          console.log(res, 'Get Chat By Ids failed');
        }
      })
      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Get Chat error');
      });
  };

export const markChatAsRead =
  (
    id: any,
    sender: any,
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.MARK_MSGS_AS_READ; // Api Call path and method
    let state = getState();

    Api.request(
      method,
      url + id + '&sender=' + sender,
      state.auth?.token,
      undefined,
    )
      .then(res => {
        // console.log('--------+++++>>>>>>', JSON.stringify(res, null, 2));
        if (res.status == true) {
          callback(true, '');
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

export const chatBlockUnblock =
  (
    id: any, // Register Input Data
    userId: any,
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.CHAT_BLOCK; // Api Call path and method
    let state = getState();
    // console.log(JSON.stringify(data, null, 2), state.auth?.token);
    Api.request(
      method,
      url + id + '&blockedBy=' + userId,
      state.auth?.token,
      undefined,
    )
      .then(res => {
        // console.log(
        //   '--------+++++>>>>>>',
        //   JSON.stringify(res, null, 2),
        //   undefined,
        // );
        if (res.status == true) {
          callback(true, res.result.data);
        } else {
          callback(false, res.message);

          console.log(res, 'Get Chat failed');
        }
      })
      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Get Chat error');
      });
  };

export const getMsgCounter =
  (
    id: string, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.COMPANY_MESSAGES_COUNTER; // Api Call path and method
    let state = getState();

    Api.request(method, url + id, state.auth?.token, undefined)
      .then(res => {
        // console.log('--------+++++>>>>>>', id, JSON.stringify(res, null, 2));
        if (res.status == true) {
          callback(true, res.result.data);
          dispatch(setMsgCounter(res.result.data));
        } else {
          callback(false, res.message);

          console.log(res, 'Get company Msgs counter failed');
        }
      })
      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Get company Msgs counter error');
      });
  };
