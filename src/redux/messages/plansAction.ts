import {PlansAction, SET_ALL_PLANS, SET_COMPANY_PLAN} from './messageType';

// Define all the actions required to set values in store
export const SetCompanyPlan = (companyPlans: object): PlansAction => ({
  type: SET_COMPANY_PLAN,
  companyPlans,
});

export const SetAllPlans = (allPlans: object): PlansAction => ({
  type: SET_ALL_PLANS,
  allPlans,
});
