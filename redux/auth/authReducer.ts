import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

import {IInitialState, IUser} from '../../interfaces';

const initialState:IInitialState = {
  userId: null,
  nickName: null,
  email: null,
  stateChange: false,
  errorLogin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload:{userId, nickName,email} }: PayloadAction<{ userId:string, nickName:string | null,email:string | null}>) => ({
      ...state,
      userId: userId,
      nickName: nickName,
      email: email,
    }),
    authStateChange: (state, { payload:{stateChange} }:PayloadAction<{stateChange: boolean}>) => ({
      ...state,
      stateChange: stateChange,
    }),
    authSignOut: () => initialState,
    authLoginError: (state, {payload:{errorLogin}}:PayloadAction<{errorLogin:boolean}>) => ({
      ...state,
      errorLogin: errorLogin,
    }),
  },
});
