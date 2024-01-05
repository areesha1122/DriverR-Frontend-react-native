import ApiPaths from 'src/helper/ApiPaths';
import Api from 'src/helper/Api';
import {TypedThunkAction} from '../AppAction';
import {CompanyPlansData, GetStripeData} from './messageType';
import {SetCompanyPlan, SetAllPlans} from './plansAction';
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
          dispatch(setUserToken(''));
          dispatch(setUserId(''));
          dispatch(setProfile({}));
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
        // console.log('--------+++++>>>>>>', JSON.stringify(res, null, 2), data);
        if (res.status == true) {
          dispatch(SetAllPlans(res.result.data)); // Set userId in store
          callback(true, '');
        } else {
          callback(false, res.message);

          console.log(res, 'Get Driver Faqs failed');
        }
      })
      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(setUserToken(''));
          dispatch(setUserId(''));
          dispatch(setProfile({}));
        }
        console.log(err, 'Get driver faqs error');
      });
  };

export const getCompanyPlan =
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
          dispatch(setUserToken(''));
          dispatch(setUserId(''));
          dispatch(setProfile({}));
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
          dispatch(setUserToken(''));
          dispatch(setUserId(''));
          dispatch(setProfile({}));
        }
        console.log(err, 'Get company plan error');
      });
  };
