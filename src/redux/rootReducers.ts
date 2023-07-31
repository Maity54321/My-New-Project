import { userReducer } from "./userReducers";
import { combineReducers } from "redux";

const rootReducers = combineReducers({ userReducer });

export default rootReducers;
