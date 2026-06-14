import { Button, Buttons, Grid } from "src/components";

export const JSFrom = () => {
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

  const demoFromString = () => {
    console.log("Providing the 'foo' to Array.from");
    console.log(Array.from("foo"));
    console.log(
      "As string is iterable each character is converted to array value",
    );
  };

  const demoFromArray = () => {
    console.log("Using an actual array");
    console.log(Array.from(testArray));
    console.log();
  };

  const demoFromWithUndefined = () => {
    console.log("Using an actual array");
    console.log(Array.from({ length: 5 }));
    console.log(
      "The array is created with length 5 but all values are undefined",
    );
  };

  const demoFromWithMapFn = () => {
    console.log("Using an actual array with mapFn");
    console.log("Input array: ", testArray);
    console.log(Array.from(testArray, (x) => x * 2));
    console.log(
      "The mapFn is applied to each elemnet while creating a new array",
    );
  };

  const demoFromWithMapFnAndThisArg = () => {
    console.log("Using an actual array with mapFn and thisArg inside Array.from");
    console.log("Input array: [1, 2, 3]");
    const thisArg: { multiplier: number } = { multiplier: 3 };
    console.log(
      Array.from([1, 2, 3], function (
        this: { multiplier: number },
        x: number,
      ) {
        return x * this.multiplier;
      }, thisArg),
    );
    console.log(
      "The mapFn is applied to each element while creating a new array and thisArg is used as the this value inside the mapFn",
    );
  };

  const demoFromSeqGenerator = () => {
    console.log("Using a sequence generator function");
    const start = 0;
    const stop = 5;
    const step = 1;
    console.log(
      Array.from(
        { length: Math.ceil((stop - start) / step) },
        (_, i) => start + i * step,
      ),
    );
    console.log(
      "The sequence generator produces values from 0 to 5 and Array.from creates an array from those values",
    );
  };

  const demoFromSet = () => {
    console.log(Array.from(new Set(testArrayWithDuplicates)));
  };

  const demoFromMap = () => {
    console.log(
      Array.from(
        new Map([
          ["a", 1],
          ["b", 2],
        ]),
      ),
    );
  };

  const demoFromSparseArray = () => {
    console.log(sparseArray);
    console.log(Array.from(sparseArray));
  };

  const demoFromArrayLike = () => {
    const arrayLike = {
      0: "a",
      1: "b",
      length: 2,
    };
    console.log("Array like", arrayLike);
    console.log(Array.from(arrayLike));
  };

  const demoFromNull = () => {
    try {
      console.log(Array.from(null as any));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid
      label="Array.from()"
      descp={[
        "Array.from() can be used to create arrays from various data sources, such as strings, sets, maps, and even custom iterable objects.",
        "Never creates a sparse array - if the items object has missing index properties, they are filled with undefined in the new array.",
        "If the items object is missing some index properties, they become undefined in the new array.",
        "An optional parameter mapFn, allows to execute a function on each element of the array being created, similar to map().",
        "The thisArg parameter can be used to set the this value inside the mapFn.",
        "Array.from() can be used with a sequence generator function to create arrays of a specific length with values generated based on a formula or pattern.",
      ]}
    >
      <Buttons>
        <Button handleClick={demoFromString} label="Using string value" />
        <Button handleClick={demoFromArray} label="Using an array" />
        <Button
          handleClick={demoFromWithUndefined}
          label="Using an array with undefined value"
        />
        <Button
          handleClick={demoFromWithMapFn}
          label="Using an array with mapFn"
        />
        <Button
          handleClick={demoFromWithMapFnAndThisArg}
          label="Using an array with mapFn with this argument"
        />
        <Button
          handleClick={demoFromSeqGenerator}
          label="Using a sequence generator"
        />
        <Button handleClick={demoFromSet} label="Using a Set" />
        <Button handleClick={demoFromMap} label="Using a Map" />
        <Button handleClick={demoFromArrayLike} label="Using an array like" />
        <Button handleClick={demoFromNull} label="Using a null value" />
        <Button
          handleClick={demoFromSparseArray}
          label="Using a sparsed array"
        />
      </Buttons>
    </Grid>
  );
};
