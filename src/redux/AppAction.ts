import {ThunkAction} from 'redux-thunk';
import {AppState} from './AppReducer';
import {AuthAction} from './auth/authType';
import {JobPostsAction} from './jobPosts/jobPostsType';
import {SupportAction} from './support-faqs/supportType';
import {PlansAction} from './plans/plansType';
import {ChatsAction} from './chat/chatType';

export type AppAction =
  | AuthAction
  | JobPostsAction
  | SupportAction
  | PlansAction
  | ChatsAction;

export type TypedThunkAction<T> = ThunkAction<
  Promise<T>,
  AppState,
  undefined,
  AppAction
>;
