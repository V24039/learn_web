import { Button, Buttons, CodeDisplay, Grid, MainHeading } from "../components";

export const JSPromises = () => {
  const basicPromiseResolve = () => {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        console.log("Promise fullfilled.");
        resolve("Called resolved.");
      }, 3000);
    });

    const returnValue = promise.then((value) => {
      console.log(value);
      return value;
    });

    console.log(returnValue);
  };

  const basicPromiseReject = () => {
    const promise = new Promise((reject) => {
      setTimeout(() => {
        console.log("Promise rejected.");
        reject("Called reject.");
      }, 3000);
    });

    const returnValue = promise.catch((value) => {
      console.log(value);
      return value;
    });

    console.log(returnValue);
  };

  const promiseWithAsyncAwait = async () => {
    const promise = await new Promise((resolve) => {
      setTimeout(() => {
        console.log("Promise fullfilled.");
        resolve("Called resolved.");
      }, 3000);
    });

    console.log("Consoled after promise and logged after promise complete");
    console.log(promise);
  };

  const promiseWithoutAsyncAwait = () => {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        console.log("Promise fullfilled.");
        resolve("Called resolved.");
      }, 3000);
    });

    const returnValue = promise.then((value) => {
      console.log(value);
      return value;
    });

    console.log("Consoled after promise but logged before promise complete");
    console.log(returnValue);
  };

  // Example promise creation
  const createPromise = (index, shouldResolve, time = 1000) => {
    const successMessage = `Success! index - ${index}, time - ${time}`;
    const failMessage = `Failed! index - ${index}, time - ${time}`;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          console.log("Promise fullfilled. index - ", index, "time - ", time);
          resolve(successMessage);
        } else {
          console.log("Promise failed. index - ", index, "time - ", time);
          reject(failMessage);
        }
      }, time);
    });
  };

  const demoAsyncAwaitRejection = async () => {
    try {
      console.log("Attempting to await a rejecting promise...");
      const result = await createPromise(99, false, 500);
      // This line won't be reached if it rejects
      console.log("Async/Await Success (unexpected):", result);
    } catch (error) {
      console.error("Async/Await Caught Error:", error);
    } finally {
      console.log("Async/Await Finally block executed.");
    }
  };

  const demoThenChaining = () => {
    console.log("Starting .then() chain demo...");
    createPromise(10, true, 500)
      .then((result1) => {
        console.log("Chain Step 1:", result1);
        // Modify the result for the next step
        return result1.toUpperCase();
      })
      .then((result2) => {
        console.log("Chain Step 2:", result2);
        // Perform another action
        return `Processed length: ${result2.length}`;
      })
      .then((finalResult) => {
        console.log("Chain Final Result:", finalResult);
      })
      .catch((error) => {
        console.error("Error in .then() chain:", error);
      });
    console.log(".then() chain initiated (will log before steps complete).");
  };

  // Demo functions
  const demoPromiseAll = () => {
    const promises = [
      createPromise(1, true),
      createPromise(2, true, 2000),
      createPromise(3, true, 500),
    ];
    Promise.all(promises)
      .then((results) => console.log("All succeeded:", results))
      .catch((error) => console.log("One failed:", error));
  };

  const demoPromiseAllFail = () => {
    const promises = [
      createPromise(1, true),
      createPromise(2, true, 100),
      createPromise(3, false, 500),
    ];

    Promise.all(promises)
      .then((results) => console.log("All succeeded:", results))
      .catch((error) => console.log("One failed:", error));
  };

  const demoPromiseRace = () => {
    const promises = [createPromise(1, true), createPromise(2, true, 2000)];
    Promise.race(promises).then((result) =>
      console.log("Race winner:", result)
    );
  };

  const demoPromiseRaceFail = () => {
    const promises = [
      createPromise(1, true),
      createPromise(2, true, 100),
      createPromise(3, false, 500),
    ];
    Promise.race(promises)
      .then((result) => console.log("Race winner:", result))
      .catch((error) => console.log("One failed:", error));
  };

  const demoPromiseAllSettled = () => {
    const promises = [
      createPromise(1, true),
      createPromise(2, true, 2000),
      createPromise(3, true, 200),
    ];
    Promise.allSettled(promises).then((result) =>
      console.log("All promise resolved:", result)
    );
  };

  const demoPromiseAllSettledFail = () => {
    const promises = [
      createPromise(1, true),
      createPromise(2, true, 100),
      createPromise(3, false, 500),
    ];
    Promise.allSettled(promises)
      .then((result) => console.log("Promises resolved:", result))
      .catch((error) => console.log("Promises reject:", error));
  };

  const demoPromiseAny = () => {
    const promises = [
      createPromise(1, true),
      createPromise(2, true, 2000),
      createPromise(3, true, 200),
    ];
    Promise.any(promises).then((result) =>
      console.log("One promise resolved:", result)
    );
  };

  const demoPromiseAnyFail = () => {
    const promises = [
      createPromise(1, true),
      createPromise(2, true, 3000),
      createPromise(3, false, 500),
    ];
    Promise.any(promises)
      .then((result) => console.log("Promises resolved:", result))
      .catch((error) => console.log("Promises reject:", error));
  };

  const demoPromiseAnyAllFail = () => {
    const promises = [
      createPromise(1, false),
      createPromise(2, false, 3000),
      createPromise(3, false, 500),
    ];
    Promise.any(promises)
      .then((result) => console.log("Promises resolved:", result))
      .catch((error) => console.log("Promises reject:", error));
  };

  const thenWithNoReturn = async () => {
    const promise = await createPromise(1, true).then((value) => {
      console.log("then with no return", value);
    });
    console.log("value returned from then", promise);
  };

  const thenWithReturn = async () => {
    const promise = await createPromise(1, true).then((value) => {
      console.log("then with return", value);
      return value;
    });
    console.log("value returned from then", promise);
  };

  const demoStaticMethods = () => {
    // Immediate resolution
    Promise.resolve("Instant success").then((value) =>
      console.log("Resolved:", value)
    );

    // Immediate rejection
    Promise.reject(new Error("Instant failure")).catch((error) =>
      console.error("Rejected:", error)
    );

    // Converting value to promise
    const thenable = {
      then: (resolve) => resolve("From thenable"),
    };
    Promise.resolve(thenable).then((value) =>
      console.log("From thenable:", value)
    );
  };

  // eslint-disable-next-line no-unused-vars
  const promiseCopy = new MyPromiseCopy(function (resolve, reject) {});

  // currently not available was relased in 2024
  //const promiseWithResolver = Promise.withResolvers()

  return (
    <>
      <MainHeading heading="JavaScript Promises" />
      {/* Introduction */}
      <section className="mb-8 bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Promise Fundamentals</h2>{" "}
        {/* Changed heading slightly */}
        <p className="text-gray-300">
          Promises provide a cleaner way to handle asynchronous operations.
          Explore different ways to create and handle them.
        </p>
      </section>

      {/* Promise working */}
      <section className="grid gap-6 mb-8">
        {/* Basic Promise Creation */}
        <Grid
          label="Basic Promise Creation (.then/.catch)"
          descp={[
            "Demonstrates creating a promise and handling resolution/rejection using .then() and .catch() callbacks.",
          ]}
        >
          <Buttons>
            <Button
              handleClick={basicPromiseResolve}
              label="Basic Resolve (.then)"
            />
            <Button
              handleClick={basicPromiseReject}
              label="Basic Reject (.catch)"
            />
          </Buttons>
        </Grid>

        {/* Async/Await vs .then */}
        <Grid
          label="Async/Await vs .then()"
          descp={[
            "Compares using async/await for synchronous-looking code vs. the traditional .then() callback approach.",
            "async/await pauses function execution; .then() schedules a callback without pausing.",
          ]}
        >
          <Buttons>
            <Button
              handleClick={promiseWithAsyncAwait}
              label="With Async/Await"
            />
            <Button
              handleClick={promiseWithoutAsyncAwait}
              label="Without Async/Await (.then)"
            />
          </Buttons>
        </Grid>

        {/* Handling Rejection with Async/Await */}
        <Grid
          label="Handling Rejection with Async/Await"
          descp={[
            "Shows how to use try...catch blocks to handle rejected promises when using await.",
            "The finally block executes regardless of whether the promise resolved or rejected.",
          ]}
        >
          <Button
            label="Demo reject for async/await"
            handleClick={demoAsyncAwaitRejection}
          />
        </Grid>

        {/* .then() Chaining */}
        <Grid
          label=".then() Chaining"
          descp={[
            "Demonstrates how to chain multiple .then() calls for sequential asynchronous operations.",
            "Each .then() can return a value that is passed to the next .then() in the chain.",
          ]}
        >
          <Button
            label="then chaining example"
            handleClick={demoThenChaining}
          />
        </Grid>

        {/* .then() Return Value */}
        <Grid
          label=".then() Return Value"
          descp={[
            "Demonstrates the difference between a .then() callback that returns a value and one that doesn't.",
            "If .then() returns a value, the promise it returns resolves with that value. If it returns nothing, the promise resolves with undefined.",
            "Also shows using the second argument of .then() for rejection handling.",
          ]}
          link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then"
        >
          <CodeDisplay
            codeSnippet={`const p1 = new Promise((resolve, reject) => {
  resolve("Success!");
  // or
  // reject(new Error("Error!"));
});

p1.then(
  (value) => {
    console.log(value); // Success!
  },
  (reason) => {
    console.error(reason); // Error!
  },
);`}
          />
          <Buttons>
            <Button
              handleClick={thenWithNoReturn}
              label="then with no return"
            />
            <Button handleClick={thenWithReturn} label="then with return" />
          </Buttons>
        </Grid>

        {/* Promise.withResolvers */}
        <Grid
          label="Promise.withResolvers()"
          descp={[
            "A newer static method (ES2024) that returns an object containing a new Promise and its resolve/reject functions.",
            "Useful when you need access to resolve/reject outside the promise executor.",
          ]}
          link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers"
        >
          <p className="text-gray-400 italic">
            Currently not available in all environments (check browser/Node.js
            versions). See MDN for usage.
          </p>
        </Grid>

        {/* Static Methods Demo */}
        <Grid
          label="Static Methods Demo"
          descp={[
            "Demonstrates usage of Promise.resolve and Promise.reject for immediate resolution/rejection.",
            "Shows how a thenable object can be converted into a promise.",
          ]}
        >
          <Buttons>
            <Button
              handleClick={demoStaticMethods}
              label="Demo Static Methods"
            />
          </Buttons>
        </Grid>
      </section>

      {/* Promise Static Methods */}
      <section className="mb-8 bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          Promise Methods to handle multiple promises
        </h2>
        <p className="text-gray-300">
          Explore static methods on the Promise constructor for handling
          multiple promises concurrently.
        </p>
      </section>
      <section className="grid gap-6">
        {/* Promise.all */}
        <Grid
          label="Promise.all()"
          descp={[
            "Waits for all promises in an iterable to resolve.",
            "Rejects immediately if *any* promise rejects.",
            "Resolves with an array of the resolved values (in order).",
          ]}
        >
          <Buttons>
            <Button
              handleClick={demoPromiseAll}
              label="Demo Promise.all (All Resolve)"
            />
            <Button
              handleClick={demoPromiseAllFail}
              label="Demo Promise.all (One Rejects)"
            />
          </Buttons>
        </Grid>

        {/* Promise.race */}
        <Grid
          label="Promise.race()"
          descp={[
            "Waits for the *first* promise in an iterable to settle (either resolve or reject).",
            "Resolves or rejects with the value/reason of that first settled promise.",
            "Use case: Racing a request against a timeout.",
          ]}
        >
          <Buttons>
            <Button
              handleClick={demoPromiseRace}
              label="Demo Promise.race (Fastest Resolves)"
            />
            <Button
              handleClick={demoPromiseRaceFail} // You might want a specific demo where the fastest *rejects*
              label="Demo Promise.race (Fastest Settles)"
            />
          </Buttons>
        </Grid>

        {/* Promise.allSettled */}
        <Grid
          label="Promise.allSettled()"
          descp={[
            "Waits for *all* promises in an iterable to settle (resolve or reject).",
            "Never rejects itself (unless there's a setup error).",
            "Resolves with an array of objects, each describing the outcome ('fulfilled' or 'rejected') of a promise.",
          ]}
        >
          <Buttons>
            <Button
              handleClick={demoPromiseAllSettled}
              label="Demo Promise.allSettled (All Resolve)"
            />
            <Button
              handleClick={demoPromiseAllSettledFail}
              label="Demo Promise.allSettled (Mixed)"
            />
          </Buttons>
        </Grid>

        {/* Promise.any */}
        <Grid
          label="Promise.any()"
          descp={[
            "Waits for the *first* promise in an iterable to *resolve*.",
            "Rejects only if *all* promises reject (with an AggregateError).",
            "Ignores rejected promises until/unless all fail.",
          ]}
        >
          <Buttons>
            <Button
              handleClick={demoPromiseAny}
              label="Demo Promise.any (One Resolves)"
            />
            <Button
              handleClick={demoPromiseAnyFail}
              label="Demo Promise.any fail"
            />
            <Button
              handleClick={demoPromiseAnyAllFail}
              label="Demo Promise.any (All Reject)"
            />
          </Buttons>
        </Grid>
      </section>
    </>
  );
};

