// Main State Interface
export interface SupportState {
  driverFaqs: any;
  companyFaqs: any;
  supportTickets: any;
}

// Api Calls Request Input Interfaces
export interface SupportTicketData {
  user: string;
  subject: string;
  userType: string;
  description: string;
}
export interface SendMsgData {
  queryId: string;
  message: string;
  adminReply: boolean;
}

// All action types
export const SET_DRIVER_FAQS = 'SET_DRIVER_FAQS';
export const SET_COMPANY_FAQS = 'SET_COMPANY_FAQS';
export const SET_SUPPORT_TICKETS = 'SET_SUPPORT_TICKETS';
export const RESET = 'RESET';

// Defination of all interfaces for auth actions
export interface SetDriverFaqsAction {
  type: typeof SET_DRIVER_FAQS;
  driverFaqs: object;
}

export interface SetCompanyFaqsAction {
  type: typeof SET_COMPANY_FAQS;
  companyFaqs: object;
}

export interface SetSupportTicketsAction {
  type: typeof SET_SUPPORT_TICKETS;
  supportTickets: object;
}

export interface resetAction {
  type: typeof RESET;
}

// Export all defined action
export type SupportAction =
  | SetDriverFaqsAction
  | SetCompanyFaqsAction
  | resetAction
  | SetSupportTicketsAction;
