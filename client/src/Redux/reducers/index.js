import { combineReducers } from "redux";
import RegisterUserReducer from "./RegisterUser";
import LoginReducer from "./LoginReducer";
import getUserDetailsReducer from "./getUserDetailsReducers";
const rootReducer = combineReducers({
  RegisterUserReducer,
  LoginReducer,
  getUserDetailsReducer,
});
export default rootReducer;