const States = {
  PENDING: "PENDING",
  FULLFILLED: "FULLFILLED",
  REJECTED: "REJECTED",
};

class MyPromiseCopy {
  #promiseState = States.PENDING;
  #handlers = [];
  #value = null;
  #error = null;

  constructor(callback) {
    callback(this.#reject, this.#resolve);
  }

  #resolve = (value) => {
    if (this.#promiseState !== States.PENDING) return;
    this.#value = value;
    this.#promiseState = States.FULLFILLED;
    this.#handlers.forEach((handler) => handler.onFulfill(this.#value));
  };

  #reject = (error) => {
    if (this.#promiseState !== States.PENDING) return;
    this.#error = error;
    this.#promiseState = States.REJECTED;
    this.#handlers.forEach((handler) => handler.onReject(this.#error));
  };

  then(onFulfill, onReject) {
    return new MyPromiseCopy((resolve, reject) => {
      const handler = {
        onFulfill: (value) => {
          try {
            const result = onFulfill ? onFulfill(value) : value;
            resolve(result);
          } catch (error) {
            reject(error);
          }
        },
        onReject: (error) => {
          if (onReject) {
            try {
              const result = onReject(error);
              resolve(result);
            } catch (err) {
              reject(err);
            }
          } else {
            reject(error);
          }
        },
      };
      this.#handlers.push(handler);
    });
  }

  catch() {}

  finally() {}
}
