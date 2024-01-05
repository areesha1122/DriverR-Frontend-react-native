// Main State Interface
export interface ChatState {
  userChats: any;
}

// All action types
export const SET_USER_CHATS = 'SET_USER_CHATS';
export const RESET = 'RESET';

// Defination of all interfaces for auth actions
export interface SetUserChatsAction {
  type: typeof SET_USER_CHATS;
  chats: object;
}

export interface resetAction {
  type: typeof RESET;
}

// Export all defined action
export type ChatsAction = SetUserChatsAction | resetAction;
