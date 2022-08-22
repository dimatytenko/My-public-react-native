import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dimensions: null,
};

export const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    setDimensions: (_, { payload }) => ({
      dimensions: payload,
    }),
  },
});

export const { setDimensions } = toolsSlice.actions;
