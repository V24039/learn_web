import {
  decrement,
  increment,
  incrementByAmount,
  multipleVal,
  reset,
} from "./features/counter/counterSlice";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "./hook";
// import { useRef } from "react";

const ReduxCount = () => {
  let incAmount = useRef(0);
  let action = useRef("+");

  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  const handleIncClick = (e: any) => {
    e.preventDefault();
    dispatch(increment());
  };

  const handleDecClick = (e: any) => {
    e.preventDefault();
    dispatch(decrement());
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    dispatch(reset());
  };

  const handleIncAmt = (e: any) => {
    e.preventDefault();
    dispatch(incrementByAmount(incAmount.current));
  };

  const handleAction = (e: any) => {
    e.preventDefault();
    dispatch(multipleVal(action.current, incAmount.current));
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <button onClick={handleIncClick}>Inc</button>
        <button onClick={handleDecClick}>Dec</button>
        <button onClick={handleReset}>Reset</button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <label htmlFor="incAmount">Increment Amount</label>
          <input
            id="incAmount"
            type="number"
            onChange={(e) =>
              (incAmount.current = parseInt(e.target.value ?? "0"))
            }
          />
          <button onClick={handleIncAmt}>Increment By Amount</button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <label htmlFor="incAmount">Amount</label>
          <input
            id="incAmount"
            type="number"
            onChange={(e) =>
              (incAmount.current = parseInt(e.target.value ?? "0"))
            }
          />
          <label htmlFor="incAmount">Action</label>
          <input
            id="incAmount"
            onChange={(e) => (action.current = e.target.value)}
          />
          <button onClick={handleAction}>Handle Action</button>
          <span>
            For this the function the code to determine <br />
            is written in slice using reducer and pattern
            <br /> and component only calls the action
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReduxCount;
