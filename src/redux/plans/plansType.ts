// Main State Interface
export interface PlansState {
  allPlans: any;
  companyPlan: any;
  adsOns: any;
}

// Api Calls Request Input Interfaces
export interface CompanyPlansData {
  customerId: any;
  priceId: any;
}
export interface GetStripeData {
  successUrl: string;
  cancelUrl: string;
  priceId: string;
  mode: string;
  allowPromotionCodes: boolean;
  userId: string;
  quantity?: any;
  isAddon: any;
}

// All action types
export const SET_ALL_PLANS = 'SET_ALL_PLANS';
export const SET_ADS_ONS = 'SET_ADS_ONS';
export const SET_COMPANY_PLAN = 'SET_COMPANY_PLAN';
export const RESET = 'RESET';

// Defination of all interfaces for auth actions
export interface SetAllPlansAction {
  type: typeof SET_ALL_PLANS;
  allPlans: object;
}

export interface SetAdsOnsAction {
  type: typeof SET_ADS_ONS;
  adsOns: object;
}

export interface SetCompanyPlanAction {
  type: typeof SET_COMPANY_PLAN;
  companyPlans: object;
}

export interface resetAction {
  type: typeof RESET;
}

// Export all defined action
export type PlansAction =
  | SetAllPlansAction
  | SetCompanyPlanAction
  | resetAction
  | SetAdsOnsAction;
