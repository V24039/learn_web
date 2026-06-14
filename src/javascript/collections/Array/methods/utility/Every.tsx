import { Button, Buttons, Grid } from "src/components";

export const JSEvery = () => {
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

  const demoEvery = () => {
    console.log(
      "Using every to check if all elements in the array are greater than 0",
    );
    const result = testArray.every((element) => element > 0);
    console.log(result);
    console.log(
      "The every method tests whether all elements in the array pass the test implemented by the provided function. It returns true if, in the array, it finds an element for which the provided function returns false; otherwise it returns true. It doesn't modify the array",
    );
  };

  const demoEveryEmptyArray = () => {
    console.log("Checking [].every(() => false):", [].every(() => false));
    console.log("Explanation: every() returns true for any condition on an empty array because it is vacuously true.");
  };

  const demoEverySparseArray = () => {
    console.log("Input sparse array:", sparseArray);
    console.log("Checking [1, , 3].every(x => x !== undefined):");
    const result = sparseArray.every((x) => {
      console.log("Evaluating value:", x);
      return x !== undefined;
    });
    console.log("Result:", result);
    console.log(
      "Explanation: like forEach/map, every() skips empty slots. The empty slot at index 1 is never evaluated, so it returns true."
    );
  };

  return (
    <Grid
      label="every"
      descp={[
        "Tests whether all elements in the array pass the test implemented by the provided function.",
        "Vacuously true: returns true for an empty array regardless of the callback condition.",
        "Skips empty slots in sparse arrays.",
      ]}
    >
      <Buttons>
        <Button handleClick={demoEvery} label="Demo every" />
        <Button
          handleClick={demoEveryEmptyArray}
          label="Demo every for an empty array"
        />
        <Button
          handleClick={demoEverySparseArray}
          label="Demo every sparse array"
        />
      </Buttons>
    </Grid>
  );
};
