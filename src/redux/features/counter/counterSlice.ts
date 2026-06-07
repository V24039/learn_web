import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  count: number;
}

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
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.count -= action.payload;
    },
    multipleVal: {
      reducer: (state, action: PayloadAction<{ value: number; type: string }>) => {
        if (action.payload.type === "inc") {
          state.count += action.payload.value;
        } else {
          state.count -= action.payload.value;
        }
      },
      prepare: (action, value) => {
        if (action === "-") {
          return { payload: { value: parseInt(value), type: "dec" } };
        }
        return { payload: { value: parseInt(value), type: "inc" } };
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
