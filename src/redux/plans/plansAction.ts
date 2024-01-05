import {
  PlansAction,
  RESET,
  SET_ADS_ONS,
  SET_ALL_PLANS,
  SET_COMPANY_PLAN,
} from './plansType';

// Define all the actions required to set values in store
export const SetCompanyPlan = (companyPlans: object): PlansAction => ({
  type: SET_COMPANY_PLAN,
  companyPlans,
});

export const SetAllPlans = (allPlans: object): PlansAction => ({
  type: SET_ALL_PLANS,
  allPlans,
});

export const SetAdsOns = (adsOns: object): PlansAction => ({
  type: SET_ADS_ONS,
  adsOns,
});

export const reset = (): PlansAction => ({
  type: RESET,
});
