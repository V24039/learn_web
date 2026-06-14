import { Button, Buttons, Grid } from "src/components";

export const JSMap = () => {
  const testArray = [1, 2, 3, 4, 5];
  const sparseArray = [1, , 3];
  const testArrayWithUndefined = [1, undefined, 3, undefined, 5];
  const testArrayOfObjects = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
  ];
  const testArrayWithNull = [1, null, 3, null, 5];

  const demoMap = () => {
    console.log(
      "Using map to create a new array with each element multiplied by 2",
    );
    const result = testArray.map((element) => element * 2);
    console.log(result);
    console.log(
      "The map method creates a new array by applying the provided function to each element in the original array",
    );
  };

  const demoMapWithThisArg = () => {
    console.log(
      "Using map with a thisArg to create a new array with each element multiplied by a multiplier",
    );
    const thisArg: { multiplier: number } = { multiplier: 5 };
    const result = testArray.map(function (
      this: { multiplier: number },
      element,
    ) {
      return element * this.multiplier;
    }, thisArg);
    console.log(result);
    console.log(
      "The map method creates a new array by applying the provided function to each element in the original array and thisArg is used as the this value inside the map function",
    );
  };

  const demoMapWithUndefinedNull = () => {
    console.log(
      "Using map to create a new array with each element multiplied by 2 in the array with undefined and null values",
    );
    const resultWithUndefined = testArrayWithUndefined.map((element) =>
      element !== undefined ? element * 2 : undefined,
    );
    const resultWithNull = testArrayWithNull.map((element) =>
      element !== null ? element * 2 : null,
    );
    console.log(resultWithUndefined);
    console.log(resultWithNull);
    console.log(
      "The map method creates a new array by applying the provided function to each element in the original array. For undefined and null values, we check for them and return undefined or null in the new array respectively",
    );
  };

  const demoMapWithObjects = () => {
    console.log(
      "Using map to create a new array with the names of each object in the array",
    );
    const result = testArrayOfObjects.map((element) => element.name);
    console.log(result);
    console.log(
      "The map method creates a new array by applying the provided function to each element in the original array. In this case, we access the name property of each object to create a new array of names",
    );
  };

  const demoMapWithObjectsAndThisArg = () => {
    console.log(
      "Using map with a thisArg to create a new array with the names of each object in the array concatenated with a suffix",
    );
    const thisArg: { suffix: string } = { suffix: " Smith" };
    const result = testArrayOfObjects.map(function (
      this: { suffix: string },
      element,
    ) {
      return element.name + this.suffix;
    }, thisArg);
    console.log(result);
    console.log(
      "The map method creates a new array by applying the provided function to each element in the original array and thisArg is used as the this value inside the map function. In this case, we access the name property of each object and concatenate it with a suffix from thisArg to create a new array of modified names",
    );
  };

  const demoMapWithObjectsAndUndefinedThisArg = () => {
    console.log(
      "Using map with an undefined thisArg to create a new array with the names of each object in the array",
    );
    const result = testArrayOfObjects.map(function (element) {
      return element.name;
    }, undefined);
    console.log(result);
    console.log(
      "The map method creates a new array by applying the provided function to each element in the original array and thisArg is used as the this value inside the map function. In this case, we access the name property of each object to create a new array of names",
    );
  };

  const demoMapWithObjectsAndNullThisArg = () => {
    console.log(
      "Using map with a null thisArg to create a new array with the names of each object in the array",
    );
    const result = testArrayOfObjects.map(function (element) {
      return element.name;
    }, null);
    console.log(result);
    console.log(
      "The map method creates a new array by applying the provided function to each element in the original array and thisArg is used as the this value inside the map function. In this case, we access the name property of each object to create a new array of names",
    );
  };

  const demoMapSparseArray = () => {
    console.log("Input sparse array:", sparseArray);
    const result = sparseArray.map((x) => x! * 2);
    console.log("Result of map:", result);
    console.log("Check if index 1 exists in the result using 'in' operator:", 1 in result);
    console.log(
      "Notice that the callback is skipped for the empty slot, but the empty slot is still preserved at the same index in the returned array."
    );
  };

  const demoMapObjectPitfall = () => {
    console.log("Correct arrow function object return (using parentheses):");
    console.log(
      "[1, 2, 3].map((x) => ({ value: x })) outputs:",
      [1, 2, 3].map((x) => ({
        value: x,
      })),
    );

    console.log("Incorrect arrow function object return (missing parentheses):");
    console.log(
      "[1, 2, 3].map((x) => { value: x }) outputs:",
      [1, 2, 3].map((x) => {
        value: x;
      }),
    );
    console.log(
      "Explanation: { value: x } is parsed as a block statement rather than an object literal. Because there is no 'return' statement inside the block, it implicitly returns undefined for every element."
    );
  };

  return (
    <Grid
      label="map"
      descp={[
        "Creates a new array with the results of calling a provided function on every element in the calling array.",
      ]}
    >
      <Buttons>
        <Button handleClick={demoMap} label="Demo map" />
        <Button handleClick={demoMapWithThisArg} label="Demo map this arg" />
        <Button handleClick={demoMapWithUndefinedNull} label="Demo map undefined null" />
        <Button handleClick={demoMapWithObjects} label="Demo map objects" />
        <Button handleClick={demoMapWithObjectsAndThisArg} label="Demo map objects this arg" />
        <Button handleClick={demoMapWithObjectsAndUndefinedThisArg} label="Demo map Objects Undefined" />
        <Button handleClick={demoMapWithObjectsAndNullThisArg} label="Demo map Objects And Null This Arg" />
        <Button handleClick={demoMapSparseArray} label="Demo map sparse array" />
        <Button handleClick={demoMapObjectPitfall} label="Demo map Object" />
      </Buttons>
    </Grid>
  );
};
