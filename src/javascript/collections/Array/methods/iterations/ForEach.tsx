import { Button, Buttons, Grid } from "src/components";

export const JSForeach = () => {
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

  const demoForEach = () => {
    console.log("Using forEach to log each element in the array");
    testArray.forEach((element) => {
      console.log(element);
    });
  };

  const demoForEachSparseArray = () => {
    console.log("Input sparse array:", sparseArray);
    console.log("Iterating with forEach:");
    sparseArray.forEach((value, index) => {
      console.log(`Index: ${index}, Value: ${value}`);
    });
    console.log(
      "Notice that index 1 is completely skipped. forEach does not execute the callback for empty slots in sparse arrays.",
    );
  };

  const demoForEachMutation = () => {
    const arr = [1, 2, 3];

    arr.forEach((value, index) => {
      console.log(value);

      if (index === 0) {
        arr.push(4);
      }
    });

    console.log(arr);
  };

  const demoForEachCannotBreak = () => {
    console.log(
      "forEach cannot break. Use some(), every(), or for...of instead.",
    );
  };

  const demoForEachWithIndex = () => {
    console.log("Using forEach to log each element and its index in the array");
    testArray.forEach((element, index) => {
      console.log(`Index: ${index}, Element: ${element}`);
    });
  };

  const demoForEachWithThisArg = () => {
    console.log(
      "Using forEach with a thisArg to log each element multiplied by a multiplier",
    );
    const thisArg: { multiplier: number } = { multiplier: 10 };
    testArray.forEach(function (this: { multiplier: number }, element) {
      console.log(element * this.multiplier);
    }, thisArg);
  };

  const demoForEachWithUndefinedNull = () => {
    console.log(
      "Using forEach to log each element in the array with undefined and null values",
    );
    testArrayWithUndefined.forEach((element) => {
      console.log(element);
    });
    testArrayWithNull.forEach((element) => {
      console.log(element);
    });
  };

  const demoForEachWithObjects = () => {
    console.log(
      "Using forEach to log each object in the array and access its properties",
    );
    testArrayOfObjects.forEach((element) => {
      console.log(`Name: ${element.name}, Age: ${element.age}`);
    });
  };

  return (
    <Grid
      label="forEach"
      descp={[
        "Executes a provided function once for each array element.",
        "Does not return a new array, returns undefined.",
      ]}
    >
      <Buttons>
        <Button handleClick={demoForEach} label="Demo forEach" />
        <Button handleClick={demoForEachSparseArray} label="Demo forEach sparse array" />
        <Button handleClick={demoForEachMutation} label="Demo forEach mutation" />
        <Button handleClick={demoForEachCannotBreak} label="Demo forEach cannot break" />
        <Button handleClick={demoForEachWithIndex} label="Demo forEach with index" />
        <Button handleClick={demoForEachWithThisArg} label="Demo forEach using this arg" />
        <Button handleClick={demoForEachWithUndefinedNull} label="Demo forEach with undefined and null elements" />
        <Button handleClick={demoForEachWithObjects} label="Demo forEach with objects" />
      </Buttons>
    </Grid>
  );
};
