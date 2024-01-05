import {PlansState, SET_ALL_PLANS, SET_COMPANY_PLAN} from './messageType';
import {AppAction} from '../AppAction';

const initialState: PlansState = {
  allPlans: [],
  companyPlan: [],
};

const PlansReducer = function (state = initialState, action: AppAction) {
  try {
    switch (action.type) {
      case SET_ALL_PLANS:
        return {
          ...state,
          allPlans: action.allPlans,
        };

      case SET_COMPANY_PLAN:
        return {
          ...state,
          companyPlan: action.companyPlans,
        };

      default:
        return state;
    }
  } catch (error) {
    console.log(`Error in reducers`, error);
  }
};
export default PlansReducer;
