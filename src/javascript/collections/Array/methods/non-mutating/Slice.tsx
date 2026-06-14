import { Button, Buttons, Grid } from "src/components";

export const JSSlice = () => {
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

  const demoSlice = () => {
    console.log(
      "Using slice to create a new array with elements from index 1 to 3 (exclusive)",
    );
    const result = testArray.slice(1, 3);
    console.log(result);
    console.log(
      "The slice method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included). The original array will not be modified",
    );
  };

  const demoSliceNegativeIndex = () => {
    console.log(testArray.slice(-2));
  };

  const demoSliceInvalidRange = () => {
    console.log(testArray.slice(3, 1));
  };

  const demoSliceShallowCopy = () => {
    const users = [{ name: "Alice" }];
    const copy = users.slice();

    copy[0].name = "Bob";

    console.log(users);
    console.log(copy);
  };

  return (
    <Grid
      label="slice"
      descp={[
        "Returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included). The original array will not be modified.",
      ]}
    >
      <Buttons>
        <Button handleClick={demoSlice} label="Demo slice" />
        <Button
          handleClick={demoSliceInvalidRange}
          label="Demo slice invalid range"
        />
        <Button
          handleClick={demoSliceNegativeIndex}
          label="Demo slice negative index"
        />
        <Button
          handleClick={demoSliceShallowCopy}
          label="Demo slice shallow copy"
        />
      </Buttons>
    </Grid>
  );
};
