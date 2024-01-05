import {
  JobPostsAction,
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

// Define all the actions required to set values in store
export const setJobPosts = (jobPosts: object): JobPostsAction => ({
  type: SET_JOB_POSTS,
  jobPosts,
});

export const setActiveJobs = (activeJobs: object): JobPostsAction => ({
  type: SET_ACTIVE_JOBS,
  activeJobs,
});

export const SetTopCompanies = (topCompanies: object): JobPostsAction => ({
  type: SET_TOP_COMPANIES,
  topCompanies,
});

export const SetAllDrivers = (allDrivers: object): JobPostsAction => ({
  type: SET_ALL_DRIVERS,
  allDrivers,
});

export const SetShortlistedJobs = (
  shortlistedJobs: object,
): JobPostsAction => ({
  type: SET_SHORTLISTED_JOBS,
  shortlistedJobs,
});

export const SetJobApplications = (
  jobApplications: object,
): JobPostsAction => ({
  type: SET_JOBS_APPLICATIONS,
  jobApplications,
});

export const SetDriverInterviews = (
  driverInterviews: object,
): JobPostsAction => ({
  type: SET_DRIVER_INTERVIEWS,
  driverInterviews,
});

export const SetCompanyInterviews = (
  companyInterviews: object,
): JobPostsAction => ({
  type: SET_COMPANY_INTERVIEWS,
  companyInterviews,
});

export const SetCompanyApplications = (
  companyApplications: object,
): JobPostsAction => ({
  type: SET_COMPANY_APPLICATIONS,
  companyApplications,
});

export const reset = (): JobPostsAction => ({
  type: RESET,
});
