import { combineReducers } from "redux";
import RegisterUserReducer from "./RegisterUser";
import LoginReducer from "./LoginReducer";
const rootReducer = combineReducers({
  RegisterUserReducer,
  LoginReducer,
});
export default rootReducer;
