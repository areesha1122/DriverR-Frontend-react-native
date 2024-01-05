// Main State Interface
export interface PlansState {
  messages: object;
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
}

// All action types
export const SET_ALL_PLANS = 'SET_ALL_PLANS';
export const SET_COMPANY_PLAN = 'SET_COMPANY_PLAN';

// Defination of all interfaces for auth actions
export interface SetAllPlansAction {
  type: typeof SET_ALL_PLANS;
  allPlans: object;
}

export interface SetCompanyPlanAction {
  type: typeof SET_COMPANY_PLAN;
  companyPlans: object;
}

// Export all defined action
export type PlansAction = SetAllPlansAction | SetCompanyPlanAction;
