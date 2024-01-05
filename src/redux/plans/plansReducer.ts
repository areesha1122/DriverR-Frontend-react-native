import {
  PlansState,
  RESET,
  SET_ADS_ONS,
  SET_ALL_PLANS,
  SET_COMPANY_PLAN,
} from './plansType';
import {AppAction} from '../AppAction';

const initialState: PlansState = {
  allPlans: [],
  companyPlan: [],
  adsOns: [],
};

const PlansReducer = function (state = initialState, action: AppAction) {
  try {
    switch (action.type) {
      case SET_ALL_PLANS:
        return {
          ...state,
          allPlans: action.allPlans,
        };

      case SET_ADS_ONS:
        return {
          ...state,
          adsOns: action.adsOns,
        };

      case SET_COMPANY_PLAN:
        return {
          ...state,
          companyPlan: action.companyPlans,
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
export default PlansReducer;
