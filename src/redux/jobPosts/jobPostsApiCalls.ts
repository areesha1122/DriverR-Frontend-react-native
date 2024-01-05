import ApiPaths from 'src/helper/ApiPaths';
import Api from 'src/helper/Api';

import {TypedThunkAction} from '../AppAction';
import {JobPostData} from './jobPostsType';
import {
  SetAllDrivers,
  SetCompanyApplications,
  SetCompanyInterviews,
  SetDriverInterviews,
  SetJobApplications,
  SetShortlistedJobs,
  SetTopCompanies,
  reset,
  setActiveJobs,
  setJobPosts,
} from './jobPostsAction';
import {setProfile, setUserId, setUserToken} from '../auth/authAction';

export const addJobPost =
  (
    data: JobPostData, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.MANAGE_JOB; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(data, null, 2), state.auth?.token);
    Api.request(method, url, state.auth?.token, data)

      .then(res => {
        console.log(res, data);
        if (res.status == true) {
          // dispatch(setUserId(res.data.user_id)); // Set userId in store
          callback(true, '');
        } else {
          callback(false, res.message);

          console.log(res, 'Add job post failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(setUserToken(''));
          dispatch(setUserId(''));
          dispatch(setProfile({}));
        }
        console.log(err, 'Add job post error');
      });
  };

export const getJobPosts =
  (
    data: undefined, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_ALL_JOBS; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(data, null, 2), state.auth?.token);
    Api.request(method, url + state.auth?.profile._id, state.auth?.token, data)

      .then(res => {
        console.log('--------+++++>>>>>>', JSON.stringify(res, null, 2), data);
        if (res.status == true) {
          dispatch(setJobPosts(res.result.data)); // Set userId in store
          callback(true, '');
        } else {
          callback(false, res.message);

          console.log(res, 'Get job posts failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(setUserToken(''));
          dispatch(setUserId(''));
          dispatch(setProfile({}));
        }
        console.log(err, 'Get job posts error');
      });
  };

