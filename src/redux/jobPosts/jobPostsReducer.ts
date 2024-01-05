import {
  JobPostsState,
  RESET,
  SET_ACTIVE_JOBS,
  SET_ALL_DRIVERS,
  SET_COMPANY_APPLICATIONS,
  SET_COMPANY_INTERVIEWS,
  SET_DRIVER_INTERVIEWS,
  SET_JOBS_APPLICATIONS,
  SET_JOB_POSTS,
  SET_SHORTLISTED_JOBS,
  SET_TOP_COMPANIES,
} from './jobPostsType';
import {AppAction} from '../AppAction';

const initialState: JobPostsState = {
  jobPosts: [],
  topCompanies: [],
  activeJobPosts: [],
  allDrivers: [],
  jobApplications: [],
  shortlistedJobs: [],
  companyInterviews: [],
  companyJobApplications: [],
  driverInterviews: [],
};

const jobPostsReducer = function (state = initialState, action: AppAction) {
  try {
    switch (action.type) {
      case SET_JOB_POSTS:
        return {
          ...state,
          jobPosts: action.jobPosts,
        };

      case SET_JOBS_APPLICATIONS:
        return {
          ...state,
          jobApplications: action.jobApplications,
        };

      case SET_TOP_COMPANIES:
        return {
          ...state,
          topCompanies: action.topCompanies,
        };

      case SET_ACTIVE_JOBS:
        return {
          ...state,
          activeJobPosts: action.activeJobs,
        };

      case SET_ALL_DRIVERS:
        return {
          ...state,
          allDrivers: action.allDrivers,
        };

      case SET_SHORTLISTED_JOBS:
        return {
          ...state,
          shortlistedJobs: action.shortlistedJobs,
        };

      case SET_DRIVER_INTERVIEWS:
        return {
          ...state,
          driverInterviews: action.driverInterviews,
        };

      case SET_COMPANY_APPLICATIONS:
        return {
          ...state,
          companyJobApplications: action.companyApplications,
        };

      case SET_COMPANY_INTERVIEWS:
        return {
          ...state,
          companyInterviews: action.companyInterviews,
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
export default jobPostsReducer;
