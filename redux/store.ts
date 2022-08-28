import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";

import { authSlice } from "./auth/authReducer";
import {IInitialState} from '../interfaces';


export interface IRootReduser{
  [authSlice.name]: IInitialState 
}

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
