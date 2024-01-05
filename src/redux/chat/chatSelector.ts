import {createSelector} from 'reselect';
import {AppState} from '../AppReducer';

// Get data present in store
export const getUserChatss = createSelector(
  (state: AppState) => state.chat?.userChats,
  userChats => userChats,
);
