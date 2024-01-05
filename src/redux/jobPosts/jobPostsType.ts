// Main State Interface
export interface JobPostsState {
  jobPosts: any;
  jobApplications: any;
  topCompanies: any;
  activeJobPosts: any;
  allDrivers: any;
  shortlistedJobs: any;
  driverInterviews: any;
  companyInterviews: any;
  companyJobApplications: any;
}

// Api Calls Request Input Interfaces
export interface DriverLoginData {
  phoneNumber: string;
  password: string;
}

export interface JobPostData {
  companyId: string | undefined;
  title: string;
  requiredExperience: string;
  routeType: string | null;
  equipmentType: string | null;
  licenseRequired: boolean | null;
  medicalInsuranceRequired: boolean | null;
  jobDescription: string;
  jobId?: string;
  isActive?: boolean;
  isDeleted?: boolean;
}

// All action types
export const SET_JOB_POSTS = 'SET_JOB_POSTS';
export const SET_TOP_COMPANIES = 'SET_TOP_COMPANIES';
export const SET_ACTIVE_JOBS = 'SET_ACTIVE_JOBS';
export const SET_JOBS_APPLICATIONS = 'SET_JOBS_APPLICATIONS';
export const SET_ALL_DRIVERS = 'SET_ALL_DRIVERS';
export const SET_SHORTLISTED_JOBS = 'SET_SHORTLISTED_JOBS';
export const SET_DRIVER_INTERVIEWS = 'SET_DRIVER_INTERVIEWS';
export const SET_COMPANY_INTERVIEWS = 'SET_COMPANY_INTERVIEWS';
export const SET_COMPANY_APPLICATIONS = 'SET_COMPANY_APPLICATIONS';
export const RESET = 'RESET';

// Defination of all interfaces for auth actions
export interface SetJobPostsAction {
  type: typeof SET_JOB_POSTS;
  jobPosts: object;
}

export interface SetJobApplicationsAction {
  type: typeof SET_JOBS_APPLICATIONS;
  jobApplications: object;
}
export interface SetTopCompaniesAction {
  type: typeof SET_TOP_COMPANIES;
  topCompanies: object;
}
export interface SetActiveJobs {
  type: typeof SET_ACTIVE_JOBS;
  activeJobs: object;
}
export interface SetAllDrivers {
  type: typeof SET_ALL_DRIVERS;
  allDrivers: object;
}

export interface SetShortlistedJobs {
  type: typeof SET_SHORTLISTED_JOBS;
  shortlistedJobs: object;
}

export interface SetDriverInterviews {
  type: typeof SET_DRIVER_INTERVIEWS;
  driverInterviews: object;
}

export interface SetCompanyInterviews {
  type: typeof SET_COMPANY_INTERVIEWS;
  companyInterviews: object;
}

export interface SetCompanyApplications {
  type: typeof SET_COMPANY_APPLICATIONS;
  companyApplications: object;
}

export interface resetAction {
  type: typeof RESET;
}

// Export all defined action
export type JobPostsAction =
  | SetJobPostsAction
  | SetTopCompaniesAction
  | SetActiveJobs
  | SetJobApplicationsAction
  | SetShortlistedJobs
  | SetDriverInterviews
  | SetCompanyInterviews
  | SetCompanyApplications
  | resetAction
  | SetAllDrivers;
