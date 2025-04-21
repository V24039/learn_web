import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  multipleVal,
  reset,
} from "./features/counter/counterSlice";
import { useRef } from "react";
// import { useRef } from "react";

const ReduxCount = () => {
  let incAmount = useRef(0);
  let action = useRef("+");

  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  const handleIncClick = (e) => {
    e.preventDefault();
    dispatch(increment());
  };

  const handleDecClick = (e) => {
    e.preventDefault();
    dispatch(decrement());
  };

  const handleReset = (e) => {
    e.preventDefault();
    dispatch(reset());
  };

  const handleIncAmt = (e) => {
    e.preventDefault();
    dispatch(incrementByAmount(incAmount.current));
  };

  const handleAction = (e) => {
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
            onChange={(e) => (incAmount.current = e.target.value)}
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
            onChange={(e) => (incAmount.current = e.target.value)}
          />
          <label htmlFor="incAmount">Action</label>
          <input id="incAmount" onChange={(e) => (action = e.target.value)} />
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
