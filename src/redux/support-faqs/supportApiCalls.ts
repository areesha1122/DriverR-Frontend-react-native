import ApiPaths from 'src/helper/ApiPaths';
import Api from 'src/helper/Api';
import {TypedThunkAction} from '../AppAction';
import {SendMsgData, SupportTicketData} from './supportType';
import {
  SetCompanyFaqs,
  SetDriverFaqs,
  SetSupportTickets,
  reset,
} from './supportAction';
import {setProfile, setUserId, setUserToken} from '../auth/authAction';

export const addSupportTicket =
  (
    data: SupportTicketData, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.CREATE_SUPPORT_TICKET; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(data, null, 2), state.auth?.token);
    Api.request(method, url, state.auth?.token, data)

      .then(res => {
        console.log(res, data);
        if (res.status == true) {
          callback(true, '');
        } else {
          callback(false, res.message);
          console.log(res, 'Add support ticket failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Add support ticket error');
      });
  };

export const addMsgToTicket =
  (
    data: SendMsgData, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.ADD_SUPPORT_TICKET_MESSAGE; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(data, null, 2), state.auth?.token);
    Api.request(method, url, state.auth?.token, data)

      .then(res => {
        console.log(res, data);
        if (res.status == true) {
          callback(true, '');
        } else {
          callback(false, res.message);
          console.log(res, 'Add message to ticket failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Add message to ticket error');
      });
  };

export const getAllSupportTicketCompany =
  (
    id: string, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_SUPPORT_TICKETS_COMPANY; // Api Call path and method
    let state = getState();
    Api.request(method, url + id, state.auth?.token, undefined)

      .then(res => {
        console.log(JSON.stringify(res, null, 2));
        if (res.status == true) {
          dispatch(SetSupportTickets({damn: 'damn'}));
          console.log(JSON.stringify(res.result.data, null, 2));
          callback(true, res.result.data);
        } else {
          callback(false, res.message);
          console.log(res, 'Get support ticket company failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Get support ticket company error');
      });
  };

export const getAllSupportTicketDriver =
  (
    id: string, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_SUPPORT_TICKETS_DRIVER; // Api Call path and method
    let state = getState();
    Api.request(method, url + id, state.auth?.token, undefined)

      .then(res => {
        console.log(JSON.stringify(res, null, 2));
        if (res.status == true) {
          console.log(JSON.stringify(res.result.data, null, 2));
          callback(true, res.result.data);
        } else {
          callback(false, res.message);
          console.log(res, 'Get support ticket company failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Get support ticket company error');
      });
  };
export const getSpecificTicketMsgs =
  (
    id: string, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_TICKET_CHAT; // Api Call path and method
    let state = getState();
    Api.request(method, url + id, state.auth?.token, undefined)

      .then(res => {
        console.log(JSON.stringify(res, null, 2));
        if (res.status == true) {
          dispatch(SetSupportTickets({damn: 'damn'}));
          console.log(JSON.stringify(res.result.data, null, 2));
          callback(true, res.result.data);
        } else {
          callback(false, res.message);
          console.log(res, 'Get support ticket chat failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Get support ticket chat error');
      });
  };
export const getDriverFaqs =
  (
    data: undefined, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_DRIVER_FAQS; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(data, null, 2), state.auth?.token);
    Api.request(method, url, state.auth?.token, data)
      .then(res => {
        // console.log('--------+++++>>>>>>1', JSON.stringify(res, null, 2), data);
        if (res.status == true) {
          dispatch(SetDriverFaqs(res.result.data));
          dispatch(SetCompanyFaqs(res.result.data)); // Set userId in store
          // Set userId in store
          callback(true, '');
        } else {
          callback(false, res.message);

          console.log(res, 'Get Driver Faqs failed');
        }
      })
      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Get driver faqs error');
      });
  };

export const getCompanyFaqs =
  (
    data: undefined, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_COMPANY_FAQS; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(data, null, 2), state.auth?.token);
    Api.request(method, url, state.auth?.token, data)
      .then(res => {
        // console.log('--------+++++>>>>>>', JSON.stringify(res, null, 2), data);
        if (res.status == true) {
          dispatch(SetCompanyFaqs(res.result.data)); // Set userId in store
          callback(true, '');
        } else {
          callback(false, res.message);

          console.log(res, 'Get company Faqs failed');
        }
      })
      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Get company faqs error');
      });
  };
