import { Button, Buttons, Grid } from "src/components";

export const JSIndexOf = () => {
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

  const demoIndexOf = () => {
    console.log(
      "Using indexOf to get the index of the first occurrence of the value 3 in the array",
    );
    const result = testArray.indexOf(3);
    console.log(result);
    console.log(
      "The indexOf method returns the first index at which a given element can be found in the array, or -1 if it is not present",
    );
  };

  const demoIndexOfNaN = () => {
    console.log(nanArray.indexOf(NaN));
  };

  const demoIndexOfFromIndex = () => {
    console.log(testArrayWithDuplicates.indexOf(2, 2));
  };
  return (
    <Grid
      label="indexOf"
      descp={[
        "Returns the first index at which a given element can be found in the array, or -1 if it is not present",
      ]}
    >
      <Buttons>
        <Button handleClick={demoIndexOf} label="Demo indexOf" />
        <Button handleClick={demoIndexOfNaN} label="Demo indexOf of array with only NaN element" />
        <Button handleClick={demoIndexOfFromIndex} label="Demo indexOf from index" />
      </Buttons>
    </Grid>
  );
};
