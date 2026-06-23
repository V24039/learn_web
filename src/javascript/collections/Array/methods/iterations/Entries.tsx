import { Button, Buttons, Grid } from "src/components";

export const JSEntries = () => {
  const testArray = ["a", "b", "c", "d"];
  const testArrayOfObjects = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
  ];
  const sparseArray = [1, , 3];

  //#region Normal Cases

  const demoEntriesBasic = () => {
    console.log("Test array:", testArray);

    for (const [index, value] of testArray.entries()) {
      console.log(`index: ${index}, value: ${value}`);
    }
  };

  const demoEntriesNextManual = () => {
    const iterator = testArray.entries();
    console.log("Test array:", testArray);
    console.log(".entries() return:", iterator);

    let result = iterator.next();
    while (!result.done) {
      console.log("iterator.next() ->", result);
      result = iterator.next();
    }
    // Final call once done is true
    console.log("Final iterator.next() ->", result);
  };

  const demoEntriesSpread = () => {
    console.log("Test array:", testArray);

    const spread = [...testArray.entries()];
    console.log("[...arr.entries()] ->", spread);

    const fromArr = Array.from(testArray.entries());
    console.log("Array.from(arr.entries()) ->", fromArr);
  };

  const demoEntriesWithObjects = () => {
    // Clone array and objects first so repeated runs start clean
    const arr = testArrayOfObjects.map((o) => ({ ...o }));
    console.log("Original array (before):", JSON.stringify(arr));

    for (const [index, value] of arr.entries()) {
      if (index === 0) {
        value.age = 99; // mutate the object reference
      }
    }

    console.log(
      "Original array (after mutating entry 0's object):",
      JSON.stringify(arr),
    );
    console.log(
      "Because entries() returns references, modifying properties of objects in entries affects the elements inside the array.",
    );
  };

  const demoEntriesReturnType = () => {
    const arr = [...testArray];
    const iterator = arr.entries();

    console.log("typeof iterator:", typeof iterator);
    console.log("iterator:", iterator);
    console.log("Array.isArray(iterator):", Array.isArray(iterator));
    console.log("iterator.length:", (iterator as any).length); // undefined
    console.log(
      "Object.prototype.toString.call(iterator):",
      Object.prototype.toString.call(iterator),
    );
  };

  //#endregion

  //#region Edge Cases
  const demoEntriesSparseArray = () => {
    console.log("Sparse array:", sparseArray, "length:", sparseArray.length);

    console.log("Using entries() (visits holes):");
    for (const [index, value] of sparseArray.entries()) {
      console.log(`index: ${index}, value: ${value}`);
    }
    console.log(
      "entries() visits empty slots (holes) in sparse arrays, returning [index, undefined] for each hole.",
    );

    console.log("Using forEach() (skips holes):");
    sparseArray.forEach((value, index) => {
      console.log(`index: ${index}, value: ${value}`);
    });
  };

  const demoEntriesExhaustibility = () => {
    const arr = [...testArray];

    const iterator = arr.entries();

    console.log("First pass (consume fully):");
    for (const entry of iterator) {
      console.log(entry);
    }

    console.log("Calling .next() again after exhaustion:");
    console.log(iterator.next());
    console.log(iterator.next());

    console.log(
      "Re-using the SAME iterator variable in another for...of yields nothing:",
    );
    for (const entry of iterator) {
      console.log("(this will never log)", entry);
    }
    console.log("To iterate again, you must call arr.entries() a fresh time.");
  };

  const demoEntriesEmptyArray = () => {
    const arr: unknown[] = [];
    const iterator = arr.entries();

    console.log("Empty array entries() iterator:", iterator);
    console.log("First .next() call:", iterator.next());

    let count = 0;
    for (const entry of arr.entries()) {
      count++;
      console.log(entry);
    }
    console.log("Total entries logged:", count);
  };

  const demoEntriesSpecialValues = () => {
    const arr = [null, undefined, NaN, 0, ""];
    console.log("Test array:", arr);

    for (const [index, value] of arr.entries()) {
      console.log(
        `index: ${index}, value: ${value}, Number.isNaN: ${Number.isNaN(value)}`,
      );
    }
  };

  //#endregion

  //#region Advanced Cases

  const demoEntriesLazyEvaluation = () => {
    const arr = [...testArray]; // ["a", "b", "c", "d"]

    const iterator = arr.entries();

    console.log(
      "The iterator does not snapshot the array up front - it reads the array dynamically on each .next() call.",
    );
    console.log(
      "Mutating, adding, or shrinking the array DURING iteration is reflected in subsequent steps.",
    );

    console.log("Start:", arr);

    console.log("First next():", iterator.next()); // { value: [0, "a"], done: false }

    arr[1] = "new string"; // mutate existing index
    arr.push("new string 2"); // add a new index (becomes index 4)
    console.log("Mutated array mid-iteration:", arr);

    console.log("Second next() (index 1):", iterator.next()); // reflects mutated value: { value: [1, "new string"], done: false }
    console.log("Third next() (index 2):", iterator.next()); // { value: [2, "c"], done: false }
    console.log("Fourth next() (index 3):", iterator.next()); // { value: [3, "d"], done: false }
    console.log("Fifth next() (index 4):", iterator.next()); // { value: [4, "new string 2"], done: false } (the newly pushed value)

    arr.length = 2; // shrink the array
    console.log("Shrunk array length to 2:", arr);
    console.log("Sixth next() (index 5):", iterator.next()); // { value: undefined, done: true } because length is now <= next index
  };

  const demoEntriesArrayLike = () => {
    const arrayLike = { 0: "a", 1: "b", 2: "c", 3: "d", length: 3 };
    console.log(
      "array-like object:",
      arrayLike,
      "(length: 3, so index 3 'd' is ignored)",
    );
    for (const entry of Array.prototype.entries.call(arrayLike)) {
      console.log(entry);
    }

    const floatLength = { 0: "a", 1: "b", 2: "c", length: 2.9 };
    console.log("length as float (2.9, truncated to 2):", floatLength);
    for (const entry of Array.prototype.entries.call(floatLength)) {
      console.log(entry);
    }

    const nonNumericLength = { 0: "a", 1: "b", length: "not-a-number" };
    console.log(
      "length as non-numeric string (coerced to 0):",
      nonNumericLength,
    );
    for (const entry of Array.prototype.entries.call(nonNumericLength)) {
      console.log(entry);
    }
    console.log("(no entries logged above, since coerced length is 0)");

    const negativeLength = { 0: "a", 1: "b", length: -5 };
    console.log("length as negative number (coerced to 0):", negativeLength);
    for (const entry of Array.prototype.entries.call(negativeLength)) {
      console.log(entry);
    }
    console.log("(no entries logged above, since negative length clamps to 0)");
  };

  const demoEntriesMapConstructor = () => {
    console.log("Use case:- building a Map directly from an array's entries.");
    console.log("new Map(arr.entries()) maps numeric index -> value.");

    const arr = ["red", "green", "blue"];
    console.log("Test array:", arr);

    const map = new Map(arr.entries());
    console.log("new Map(arr.entries()):", map);
    console.log("map.get(1):", map.get(1));

    // Also useful for converting [key, value] pair arrays into Maps,
    // entries() simply gives the array-index version of that pattern.
  };

  const demoEntriesTypedArray = () => {
    const typedArr = new Int32Array([5, 10, 15]);
    console.log("Int32Array:", typedArr);

    for (const [index, value] of typedArr.entries()) {
      console.log(`index: ${index}, value: ${value}`);
    }
  };

  const demoEntriesSelfIterable = () => {
    const arr = [...testArray];

    const iterator = arr.entries();

    const self = iterator[Symbol.iterator]();
    console.log("iterator[Symbol.iterator]() === iterator:", self === iterator);

    // Proof: advancing `self` also advances `iterator`, since they're the same object
    console.log("self.next():", self.next());
    console.log("iterator.next():", iterator.next()); // continues from where self left off
  };

  /**
   * 6. Performance benchmark: for...of arr.entries() vs indexed for loop
   *    vs forEach. entries() carries iterator-protocol overhead, so a
   *    plain indexed loop is typically fastest for hot paths.
   */
  const demoEntriesVsForLoopPerf = () => {
    const size = 1_000_000;
    const arr = Array.from({ length: size }, (_, i) => i);

    let sum1 = 0;
    const startEntries = performance.now();
    for (const [index, value] of arr.entries()) {
      sum1 += index + value;
    }
    const entriesTime = performance.now() - startEntries;

    let sum2 = 0;
    const startFor = performance.now();
    for (let i = 0; i < arr.length; i++) {
      sum2 += i + arr[i];
    }
    const forTime = performance.now() - startFor;

    let sum3 = 0;
    const startForEach = performance.now();
    arr.forEach((value, index) => {
      sum3 += index + value;
    });
    const forEachTime = performance.now() - startForEach;

    console.log(
      `for...of arr.entries(): ${entriesTime.toFixed(3)}ms (sum check: ${sum1})`,
    );
    console.log(
      `indexed for loop: ${forTime.toFixed(3)}ms (sum check: ${sum2})`,
    );
    console.log(`forEach: ${forEachTime.toFixed(3)}ms (sum check: ${sum3})`);
    console.log(
      "Results vary by engine/JIT warm-up, but the indexed for loop is generally fastest, with entries() carrying the most overhead.",
    );
  };

  //#endregion

  return (
    <Grid
      label="entries"
      descp={[
        "Signature: arr.entries()",
        "Returns a new Array Iterator object containing [index, value] pairs for each index in the array.",
        ".next() returns an object with shape: { value: [index, value], done: boolean } (where done indicates if iteration is complete).",
        "Once iteration is finished, subsequent calls to .next() return { value: undefined, done: true }.",
        "For sparse arrays, the method iterates empty slots as if they had the value undefined (unlike forEach, which skips holes).",
        "The iterator is lazily evaluated: it reads the array dynamically on each .next() call, so live mutations during iteration are reflected.",
        "Works on array-like objects via Array.prototype.entries.call(obj); it reads obj.length (coercing floats, negative numbers, and non-numeric values) and indexes 0..length-1.",
        "The iterator itself is iterable: iterator[Symbol.iterator]() === iterator, which is what enables for...of support.",
      ]}
      link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries"
    >
      <Buttons>
        <Button
          handleClick={demoEntriesBasic}
          label="Basic for...of iteration"
        />
        <Button
          handleClick={demoEntriesNextManual}
          label="Manual .next() iteration"
        />
        <Button handleClick={demoEntriesSpread} label="Spread / Array.from()" />
        <Button
          handleClick={demoEntriesWithObjects}
          label="Objects copied by reference"
        />
        <Button
          handleClick={demoEntriesReturnType}
          label="Return type (Array Iterator)"
        />

        <Button
          handleClick={demoEntriesSparseArray}
          label="Sparse array vs forEach"
        />
        <Button
          handleClick={demoEntriesExhaustibility}
          label="Iterator exhaustibility"
        />
        <Button handleClick={demoEntriesEmptyArray} label="Empty array" />
        <Button
          handleClick={demoEntriesSpecialValues}
          label="null / undefined / NaN"
        />

        <Button
          handleClick={demoEntriesLazyEvaluation}
          label="Lazy evaluation / live updates"
        />
        <Button
          handleClick={demoEntriesArrayLike}
          label="Array-like + length coercion"
        />
        <Button
          handleClick={demoEntriesMapConstructor}
          label="new Map(arr.entries())"
        />
        <Button
          handleClick={demoEntriesTypedArray}
          label="TypedArray (Int32Array)"
        />
        <Button
          handleClick={demoEntriesSelfIterable}
          label="Iterator is self-iterable"
        />
        <Button
          handleClick={demoEntriesVsForLoopPerf}
          label="Perf: entries() vs for vs forEach"
        />
      </Buttons>
    </Grid>
  );
};
