import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  nickname: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});
