import { Button, Buttons, Grid } from "src/components";

export const JSFind = () => {
  const sparseArray = [1, , 3];
  const testArray = [1, 2, 3, 4, 5];
  const testArrayWithUndefined = [1, undefined, 3, undefined, 5];
  const testArrayOfObjects = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
  ];
  const testArrayWithNull = [1, null, 3, null, 5];
  const testArrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];

  //#region Basic cases
  const demoFind = () => {
    console.log(
      "Using find to get the first element in the array that is greater than 3",
    );

    const result = testArray.find((element) => element > 3);
    console.log("Result:", result);

    console.log(
      "The find method returns the value of the first element in the array that satisfies the provided testing function.",
    );
  };

  const demoFindIndex = () => {
    console.log(
      "Using findIndex to get the index of the first element in the array that is greater than 3",
    );

    const result = testArray.findIndex((element) => element > 3);
    console.log("Result (index):", result);

    console.log(
      "The findIndex method returns the index of the first element in the array that satisfies the provided testing function.",
    );
  };

  const demoFindNotFound = () => {
    console.log("Searching for element > 100 in", testArray);

    const result = testArray.find((x) => x > 100);
    console.log("Result:", result);

    console.log(
      "If no elements satisfy the testing function, find returns undefined.",
    );
  };

  const demoFindIndexNotFound = () => {
    console.log("Searching index of element > 100 in", testArray);

    const result = testArray.findIndex((x) => x > 100);
    console.log("Result (index):", result);

    console.log(
      "If no elements satisfy the testing function, findIndex returns -1.",
    );
  };

  const demoFindIndexDuplicateElements = () => {
    console.log("Original array with duplicates:", testArrayWithDuplicates);

    const index = testArrayWithDuplicates.findIndex((x) => x === 2);
    console.log("Index of first 2:", index);

    console.log(
      "The function finds the first matching element and returns its index, ignoring subsequent duplicates.",
    );
  };

  const demoFindObject = () => {
    console.log("Searching in array of objects:", testArrayOfObjects);

    const result = testArrayOfObjects.find((x) => x.age > 30);
    console.log("Found object (age > 30):", result);
  };

  const demoFindIndexObject = () => {
    console.log("Searching index in array of objects:", testArrayOfObjects);

    const result = testArrayOfObjects.findIndex((x) => x.age > 30);
    console.log("Found index (age > 30):", result);
  };

  const demoFindUndefinedNullValues = () => {
    console.log("Searching undefined and null values in:", {
      testArrayWithUndefined,
      testArrayWithNull,
    });

    const undefinedVal = testArrayWithUndefined.find(
      (value) => value === undefined,
    );
    console.log("Found value for undefined search:", undefinedVal);

    const nullVal = testArrayWithNull.find((value) => value === null);
    console.log("Found value for null search:", nullVal);
  };

  const demoFindIndexUndefinedNullValues = () => {
    console.log("Searching index of undefined and null values in:", {
      testArrayWithUndefined,
      testArrayWithNull,
    });

    const undefinedIndex = testArrayWithUndefined.findIndex(
      (value) => value === undefined,
    );
    console.log("Found index for undefined search:", undefinedIndex);

    const nullIndex = testArrayWithNull.findIndex((value) => value === null);
    console.log("Found index for null search:", nullIndex);
  };

  const demoFindWithThisArg = () => {
    console.log("Using find with a thisArg context");

    const context = { threshold: 4 };

    const result = testArray.find(function (this: typeof context, element) {
      return element >= this.threshold;
    }, context);

    console.log("Result:", result);
    console.log(
      "The thisArg is used as the 'this' value inside the testing function. Requires a traditional function statement.",
    );
  };

  const demoFindCallbackArgs = () => {
    console.log(
      "Finding element using all callback parameters: (element, index, array)",
    );

    const result = testArray.find((element, index, arr) => {
      console.log(
        `Visiting index ${index}: element = ${element}, source array =`,
        arr,
      );
      return index * element > 10;
    });
    console.log("Result:", result);
  };
  //#endregion

  //#region Edge cases
  const demoFindSparseArray = () => {
    console.log("Input sparse array:", sparseArray);

    const found = sparseArray.find((value, index) => {
      console.log(`Visiting index ${index}: value is ${value}`);
      return value === undefined;
    });

    console.log("Found value:", found);
    console.log(
      "Unlike older methods like filter(), find() DOES visit empty slots in sparse arrays, treating them as undefined.",
    );
  };

  const demoFindIndexSparseArray = () => {
    console.log("Input sparse array (holes exist):", sparseArray);

    const foundIdx = sparseArray.findIndex((value, index) => {
      console.log(`Visiting index ${index}: value is ${value}`);
      return value === undefined;
    });
    console.log("Found index:", foundIdx);

    console.log(
      "findIndex() visits empty slots in sparse arrays and treats them as undefined.",
    );
  };

  const demoFindObjectShallowCopy = () => {
    // Make a copy of objects to avoid polluting global state
    const localObjects = testArrayOfObjects.map((o) => ({ ...o }));
    console.log(
      "Before mutation (localObjects):",
      JSON.stringify(localObjects),
    );

    const found = localObjects.find((x) => x.name === "Alice");
    console.log("Found object:", found);

    if (found) {
      console.log("Modifying age of found object to 100...");
      found.age = 100;
    }
    console.log("After mutation (localObjects):", JSON.stringify(localObjects));
    console.log(
      "Modifying properties on the found object affects the original array because objects are copied/returned by reference (shallow copy).",
    );
  };

  const demoFindTruthyFalsy = () => {
    const mixedArray = [0, "", false, null, undefined, 42, "hello"];

    console.log("Mixed array before finding:", mixedArray);

    const firstTruthy = mixedArray.find(Boolean);
    console.log("First truthy element found (using Boolean):", firstTruthy);

    console.log(
      "The callback doesn't have to return a boolean. Truthy/Falsy values are converted to booleans implicitly.",
    );
  };

  const demoFindArrowThisArg = () => {
    const context = { threshold: 3 };
    console.log("Context threshold value is:", context.threshold);

    // Arrow functions cannot specify a 'this' parameter.
    // At runtime, 'this' inside the arrow function resolves lexically, NOT to the passed context!
    const result = testArray.find((x) => {
      console.log(
        "this inside arrow function:",
        typeof this !== "undefined" ? this : "undefined",
      );
      return x > 3; // ignores context
    }, context);
    console.log("Result:", result);

    console.log(
      "Arrow functions bind 'this' lexically. Passing a thisArg has NO effect.",
    );
  };

  const demoFindModifyAppend = () => {
    const arr = [...testArray];

    console.log("Original before start:", [...arr]);
    const result = arr.find((x, index, original) => {
      if (index === 0) {
        original.push(99);
        console.log("Appended 99! Current array:", [...original]);
      }
      console.log(`Visited element at index ${index}: ${x}`);
      return x === 99;
    });
    console.log("Result:", result);

    console.log(
      "Elements appended after find() begins are NOT visited by the callback.",
    );
  };

  const demoFindModifyValue = () => {
    const arr = [...testArray];
    console.log("Original before start:", [...arr]);

    const result = arr.find((x, index, original) => {
      if (index === 0) {
        original[2] = 99; // mutate index 2 from 3 to 99
        console.log("Mutated index 2 to 99! Current array:", [...original]);
      }
      console.log(`Visited element at index ${index}: ${x}`);
      return x === 99;
    });
    console.log("Result:", result);

    console.log(
      "If elements are modified, the value passed to the callback will be the value when find() visits them.",
    );
  };

  const demoFindModifyDelete = () => {
    const arr = [...testArray];
    console.log("Original before start:", [...arr]);

    const result = arr.find((x, index, original) => {
      if (index === 0) {
        original.pop(); // remove last element (5)
        console.log("Popped last element! Current array:", [...original]);
      }
      console.log(`Visited element at index ${index}: ${x}`);
      return x === undefined;
    });
    console.log("Result:", result);

    console.log(
      "Unlike filter(), deleted or popped elements are still visited by find(), and their value is passed as undefined.",
    );
  };
  //#endregion

  //#region Advanced cases
  const demoFindNaN = () => {
    const list = [1, 2, NaN, 4];
    console.log("Array with NaN:", list);
    console.log(
      "find(isNaN):",
      list.find((x) => Number.isNaN(x)),
    ); // NaN
    console.log(
      "Using find with isNaN allows us to locate NaN elements cleanly.",
    );
  };

  const demoFindIndexNaN = () => {
    const list = [1, 2, NaN, 4];
    console.log("Array with NaN:", list);

    console.log(
      "findIndex(isNaN):",
      list.findIndex((x) => Number.isNaN(x)),
    ); // 2
    console.log(
      "Using findIndex with isNaN allows us to locate NaN elements cleanly.",
    );
  };

  const demoFindTypeGuard = () => {
    const mixedList: (string | number | undefined)[] = [
      "apple",
      undefined,
      42,
      "banana",
    ];
    console.log("Mixed list in TS:", mixedList);

    // Regular find: return type is string | number | undefined
    const regularFind = mixedList.find((x) => typeof x === "string");
    console.log("Regular find (string):", regularFind);

    // Type guard find: narrows type to string | undefined
    const isString = (val: string | number | undefined): val is string =>
      typeof val === "string";
    const typeNarrowed: string | undefined = mixedList.find(isString);

    console.log("Type-narrowed find:", typeNarrowed);
    console.log(
      "In TypeScript, using a user-defined type guard function (parameter is Type) narrows the return type of find() from 'Union | undefined' to 'Type | undefined' at compile time.",
    );
  };

  const demoFindArrayLike = () => {
    const arrayLike = {
      length: 4,
      0: "apple",
      1: "banana",
      2: "orange",
      3: "pear",
    };
    console.log("Array-like before searching:", { ...arrayLike });

    // Call Array.prototype.find on the array-like object
    const result = Array.prototype.find.call(arrayLike, (fruit: string) =>
      fruit.includes("r"),
    );
    console.log("Result (fruits containing 'r'):", result);

    console.log(
      "Array.prototype.find respects the length and numerical index properties of any object, returning the found element.",
    );
  };

  const demoFindAsync = () => {
    const ids = [1, 2, 3, 4, 5];

    const checkIsAllowedAsync = async (id: number): Promise<boolean> => {
      return new Promise((resolve) => setTimeout(() => resolve(id === 3), 10));
    };

    console.log("Array to find asynchronously:", ids);

    // Naive async find does not work with find
    const naiveFind = ids.find(async (id) => {
      const allowed = await checkIsAllowedAsync(id);
      return allowed;
    });
    console.log(
      "Naive async find returned:",
      naiveFind,
      "Returns first element",
    );
    console.log(
      "async functions return a Promise. A Promise is truthy, so find immediately accepts index 0.",
    );

    // Correct sequential async find that preserves short-circuiting
    const runCorrectAsyncFind = async () => {
      const start = performance.now();
      let foundElement: number | undefined = undefined;

      for (const id of ids) {
        console.log(`Checking id ${id} asynchronously...`);
        const isMatch = await checkIsAllowedAsync(id);
        if (isMatch) {
          foundElement = id;
          break; // Short-circuit!
        }
      }

      console.log(
        `Correct sequential async find returned:`,
        foundElement,
        `(took ${(performance.now() - start).toFixed(1)}ms)`,
      );
    };

    runCorrectAsyncFind();
  };

  const demoFindBenchmark = () => {
    const size = 5000000;
    console.log("Compare: find vs filter short-circuiting behavior");
    console.log(`Array size: ${size.toLocaleString()} elements`);

    // Setup array
    const arr = Array.from({ length: size }, (_, i) => i);

    // 1. Native find (looking for element at 500)
    const findStart = performance.now();
    const findRes = arr.find((x) => x === 500);
    const findTime = performance.now() - findStart;
    console.log(
      `Native .find() took: ${findTime.toFixed(4)}ms (Result: ${findRes})`,
    );

    // 2. Native filter (looking for element at 500)
    const filterStart = performance.now();
    const filterRes = arr.filter((x) => x === 500);
    const filterTime = performance.now() - filterStart;
    console.log(
      `Native .filter() took: ${filterTime.toFixed(4)}ms (Result size: ${filterRes.length})`,
    );

    console.log("Key insights:");
    console.log(
      "1. find() short-circuits and exits immediately on match, which is extremely fast for early matches.",
    );
    console.log(
      "2. filter() evaluates the entire array, causing unnecessary iterations if you only need the first match.",
    );
  };
  //#endregion

  return (
    <>
      <Grid
        label="find & findLast"
        descp={[
          "Returns the value of the first element (or last element for findLast) in the array that satisfies the provided testing function.",
          "Unlike older methods (filter, map, forEach), find/findIndex/findLast/findLastIndex DO visit empty slots in sparse arrays, treating them as undefined.",
          "Modifying properties of found objects affects the original array since objects are copied by reference.",
          "Can search array-like structures using Array.prototype.find.call().",
          "TypeScript type guards narrow the return type of the found element.",
        ]}
        link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find"
      >
        <Buttons>
          {/* Basic cases */}
          <Button
            handleClick={demoFind}
            label="Basic find (First element > 3)"
          />
          <Button handleClick={demoFindNotFound} label="Find (No match)" />
          <Button handleClick={demoFindObject} label="Find Object" />
          <Button
            handleClick={demoFindUndefinedNullValues}
            label="Find Undefined/Null"
          />
          <Button handleClick={demoFindWithThisArg} label="Find with thisArg" />
          <Button
            handleClick={demoFindCallbackArgs}
            label="Callback arguments (element, index, array)"
          />

          {/* Edge cases */}
          <Button
            handleClick={demoFindSparseArray}
            label="Sparse array holes"
          />
          <Button
            handleClick={demoFindObjectShallowCopy}
            label="Shallow copy mutation"
          />
          <Button
            handleClick={demoFindTruthyFalsy}
            label="Truthy/Falsy predicates"
          />
          <Button
            handleClick={demoFindArrowThisArg}
            label="Arrow function & thisArg"
          />
          <Button
            handleClick={demoFindModifyAppend}
            label="Modify array: append"
          />
          <Button
            handleClick={demoFindModifyValue}
            label="Modify array: mutate value"
          />
          <Button
            handleClick={demoFindModifyDelete}
            label="Modify array: delete elements"
          />

          {/* Advanced / Nerd cases */}
          <Button handleClick={demoFindNaN} label="Finding NaN" />
          <Button
            handleClick={demoFindTypeGuard}
            label="TypeScript Type Guards"
          />
          <Button
            handleClick={demoFindArrayLike}
            label="Find on Array-like object"
          />
          <Button
            handleClick={demoFindAsync}
            label="Async find (Correct vs Naive)"
          />
          <Button
            handleClick={demoFindBenchmark}
            label="Performance Benchmark"
          />
        </Buttons>
      </Grid>

      <Grid
        label="findIndex & findLastIndex"
        descp={[
          "Returns the index of the first element (or last element for findLastIndex) in the array that satisfies the provided testing function.",
          "Returns -1 if no element satisfies the testing function.",
        ]}
        link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex"
      >
        <Buttons>
          {/* Basic cases */}
          <Button
            handleClick={demoFindIndex}
            label="Basic findIndex (First element > 3)"
          />
          <Button
            handleClick={demoFindIndexNotFound}
            label="findIndex (No match)"
          />
          <Button handleClick={demoFindIndexObject} label="findIndex Object" />
          <Button
            handleClick={demoFindIndexDuplicateElements}
            label="Duplicates (First match)"
          />
          <Button
            handleClick={demoFindIndexUndefinedNullValues}
            label="findIndex Undefined/Null"
          />

          {/* Edge cases */}
          <Button
            handleClick={demoFindIndexSparseArray}
            label="Sparse array holes"
          />
          <Button
            handleClick={demoFindIndexNaN}
            label="Array with NaN Element"
          />
        </Buttons>
      </Grid>
    </>
  );
};
