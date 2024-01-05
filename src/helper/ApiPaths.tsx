export default {
  // Login Driver
  LOGIN: {method: 'POST', url: 'auth/signin'},
  // Register Driver
  REGISTER: {method: 'POST', url: 'auth/register-with-phone'},
  // Driver Verify Otp
  VERIFY_OTP: {method: 'POST', url: 'auth/verify-otp'},
  // Driver Resend Otp
  RESEND_OTP: {method: 'POST', url: 'auth/resend-otp'},
  // Register Driver
  REGISTER_DRIVER: {method: 'POST', url: 'auth/signup'},
  // Register Company
  REGISTER_COMPANY: {method: 'POST', url: 'auth/company/signup'},
  // Change Password
  CHANGE_PASSWORD: {method: 'PUT', url: 'auth/change-password'},
  // Manage Profile
  MANAGE_PROFILE: {method: 'POST', url: 'driver/profile'},
  // Manage Company Profile
  MANAGE_COMPANY_PROFILE: {method: 'POST', url: 'company/profile'},

  // Change Language
  CHANGE_LANGUAGE: {method: 'POST', url: 'driver/select-language'},
  // Change Language
  CHANGE_COMPANY_LANGUAGE: {method: 'POST', url: 'company/select-language'},
  // Privacy Policy
  PRIVACY_POLICY: {method: 'GET', url: 'privacy-policy/view'},
  // Get profile
  GET_PROFILE: {method: 'GET', url: 'driver/get-profile-details?userId='},
  // Get company profile
  GET_COMPANY_PROFILE: {method: 'GET', url: 'company/get-profile?userId='},
  // Forget Password
  FORGET_PASSWORD: {method: 'POST', url: 'auth/forget-password'},
  // Verify Forget Password
  VERIFY_FORGET_PASSWORD: {
    method: 'POST',
    url: 'auth/verify-reset-otp',
  },
  // RESET Password
  RESET_PASSWORD: {
    method: 'POST',
    url: 'auth/reset-password',
  },
  // Manage Job
  MANAGE_JOB: {
    method: 'POST',
    url: 'job/create-or-update',
  },
  // Get all Jobs
  GET_ALL_JOBS: {
    method: 'GET',
    url: 'job/view-all-jobs-by-company?companyId=',
  },
  // Get Job By Id
  GET_JOB_BY_ID: {
    method: 'GET',
    url: 'job/view?jobId=',
  },
  // Get top companies
  GET_TOP_COMPANIES: {
    method: 'GET',
    url: 'company/top-hiring-companies',
  },
  // Get active jobs
  GET_ACTIVE_JOBS: {
    method: 'GET',
    url: 'job/view-all-active-jobs',
  },
  // Apply for job
  APPLY_JOB: {
    method: 'POST',
    url: 'job-application/create',
  },

  // Get all drivers
  GET_ALL_DRIVERS: {
    method: 'GET',
    url: 'driver/get-all-drivers?',
  },

  // Get all drivers
  GET_FILTERED_JOBS: {
    method: 'GET',
    url: 'job/view-all-active-jobs?',
  },

  // Get job application for driver
  GET_DRIVER_JOB_APPLICATIONS: {
    method: 'GET',
    url: 'job-application/view-by-driver?driverId=',
  },

  // Get job application for job
  GET_JOB_JOB_APPLICATIONS: {
    method: 'GET',
    url: 'job-application/view-by-job?jobId=',
  },

  // Add to shortlist
  ADD_TO_SHORTLIST: {
    method: 'GET',
    url: 'shortlist/add?jobApplicationId=',
  },

  // Add to shortlist
  UPDATE_JOB_APPLICATION: {
    method: 'PUT',
    url: 'job-application/update/',
  },

  // Remove from shortlist
  REMOVE_FROM_SHORTLIST: {
    method: 'GET',
    url: 'shortlist/remove?jobApplicationId=',
  },

  // Get shortlisted applications
  SHORTLISTED_APPLICATIONS: {
    method: 'GET',
    url: 'shortlist/view-by-job?jobId=',
  },

  // Create Interview
  CREATE_INTERVIEW: {
    method: 'POST',
    url: 'interview/create-schedule',
  },

  // Update Interview
  UPDATE_INTERVIEW: {
    method: 'POST',
    url: 'interview/reschedule',
  },

  // Interview Details
  GET_INTERVIEW: {
    method: 'GET',
    url: 'interview/view-details?jobApplicationId=',
  },

  // Add feedback
  ADD_FEEDBACK: {
    method: 'POST',
    url: 'interview/add-feedback',
  },

  // Get driver interviews
  GET_DRIVER_INTERVIEWS: {
    method: 'GET',
    url: 'interview/view-schedules-by-driver?driverId=',
  },

  // Get company interviews
  GET_COMPANY_INTERVIEWS: {
    method: 'GET',
    url: 'interview/view-schedules-by-company?companyId=',
  },

  // Get company job applications
  GET_COMPANY_APPLICATIONS: {
    method: 'GET',
    url: 'job-application/view-by-company?companyId=',
  },
  // Get driver faqs
  GET_DRIVER_FAQS: {
    method: 'GET',
    url: 'faqs/view-all?targetedUser=DRIVER',
  },
  // Get company faqs
  GET_COMPANY_FAQS: {
    method: 'GET',
    url: 'faqs/view-all?targetedUser=COMPANY',
  },
  // Add support ticket
  CREATE_SUPPORT_TICKET: {
    method: 'POST',
    url: 'support-queries/create-ticket',
  },
  // Add msg on support ticket
  ADD_SUPPORT_TICKET_MESSAGE: {
    method: 'POST',
    url: 'support-queries/send',
  },
  // Get all support tickets for driver
  GET_SUPPORT_TICKETS_DRIVER: {
    method: 'GET',
    url: 'support-queries/all-user-queries/DRIVER/',
  },
  // Get all support tickets for driver
  GET_SUPPORT_TICKETS_COMPANY: {
    method: 'GET',
    url: 'support-queries/all-user-queries/COMPANY/',
  },
  // Buy plan
  BUY_PLAN: {
    method: 'POST',
    url: 'payment/buy-subscription',
  },
  // Get all plans
  GET_ALL_PLAN: {
    method: 'GET',
    url: 'payment/view-all-products',
  },
  // Get all ads ons
  GET_ADS_ONS: {
    method: 'GET',
    url: 'payment/view-all-addons',
  },
  // Get company plan
  GET_COMPANY_PLAN: {
    method: 'GET',
    url: 'payment/get-customer-subscription?id=',
  },
  // Get ticket chat
  GET_TICKET_CHAT: {
    method: 'GET',
    url: 'support-queries/conversation/',
  },
  // Stripe Checkout
  STRIPE_CHECKOUT: {
    method: 'POST',
    url: 'payment/checkout-session',
  },
  // Message List
  MESSAGES_LIST: {
    method: 'GET',
    url: 'chat/get-all-chats?id=',
  },
  // Chat
  MESSAGE_CHAT: {
    method: 'GET',
    url: 'chat/get-chat-by-id?id=',
  },
  // Chat by ids
  MESSAGE_CHAT_BY_IDS: {
    method: 'GET',
    url: 'chat/get-chat-by-user-ids?company=',
  },
  // Chat Block Unblock
  CHAT_BLOCK: {
    method: 'GET',
    url: 'chat/block-unblock?id=',
  },
  // Driver Notifications
  DRIVER_NOTIFICATIONS: {
    method: 'GET',
    url: 'notification/get-all-specific-user?userType=DRIVER&id=',
  },
  // Driver Notifications
  COMPANY_NOTIFICATIONS: {
    method: 'GET',
    url: 'notification/get-all-specific-user?userType=COMPANY&id=',
  },
  // Driver Notifications
  DRIVER_NOTIFICATIONS_COUNTER: {
    method: 'GET',
    url: 'notification/unread-length?userType=DRIVER&id=',
  },
  // Driver Notifications
  COMPANY_NOTIFICATIONS_COUNTER: {
    method: 'GET',
    url: 'notification/unread-length?userType=COMPANY&id=',
  },
  // Mark As read
  MARK_AS_READ: {
    method: 'PUT',
    url: 'notification/mark-as-read',
  },
  // Mark As read
  MARK_MSGS_AS_READ: {
    method: 'GET',
    url: 'chat/mark-as-read?id=',
  },

  UPLOAD_IMG: {
    method: 'POST',
    url: 'image/upload',
  },
  // Driver Notifications
  COMPANY_MESSAGES_COUNTER: {
    method: 'GET',
    url: 'chat/all-unread-count?id=',
  },

  // View profile
  VIEW_PROFILE: {
    method: 'GET',
    url: 'company/view-driver-profile?companyId=',
  },
};
