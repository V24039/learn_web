import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    incrementByAmount: (state, action) => {
      state.count += parseInt(action.payload);
    },
    decrementByAmount: (state, action) => {
      state.count -= action.payload;
    },
    multipleVal: {
      reducer: (state, action) => {
        if (action.type === "inc") {
          state.count += action.payload;
        } else {
          state.count -= action.payload;
        }
      },
      prepare: (action, value) => {
        if (action === "-") {
          return { payload: parseInt(value) };
        }
        return { payload: parseInt(value), type: "inc" };
      },
    },
  },
});

export const {
  increment,
  decrement,
  decrementByAmount,
  incrementByAmount,
  reset,
  multipleVal,
} = counterSlice.actions;

export default counterSlice.reducer;
