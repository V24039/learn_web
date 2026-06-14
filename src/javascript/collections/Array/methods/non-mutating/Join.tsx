import { Button, Buttons, Grid } from "src/components";

export const JSJoin = () => {
  const sparseArray = [1, , 3];
  const nanArray = [NaN];
  const testArray = [1, 2, 3, 4, 5];
  const testArrayWithUndefined = [1, undefined, 3, undefined, 5, null];
  const testArrayOfObjects = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
  ];
  const testArrayWithNull = [1, null, 3, null, 5];
  const testArrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];

  const demoJoin = () => {
    console.log(
      "Using join to create a string by concatenating all elements in the array with a separator",
    );
    const result = testArray.join(", ");
    console.log(result);
    console.log(
      "The join method creates and returns a new string by concatenating all of the elements in an array, separated by commas or a specified separator string. The original array will not be modified",
    );
  };
  const demoJoinNullUndefined = () => {
    console.log(testArrayWithUndefined.join(","));
  };

  const demoJoinSparseArray = () => {
    console.log(sparseArray.join(","));
  };

  return (
    <Grid
      label="join"
      descp={[
        "Returns a string by concatenating all the elements of an array.",
      ]}
    >
      <Buttons>
        <Button handleClick={demoJoin} label="Demo join" />
        <Button handleClick={demoJoinNullUndefined} label="Demo join with null and undefined elements" />
        <Button handleClick={demoJoinSparseArray} label="Demo join with sparse elements" />
      </Buttons>
    </Grid>
  );
};
