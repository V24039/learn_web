import { Button, Buttons, Grid } from "src/components";

export const JSFilter = () => {
  const sparseArray = [1, , 3];
  const nanArray = [NaN];
  const testArray = [1, 2, 3, 4, 5];
  const testArrayWithUndefined = [1, undefined, 3, undefined, 5, null];
  const testArrayOfObjects = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
  ];
  const testArrayWithNull = [1, null, 3, null, 5];

  //#region Basic cases
  const demoFilter = () => {
    console.log("Using filter to create a new array with only even numbers");
    const result = testArray.filter((element) => element % 2 === 0);
    console.log(result);
    console.log(
      "The filter method creates a new array with all elements that pass the test implemented by the provided function",
    );
  };

  const demoFilterWithObjects = () => {
    console.log(
      "Using filter to create a new array with only objects where age is greater than 30",
    );
    const result = testArrayOfObjects.filter((element) => element.age > 30);
    console.log(result);
    console.log(
      "The filter method creates a new array with all elements that pass the test implemented by the provided function",
    );
  };

  const demoFilterShallowCopy = () => {
    // filter returns a shallow copy of elements that pass the test
    const arr = testArrayOfObjects.map((o) => ({ ...o }));
    console.log("Before:", JSON.stringify(arr));
    const filtered = arr.filter((o) => o.age >= 30);
    console.log("Filtered (age >= 30):", JSON.stringify(filtered));
    console.log(
      "Modifying first element's age to 100 in the filtered array...",
    );
    filtered[0].age = 100;
    console.log("Filtered after mutation:", JSON.stringify(filtered));
    console.log("Original after mutating filtered:", JSON.stringify(arr));
    console.log(
      "Notice that the original array's object was also updated! Objects are copied by reference.",
    );
  };

  const demoFilterWithThisArg = () => {
    console.log(
      "Using filter with a thisArg to create a new array with only even numbers",
    );
    const thisArg: { isEven: (n: number) => boolean } = {
      isEven: (n) => n % 2 === 0,
    };
    const result = testArray.filter(function (
      this: { isEven: (n: number) => boolean },
      element,
    ) {
      return this.isEven(element);
    }, thisArg);
    console.log(result);
    console.log(
      "The filter method creates a new array with all elements that pass the test implemented by the provided function and thisArg is used as the this value inside the filter function",
    );
  };

  const demoFilterCallbackArgs = () => {
    console.log(
      "Filtering array using all callback parameters: (element, index, array)",
    );
    const result = testArray.filter((element, index, arr) => {
      console.log(
        `Visiting index ${index}: element = ${element}, source array =`,
        arr,
      );
      // Filter odd indices
      return index % 2 !== 0;
    });
    console.log("Result (odd indices kept):", result);
  };

  const demoFilterReturnValue = () => {
    const filtered = testArray.filter((x) => x > 2);
    console.log("Original array:", testArray);
    console.log("Filtered array:", filtered);
    console.log(
      "Are original and filtered the same reference?",
      testArray === filtered,
    );
    console.log(
      "Unlike copyWithin, filter returns a completely new array and does not mutate the original.",
    );
  };
  //#endregion

  //#region Edge cases
  const demoFilterSparseArray = () => {
    console.log("Before sparse array filtering (holes exist):", sparseArray);
    const filtered = sparseArray.filter(Boolean);
    console.log("After [1, , 3].filter(Boolean):", filtered);
    console.log(
      "The filter method ignores empty slots (holes) completely and does not invoke the callback for them.",
    );
  };

  const demoFilterArrowThisArg = () => {
    const context = { threshold: 3 };
    console.log("Context threshold value is:", context.threshold);
    // Arrow functions cannot specify a 'this' parameter.
    // At runtime, 'this' inside the arrow function resolves lexically, NOT to the passed context!
    try {
      const result = testArray.filter((x) => {
        // In strict mode / ES modules, 'this' in lexical scope here is undefined
        console.log(
          "this inside arrow function:",
          typeof this !== "undefined" ? this : "undefined",
        );
        return x > 3; // ignores thisArg
      }, context);
      console.log("Result:", result);
      console.log(
        "Arrow functions bind 'this' lexically. Passing a thisArg has NO effect.",
        "Note: Declaring a 'this' parameter on an arrow function in TypeScript (e.g. `(this: typeof context, x) => ...`) is a TS compiler error: 'An arrow function cannot have a this parameter'.",
      );
    } catch (e) {
      console.error(e);
    }
  };

  const demoFilterModifyAppend = () => {
    const arr = [...testArray];
    console.log("Original before start:", [...arr]);
    const result = arr.filter((x, index, original) => {
      if (index === 0) {
        original.push(5);
        console.log("Appended 5! Current array:", [...original]);
      }
      console.log(`Visited element at index ${index}: ${x}`);
      return x > 2;
    });
    console.log("Result (filtering elements > 2):", result);
    console.log(
      "Elements appended after filter() begins are NOT visited by the callback.",
    );
  };

  const demoFilterModifyValue = () => {
    const arr = [...testArray];
    console.log("Original before start:", [...arr]);
    const result = arr.filter((x, index, original) => {
      if (index === 0) {
        original[2] = 99; // mutate index 2 from 3 to 99
        console.log("Mutated index 2 to 99! Current array:", [...original]);
      }
      console.log(`Visited element at index ${index}: ${x}`);
      return x > 2;
    });
    console.log("Result (filtering elements > 2):", result);
    console.log(
      "If elements are modified, the value passed to the callback will be the value when filter() visits them.",
    );
  };

  const demoFilterModifyDelete = () => {
    const arr = [...testArray];
    console.log("Original before start:", [...arr]);
    const result = arr.filter((x, index, original) => {
      if (index === 0) {
        original.pop(); // remove last element (4)
        console.log("Popped last element! Current array:", [...original]);
      }
      console.log(`Visited element at index ${index}: ${x}`);
      return x > 1;
    });
    console.log("Result (filtering elements > 1):", result);
    console.log(
      "Deleted elements are not visited. Notice index 3 (which was 4) was never visited.",
    );
  };

  const demoFilterEmptyArray = () => {
    const arr: number[] = [];
    let callCount = 0;
    const result = arr.filter((x) => {
      callCount++;
      return true;
    });
    console.log("Filtered empty array:", result);
    console.log(`Callback was invoked ${callCount} times.`);
  };

  const demoFilterTruthyFalsy = () => {
    const mixedArray = [
      0,
      1,
      "",
      "hello",
      false,
      true,
      null,
      undefined,
      NaN,
      42,
    ];
    console.log("Mixed array before filtering:", mixedArray);
    // filter using Boolean constructor
    const truthyOnly = mixedArray.filter(Boolean);
    console.log("Truthy elements only (using Boolean):", truthyOnly);
    // filter checking for specific falsy values
    const falsyOnly = mixedArray.filter((x) => !x);
    console.log("Falsy elements only:", falsyOnly);
    console.log(
      "The callback doesn't have to return a boolean. Truthy/Falsy values are converted to booleans implicitly.",
    );
  };
  //#endregion

  //#region Adavanced cases
  const demoFilterWithUndefinedNull = () => {
    console.log(
      "Using filter to create a new array with only even numbers in the array with undefined and null values",
    );
    const result = testArrayWithUndefined.filter(
      (element) => typeof element === "number" && element % 2 === 0,
    );
    console.log(result);
    console.log(
      "The filter method creates a new array with all elements that pass the test implemented by the provided function",
    );
  };

  const demoFilterWithObjectsAndThisArg = () => {
    console.log(
      "Using filter with a thisArg to create a new array with only objects where age is greater than a certain value",
    );

    const thisArg: { ageThreshold: number } = { ageThreshold: 30 };

    const result = testArrayOfObjects.filter(function (
      this: { ageThreshold: number },
      element,
    ) {
      return element.age > this.ageThreshold;
    }, thisArg);

    console.log(result);
    console.log(
      "The filter method creates a new array with all elements that pass the test implemented by the provided function and thisArg is used as the this value inside the filter function",
    );
  };

  const demoFilterWithObjectsAndUndefinedThisArg = () => {
    console.log(
      "Using filter with an undefined thisArg to create a new array with only objects where age is greater than 30",
    );

    const result = testArrayOfObjects.filter(function (element) {
      return element.age > 30;
    }, undefined);

    console.log(result);
    console.log(
      "The filter method creates a new array with all elements that pass the test implemented by the provided function and thisArg is used as the this value inside the filter function",
    );
  };

  const demoFilterWithObjectsAndNullThisArg = () => {
    console.log(
      "Using filter with a null thisArg to create a new array with only objects where age is greater than 30",
    );

    const result = testArrayOfObjects.filter(function (element) {
      return element.age > 30;
    }, null);

    console.log(result);
    console.log(
      "The filter method creates a new array with all elements that pass the test implemented by the provided function and thisArg is used as the this value inside the filter function",
    );
  };

  const demoFilterTypeGuard = () => {
    const mixedList: (string | number | undefined)[] = [
      "apple",
      undefined,
      42,
      "banana",
      undefined,
    ];
    console.log("Mixed list in TS:", mixedList);

    // Regular filter: return type is still (string | number | undefined)[]
    const regularFiltered = mixedList.filter((x) => typeof x === "string");
    console.log("Regular filtered array using typeof:", regularFiltered);
    console.log(
      "Regular filtered array return type is still (string | number | undefined)[]",
    );

    // Type guard filter: narrows type to string[]
    const isString = (val: string | number | undefined): val is string =>
      typeof val === "string";
    const typeNarrowed: string[] = mixedList.filter(isString);

    console.log("Type-narrowed string list:", typeNarrowed);
    console.log(
      "In TypeScript, using a user-defined type guard function (parameter is Type) narrows the result type from '(string | number | undefined)[]' to 'string[]' at compile time.",
    );
  };

  const demoFilterBenchmark = () => {
    const size = 500000;
    console.log("Compare: native filter vs manual for-loop vs reduce");
    console.log(`Array size: ${size.toLocaleString()} elements`);

    // Setup array
    const arr = Array.from({ length: size }, (_, i) => i);

    // 1. Native filter
    const filterStart = performance.now();
    const nativeRes = arr.filter((x) => x % 2 === 0);
    const nativeTime = performance.now() - filterStart;
    console.log(
      `Native .filter() took: ${nativeTime.toFixed(2)}ms (Result size: ${nativeRes.length})`,
    );

    // 2. Manual for loop (push)
    const loopStart = performance.now();
    const loopRes: number[] = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] % 2 === 0) {
        loopRes.push(arr[i]);
      }
    }
    const loopTime = performance.now() - loopStart;
    console.log(
      `Manual for loop took: ${loopTime.toFixed(2)}ms (Result size: ${loopRes.length})`,
    );

    // 3. Reduce filter
    const reduceStart = performance.now();
    const reduceRes = arr.reduce<number[]>((acc, x) => {
      if (x % 2 === 0) {
        acc.push(x);
      }
      return acc;
    }, []);
    const reduceTime = performance.now() - reduceStart;
    console.log(
      `Reduce-based filter took: ${reduceTime.toFixed(2)}ms (Result size: ${reduceRes.length})`,
    );

    console.log("Key insights:");
    console.log(
      "1. Manual loop is usually the fastest as it avoids callback overhead and engine-level abstraction layers.",
    );
    console.log(
      "2. Native filter is highly readable, standard, and optimized by modern engines (often close to the loop).",
    );
    console.log(
      "3. Reduce is typically the slowest here due to creating and returning the accumulator at each iteration step.",
    );
  };

  const demoFilterAsync = () => {
    const ids = [1, 2, 3, 4, 5];
    const checkIsAllowedAsync = async (id: number): Promise<boolean> => {
      // Simulate API call
      return new Promise((resolve) =>
        setTimeout(() => resolve(id % 2 === 0), 10),
      );
    };

    console.log("Array to filter asynchronously:", ids);

    // Naive async filter (DOES NOT WORK)
    const naiveFilter = ids.filter(async (id) => {
      const allowed = await checkIsAllowedAsync(id);
      return allowed;
    });
    console.log(
      "Naive async filter returned:",
      naiveFilter,
      "<- ALL elements kept!",
    );
    console.log(
      "Why? Because async functions return a Promise object. Promise objects are truthy, so native filter includes every element.",
    );

    // Correct approach using Promise.all and map
    console.log("Running correct async filter pattern...");
    const runCorrectAsyncFilter = async () => {
      const start = performance.now();
      // Map elements to their predicate outcomes (Promises)
      const predicates = await Promise.all(
        ids.map((id) => checkIsAllowedAsync(id)),
      );
      // Filter original array using the pre-resolved results array
      const correctFilter = ids.filter((_, index) => predicates[index]);
      console.log(
        `Correct async filter returned:`,
        correctFilter,
        `(took ${(performance.now() - start).toFixed(1)}ms)`,
      );
    };

    runCorrectAsyncFilter();
  };

  const demoFilterArrayLike = () => {
    const arrayLike = {
      length: 4,
      0: "apple",
      1: "banana",
      2: "orange",
      3: "pear",
    };
    console.log("Array-like before filtering:", { ...arrayLike });

    // Call Array.prototype.filter on the array-like object
    const result = Array.prototype.filter.call(arrayLike, (fruit: string) =>
      fruit.includes("a"),
    );
    console.log("Result (fruits containing 'a'):", result);
    console.log(
      "Array.prototype.filter respects the length and numerical index properties of any object, returning a real Array.",
    );
  };

  const demoFilterReduceAlternative = () => {
    console.log("Re-implementing filter logic using Array.prototype.reduce:");
    const customFilter = <T,>(
      arr: T[],
      predicate: (val: T, idx: number, array: T[]) => boolean,
    ): T[] => {
      return arr.reduce<T[]>((acc, current, index) => {
        if (predicate(current, index, arr)) {
          acc.push(current);
        }
        return acc;
      }, []);
    };

    const numbers = [1, 2, 3, 4, 5, 6];
    const evenNumbers = customFilter(numbers, (x) => x % 2 === 0);
    console.log("Original:", numbers);
    console.log("Custom reduce filter (even numbers):", evenNumbers);
  };
  //#endregion

  return (
    <Grid
      label="filter"
      descp={[
        "Creates a new array with all elements that pass the test implemented by the provided function.",
        "Returns a shallow copy of elements — mutating filtered objects affects the original array.",
        "Holes in sparse arrays are skipped completely (no callback run, no hole in output).",
        "Supports thisArg (only on traditional functions, ignored by arrow functions).",
        "Can filter array-like structures using Array.prototype.filter.call().",
        "TypeScript type guards narrow the resulting array element type.",
      ]}
      link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter"
    >
      <Buttons>
        {/* Basic / Normal Cases */}
        <Button handleClick={demoFilter} label="Basic filter (Even numbers)" />
        <Button handleClick={demoFilterWithObjects} label="Filter objects" />
        <Button
          handleClick={demoFilterShallowCopy}
          label="Shallow copy check"
        />
        <Button
          handleClick={demoFilterWithThisArg}
          label="Filter with thisArg"
        />
        <Button
          handleClick={demoFilterCallbackArgs}
          label="Callback arguments (element, index, array)"
        />
        <Button
          handleClick={demoFilterReturnValue}
          label="Return value (New array)"
        />

        {/* Edge Cases */}
        <Button
          handleClick={demoFilterSparseArray}
          label="Sparse array holes"
        />
        <Button
          handleClick={demoFilterTruthyFalsy}
          label="Truthy/Falsy predicates"
        />
        <Button
          handleClick={demoFilterArrowThisArg}
          label="Arrow function & thisArg"
        />
        <Button
          handleClick={demoFilterModifyAppend}
          label="Modify array: append"
        />
        <Button
          handleClick={demoFilterModifyValue}
          label="Modify array: modify downstream"
        />
        <Button
          handleClick={demoFilterModifyDelete}
          label="Modify array: delete downstream"
        />
        <Button handleClick={demoFilterEmptyArray} label="Empty array" />

        {/* Advanced / Nerd Cases */}
        <Button
          handleClick={demoFilterWithUndefinedNull}
          label="Filter null/undefined elements"
        />
        <Button
          handleClick={demoFilterWithObjectsAndThisArg}
          label="Objects and thisArg"
        />
        <Button
          handleClick={demoFilterWithObjectsAndUndefinedThisArg}
          label="Objects and undefined thisArg"
        />
        <Button
          handleClick={demoFilterWithObjectsAndNullThisArg}
          label="Objects and null thisArg"
        />
        <Button
          handleClick={demoFilterTypeGuard}
          label="TypeScript Type Guards"
        />
        <Button
          handleClick={demoFilterAsync}
          label="Async filtering (Correct vs Incorrect)"
        />
        <Button
          handleClick={demoFilterReduceAlternative}
          label="Re-implement filter using reduce"
        />
        <Button
          handleClick={demoFilterArrayLike}
          label="Filter on Array-like object"
        />
        <Button
          handleClick={demoFilterBenchmark}
          label="Performance Benchmark"
        />
      </Buttons>
    </Grid>
  );
};
