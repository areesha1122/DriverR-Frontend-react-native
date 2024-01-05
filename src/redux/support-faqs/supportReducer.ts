import {
  SupportState,
  SET_COMPANY_FAQS,
  SET_DRIVER_FAQS,
  SET_SUPPORT_TICKETS,
  RESET,
} from './supportType';
import {AppAction} from '../AppAction';

const initialState: SupportState = {
  companyFaqs: [],
  driverFaqs: [],
  supportTickets: [],
};

const SupportReducer = function (state = initialState, action: AppAction) {
  try {
    switch (action.type) {
      case SET_COMPANY_FAQS:
        return {
          ...state,
          companyFaqs: action.companyFaqs,
        };

      case SET_DRIVER_FAQS:
        return {
          ...state,
          jobApplications: action.driverFaqs,
        };

      case SET_SUPPORT_TICKETS:
        return {
          ...state,
          topCompanies: action.supportTickets,
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
export default SupportReducer;
