import { Button, Buttons, Grid } from "src/components";

export const JSLastIndexOf = () => {
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

  const demoLastIndexOf = () => {
    console.log(
      "Using lastIndexOf to get the index of the last occurrence of the value 4 in the array with duplicates",
    );
    const result = testArrayWithDuplicates.lastIndexOf(4);
    console.log(result);
    console.log(
      "The lastIndexOf method returns the last index at which a given element can be found in the array, or -1 if it is not present. It searches the array backwards",
    );
  };

  return (
    <Grid
      label="lastIndexOf"
      descp={[
        "Returns the last index at which a given element can be found in the array, or -1 if it is not present",
      ]}
    >
      <Buttons>
        <Button handleClick={demoLastIndexOf} label="Demo lastIndexOf" />
      </Buttons>
    </Grid>
  );
};
