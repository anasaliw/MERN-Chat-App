import { combineReducers } from "redux";
import RegisterUserReducer from "./RegisterUser";
import LoginReducer from "./LoginReducer";
import getUserDetailsReducer from "./getUserDetailsReducers";
import searchUserReducer from "./searchUsersReducer";
import getChatsReducer from "./getChatsReducer";
import fetchMessagesReducer from "./fetchMessageReducer";
const rootReducer = combineReducers({
  RegisterUserReducer,
  LoginReducer,
  getUserDetailsReducer,
  searchUserReducer,
  getChatsReducer,
  fetchMessagesReducer,
});
export default rootReducer;
