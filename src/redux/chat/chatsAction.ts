import {ChatsAction, RESET, SET_USER_CHATS} from './chatType';

// Define all the actions required to set values in store
export const SetUserChats = (chats: object): ChatsAction => ({
  type: SET_USER_CHATS,
  chats,
});

export const reset = (): ChatsAction => ({
  type: RESET,
});
