import { combineReducers } from "redux";
import RegisterUserReducer from "./RegisterUser";
import LoginReducer from "./LoginReducer";
import getUserDetailsReducer from "./getUserDetailsReducers";
import searchUserReducer from "./searchUsersReducer";
const rootReducer = combineReducers({
  RegisterUserReducer,
  LoginReducer,
  getUserDetailsReducer,
  searchUserReducer,
});
export default rootReducer;
