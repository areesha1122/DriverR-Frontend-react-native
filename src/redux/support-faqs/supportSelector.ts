import {createSelector} from 'reselect';
import {AppState} from '../AppReducer';

// Get data present in store
export const getDriverFaq = createSelector(
  (state: AppState) => state.support?.driverFaqs,
  driverFaqs => driverFaqs,
);

export const getCompanyFaq = createSelector(
  (state: AppState) => state.support?.companyFaqs,
  companyFaqs => companyFaqs,
);

export const getSupportTicket = createSelector(
  (state: AppState) => state.support?.supportTickets,
  supportTickets => supportTickets,
);
