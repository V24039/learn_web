import { Button, Buttons, Grid } from "src/components";

export const JSKeys = () => {
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

  // --- Normal Cases ---

  const demoKeys = () => {
    console.log("Test array:", testArray);
    const iterator = testArray.keys();
    console.log(".keys() returns an Array Iterator:", iterator);

    for (const key of iterator) {
      console.log("Key:", key);
    }
  };

  const demoKeysWithNext = () => {
    console.log("Manually stepping through .keys() using .next():");
    const iterator = testArray.keys();
    let result = iterator.next();
    while (!result.done) {
      console.log("iterator.next() ->", result);
      result = iterator.next();
    }
    console.log("Final .next() when exhausted:", result); // { value: undefined, done: true }
  };

  const demoKeysWithObjects = () => {
    console.log("Array of objects:", testArrayOfObjects);
    console.log("Keys of the array (just indices, not object keys):");
    for (const key of testArrayOfObjects.keys()) {
      console.log("Index:", key, "-> Value:", testArrayOfObjects[key]);
    }
  };

  // --- Edge Cases ---

  const demoKeysEmptyArray = () => {
    const emptyArray: number[] = [];
    console.log("Empty array:", emptyArray);
    const iterator = emptyArray.keys();
    console.log("Iterating over keys of an empty array:");
    for (const key of iterator) {
      console.log("Key:", key); // Never logged
    }
    console.log("No keys logged — empty array has no indices.");
  };

  const demoKeysSparseArray = () => {
    console.log("Sparse array:", sparseArray);
    console.log(
      "Unlike forEach, .keys() DOES include keys for empty slots:"
    );
    for (const key of sparseArray.keys()) {
      console.log("Key:", key, "-> Value:", sparseArray[key]);
    }
    console.log(
      "Notice index 1 IS included even though the slot is empty (value is undefined)."
    );
  };

  const demoKeysWithUndefined = () => {
    console.log("Array with undefined values:", testArrayWithUndefined);
    console.log("Keys are just indices — undefined values don't affect them:");
    for (const key of testArrayWithUndefined.keys()) {
      console.log(`Key: ${key}, Value: ${testArrayWithUndefined[key]}`);
    }
  };

  const demoKeysWithNull = () => {
    console.log("Array with null values:", testArrayWithNull);
    console.log("null values don't affect .keys(), all indices are returned:");
    for (const key of testArrayWithNull.keys()) {
      console.log(`Key: ${key}, Value: ${testArrayWithNull[key]}`);
    }
  };

  const demoKeysNanArray = () => {
    console.log("Array with NaN:", nanArray);
    const iterator = nanArray.keys();
    console.log("Keys of NaN array:");
    for (const key of iterator) {
      console.log("Key:", key, "-> Value:", nanArray[key]);
    }
  };

  const demoKeysSingleElement = () => {
    const single = [42];
    console.log("Single element array:", single);
    for (const key of single.keys()) {
      console.log("Key:", key); // Only 0
    }
  };

  // --- Advanced Cases ---

  const demoKeysWithDuplicates = () => {
    console.log("Array with duplicate values:", testArrayWithDuplicates);
    console.log(
      ".keys() returns indices regardless of duplicate values:"
    );
    for (const key of testArrayWithDuplicates.keys()) {
      console.log(`Key: ${key}, Value: ${testArrayWithDuplicates[key]}`);
    }
  };

  const demoKeysSpread = () => {
    console.log("Test array:", testArray);
    const keys = [...testArray.keys()];
    console.log("Spreading .keys() into an array:", keys);
    // keys = [0, 1, 2, 3, 4]
  };

  const demoKeysArrayFrom = () => {
    console.log("Using Array.from() with .keys():");
    const keys = Array.from(testArray.keys());
    console.log("Result:", keys); // [0, 1, 2, 3, 4]
    console.log(
      "This is useful when you need an array of sequential indices."
    );
  };

  const demoKeysIteratorReuse = () => {
    const iterator = testArray.keys();
    console.log("First pass through the iterator:");
    for (const key of iterator) {
      console.log("Key:", key);
    }
    console.log(
      "Second pass (iterator is exhausted — nothing will be logged):"
    );
    for (const key of iterator) {
      console.log("Key:", key); // Never logs — iterator is consumed
    }
    console.log(
      "An iterator can only be consumed once. Create a new one to iterate again."
    );
  };

  const demoKeysWithArrayLike = () => {
    const arrayLike = {
      length: 3,
      0: "a",
      1: "b",
      2: "c",
      3: "d", // ignored since length is 3
    };
    console.log("Array-like object:", arrayLike);
    console.log("Using Array.prototype.keys.call() on an array-like object:");
    for (const key of Array.prototype.keys.call(arrayLike)) {
      console.log("Key:", key);
    }
    console.log(
      "3:\"d\" is not included — .keys() respects the length property."
    );
  };

  const demoKeysVsForEachSparse = () => {
    console.log("Sparse array:", sparseArray);
    console.log(
      "forEach SKIPS empty slots, but .keys() INCLUDES them:"
    );
    console.log("--- forEach ---");
    sparseArray.forEach((val, idx) => {
      console.log(`Index: ${idx}, Value: ${val}`);
    });
    console.log("--- .keys() ---");
    for (const key of sparseArray.keys()) {
      console.log(`Key: ${key}`);
    }
  };

  return (
    <Grid
      label="keys"
      descp={[
        "Returns a new Array Iterator object that contains the keys (indices) for each index in the array.",
        "Unlike forEach, .keys() includes keys for empty slots in sparse arrays.",
        "The iterator can only be consumed once — create a new one to re-iterate.",
        "The method reads the length property of the array, and can be called on array-like objects via Array.prototype.keys.call().",
      ]}
      link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys"
    >
      <Buttons>
        <Button handleClick={demoKeys} label="Keys basic example" />
        <Button handleClick={demoKeysWithNext} label="Step through with .next()" />
        <Button handleClick={demoKeysWithObjects} label="Keys of an array of objects" />
        <Button handleClick={demoKeysEmptyArray} label="Keys of an empty array" />
        <Button handleClick={demoKeysSparseArray} label="Keys of a sparse array (includes empty slots)" />
        <Button handleClick={demoKeysWithUndefined} label="Keys with undefined values" />
        <Button handleClick={demoKeysWithNull} label="Keys with null values" />
        <Button handleClick={demoKeysNanArray} label="Keys of a NaN array" />
        <Button handleClick={demoKeysSingleElement} label="Keys of a single-element array" />
        <Button handleClick={demoKeysWithDuplicates} label="Keys with duplicate values" />
        <Button handleClick={demoKeysSpread} label="Spread keys into an array" />
        <Button handleClick={demoKeysArrayFrom} label="Array.from() with .keys()" />
        <Button handleClick={demoKeysIteratorReuse} label="Iterator is exhausted after one pass" />
        <Button handleClick={demoKeysWithArrayLike} label="Call on array-like object" />
        <Button handleClick={demoKeysVsForEachSparse} label="keys() vs forEach on sparse array" />
      </Buttons>
    </Grid>
  );
};
