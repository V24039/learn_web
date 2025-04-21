import { Button, Buttons, CodeDisplay, Grid, MainHeading } from "../components";

export const JSPromises = () => {
  const basicPromiseResolve = async () => {
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

  const basicPromiseReject = async () => {
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

  // eslint-disable-next-line no-unused-vars
  const promiseCopy = new MyPromiseCopy(function (resolve, reject) {});

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <MainHeading heading="JavaScript Promises" />
      {/* Introduction */}
      <section className="mb-8 bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Promise Methods</h2>
        <p className="text-gray-300">
          Promises provide a cleaner way to handle asynchronous operations
        </p>
      </section>

      {/* Promise working */}
      <section className="grid gap-6 mb-8">
        <Grid label="basic promise with no async await" descp={[""]}>
          <Buttons>
            <Button
              handleClick={basicPromiseResolve}
              label="basic Promise for resolve"
            />
            <Button
              handleClick={basicPromiseReject}
              label="basic Promise for reject"
            />
          </Buttons>
        </Grid>
        <Grid
          label="then method"
          descp={[
            "then by returns a resolved promise with returned value",
            "we can pass a second arugment with then function for handling reject for that particular then",
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
      </section>

      {/* Promise Methods */}
      <section className="grid gap-6">
        <Grid
          label="Promise.all"
          descp={[
            "Waits for all promises to resolve, fails if any promise rejects",
          ]}
        >
          <Buttons>
            <Button
              handleClick={demoPromiseAll}
              label="Demo Promise.all happy"
            />
            <Button
              handleClick={demoPromiseAllFail}
              label="Demo Promise.all one fail"
            />
          </Buttons>
        </Grid>
        <Grid
          label="Promise.race"
          descp={[
            "Returns result of the first settled promise (resolved or rejected)",
            "Use case: You can race a potentially long-lasting request with a timer that rejects, so that when the time limit has elapsed, the resulting promise automatically rejects.",
          ]}
        >
          <Buttons>
            <Button
              handleClick={demoPromiseRace}
              label="Demo Promise.race happy"
            />
            <Button
              handleClick={demoPromiseRaceFail}
              label="Demo Promise.race fail"
            />
          </Buttons>
        </Grid>
        <Grid
          label="Promise.allSettled"
          descp={[
            "Waits for all promises to complete, regardless of success or failure",
          ]}
        >
          <Buttons>
            <Button
              handleClick={demoPromiseAllSettled}
              label="Demo Promise.allSettled happy"
            />
            <Button
              handleClick={demoPromiseAllSettledFail}
              label="Demo Promise.allSettled fail"
            />
          </Buttons>
        </Grid>

        <Grid
          label="Promise.any"
          descp={[
            "Returns the first fulfilled promise, ignores rejections until all fail",
          ]}
        >
          <Buttons>
            <Button
              handleClick={demoPromiseAny}
              label="Demo Promise.any happy"
            />
            <Button
              handleClick={demoPromiseAnyFail}
              label="Demo Promise.any fail"
            />
            <Button
              handleClick={demoPromiseAnyAllFail}
              label="Demo Promise.any all failed"
            />
          </Buttons>
        </Grid>
      </section>
    </div>
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
  constructor(callback) {
    callback(this.#reject, this.#resolve);
  }

  // adding # makes it private fucntion
  #resolve(value) {
    this.#promiseState = States.FULLFILLED;
    this.#handlers.forEach((func) => {
      // run all then functions after when resolve is called
      func(value);
    });
  }

  // adding # makes it private fucntion
  #reject() {}

  then(thenCallback) {
    this.#handlers.push(thenCallback);

    // if a promise is resolved immediately
    if (this.#promiseState === States.FULLFILLED) {
      this.#handlers.forEach((func) => {
        func();
      });
    }
  }

  catch() {}

  finally() {}
}
