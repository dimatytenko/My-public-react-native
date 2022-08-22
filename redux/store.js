import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";

import { authSlice } from "./auth/authReducer.js";
import { toolsSlice } from "./tools/toolsReducer.js";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [toolsSlice.name]: toolsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
