import { Button, Buttons, Grid } from "src/components";

export const JSForeach = () => {
  // BASIC TEST DATA
  const testArray = [1, 2, 3, 4, 5];
  const emptyArray: number[] = [];
  const singleElementArray = [42];

  // EDGE CASE TEST DATA
  const sparseArray = [1, , 3];
  const nanArray = [NaN, 2, 3, 4];
  const testArrayWithUndefined = [1, undefined, 3, undefined, 5];
  const testArrayWithNull = [1, null, 3, null, 5];
  const falsyArray = [0, false, "", null, undefined, NaN];
  const testArrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];

  // ADVANCED TEST DATA
  const testArrayOfObjects = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
  ];
  const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };

  //#region basic cases
  const demoForEach = () => {
    console.log("=== Simple forEach iteration");
    testArray.forEach((element) => {
      console.log(element);
    });
  };

  const demoForEachEmptyArray = () => {
    console.log("=== Empty array behavior");
    console.log("Input:", emptyArray);
    emptyArray.forEach((element) => {
      console.log("This will never log because array is empty");
    });
    console.log("forEach completed with no iterations");
  };

  const demoForEachSingleElement = () => {
    console.log("=== Single element array");
    console.log("Input:", singleElementArray);
    singleElementArray.forEach((element) => {
      console.log(`Element: ${element}`);
    });
  };

  const demoForEachReturnValue = () => {
    console.log("=== Return value is always undefined");
    const result = testArray.forEach((element) => {
      console.log(element);
    });
    console.log("forEach return value:", result);
    console.log("Type:", typeof result);
  };

  const demoForEachWithIndex = () => {
    console.log("=== Callback with index parameter");
    testArray.forEach((element, index) => {
      console.log(`Index: ${index}, Element: ${element}`);
    });
  };

  const demoForEachAllParameters = () => {
    console.log("=== All 3 callback parameters");
    testArray.forEach((element, index, array) => {
      console.log(
        `Element: ${element}, Index: ${index}, Array: [${array.join(", ")}]`,
      );
    });
  };
  //#endregion

  //#region edge cases
  const demoForEachSparseArray = () => {
    console.log("Sparse arrays");
    console.log("Original array:", sparseArray);

    sparseArray.forEach((value, index) => {
      console.log(`Index: ${index}, Value: ${value}`);
    });
    console.log(
      "Index 1 is completely skipped. forEach does not execute the callback for empty slots in sparse arrays.",
    );
  };

  const demoForEachNanArray = () => {
    console.log("NaN handling");
    console.log("Original array:", nanArray);
    nanArray.forEach((element, index) => {
      console.log(
        `Index: ${index}, Value: ${element}, isNaN: ${isNaN(element)}`,
      );
    });
    console.log("NaN is treated like any other value in forEach");
  };

  const demoForEachWithUndefinedNull = () => {
    console.log("Undefined and null values");
    console.log("Array with undefined:", testArrayWithUndefined);
    testArrayWithUndefined.forEach((element) => {
      console.log(`Value: ${element}`);
    });
    console.log("Array with null:", testArrayWithNull);
    testArrayWithNull.forEach((element) => {
      console.log(`Value: ${element}`);
    });
  };

  const demoForEachFalsyValues = () => {
    console.log("Running loop with falsy values in array");
    console.log("Original array:", falsyArray);
    falsyArray.forEach((element, index) => {
      console.log(
        `Index: ${index}, Value: ${element}, Type: ${typeof element}`,
      );
    });
    console.log(
      "All falsy values are still iterated over (unlike sparse arrays)",
    );
  };

  const demoForEachMutationAddition = () => {
    console.log("Adding elements during iteration");

    const arr = [1, 2, 3];
    console.log("Original array:", arr);

    arr.forEach((value, index) => {
      console.log(`Iteration ${index}: value = ${value}`);
      if (index === 0) {
        arr.push(4);
        console.log(`Added 4 to array, current length: ${arr.length}`);
      }
    });

    console.log("Final array:", arr);
    console.log("New elements added during iteration are NOT iterated over");
  };

  const demoForEachMutationModification = () => {
    console.log("Modifying existing elements during iteration");

    const arr = [1, 2, 3];
    console.log("Original array:", arr);

    arr.forEach((value, index) => {
      console.log(`Before iteration ${index}: arr = [${arr.join(", ")}]`);
      if (index === 0) {
        arr[index + 1] = 10000;
      }
    });

    console.log("Final array:", arr);
    console.log("Modified values ARE seen in subsequent iterations");
  };

  const demoForEachMutationDeletion = () => {
    console.log("Deleting elements during iteration");

    const arr = [1, 2, 3, 4, 5];
    console.log("Original array:", arr);

    arr.forEach((value, index) => {
      console.log(`Index: ${index}, Value: ${value}`);
      if (index === 1) {
        delete arr[3];
        console.log(`Deleted element at index 3`);
      }
    });

    console.log("Final array:", arr);
    console.log("Array has holes but forEach still completes");
  };

  const demoForEachArrayLengthChange = () => {
    console.log("Changing array length during iteration");

    const arr = [1, 2, 3, 4, 5];
    console.log("Original array:", arr);

    arr.forEach((value, index) => {
      console.log(`Iteration ${index}: value = ${value}`);
      if (index === 1) {
        arr.length = 2;
        console.log(`Changed array length to 2`);
      }
    });

    console.log("Final array:", arr);
    console.log(
      "Shortening the array's length does prevent remaining callback invocations (they are skipped because their indices are deleted)."
    );
  };

  const demoForEachThisArg = () => {
    console.log("Using thisArg with forEach");

    const thisArg: { multiplier: number } = { multiplier: 10 };
    console.log("thisArg object:", thisArg);

    testArray.forEach(function (this: { multiplier: number }, element) {
      console.log(
        `${element} * ${this.multiplier} = ${element * this.multiplier}`,
      );
    }, thisArg);
  };
  //#endregion

  //#region advanced cases
  const demoForEachThisArrowVsRegular = () => {
    console.log("thisArg with arrow functions vs regular functions");

    const context = { prefix: "Result:" };

    console.log("Arrow function (thisArg is IGNORED):");
    const arr1 = [1, 2];
    arr1.forEach((element) => {
      console.log(`${(this as any).prefix || "undefined"} ${element}`);
    }, context);

    console.log("Regular function (thisArg is USED):");
    const arr2 = [1, 2];
    arr2.forEach(function (this: any, element: number) {
      console.log(`${this.prefix} ${element}`);
    }, context);

    console.log(
      "Conclusion: Arrow functions have lexical 'this' binding, regular functions use provided thisArg",
    );
  };

  const demoForEachVsFor = () => {
    console.log("forEach vs traditional for loop");
    const arr = [10, 20, 30];

    console.log("forEach:");
    console.time("forEach");
    arr.forEach((element) => {
      console.log(element);
    });
    console.timeEnd("forEach");

    console.log("for loop:");
    console.time("for");
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]);
    }
    console.timeEnd("for");

    console.log("Key differences:");
    console.log("for: can use break/continue, typically faster");
    console.log("forEach: cleaner syntax, functional approach, cannot break");
  };

  const demoForEachVsForOf = () => {
    console.log("forEach vs for...of");
    const arr = [10, 20, 30];

    console.log(" forEach:");
    arr.forEach((element) => {
      console.log(element);
    });

    console.log("for...of:");
    for (const element of arr) {
      console.log(element);
    }

    console.log("Key differences:");
    console.log("for...of: can use break/continue, works with iterables");
    console.log("forEach: cannot break, easier for side effects");
  };

  const demoForEachErrorHandling = () => {
    console.log("Error handling in forEach");
    const arr = [1, 2, 3, 4, 5];

    try {
      arr.forEach((element) => {
        if (element === 3) {
          throw new Error("Custom error at element 3");
        }
        console.log(element);
      });
    } catch (error: any) {
      console.log(`Caught error: ${error.message}`);
      console.log("forEach stops and throws the error");
    }
  };

  const demoForEachArrayLike = () => {
    console.log("Using forEach on array-like objects");
    console.log("Array-like object:", arrayLike);

    console.log("forEach directly on array-like (will fail):");
    try {
      (arrayLike as any).forEach((element: any) => {
        console.log(element);
      });
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
    }

    console.log("Using Array.prototype.forEach.call():");
    Array.prototype.forEach.call(arrayLike, (element) => {
      console.log(element);
    });

    console.log("Converting to array first:");
    Array.from(arrayLike).forEach((element) => {
      console.log(element);
    });
  };

  const demoForEachSideEffects = () => {
    console.log("Side effects in forEach");
    const arr = [1, 2, 3];
    let sum = 0;
    let multiplied: number[] = [];

    console.log("forEach is perferct for side effects:");
    arr.forEach((element) => {
      sum += element;
      multiplied.push(element * 2);
    });
    console.log("Sum:", sum);
    console.log("Multiplied:", multiplied);

    console.log("forEach is NOT ideal for pure functional style:");
  };

  const demoForEachAsyncTrap = () => {
    console.log("Common mistake - async operations in forEach");

    const mockFetch = (id: number) =>
      new Promise((resolve) => {
        setTimeout(() => resolve(`Data ${id}`), 100);
      });

    console.log("forEach does not wait for async:");
    console.log("Code:");
    console.log(
      "arr.forEach(async (id) => { await mockFetch(id); console.log(...) })",
    );
    console.log("Result: Logs appear out of order or not at all");

    console.log("Use for...of with async/await:");
    console.log(
      "(async () => { for (const id of arr) { await mockFetch(id); console.log(...) } })()",
    );
    console.log("Result: Sequential, predictable async operations");
  };

  const demoForEachWithObjects = () => {
    console.log("forEach with array of objects");
    testArrayOfObjects.forEach((element) => {
      console.log(`Name: ${element.name}, Age: ${element.age}`);
    });
  };

  const demoForEachChaining = () => {
    console.log("Why forEach cannot be chained");
    const arr = [1, 2, 3, 4, 5];

    console.log("map returns array (can chain):");
    const result1 = arr
      .map((x) => x * 2)
      .filter((x) => x > 4)
      .reduce((sum, x) => sum + x, 0);
    console.log("Result:", result1);

    console.log("forEach returns undefined (cannot chain):");
    console.log(
      "arr.forEach(...).map(...) // TypeError: undefined is not iterable\n",
    );

    console.log(
      "forEach is a terminal operation - it must be at the end of a chain",
    );
  };

  const demoForEachPrototypePollution = () => {
    console.log("Prototype inheritance on sparse array holes");
    const arr = [1, , 3];
    console.log("Original sparse array:", arr);
    console.log("Setting Array.prototype[1] = 'inherited-value'...");

    // Temporarily pollute prototype
    (Array.prototype as any)[1] = "inherited-value";

    arr.forEach((value, index) => {
      console.log(`Index: ${index}, Value: ${value}`);
    });

    // Clean up prototype
    delete (Array.prototype as any)[1];
    console.log("Cleaned up Array.prototype");
    console.log(
      "Explanation: forEach uses HasProperty check. If the array itself has a hole, it resolves to the prototype. If the prototype has a property at that index, it is iterated over!"
    );
  };

  const demoForEachIndexShifting = () => {
    console.log("Index shifting due to concurrent mutation");
    const arr = [1, 2, 3, 4];
    console.log("Original array:", arr);

    arr.forEach((value, index) => {
      console.log(`Index: ${index}, Value: ${value}`);
      if (value === 2) {
        arr.shift(); // removes 1, elements shift left
        console.log("Called arr.shift(). Current array state:", [...arr]);
      }
    });

    console.log("Final array state:", arr);
    console.log(
      "Notice: The value '3' was skipped because it shifted to index 1, but the iteration index had already moved to 2."
    );
  };

  const demoForEachStrictModeThis = () => {
    console.log("Strict mode default 'this' value");
    const arr = [1];
    arr.forEach(function (this: any, value) {
      console.log("this context inside callback:", this);
    });
    console.log(
      "Because ES modules / TS files run in strict mode, when 'thisArg' is omitted, 'this' defaults to 'undefined' rather than the global object."
    );
  };
  //#endregion

  return (
    <Grid
      label="forEach"
      descp={[
        "Executes a provided function once for each array element.",
        "Does not return a value (undefined), used for side effects.",
        "Cannot use break/continue; skips sparse array holes.",
      ]}
    >
      <Buttons>
        <Button handleClick={demoForEach} label="Simple iteration" />
        <Button
          handleClick={demoForEachEmptyArray}
          label="Empty array"
        />
        <Button
          handleClick={demoForEachSingleElement}
          label="Single element"
        />
        <Button
          handleClick={demoForEachReturnValue}
          label="Return value (undefined)"
        />
        <Button
          handleClick={demoForEachWithIndex}
          label="With index parameter"
        />
        <Button
          handleClick={demoForEachAllParameters}
          label="All 3 parameters"
        />
        <Button
          handleClick={demoForEachSparseArray}
          label="Sparse arrays (holes)"
        />
        <Button handleClick={demoForEachNanArray} label="NaN values" />
        <Button
          handleClick={demoForEachWithUndefinedNull}
          label="undefined & null"
        />
        <Button
          handleClick={demoForEachFalsyValues}
          label="Falsy values"
        />
        <Button
          handleClick={demoForEachMutationAddition}
          label="Adding elements"
        />
        <Button
          handleClick={demoForEachMutationModification}
          label="Modifying elements"
        />
        <Button
          handleClick={demoForEachMutationDeletion}
          label="Deleting elements"
        />
        <Button
          handleClick={demoForEachArrayLengthChange}
          label="Changing array length"
        />
        <Button handleClick={demoForEachThisArg} label="thisArg usage" />
        <Button
          handleClick={demoForEachThisArrowVsRegular}
          label="Arrow vs regular function this"
        />
        <Button
          handleClick={demoForEachVsFor}
          label="forEach vs for loop"
        />
        <Button
          handleClick={demoForEachVsForOf}
          label="forEach vs for...of"
        />
        <Button
          handleClick={demoForEachErrorHandling}
          label="Error handling"
        />
        <Button
          handleClick={demoForEachArrayLike}
          label="Array-like objects"
        />
        <Button
          handleClick={demoForEachSideEffects}
          label="Side effects"
        />
        <Button
          handleClick={demoForEachAsyncTrap}
          label="Async trap (common mistake)"
        />
        <Button
          handleClick={demoForEachWithObjects}
          label="Array of objects"
        />
        <Button
          handleClick={demoForEachChaining}
          label="Why forEach cannot chain"
        />
        <Button
          handleClick={demoForEachPrototypePollution}
          label="NERD: Prototype inheritance"
        />
        <Button
          handleClick={demoForEachIndexShifting}
          label="NERD: Concurrent shift skip"
        />
        <Button
          handleClick={demoForEachStrictModeThis}
          label="NERD: Strict mode 'this'"
        />
      </Buttons>
    </Grid>
  );
};
