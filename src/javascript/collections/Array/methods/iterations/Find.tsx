import { Button, Buttons, Grid } from "src/components";

export const JSFind = () => {
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

  const demoFind = () => {
    console.log(
      "Using find to get the first element in the array that is greater than 3",
    );
    const result = testArray.find((element) => element > 3);
    console.log(result);
    console.log(
      "The find method returns the value of the first element in the array that satisfies the provided testing function",
    );
  };

  const demoFindIndex = () => {
    console.log(
      "Using findIndex to get the index of the first element in the array that is greater than 3",
    );
    const result = testArray.findIndex((element) => element > 3);
    console.log(result);
    console.log(
      "The findIndex method returns the index of the first element in the array that satisfies the provided testing function",
    );
  };

  const demoFindNotFound = () => {
    console.log(testArray.find((x) => x > 100));
  };

  const demoFindIndexNotFound = () => {
    console.log(testArray.findIndex((x) => x > 100));
  };

  const demoFindSparseArray = () => {
    console.log("Input sparse array:", sparseArray);
    console.log("Running find() to locate an undefined value:");
    const found = sparseArray.find((value, index) => {
      console.log(`Visiting index ${index}: value is ${value}`);
      return value === undefined;
    });
    console.log("Found value:", found);
    console.log("Running findIndex() to locate an undefined value:");
    const foundIdx = sparseArray.findIndex((value) => value === undefined);
    console.log("Found index:", foundIdx);
    console.log(
      "Explanation: Unlike forEach/map/filter, find and findIndex DO visit empty slots in sparse arrays, treating them as undefined."
    );
  };

  return (
    <>
      <Grid
        label="find"
        descp={[
          "Returns the value of the first element in the array that satisfies the provided testing function.",
          "Unlike older iteration methods, find and findIndex DO visit empty slots in sparse arrays, treating them as undefined.",
        ]}
      >
        <Buttons>
          <Button handleClick={demoFind} label="Demo find" />
          <Button handleClick={demoFindNotFound} label="Demo find not found" />
          <Button handleClick={demoFindSparseArray} label="Demo find sparse array" />
        </Buttons>
      </Grid>
      <Grid
        label="findIndex"
        descp={[
          "Returns the index of the first element in the array that satisfies the provided testing function.",
        ]}
      >
        <Buttons>
          <Button handleClick={demoFindIndex} label="Demo findIndex" />
          <Button handleClick={demoFindIndexNotFound} label="Demo findIndex not found" />
        </Buttons>
      </Grid>
    </>
  );
};
