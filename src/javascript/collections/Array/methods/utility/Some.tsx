import { Button, Buttons, Grid } from "src/components";

export const JSSome = () => {
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

  const demoSome = () => {
    console.log(
      "Using some to check if there is at least one even number in the array",
    );
    const result = testArray.some((element) => element % 2 === 0);
    console.log(result);
    console.log(
      "The some method tests whether at least one element in the array passes the test implemented by the provided function. It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false. It doesn't modify the array",
    );
  };

  const demoSomeShortCircuit = () => {
    console.log("Array:- [1,2,3,4]")
    const result = [1, 2, 3, 4].some((x) => {
      console.log(x);
      return x > 2;
    });
    console.log(result);
  };

  const demoSomeEmptyArray = () => {
    console.log("Checking [].some(() => true):", [].some(() => true));
    console.log("Explanation: some() returns false for any condition on an empty array because no element can satisfy the condition.");
  };

  const demoSomeSparseArray = () => {
    console.log("Input sparse array:", sparseArray);
    console.log("Checking [1, , 3].some(x => x === undefined):");
    const result = sparseArray.some((x) => {
      console.log("Evaluating value:", x);
      return x === undefined;
    });
    console.log("Result:", result);
    console.log(
      "Explanation: like forEach/map, some() skips empty slots. The empty slot at index 1 is never evaluated, so it returns false even though we are looking for undefined!"
    );
  };

  return (
    <Grid
      label="some"
      descp={[
        "Tests whether at least one element in the array passes the test implemented by the provided function.",
        "Returns false for an empty array regardless of the callback condition.",
        "Skips empty slots in sparse arrays.",
      ]}
    >
      <Buttons>
        <Button handleClick={demoSome} label="Demo some" />
        <Button handleClick={demoSomeShortCircuit} label="Demo some short circuit" />
        <Button handleClick={demoSomeEmptyArray} label="Demo some empty array" />
        <Button handleClick={demoSomeSparseArray} label="Demo some sparse array" />
      </Buttons>
    </Grid>
  );
};
