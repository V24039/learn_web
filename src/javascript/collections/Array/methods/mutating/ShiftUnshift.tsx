import { Button, Buttons, Grid } from "src/components";

export const JSShiftUnshift = () => {
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

  const demoShift = () => {
    console.log("Using shift to remove the first element from the array");
    const arr = [...testArray];
    const shiftedValue = arr.shift();
    console.log("Shifted value:", shiftedValue);
    console.log("Array after shift:", arr);
    console.log(
      "The shift method removes the first element from an array and returns that removed element. This method changes the length of the array",
    );
  };

  const demoShiftEmpty = () => {
    console.log([].shift());
  };

  const demoUnshift = () => {
    console.log(
      "Using unshift to add a new element to the beginning of the array",
    );
    const arr = [...testArray];
    arr.unshift(0);
    console.log(arr);
    console.log(
      "The unshift method adds one or more elements to the beginning of an array and returns the new length of the array",
    );
  };

  return (
    <>
      <Grid
        label="shift"
        descp={[
          "Removes the first element from an array and returns that element.",
        ]}
      >
        <Buttons>
          <Button handleClick={demoShift} label="Demo shift" />
          <Button handleClick={demoShiftEmpty} label="Demo shift empty" />
        </Buttons>
      </Grid>
      <Grid
        label="unshift"
        descp={[
          "Adds one or more elements to the beginning of an array and returns the new length of the array.",
        ]}
      >
        <Buttons>
          <Button handleClick={demoUnshift} label="Demo unshift" />
        </Buttons>
      </Grid>
    </>
  );
};
