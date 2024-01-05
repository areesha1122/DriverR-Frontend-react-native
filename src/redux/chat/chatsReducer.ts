import {ChatState, RESET, SET_USER_CHATS} from './chatType';
import {AppAction} from '../AppAction';

const initialState: ChatState = {
  userChats: [],
};

const chatsReducer = function (state = initialState, action: AppAction) {
  try {
    switch (action.type) {
      case SET_USER_CHATS:
        return {
          ...state,
          userChats: action.chats,
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
export default chatsReducer;
