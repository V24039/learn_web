import { Button, Buttons, Grid } from "src/components";

export const JSPushPop = () => {
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

  const demoPush = () => {
    console.log("Using push to add a new element to the end of the array");
    const arr = [...testArray];
    arr.push(6);
    console.log(arr);
    console.log(
      "The push method adds one or more elements to the end of an array and returns the new length of the array",
    );
  };

  const demoPop = () => {
    console.log("Using pop to remove the last element from the array");
    const arr = [...testArray];
    const poppedValue = arr.pop();
    console.log("Popped value:", poppedValue);
    console.log("Array after pop:", arr);
    console.log(
      "The pop method removes the last element from an array and returns that element. This method changes the length of the array",
    );
  };

  const demoPopEmpty = () => {
    console.log([].pop());
  };

  return (
    <>
      <Grid
        label="push"
        descp={[
          "Adds one or more elements to the end of an array and returns the new length of the array.",
        ]}
      >
        <Buttons>
          <Button handleClick={demoPush} label="Demo push" />
        </Buttons>
      </Grid>
      <Grid
        label="pop"
        descp={[
          "Removes the last element from an array and returns that element.",
        ]}
      >
        <Buttons>
          <Button handleClick={demoPop} label="Demo pop" />
          <Button handleClick={demoPopEmpty} label="Demo pop Empty array" />
        </Buttons>
      </Grid>
    </>
  );
};
