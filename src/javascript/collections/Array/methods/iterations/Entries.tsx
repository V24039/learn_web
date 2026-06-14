import { Button, Buttons, Grid } from "src/components";

export const JSEntires = () => {
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
  const arrayLike = {
    length: 3,
    0: "a",
    1: "b",
    2: "c",
    3: "d", // ignored by entries() since length is 3
  };

  const demoEntires = () => {
    console.log("Test array", testArray);
    const iterator = testArray.entries();

    console.log(".entries() return", iterator);

    while (iterator.next().value) {
      console.log("Array value using iterator.next()", iterator.next().value);
    }
  };

  const demoEntiresWithObjects = () => {
    console.log("Test array", testArrayOfObjects);
    const iterator = testArrayOfObjects.entries();

    console.log(".entries() return", iterator);

    while (iterator.next().value) {
      console.log("Array value using iterator.next()", iterator.next().value);
    }
  };

  const demoEntiresWithUndefined = () => {
    console.log("Test array", testArrayWithUndefined);
    const iterator = testArrayWithUndefined.entries();

    console.log(".entries() return", iterator);

    while (iterator.next().value) {
      console.log("Array value using iterator.next()", iterator.next().value);
    }
  };

  const demoEntiresSparseArray = () => {
    console.log("Test array", sparseArray);
    const iterator = sparseArray.entries();

    console.log(".entries() return", iterator);

    while (iterator.next().value) {
      console.log("Array value using iterator.next()", iterator.next().value);
    }
  };

  const demoEntiresNanArray = () => {
    console.log("Test array", nanArray);
    const iterator = nanArray.entries();

    console.log(".entries() return", iterator);

    while (iterator.next().value) {
      console.log("Array value using iterator.next()", iterator.next().value);
    }
  };

  const demoEntiresWithNull = () => {
    console.log("Test array", testArrayWithNull);
    const iterator = testArrayWithNull.entries();

    console.log(".entries() return", iterator);

    while (iterator.next().value) {
      console.log("Array value using iterator.next()", iterator.next().value);
    }
  };

  const demoEntiresWithArrayLike = () => {
    console.log(arrayLike);

    for (const entry of Array.prototype.entries.call(arrayLike)) {
      console.log(entry);
    }

    console.log(
      `3:"d" is not logged as the length of the element is given as 3 in the object, entries uses this length property to access the properties`,
    );
  };

  return (
    <Grid
      label="filter"
      descp={[
        "Returns a new array iterator object that contains the key/value pairs for each index in the array.",
        "For saprse array the method iterated empty slots as if they have the value undefined",
        "The method reads the length property of this(array's this) and then accesses each property whose key is a nonnegative integer less than length",
      ]}
      link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries"
    >
      <Buttons>
        <Button handleClick={demoEntires} label="Entries example" />
        <Button
          handleClick={demoEntiresWithObjects}
          label="For an array og objects"
        />
        <Button
          handleClick={demoEntiresWithUndefined}
          label="For an array with undefined elements"
        />
        <Button
          handleClick={demoEntiresWithNull}
          label="For an array with null elements"
        />
        <Button
          handleClick={demoEntiresSparseArray}
          label="For an sparse array"
        />
        <Button
          handleClick={demoEntiresNanArray}
          label="For Nan array element"
        />
        <Button
          handleClick={demoEntiresWithArrayLike}
          label="For an array like object with lenth property"
        />
      </Buttons>
    </Grid>
  );
};