export const getJobById =
  (
    id: any, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    console.log('--------+++++>>>>>>', id, JSON.stringify(id, null, 2));
    let {method, url} = ApiPaths.GET_JOB_BY_ID; // Api Call path and method
    let state = getState();

    Api.request(method, url + id, state.auth?.token, undefined)

      .then(res => {
        // console.log('--------+++++>>>>>>', JSON.stringify(res, null, 2));
        if (res.status == true) {
          callback(true, res.result.data);
        } else {
          callback(false, res.message);

          console.log(res, 'Get job posts failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(setUserToken(''));
          dispatch(setUserId(''));
          dispatch(setProfile({}));
        }
        console.log(err, 'Get job posts error');
      });
  };

export const viewProfile =
  (
    id: any, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.VIEW_PROFILE; // Api Call path and method
    let state = getState();
    console.log(
      '--------+++++>>>>>>',
      state.auth?.profile,
      state.auth?.userId,
      JSON.stringify(id, null, 2),
    );

    Api.request(
      method,
      url + state.auth?.profile._id + '&driverId=' + id,
      state.auth?.token,
      undefined,
    )
      .then(res => {
        if (res.status == true) {
          callback(true, res.result.data);
        } else {
          callback(false, res.message);
          console.log(res, 'View Profile failed');
        }
      })
      .catch(err => {
        callback(false, 'Something went wrong');
        console.log(err, 'View Profile error');
      });
  };

export const getJobApplications =
  (
    data: undefined, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_DRIVER_JOB_APPLICATIONS; // Api Call path and method
    let state = getState();
    Api.request(
      method,
      url + state.auth?.profile._id,
      state.auth?.token,
      undefined,
    )

      .then(res => {
        // console.log('--------+++++>>>>>>', JSON.stringify(res, null, 2));
        if (res.status == true) {
          dispatch(SetJobApplications(res.result.data)); // Set userId in store
          callback(true, res.result.data);
        } else {
          callback(false, res.message);

          console.log(res, 'Get job applications failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(setUserToken(''));
          dispatch(setUserId(''));
          dispatch(setProfile({}));
        }
        console.log(err, 'Get job applications error');
      });
  };

export const getJobApplicationsByJob =
  (
    id: string, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_JOB_JOB_APPLICATIONS; // Api Call path and method
    let state = getState();
    Api.request(method, url + id, state.auth?.token, undefined)
      .then(res => {
        console.log('JOB APPLIcATIONS ===>', id, JSON.stringify(res, null, 2));
        if (res.status == true) {
          dispatch(SetJobApplications(res.result.data)); // Set userId in store
          callback(true, '');
          console.log('DDD');
        } else {
          callback(false, res.message);

          console.log(res, 'Get job applications by job failed ');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(setUserToken(''));
          dispatch(setUserId(''));
          dispatch(setProfile({}));
        }
        console.log(err, 'Get job applications by job error');
      });
  };

export const getShortlistedJobs =
  (
    id: string, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.SHORTLISTED_APPLICATIONS; // Api Call path and method
    let state = getState();
    Api.request(method, url + id, state.auth?.token, undefined)

      .then(res => {
        if (res.status == true) {
          dispatch(SetShortlistedJobs(res.result.data)); // Set userId in store
          callback(true, '');
          console.log('DDD');
        } else {
          callback(false, res.message);

          console.log(res, 'Get shortlisted applications failed ');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(setUserToken(''));
          dispatch(setUserId(''));
          dispatch(setProfile({}));
        }
        console.log(err, 'Get shortlisted applications error');
      });
  };

export const getJobPostsOfCompanyByID =
  (
    data: any, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_ALL_JOBS; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(data, null, 2), state.auth?.token);
    Api.request(method, url + data, state.auth?.token, undefined)

      .then(res => {
        // console.log('--------+++++>>>>>>', JSON.stringify(res, null, 2), data);
        if (res.status == true) {
          dispatch(setJobPosts(res.result.data)); // Set userId in store
          callback(true, '');
        } else {
          callback(false, res.message);

          console.log(res, 'Get job posts failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(setUserToken(''));
          dispatch(setUserId(''));
          dispatch(setProfile({}));
        }
        console.log(err, 'Get job posts error');
      });
  };

export const getTopCompanies =
  (
    data: undefined, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_TOP_COMPANIES; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(data, null, 2), state.auth?.token);
    Api.request(method, url, state.auth?.token, data)

      .then(res => {
        // console.log('--------+++++>>>>>>', JSON.stringify(res, null, 2), data);
        if (res.status == true) {
          dispatch(SetTopCompanies(res.result.data.reverse())); // Set userId in store
          callback(true, '');
        } else {
          callback(false, res.message);
          console.log(res, 'Get Top Companies failed');
        }
      })

      .catch(err => {
        if (err.data.message == 'Token expired, access denied') {
          dispatch(setUserToken(''));
          dispatch(setUserId(''));
          dispatch(setProfile({}));
        }
        callback(false, 'Something went wrong');
        console.log(err, 'Get Top Companies error');
      });
  };

export const getActiveJobs =
  (
    data: undefined, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_ACTIVE_JOBS; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(data, null, 2), state.auth?.token);
    Api.request(method, url, state.auth?.token, data)

      .then(res => {
        // console.log('--------+++++>>>>>>', JSON.stringify(res, null, 2), data);
        if (res.status == true) {
          dispatch(setActiveJobs(res.result.data.reverse())); // Set userId in store
          callback(true, res.result.data);
        } else {
          callback(false, res.message);
          console.log(res, 'Get Active Jobs failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(setUserToken(''));
          dispatch(setUserId(''));
          dispatch(setProfile({}));
        }
        console.log(err, 'Get Active Jobs error');
      });
  };

export const ApplyForJob =
  (
    data: any, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.APPLY_JOB; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(data, null, 2), state.auth?.token);
    Api.request(method, url, state.auth?.token, data)

      .then(res => {
        // console.log('--------+++++>>>>>>', JSON.stringify(res, null, 2), data);
        if (res.status == true) {
          callback(true, '');
        } else {
          callback(false, res.message);
          console.log(res, 'Apply Jobs failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(setUserToken(''));
          dispatch(setUserId(''));
          dispatch(setProfile({}));
        }
        console.log(err, 'Apply Jobs error');
      });
  };

export const getAllDriverz =
  (
    data: undefined, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_ALL_DRIVERS; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(data, null, 2), state.auth?.token);
    Api.request(method, url, state.auth?.token, data)

      .then(res => {
        if (res.status == true) {
          dispatch(SetAllDrivers(res.result.data)); // Set userId in store
          callback(true, '');
        } else {
          callback(false, res.message);
          console.log(res, 'Get All drivers failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(setUserToken(''));
          dispatch(setUserId(''));
          dispatch(setProfile({}));
        }
        console.log(err, 'Get All Drivers error');
      });
  };

export const getFilteredDriverz =
  (
    keyword: any,
    gender: any,
    drivingExperience: any,
    employmentStatus: any,
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_ALL_DRIVERS; // Api Call path and method
    let state = getState();
    Api.request(
      method,
      url +
        (keyword ? 'keyword=' + keyword : '') +
        (gender ? '&gender=' + gender : '') +
        (drivingExperience ? '&drivingExperience=' + drivingExperience : '') +
        (employmentStatus ? '&employmentStatus=' + employmentStatus : ''),
      state.auth?.token,
      undefined,
    )
      .then(res => {
        // console.log('--------+++++>>>>>>', JSON.stringify(res, null, 2));
        if (res.status == true) {
          // Set userId in store
          callback(true, res.result.data);
        } else {
          callback(false, res.message);
          console.log(res, 'Get Filtered drivers failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(setUserToken(''));
          dispatch(setUserId(''));
          dispatch(setProfile({}));
        }
        console.log(err, 'Get Filtered Drivers error');
      });
  };

export const getFilteredJobz =
  (
    keyword: any,
    routeType: any,
    requiredExperience: any,
    equipmentType: any,
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_FILTERED_JOBS; // Api Call path and method
    let state = getState();
    Api.request(
      method,
      url +
        (keyword ? 'keyword=' + keyword : '') +
        (routeType ? '&routeType=' + routeType : '') +
        (requiredExperience
          ? '&requiredExperience=' + requiredExperience
          : '') +
        (equipmentType ? '&employmentStatus=' + equipmentType : ''),
      state.auth?.token,
      undefined,
    )
      .then(res => {
        // console.log('--------+++++>>>>>>', JSON.stringify(res, null, 2));
        if (res.status == true) {
          // Set userId in store
          callback(true, res.result.data);
        } else {
          callback(false, res.message);
          console.log(res, 'Get Filtered drivers failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(setUserToken(''));
          dispatch(setUserId(''));
          dispatch(setProfile({}));
        }
        console.log(err, 'Get Filtered Drivers error');
      });
  };

export const addToShortlist =
  (
    id: any,
    data: any, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.ADD_TO_SHORTLIST; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(data, null, 2), state.auth?.token, url + id);
    Api.request(method, url + id, state.auth?.token, data)

      .then(res => {
        console.log('---====>>>', res);
        if (res.status == true) {
          // dispatch(setUserId(res.data.user_id)); // Set userId in store
          callback(true, '');
          console.log('DDD');
        } else {
          callback(false, res.message);

          console.log(res, 'Add to shortList failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(setUserToken(''));
          dispatch(setUserId(''));
          dispatch(setProfile({}));
        }
        console.log(err, 'Add to shortList error');
      });
  };

export const updateJobApplication =
  (
    id: any,
    data: any, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.UPDATE_JOB_APPLICATION; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(data, null, 2), state.auth?.token, url + id);
    Api.request(method, url + id, state.auth?.token, data)

      .then(res => {
        console.log('---====>>>', res);
        if (res.status == true) {
          // dispatch(setUserId(res.data.user_id)); // Set userId in store
          callback(true, '');
          console.log('DDD');
        } else {
          callback(false, res.message);

          console.log(res, 'Update Job failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(setUserToken(''));
          dispatch(setUserId(''));
          dispatch(setProfile({}));
        }
        console.log(err, 'Update job error');
      });
  };

export const removeFromShortlist =
  (
    id: any,
    data: any, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.REMOVE_FROM_SHORTLIST; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(data, null, 2), state.auth?.token, url + id);
    Api.request(method, url + id, state.auth?.token, data)

      .then(res => {
        console.log('---====>>>', res);
        if (res.status == true) {
          // dispatch(setUserId(res.data.user_id)); // Set userId in store
          callback(true, '');
          console.log('DDD');
        } else {
          callback(false, res.message);

          console.log(res, 'Remove from shortList failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(setUserToken(''));
          dispatch(setUserId(''));
          dispatch(setProfile({}));
        }
        console.log(err, 'Remove from shortList error');
      });
  };

export const makeZoomMeet =
  (
    data: any, // Register Input Data

    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    console.log(JSON.stringify(data, null, 2));
    Api.meetFunc({
      topic: 'My Meeting',
      type: 2,
      start_time: data.scheduledAt,
      duration: 60,
      timezone: 'America/Los_Angeles',
      default_password: false,
      password: '',
      agenda: 'My Meeting',
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: true,
        mute_upon_entry: false,
        use_pmi: false,
        waiting_room: false,
        watermark: false,
        approval_type: 2,
        audio: 'both',
        auto_recording: 'none',
        enforce_login: false,
        enforce_login_domains: '',
        alternative_hosts: '',
        global_dial_in_countries: [],
        registrants_confirmation_email: true,
        registrants_email_notification: true,
      },
    })
      .then(res => {
        console.log('---====>>>', res);
        if (res.join_url) {
          callback(true, '');
          console.log('DDD');

          let {method, url} = ApiPaths.CREATE_INTERVIEW; // Api Call path and method
          let state = getState();
          console.log(JSON.stringify(data, null, 2), state.auth?.token, url);
          Api.request(method, url, state.auth?.token, {
            ...data,
            onlineInterviewLink: res.join_url,
          })

            .then(res => {
              console.log('---====>>>', res);
              if (res.status == true) {
                // dispatch(setUserId(res.data.user_id)); // Set userId in store
                callback(true, '');
                console.log('DDD');
              } else {
                callback(false, res.message);

                console.log(res, 'Local Interview failed');
              }
            })

            .catch(err => {
              callback(false, 'Something went wrong');

              console.log(err, 'Local interview error');
            });
        } else {
          callback(false, res.message);

          console.log(res, 'Zoom failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(setUserToken(''));
          dispatch(setUserId(''));
          dispatch(setProfile({}));
        }
        console.log(err, 'Zoom error');
      });
  };

export const updateZoomMeet =
  (
    data: any, // Register Input Data

    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    console.log(JSON.stringify(data, null, 2));
    Api.meetFunc({
      topic: 'My Meeting',
      type: 2,
      start_time: data.scheduledAt,
      duration: 60,
      timezone: 'America/Los_Angeles',
      default_password: false,
      password: '',
      agenda: 'My Meeting',
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
        mute_upon_entry: false,
        use_pmi: false,
        waiting_room: false,
        watermark: false,
        approval_type: 2,
        audio: 'both',
        auto_recording: 'none',
        enforce_login: false,
        enforce_login_domains: '',
        alternative_hosts: '',
        global_dial_in_countries: [],
        registrants_confirmation_email: true,
        registrants_email_notification: true,
      },
    })
      .then(res => {
        console.log('---====>>>', res);
        if (res.join_url) {
          callback(true, '');
          console.log('DDD');

          let {method, url} = ApiPaths.UPDATE_INTERVIEW; // Api Call path and method
          let state = getState();
          console.log(JSON.stringify(data, null, 2), state.auth?.token, url);
          Api.request(method, url, state.auth?.token, {
            ...data,
            onlineInterviewLink: res.join_url,
          })

            .then(res => {
              console.log('---====>>>', res);
              if (res.status == true) {
                // dispatch(setUserId(res.data.user_id)); // Set userId in store
                callback(true, '');
                console.log('DDD');
              } else {
                callback(false, res.message);

                console.log(res, 'Local Interview failed');
              }
            })

            .catch(err => {
              callback(false, 'Something went wrong');

              console.log(err, 'Local interview error');
            });
        } else {
          callback(false, res.message);

          console.log(res, 'Zoom failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Zoom error');
      });
  };

export const getInterviewDetails =
  (
    id: any, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_INTERVIEW; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(id, null, 2), state.auth?.token);
    Api.request(method, url + id, state.auth?.token, undefined)

      .then(res => {
        // console.log('--------+++++>>>>>>', JSON.stringify(res, null, 2), id);
        if (res.status == true) {
          // Set userId in store
          callback(true, res.result.data);
        } else {
          callback(false, res.message);
          console.log(res, 'Get Interview failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Get Interview error');
      });
  };

export const addFeedbackk =
  (
    data: any, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.ADD_FEEDBACK; // Api Call path and method
    let state = getState();
    Api.request(method, url, state.auth?.token, data)

      .then(res => {
        // console.log('--------+++++>>>>>>', JSON.stringify(res, null, 2));
        if (res.status == true) {
          // Set userId in store
          callback(true, '');
        } else {
          callback(false, res.message);
          console.log(res, 'Add Feedbackk failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Add Feedback error');
      });
  };

export const getCompanyApplicationss =
  (
    id: any, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_COMPANY_APPLICATIONS; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(url + id, null, 2));
    Api.request(method, url + id, state.auth?.token, undefined)

      .then(res => {
        // console.log('--------+++++>>>>>>', JSON.stringify(res, null, 2), id);
        if (res.status == true) {
          // Set userId in store
          dispatch(SetCompanyApplications(res.result.data));
          callback(true, res.result.data);
        } else {
          callback(false, res.message);
          console.log(res, 'Get Company Applications failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Get Company Applications error');
      });
  };

export const getDriverInterviews =
  (
    id: any, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_DRIVER_INTERVIEWS; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(url + id, null, 2));
    Api.request(method, url + id, state.auth?.token, undefined)
      .then(res => {
        // console.log('--------+++++>>>>>>', JSON.stringify(res, null, 2), id);
        if (res.status == true) {
          // Set userId in store
          dispatch(SetDriverInterviews(res.result.data));
          callback(true, res.result.data);
        } else {
          callback(false, res.message);
          console.log(res, 'Get Driver Interviews failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Get Driver Interviews error');
      });
  };

export const getCompanyInterviews =
  (
    id: any, // Register Input Data
    callback: (success: boolean, msg: any) => boolean,
  ): TypedThunkAction<void> =>
  async (dispatch, getState) => {
    let {method, url} = ApiPaths.GET_COMPANY_INTERVIEWS; // Api Call path and method
    let state = getState();
    console.log(JSON.stringify(url + id, null, 2));
    Api.request(method, url + id, state.auth?.token, undefined)
      .then(res => {
        // console.log(
        //   'Company Interviews --------+++++>>>>>>',
        //   JSON.stringify(res, null, 2),
        //   id,
        // );
        if (res.status == true) {
          // Set userId in store
          dispatch(SetCompanyInterviews(res.result.data));
          callback(true, res.result.data);
        } else {
          callback(false, res.message);
          console.log(res, 'Get Company Interviews failed');
        }
      })

      .catch(err => {
        callback(false, 'Something went wrong');
        if (err.data.message == 'Token expired, access denied') {
          dispatch(reset());
        }
        console.log(err, 'Get Company Interviews error');
      });
  };
