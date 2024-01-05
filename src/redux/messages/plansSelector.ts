import {createSelector} from 'reselect';
import {AppState} from '../AppReducer';

// Get data present in store
export const getAllPlanss = createSelector(
  (state: AppState) => state.plans?.allPlans,
  allPlans => allPlans,
);

export const getCompanyPlan = createSelector(
  (state: AppState) => state.plans?.companyPlan,
  companyPlan => companyPlan,
);
