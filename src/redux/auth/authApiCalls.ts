import ApiPaths from 'src/helper/ApiPaths';
import Api from 'src/helper/Api';
import {
  reset,
  setAccountType,
  setIsNewCompanyAction,
  setLanguage,
  setPhoneNumber,
  setProfile,
  setUserId,
  setUserToken,
} from './authAction';
import {TypedThunkAction} from '../AppAction';
import {
  ChangePasswordData,
  DriverLoginData,
  DriverRegisterData,
  DriverRegisterDataa,
  DriverVerifyOtpData,
  ResetPasswordData,
} from './authType';
import {err} from 'react-native-svg/lib/typescript/xml';

export const loginDriver =
  (
    data: DriverLoginData, // Login Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.LOGIN; // Api Call path and method

    Api.request(method, url, undefined, data)

      .then(res => {
        console.log(res.result.data.user);
        if (res.status == true) {
          let {method, url} = ApiPaths.GET_PROFILE; // Api Call path and method
          let state = getState();

          Api.request(
            method,
            url + res.result.data.user._id,
            res.result.data.accessToken,
            undefined,
          )
            .then(res1 => {
              console.log(res1, 'hehehehuå', res.result.data.user._id);
              if (res1.status == true) {
                callback(true, '');
                dispatch(setAccountType('Driver'));
                dispatch(setProfile(res1?.result?.data));
                dispatch(setUserId(res.result?.data?.user._id)); // Set userId in store
                dispatch(setUserToken(res.result?.data?.accessToken));
                dispatch(setPhoneNumber(res.result?.data?.user?.phoneNumber));
              } else if (res1.status == false) {
                let {method, url} = ApiPaths.GET_COMPANY_PROFILE; // Api Call path and method
                let state = getState();
                Api.request(
                  method,
                  url + res.result.data.user._id,
                  res.result.data.accessToken,
                  undefined,
                )
                  .then(res2 => {
                    console.log(res1, 'hehehehuå22', res.result.data.user._id);
                    if (res2.status == true) {
                      callback(true, '');
                      dispatch(setAccountType('Company'));
                      dispatch(setProfile(res2?.result?.data));
                      dispatch(setUserId(res.result?.data?.user._id)); // Set userId in store
                      dispatch(setUserToken(res.result?.data?.accessToken));
                      dispatch(
                        setPhoneNumber(res.result?.data?.user?.phoneNumber),
                      );
                    } else {
                      dispatch(setAccountType('Driver'));
                      dispatch(setProfile(undefined));
                      dispatch(
                        setPhoneNumber(res.result?.data?.user?.phoneNumber),
                      );
                      dispatch(reset());
                      callback(false, res2.message);
                      console.log(res2, 'Get Company Profile failed');
                    }
                  })
                  .catch(err2 => {
                    callback(true, '');
                    console.log(err2, 'Get Company Profile errorr1');
                  });
              } else {
                callback(true, '');
                callback(false, res1.message);
                console.log(res1, 'Get Driver Profile failed');
              }
            })
            .catch(err1 => {
              callback(false, err1.message);
              console.log(err1, 'Get Driver Profile errorr1');
            });
          // callback(true, '');
        } else {
          callback(false, res.message);
          console.log(res.message, 'Login driver failed');
        }
      })

      .catch(err => {
        callback(false, 'Invalid credential');

        console.log(err, 'Login driver error');
      });
  };

