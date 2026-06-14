import { Button, Buttons, Grid } from "src/components";

export const JSReduce = () => {
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

  const demoReduce = () => {
    console.log(
      "Using reduce to calculate the sum of all elements in the array",
    );
    const result = testArray.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    console.log(result);
    console.log(
      "The reduce method applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single output value",
    );
  };

  const demoReduceEmptyArray = () => {
    console.log("Attempting reduce on empty array with no initial value: [].reduce((a, b) => a + b)");
    try {
      ([] as number[]).reduce((a, b) => a + b);
    } catch (error) {
      console.error("Caught expected error:", error);
    }
  };

  const demoReduceSingleElement = () => {
    console.log("Executing reduce on single-element array with no initial value: [5].reduce((a, b) => a + b)");
    const result = [5].reduce((a, b) => {
      console.log("This callback will NOT run!");
      return a + b;
    });
    console.log("Result:", result);
    console.log("Explanation: If the array has only one element and no initial value is provided, that single element is returned immediately without executing the callback.");
  };

  const demoReduceFlatten = () => {
    console.log("[[1], [2], [3]]");
    const result = [[1], [2], [3]].reduce(
      (acc, curr) => acc.concat(curr),
      [] as number[],
    );

    console.log(result);
  };

  const demoReduceGroupBy = () => {
    console.log(testArrayOfObjects);
    const grouped = testArrayOfObjects.reduce(
      (acc, user) => {
        const key = user.age > 30 ? "above30" : "belowOrEqual30";

        acc[key] ??= [];
        acc[key].push(user);

        return acc;
      },
      {} as Record<string, typeof testArrayOfObjects>,
    );

    console.log(grouped);
  };

  return (
    <Grid
      label="reduce"
      descp={[
        "Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single output value.",
      ]}
    >
      <Buttons>
        <Button handleClick={demoReduce} label="Demo reduce" />
        <Button handleClick={demoReduceEmptyArray} label="Demo reduce empty array (error)" />
        <Button handleClick={demoReduceSingleElement} label="Demo reduce single element" />
        <Button handleClick={demoReduceGroupBy} label="Demo reduce groupBy" />
        <Button
          handleClick={demoReduceFlatten}
          label="Demo reduce flatten an array"
        />
      </Buttons>
    </Grid>
  );
};
