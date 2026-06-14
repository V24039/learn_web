import { Button, Buttons, Grid } from "src/components";

export const JSSort = () => {
  
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

  const demoSort = () => {
    console.log(
      "Using sort to sort the elements in the array in ascending order",
    );
    const arr = [...testArray].reverse();
    arr.sort((a, b) => a - b);
    console.log(arr);
    console.log(
      "The sort method sorts the elements of an array in place and returns the sorted array. The default sort order is ascending, built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values. To sort numbers correctly, a compare function should be provided",
    );
  };

  const demoSortDefaultPitfall = () => {
    console.log([1, 10, 2].sort());
  };

  const demoSortCaseSensitive = () => {
    console.log(["a", "B", "c"].sort());
  };

  const demoSortObjects = () => {
    const users = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 20 },
    ];

    users.sort((a, b) => a.age - b.age);

    console.log(users);
  };

  const demoSortUndefinedAndSparse = () => {
    const arr = [undefined, 3, , 1, undefined, 2];
    console.log("Original array containing numbers, undefined, and an empty slot:", [undefined, 3, "empty", 1, undefined, 2]);
    
    // Sort with a custom comparator
    arr.sort((a, b) => {
      console.log(`Comparator called for: a = ${a}, b = ${b}`);
      return a! - b!;
    });
    console.log("Sorted array result:", arr);
    console.log(
      "Explanation: undefined values and empty slots are sorted to the very end of the array. The comparator function is NEVER called with undefined or empty slot parameters."
    );
  };

  return (
    <Grid
      label="sort"
      descp={[
        "Sorts the elements of an array in place and returns the sorted array.",
        "Crucial Detail: undefined elements and empty slots are always sorted to the end of the array, and the comparator is not run on them.",
      ]}
    >
      <Buttons>
        <Button handleClick={demoSort} label="Demo sort" />
        <Button handleClick={demoSortDefaultPitfall} label="Demo sort default pitfall" />
        <Button handleClick={demoSortCaseSensitive} label="Demo sort case sensitive" />
        <Button handleClick={demoSortObjects} label="Demo sort objects" />
        <Button handleClick={demoSortUndefinedAndSparse} label="Demo sort undefined and sparse" />
      </Buttons>
    </Grid>
  );
};
