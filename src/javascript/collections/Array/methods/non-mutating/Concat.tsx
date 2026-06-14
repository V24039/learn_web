import { Button, Buttons, Grid } from "src/components";

export const JSConcat = () => {
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

  const demoConcat = () => {
    console.log("Using concat to create a new array by merging two arrays");
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    const result = arr1.concat(arr2);
    console.log(result);
    console.log(
      "The concat method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array",
    );
  };

  const demoConcatNestedArray = () => {
    console.log([1].concat([...[2]]));
  };

  const demoConcatObject = () => {
    console.log([1].concat({ a: 1 } as any));
  };

  const demoConcatSpreadable = () => {
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    
    // Prevent flattening of arr2
    (arr2 as any)[Symbol.isConcatSpreadable] = false;
    console.log("Concat with non-spreadable array: [1, 2].concat(arr2) ->", arr1.concat(arr2));

    // Force flattening of an array-like object
    const arrayLike = {
      [Symbol.isConcatSpreadable]: true,
      length: 2,
      0: "a",
      1: "b",
    };
    console.log("Concat with spreadable array-like object: [1, 2].concat(arrayLike) ->", arr1.concat(arrayLike as any));
  };
  return (
    <Grid
      label="concat"
      descp={[
        "Returns a new array composed of this array joined with other array(s) and/or value(s).",
        "The method creates a shallow copy of the original array",
        "Symbol.isConcatSpreadable can be used to customize flattening behavior.",
        "The concat method does not recurse into nested array arguments.",
        "Preserves empty slots if any of the source arrays is sparse."
      ]}
    >
      <Buttons>
        <Button handleClick={demoConcat} label="Demo concat" />
        <Button handleClick={demoConcatNestedArray} label="Demo concat nested array" />
        <Button handleClick={demoConcatObject} label="Demo concat object" />
        <Button handleClick={demoConcatSpreadable} label="Demo concat spreadable check" />
      </Buttons>
    </Grid>
  );
};
