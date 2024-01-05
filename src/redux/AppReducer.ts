import {combineReducers} from 'redux';
import authReducer from './auth/authReducer';
import jobPostsReducer from './jobPosts/jobPostsReducer';
import SupportReducer from './support-faqs/supportReducer';
import PlansReducer from './plans/plansReducer';
import chatsReducer from './chat/chatsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  jobPosts: jobPostsReducer,
  support: SupportReducer,
  plans: PlansReducer,
  chat: chatsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
