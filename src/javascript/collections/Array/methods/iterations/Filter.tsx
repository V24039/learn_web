import { Button, Buttons, Grid } from "src/components";

export const JSFilter = () => {
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

  const demoFilter = () => {
    console.log("Using filter to create a new array with only even numbers");
    const result = testArray.filter((element) => element % 2 === 0);
    console.log(result);
    console.log(
      "The filter method creates a new array with all elements that pass the test implemented by the provided function",
    );
  };

  const demoFilterSparseArray = () => {
    console.log([1, , 3].filter(Boolean));
  };

  const demoFilterTruthy = () => {
    console.log([1, 2, 3].filter((x) => x));
  };

  const demoFilterWithThisArg = () => {
    console.log(
      "Using filter with a thisArg to create a new array with only even numbers",
    );
    const thisArg: { isEven: (n: number) => boolean } = {
      isEven: (n) => n % 2 === 0,
    };
    const result = testArray.filter(function (
      this: { isEven: (n: number) => boolean },
      element,
    ) {
      return this.isEven(element);
    }, thisArg);
    console.log(result);
    console.log(
      "The filter method creates a new array with all elements that pass the test implemented by the provided function and thisArg is used as the this value inside the filter function",
    );
  };

  const demoFilterWithUndefinedNull = () => {
    console.log(
      "Using filter to create a new array with only even numbers in the array with undefined and null values",
    );
    const result = testArrayWithUndefined.filter(
      (element) => typeof element === "number" && element % 2 === 0,
    );
    console.log(result);
    console.log(
      "The filter method creates a new array with all elements that pass the test implemented by the provided function",
    );
  };

  const demoFilterWithObjects = () => {
    console.log(
      "Using filter to create a new array with only objects where age is greater than 30",
    );
    const result = testArrayOfObjects.filter((element) => element.age > 30);
    console.log(result);
    console.log(
      "The filter method creates a new array with all elements that pass the test implemented by the provided function",
    );
  };

  const demoFilterWithObjectsAndThisArg = () => {
    console.log(
      "Using filter with a thisArg to create a new array with only objects where age is greater than a certain value",
    );
    const thisArg: { ageThreshold: number } = { ageThreshold: 30 };
    const result = testArrayOfObjects.filter(function (
      this: { ageThreshold: number },
      element,
    ) {
      return element.age > this.ageThreshold;
    }, thisArg);
    console.log(result);
    console.log(
      "The filter method creates a new array with all elements that pass the test implemented by the provided function and thisArg is used as the this value inside the filter function",
    );
  };

  const demoFilterWithObjectsAndUndefinedThisArg = () => {
    console.log(
      "Using filter with an undefined thisArg to create a new array with only objects where age is greater than 30",
    );
    const result = testArrayOfObjects.filter(function (element) {
      return element.age > 30;
    }, undefined);
    console.log(result);
    console.log(
      "The filter method creates a new array with all elements that pass the test implemented by the provided function and thisArg is used as the this value inside the filter function",
    );
  };

  const demoFilterWithObjectsAndNullThisArg = () => {
    console.log(
      "Using filter with a null thisArg to create a new array with only objects where age is greater than 30",
    );
    const result = testArrayOfObjects.filter(function (element) {
      return element.age > 30;
    }, null);
    console.log(result);
    console.log(
      "The filter method creates a new array with all elements that pass the test implemented by the provided function and thisArg is used as the this value inside the filter function",
    );
  };

  return (
    <Grid
      label="filter"
      descp={[
        "Creates a new array with all elements that pass the test implemented by the provided function.",
      ]}
    >
      <Buttons>
        <Button handleClick={demoFilter} label="Demo filter" />
        <Button
          handleClick={demoFilterSparseArray}
          label="Demo filter sparse array"
        />
        <Button
          handleClick={demoFilterTruthy}
          label="Demo filter truthy values"
        />
        <Button
          handleClick={demoFilterWithThisArg}
          label="Demo filter with this arg"
        />
        <Button
          handleClick={demoFilterWithUndefinedNull}
          label="Demo filter for undefined null elements"
        />
        <Button
          handleClick={demoFilterWithObjects}
          label="Demo filter with objects"
        />
        <Button
          handleClick={demoFilterWithObjectsAndThisArg}
          label="Demo filter with objects and this arg"
        />
        <Button
          handleClick={demoFilterWithObjectsAndUndefinedThisArg}
          label="Demo filter with objects and undefined this"
        />
        <Button
          handleClick={demoFilterWithObjectsAndNullThisArg}
          label="Demo filter with objects and null values"
        />
      </Buttons>
    </Grid>
  );
};
