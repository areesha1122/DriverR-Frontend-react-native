import {createSelector} from 'reselect';
import {AppState} from '../AppReducer';

// Get data present in store
export const getJobPostss = createSelector(
  (state: AppState) => state.jobPosts?.jobPosts,
  jobPosts => jobPosts,
);

export const getTopCompaniess = createSelector(
  (state: AppState) => state.jobPosts?.topCompanies,
  topCompanies => topCompanies,
);

export const getActiveJobPostss = createSelector(
  (state: AppState) => state.jobPosts?.activeJobPosts,
  activeJobPosts => activeJobPosts,
);

export const getAllDrivers = createSelector(
  (state: AppState) => state.jobPosts?.allDrivers,
  allDrivers => allDrivers,
);

export const getJobApplicationss = createSelector(
  (state: AppState) => state.jobPosts?.jobApplications,
  jobApplications => jobApplications,
);

export const getShortlistedApplicationss = createSelector(
  (state: AppState) => state.jobPosts?.shortlistedJobs,
  jobApplications => jobApplications,
);

export const getCompanyApplication = createSelector(
  (state: AppState) => state.jobPosts?.companyJobApplications,
  companyJobApplications => companyJobApplications,
);

export const getCompanyInterViewss = createSelector(
  (state: AppState) => state.jobPosts?.companyInterviews,
  companyJobApplications => companyJobApplications,
);

export const getDriverInterviewss = createSelector(
  (state: AppState) => state.jobPosts?.driverInterviews,
  driverInterviews => driverInterviews,
);
