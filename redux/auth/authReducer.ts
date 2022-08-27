import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  userId?: string | null;
  nickName?: number|string | null;
  email?: string | null;
  stateChange?: boolean;
  errorLogin?: boolean;
}

interface IUser{
  email:string, password: string, nickName?: string
}

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
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickName: payload.nickName,
      email: payload.email,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => initialState,
    authLoginError: (state, _) => ({
      ...state,
      errorLogin: true,
    }),
  },
});