export const registerDriver =
  (
    data: DriverRegisterData, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.REGISTER; // Api Call path and method

    Api.request(method, url, undefined, data)

      .then(res => {
        console.log('====>>>>', res);
        if (res.status == true) {
          // dispatch(setUserId(res.data.user_id)); // Set userId in store
          callback(true, '');
        } else {
          if (res.message.name == undefined) {
            callback(false, res.message);
          } else {
            callback(false, 'Something went wrong');
          }
          console.log(res, 'Register Driver failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');

        console.log(err, 'Register Driver error');
      });
  };

export const resendDriverOtp =
  (
    data: DriverRegisterData, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.RESEND_OTP; // Api Call path and method
    Api.request(method, url, undefined, data)

      .then(res => {
        console.log(res);
        if (res.status == true) {
          // dispatch(setUserId(res.data.user_id)); // Set userId in store
          callback(true, '');
        } else {
          callback(false, res.message);
          console.log(res, 'Driver Resend Otp failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');

        console.log(err, 'Driver Resend Otp error');
      });
  };

export const registerDriverr =
  (
    data: DriverRegisterDataa, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.REGISTER_DRIVER; // Api Call path and method
    Api.request(method, url, undefined, data)

      .then(res => {
        console.log(res);
        if (res.status == true) {
          let {method, url} = ApiPaths.GET_PROFILE; // Api Call path and method
          let state = getState();

          Api.request(
            method,
            url + res.result.data.user._id,
            res.result.data.accessToken,
            undefined,
          )
            .then(res1 => {
              console.log(res1);
              if (res.status == true) {
                callback(true, '');
                dispatch(setProfile(res1?.result?.data));
                dispatch(setUserId(res.result?.data?.user._id)); // Set userId in store
                dispatch(setUserToken(res.result?.data?.accessToken));
                dispatch(setPhoneNumber(res.result?.data?.user?.phoneNumber));
              } else {
                callback(true, '');
                console.log(res1, 'Get Profile failed');
              }
            })
            .catch(err1 => {
              callback(true, '');
              console.log(err1, 'Get Profile errorr1');
            });
          // callback(true, '');
        } else {
          callback(false, res.message);
          console.log(res.message, 'Driver Register failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Driver registerd error');
      });
  };

export const registerCompany =
  (
    data: any, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.REGISTER_DRIVER; // Api Call path and method
    Api.request(method, url, undefined, {
      phoneNumber: data.phoneNumber,
      password: data.password,
    })

      .then(res => {
        console.log(res);
        if (res.status == true) {
          let {method, url} = ApiPaths.MANAGE_COMPANY_PROFILE; // Api Call path and method
          let state = getState();

          Api.request(method, url, res.result.data.accessToken, {
            userId: res.result.data.user._id,
            name: data.name,
            tagLine: data.tagLine,
            email: data.email,
            language: data.language,
            registrationNumber: data.registrationNumber,
            companySize: data.companySize,
            establishDate: data.establishDate,
            address: data.address,
            aboutInfo: data.aboutInfo,
            profilePicture: data.profilePicture,
          })
            .then(res1 => {
              console.log('----->>>>>', res1);
              console.log(res1);
              if (res.status == true) {
                callback(true, '');
                dispatch(setIsNewCompanyAction(true));
                dispatch(setProfile(res1?.result?.data));
                dispatch(setUserId(res.result?.data?.user._id)); // Set userId in store
                dispatch(setUserToken(res.result?.data?.accessToken));
                dispatch(setPhoneNumber(res.result?.data?.user?.phoneNumber));
              } else {
                callback(true, '');
                console.log(res1, 'Get Profile failed');
              }
            })
            .catch(err1 => {
              callback(true, '');
              console.log(err1, 'Get Profile errorr1');
            });
          // callback(true, '');
        } else {
          callback(false, res.message);
          console.log(res.message, 'Driver Register failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Driver registerd error');
      });
  };

export const verifyOtpDriver =
  (
    data: DriverVerifyOtpData, // Verify Otp Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.VERIFY_OTP; // Api Call path and method

    Api.request(method, url, undefined, data)

      .then(res => {
        if (res.status == true) {
          // dispatch(setUserId(res.data.user_id)); // Set userId in store
          callback(true, '');
        } else {
          callback(false, '');
          console.log(res, 'Verify Driver Otp failed');
        }
      })
      .catch(err => {
        callback(false, err.data);
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Verify Driver Otp error');
      });
  };

export const changePassword =
  (
    data: ChangePasswordData, // Verify Otp Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.CHANGE_PASSWORD; // Api Call path and method
    let state = getState();
    Api.request(method, url, state.auth?.token, data)

      .then(res => {
        if (res.status == true) {
          callback(true, '');
        } else {
          callback(false, res.message);
          console.log(res, 'Change Password failed');
        }
      })
      .catch(err => {
        callback(false, err.data.error);
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Change Password error');
      });
  };

export const resetPassword =
  (
    data: ResetPasswordData, // Verify Otp Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.RESET_PASSWORD; // Api Call path and method
    let state = getState();
    Api.request(method, url, state.auth?.token, data)

      .then(res => {
        if (res.status == true) {
          callback(true, '');
        } else {
          callback(false, res.message);
          console.log(res, 'Reset Password failed');
        }
      })
      .catch(err => {
        console.log(err, 'Reset Password error');
        callback(false, err.data.error);
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
      });
  };

export const forgetPassword =
  (
    data: any, // Verify Otp Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.FORGET_PASSWORD; // Api Call path and method
    let state = getState();
    Api.request(method, url, undefined, data)
      .then(res => {
        console.log(res);
        if (res.status == true) {
          callback(true, '');
        } else {
          callback(false, res.message);
          console.log(res, 'Forget Password failed');
        }
      })
      .catch(err => {
        callback(false, err.data);
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Forget Password error');
      });
  };

export const verifyForgetOtpDriver =
  (
    data: DriverVerifyOtpData, // Verify Otp Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.VERIFY_FORGET_PASSWORD; // Api Call path and method

    Api.request(method, url, undefined, data)

      .then(res => {
        console.log(res);
        if (res.status == true) {
          // dispatch(setUserId(res.data.user_id)); // Set userId in store
          callback(true, '');
        } else {
          callback(false, res.message);
          console.log(res, 'Verify Forget Driver Otp failed');
        }
      })
      .catch(err => {
        callback(false, err.data);
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Verify Forget Driver Otp error');
      });
  };

export const manageProfile =
  (
    data: any, // Verify Otp Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.MANAGE_PROFILE; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(data, null, 2));
    Api.request(method, url, state.auth?.token, data)

      .then(res => {
        console.log(res);
        if (res.status == true) {
          let {method, url} = ApiPaths.GET_PROFILE; // Api Call path and method
          let state = getState();
          Api.request(method, url + data.userId, state.auth?.token, undefined)
            .then(res1 => {
              console.log(res1);
              if (res.status == true) {
                callback(true, '');
                dispatch(setProfile(res1.result.data));
              } else {
                callback(false, res1.message);
                console.log(res1, 'Get Profile failed');
              }
            })
            .catch(err => {
              callback(false, err.data);

              console.log(err, 'Get Profile error');
            });
          // callback(true, '');
        } else {
          callback(false, res.message);
          console.log(res, 'Manage Profile failed');
        }
      })
      .catch(err => {
        callback(false, err.data);
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Manage Profile error');
      });
  };

export const manageCompanyProfile =
  (
    data: any, // Verify Otp Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.MANAGE_COMPANY_PROFILE; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(data, null, 2));
    Api.request(method, url, state.auth?.token, data)

      .then(res => {
        console.log(res);
        if (res.status == true) {
          let {method, url} = ApiPaths.GET_COMPANY_PROFILE; // Api Call path and method
          let state = getState();
          Api.request(method, url + data.userId, state.auth?.token, undefined)
            .then(res1 => {
              console.log(res1);
              if (res.status == true) {
                callback(true, '');
                dispatch(setProfile(res1.result.data));
              } else {
                callback(false, res1.message);
                console.log(res1, 'Get Profile failed');
              }
            })
            .catch(err => {
              callback(false, err.data);
              console.log(err, 'Get Profile error');
            });
          // callback(true, '');
        } else {
          callback(false, res.message);
          console.log(res, 'Manage Profile failed');
        }
      })
      .catch(err => {
        callback(false, err.data);
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Manage Profile error');
      });
  };

export const selectLanguage =
  (
    data: any, // Verify Otp Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.CHANGE_LANGUAGE; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(data, null, 2));
    Api.request(method, url, state.auth?.token, data)

      .then(res => {
        console.log(res, data.language);
        dispatch(setLanguage(data.language));
        if (res.status == true) {
          let {method, url} = ApiPaths.GET_PROFILE; // Api Call path and method
          let state = getState();
          Api.request(method, url + data.userId, state.auth?.token, undefined)
            .then(res1 => {
              console.log(res1);
              if (res.status == true) {
                callback(true, '');
                dispatch(setProfile(res1.result.data));
              } else {
                callback(false, res1.message);
                console.log(res1, 'Get Profile failed');
              }
            })
            .catch(err => {
              callback(false, err.data);
              console.log(err, 'Get Profile error');
            });

          // callback(true, '');
        } else {
          callback(false, res.message);
          console.log(res, 'Change Language failed');
        }
      })
      .catch(err => {
        callback(false, err.data);
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Change Language error3');
      });
  };

export const selectCompanyLanguage =
  (
    data: any, // Verify Otp Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.CHANGE_COMPANY_LANGUAGE; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(data, null, 2));
    Api.request(method, url, state.auth?.token, data)

      .then(res => {
        console.log(res, data.language);
        dispatch(setLanguage(data.language));
        if (res.status == true) {
          let {method, url} = ApiPaths.GET_COMPANY_PROFILE; // Api Call path and method
          let state = getState();
          Api.request(method, url + data.userId, state.auth?.token, undefined)
            .then(res1 => {
              console.log(res1);
              if (res.status == true) {
                callback(true, '');
                dispatch(setProfile(res1.result.data));
              } else {
                callback(false, res1.message);
                console.log(res1, 'Get Profile failed');
              }
            })
            .catch(err => {
              callback(false, err.data);
              console.log(err, 'Get Profile error');
            });
          // callback(true, '');
        } else {
          callback(false, res.message);
          console.log(res, 'Manage Profile failed');
        }
      })
      .catch(err => {
        callback(false, err.data);
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Change Language error3');
      });
  };

export const getDriverProfile =
  (
    id: string | undefined, // Verify Otp Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_PROFILE; // Api Call path and method
    let state = getState();

    Api.request(method, url + id, state.auth?.token, undefined)

      .then(res => {
        console.log(res);
        if (res.status == true) {
          callback(true, '');
          dispatch(setProfile(res.result.data));
        } else {
          callback(false, res.message);
          console.log(res, 'Get Profile failed');
        }
      })
      .catch(err => {
        callback(false, err.data);
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Get Profile error4');
      });
  };

export const getCompanyProfile =
  (
    id: string | undefined, // Verify Otp Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_COMPANY_PROFILE; // Api Call path and method
    let state = getState();

    Api.request(method, url + id, state.auth?.token, undefined)

      .then(res => {
        console.log(res);
        if (res.status == true) {
          callback(true, res.result.data.profileStatus);
          dispatch(setProfile(res.result.data));
        } else {
          callback(false, res.message);
          console.log(res, 'Get Profile failed');
        }
      })
      .catch(err => {
        callback(false, err.data);
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Get Profile error5');
      });
  };

export const getPrivacyPolicy =
  (
    id: string, // Verify Otp Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.PRIVACY_POLICY; // Api Call path and method
    let state = getState();

    Api.request(method, url, state.auth?.token, undefined)

      .then(res => {
        console.log(res);
        if (res.status == true) {
          callback(true, res.result.data);
        } else {
          callback(false, res.message);
          console.log(res, 'Get Privacy Policy failed');
        }
      })
      .catch(err => {
        callback(false, err.data);
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Get Privacy Policy  error');
      });
  };

export const uploadPicToServer =
  (
    data: any,
    callback: (success: boolean, d: string) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let state = getState();
    let {method, url} = ApiPaths.UPLOAD_IMG;
    const formData = new FormData();
    Object.entries(data).map(([key, value]) => {
      formData.append(key, value);
    });

    Api.formRequest({method, url, token: undefined, data: formData})
      .then(res => {
        console.log('........', res);
        if (res.status == true) {
          console.log(
            'Upload Pic To Server response',
            JSON.stringify(res, null, 2),
          );
          callback(true, res.result.data);
        } else {
          callback(false, '');
          console.log(res, 'Upload Pic To Server failed');
        }
      })
      .catch(err => {
        callback(false, '');
        console.log(err, 'Upload Pic To Server error');
      });
  };
