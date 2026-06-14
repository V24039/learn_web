import { Button, Buttons, Grid } from "src/components";

export const JSFromAsync = () => {
  const sparseArray = [1, , 3];
  const nanArray = [NaN];
  const testArray = [1, 2, 3, 4, 5];
  const testArrayWithUndefined = [1, undefined, 3, undefined, 5];
  const testArrayOfObjects = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
  ];
  const testArrayWithNull = [1, null, 3, null, 5];
  const testArrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];

  const demoFromAsync = () => {
    console.log("Using Array.fromAsync with an async mapFn");

    const asyncMapFn = async (x: number) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(x * 2);
        }, 1000);
      });
    };

    Array.fromAsync(testArray, asyncMapFn).then((result) => {
      console.log(result);
      console.log(
        "The async mapFn is applied to each element while creating a new array and the result is logged after all promises are resolved",
      );
    });
  };

  const demoFromAsyncWithThisArg = () => {
    console.log("Using Array.fromAsync with an async mapFn and thisArg");

    const thisArg: { multiplier: number } = { multiplier: 4 };
    const asyncMapFn = async function (
      this: { multiplier: number },
      x: number,
    ) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(x * this.multiplier);
        }, 1000);
      });
    };

    Array.fromAsync(testArray, asyncMapFn, thisArg).then((result) => {
      console.log(result);
      console.log(
        "The async mapFn is applied to each element while creating a new array and thisArg is used as the this value inside the async mapFn. The result is logged after all promises are resolved",
      );
    });
  };

  const demoFromAsyncWithSeqGenerator = () => {
    console.log(
      "Using Array.fromAsync with an async mapFn and sequence generator",
    );
    const start = 0;
    const stop = 5;
    const step = 1;

    const asyncMapFn = async function (
      i: number,
    ) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(start + i * step);
        }, 1000);
      });
    };
    Array.fromAsync(
      { length: Math.ceil((stop - start) / step) },
      asyncMapFn,
    ).then((result) => {
      console.log(result);
      console.log(
        "The async mapFn is applied to each element while creating a new array from the sequence generator and the result is logged after all promises are resolved",
      );
    });
  };

  const demoFromAsyncWithSeqGeneratorAndThisArg = () => {
    console.log(
      "Using Array.fromAsync with an async mapFn, sequence generator and thisArg",
    );
    const start = 0;
    const stop = 5;
    const step = 1;
    const thisArg: { multiplier: number } = { multiplier: 5 };

    const asyncMapFn = async function (
      this: { multiplier: number },
      i: number,
    ) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve((start + i * step) * this.multiplier);
        }, 1000);
      });
    };
    Array.fromAsync(
      { length: Math.ceil((stop - start) / step) },
      asyncMapFn,
      thisArg,
    ).then((result) => {
      console.log(result);
      console.log(
        "The async mapFn is applied to each element while creating a new array from the sequence generator and thisArg is used as the this value inside the async mapFn. The result is logged after all promises are resolved",
      );
    });
  };

  const demoFromAsyncGenerator = async () => {
    async function* generator() {
      yield 1;
      yield 2;
      yield 3;
    }

    console.log(await Array.fromAsync(generator()));
  };

  const demoFromAsyncRejectedPromise = async () => {
    try {
      await Array.fromAsync([Promise.resolve(1), Promise.reject("boom")]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid
      label="Array.fromAsync()"
      descp={[
        "Similar to Array.from(), but returns a Promise that resolves to the new array.",
        "The mapFn can be an asynchronous function that returns a Promise, allowing for asynchronous processing of each element while creating the array.",
      ]}
    >
      <Buttons>
        <Button handleClick={demoFromAsync} label="Using an async mapFn" />
        <Button
          handleClick={demoFromAsyncWithThisArg}
          label="Using an async mapFn with this argument"
        />
        <Button
          handleClick={demoFromAsyncWithSeqGenerator}
          label="Using an async mapFn with sequence generator"
        />
        <Button
          handleClick={demoFromAsyncWithSeqGeneratorAndThisArg}
          label="Using an async mapFn with sequence generator and this argument"
        />
        <Button
          handleClick={demoFromAsyncGenerator}
          label="Using an async generator"
        />
        <Button
          handleClick={demoFromAsyncRejectedPromise}
          label="Using an async Rejected Promise"
        />
      </Buttons>
    </Grid>
  );
};
