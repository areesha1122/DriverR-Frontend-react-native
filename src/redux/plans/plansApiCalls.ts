import ApiPaths from 'src/helper/ApiPaths';
import Api from 'src/helper/Api';
import {TypedThunkAction} from '../AppAction';
import {CompanyPlansData, GetStripeData} from './plansType';
import {SetCompanyPlan, SetAllPlans, SetAdsOns, reset} from './plansAction';
import {setProfile, setUserId, setUserToken} from '../auth/authAction';

export const addCompanyPlan =
  (
    data: CompanyPlansData, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.BUY_PLAN; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(data, null, 2), state.auth?.token);
    Api.request(method, url, state.auth?.token, data)

      .then(res => {
        console.log(res, data);
        if (res.status == true) {
          callback(true, '');
        } else {
          callback(false, res.message);
          console.log(res, 'Add company plan failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Add company plan error');
      });
  };

export const getAllPlans =
  (
    data: undefined, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_ALL_PLAN; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(data, null, 2), state.auth?.token);
    Api.request(method, url, state.auth?.token, data)
      .then(res => {
        console.log('--------+++++>>>>>>', JSON.stringify(res, null, 2), data);
        if (res.status == true) {
          dispatch(SetAllPlans(res.result.data.reverse())); // Set userId in store
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

export const getAdsOns =
  (
    data: undefined, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_ADS_ONS; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(data, null, 2), state.auth?.token);
    Api.request(method, url, state.auth?.token, data)
      .then(res => {
        // console.log(
        //   'Ads ons --------+++++>>>>>>',
        //   JSON.stringify(res, null, 2),
        //   data,
        // );
        if (res.status == true) {
          dispatch(SetAdsOns(res.result.data)); // Set userId in store
          callback(true, '');
        } else {
          callback(false, res.message);

          console.log(res, 'Get Ads Ons failed');
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

export const getCompanyPlan =
  (
    id: any, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_COMPANY_PLAN; // Api Call path and method
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
          dispatch(SetCompanyPlan(res.result.data)); // Set userId in store
          callback(true, '');
        } else {
          callback(false, res.message);

          console.log(res, 'Get company plan failed');
        }
      })
      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Get company plan error');
      });
  };

export const getStripe =
  (
    data: GetStripeData, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.STRIPE_CHECKOUT; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(data, null, 2), state.auth?.token);
    Api.request(method, url, state.auth?.token, data)
      .then(res => {
        // console.log('--------+++++>>>>>>', JSON.stringify(res, null, 2), data);
        if (res.status == true) {
          callback(true, res.result.data.url);
        } else {
          callback(false, res.message);

          console.log(res, 'Get company plan failed');
        }
      })
      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Get company plan error');
      });
  };
