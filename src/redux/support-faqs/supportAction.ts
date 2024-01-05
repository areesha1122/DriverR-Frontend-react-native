import {
  SupportAction,
  SET_COMPANY_FAQS,
  SET_DRIVER_FAQS,
  SET_SUPPORT_TICKETS,
  RESET,
} from './supportType';

// Define all the actions required to set values in store
export const SetCompanyFaqs = (companyFaqs: object): SupportAction => ({
  type: SET_COMPANY_FAQS,
  companyFaqs,
});

export const SetDriverFaqs = (driverFaqs: object): SupportAction => ({
  type: SET_DRIVER_FAQS,
  driverFaqs,
});

export const SetSupportTickets = (supportTickets: object): SupportAction => ({
  type: SET_SUPPORT_TICKETS,
  supportTickets,
});

export const reset = (): SupportAction => ({
  type: RESET,
});
