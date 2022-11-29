import { combineReducers } from "redux";

import themeReducer from "./themeReducer";
import authReducer from "./authReducer";
import scaleReducer from "./scaleReducer";

export const rootReducer = combineReducers({
  themeReducer,
  authReducer,
  scaleReducer,
});
