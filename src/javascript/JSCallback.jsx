import { Button, MainHeading } from "../components";

export const JSCallback = () => {
  const printMessage = (message) => {
    console.log(
      "This is function passed as an argument\nExample type: -",
      message
    );
  };

  // Basic Example
  const basicFunction = (callbackFun) => {
    console.log(
      "This the function accepting other function as an argument. This types of function are called as Higher order function"
    );
    if (typeof callbackFun === "function") callbackFun("basic");
    console.log("The data function is executed");
  };

  // Array Example
  const processArray = (arr, callback) => {
    return arr.map((item) => callback(item));
  };

  // Event Simulation Example
  const simulateAsyncOperation = (callback, delay = 1000) => {
    console.log("Starting async operation...");
    setTimeout(() => {
      callback("Operation completed!");
    }, delay);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <MainHeading heading="JavaScript Callbacks"/>

      {/* Introduction Section */}
      <section className="mb-8 bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">What is a Callback?</h2>
        <p className="mb-2">
          A callback is a function passed as an argument to another function.
        </p>
        <p className="text-gray-300">
          Callbacks were the primary way to handle asynchronous operations
          before Promises.
        </p>
      </section>

      {/* Examples Section */}
      <section className="grid gap-6">
        {/* Basic Example */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Basic Example</h3>
          <Button
            handleClick={() => basicFunction(printMessage)}
            label="Execute Basic Example"
          />
          <p className="mt-2 text-gray-300">Check console for output</p>
        </div>

        {/* Array Processing Example */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">
            Array Processing Example
          </h3>
          <Button
            handleClick={() => {
              const numbers = [1, 2, 3, 4, 5];
              const doubled = processArray(numbers, (x) => x * 2);
              console.log("Doubled numbers:", doubled);
            }}
            label="Process Array"
          />
          <p className="mt-2 text-gray-300">
            Demonstrates callback with array operations
          </p>
        </div>

        {/* Async Example */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Asynchronous Example</h3>
          <Button
            handleClick={() =>
              simulateAsyncOperation((result) => console.log(result))
            }
            label="Start Async Operation"
          />
          <p className="mt-2 text-gray-300">
            Simulates an async operation with callback
          </p>
        </div>
      </section>

      {/* Problems Section */}
      <section className="mt-8 bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Callback Problems</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Callback Hell - Nested callbacks leading to complex, hard-to-read
            code
          </li>
          <li>
            Inversion of Control - Losing control over when the callback
            executes
          </li>
          <li>
            Error Handling - Difficult to handle errors across multiple
            callbacks
          </li>
        </ul>
      </section>
    </div>
  );
};
