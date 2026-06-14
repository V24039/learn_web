import { Button, Buttons, Grid } from "src/components";

export const JSFindLast = () => {
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

  // Normal Cases

  const demoFindLastBasic = () => {
    // findLast(predicate) — returns the last element that satisfies the predicate
    console.log("Array:", testArray);
    const result = testArray.findLast((x) => x % 2 !== 0);
    console.log("findLast(x => x % 2 !== 0):", result);
    // Result: 5 (last odd number)
    console.log(
      "findLast scans from RIGHT to LEFT and returns the FIRST match it encounters.",
      "The first match from the right is the last match in the array."
    );
  };

  const demoFindLastVsFind = () => {
    // Contrast with find() which searches left-to-right
    console.log("Array:", testArrayWithDuplicates); // [1,2,2,3,4,4,5]
    const first = testArrayWithDuplicates.find((x) => x === 2);
    const last = testArrayWithDuplicates.findLast((x) => x === 2);
    console.log("find(x => x === 2)     :", first, "(index 1)");
    console.log("findLast(x => x === 2) :", last,  "(index 2)");
    console.log(
      "find() → left-to-right, first match. findLast() → right-to-left, last match.",
      "Both short-circuit as soon as a match is found."
    );
  };

  const demoFindLastWithObjects = () => {
    console.log("Array:", JSON.stringify(testArrayOfObjects));
    const result = testArrayOfObjects.findLast((o) => o.age > 25);
    console.log("findLast(o => o.age > 25):", JSON.stringify(result));
    // Charlie (age 35) — the last object with age > 25
    console.log(
      "findLast returns the element (object reference) itself, not a copy.",
      "Mutating the result will mutate the original array element."
    );
  };

  const demoFindLastCallbackArgs = () => {
    // The callback receives (element, index, array)
    testArray.findLast((element, index, array) => {
      console.log(`element=${element}, index=${index}, array.length=${array.length}`);
      return false; // visit all elements to show args
    });
    console.log(
      "Callback signature: (element, index, array).",
      "Iteration starts from the LAST index and moves toward 0."
    );
  };

  const demoFindLastReturnUndefined = () => {
    // Returns undefined if no element satisfies the predicate
    console.log("Array:", testArray);
    const result = testArray.findLast((x) => x > 100);
    console.log("findLast(x => x > 100):", result);
    console.log(
      "findLast returns undefined (not -1, not null) when no match is found.",
      "Always guard: const val = arr.findLast(pred); if (val !== undefined) { ... }"
    );
  };

  const demoFindLastWithIndex = () => {
    // Use findLastIndex() if you need the index, not the value
    console.log("Array:", testArrayWithDuplicates); // [1,2,2,3,4,4,5]
    const value = testArrayWithDuplicates.findLast((x) => x % 2 === 0);
    const index = testArrayWithDuplicates.findLastIndex((x) => x % 2 === 0);
    console.log("findLast(even)     :", value);  // 4
    console.log("findLastIndex(even):", index);  // 5
    console.log(
      "findLast() returns the VALUE; findLastIndex() returns the INDEX.",
      "Use whichever you need — they have the same traversal cost."
    );
  };

  // Edge Cases──

  const demoFindLastEmptyArray = () => {
    const arr: number[] = [];
    const result = arr.findLast((x) => x > 0);
    console.log("findLast on []:", result);
    console.log("findLast on an empty array always returns undefined.");
  };

  const demoFindLastSingleElement = () => {
    const arr = [42];
    console.log("Array:", arr);
    const match = arr.findLast((x) => x === 42);
    const noMatch = arr.findLast((x) => x === 0);
    console.log("findLast(x === 42):", match);   // 42
    console.log("findLast(x === 0) :", noMatch); // undefined
  };

  const demoFindLastWithNaN = () => {
    const arr = [1, NaN, 3, NaN, 5];
    console.log("Array:", arr);
    // NaN !== NaN, so use Number.isNaN
    const result = arr.findLast((x) => Number.isNaN(x));
    console.log("findLast(Number.isNaN):", result); // NaN (second one)
    console.log(
      "indexOf/lastIndexOf cannot find NaN (=== comparison), but findLast can.",
      "findLast with Number.isNaN is the correct way to find the last NaN."
    );
  };

  const demoFindLastWithUndefined = () => {
    console.log("Array:", testArrayWithUndefined);
    const result = testArrayWithUndefined.findLast((x) => x === undefined);
    console.log("findLast(x === undefined):", result);
    // undefined — last real undefined element
    console.log("findLast can match undefined values — it uses the predicate, not ===.");
  };

  const demoFindLastWithNull = () => {
    console.log("Array:", testArrayWithNull);
    const result = testArrayWithNull.findLast((x) => x === null);
    console.log("findLast(x === null):", result);
    console.log("null values are treated as ordinary elements.");
  };

  const demoFindLastSparseArray = () => {
    const arr = [1, , 3, , 5]; // sparse
    console.log("Array (sparse):", [...arr]);
    const result = arr.findLast((x) => x !== undefined);
    console.log("findLast(x !== undefined):", result); // 5
    console.log(
      "findLast VISITS sparse holes (unlike forEach/map which skip them).",
      "Holes are visited with value `undefined`, so predicates can match them."
    );
  };

  const demoFindLastAllMatch = () => {
    const arr = [2, 4, 6, 8];
    console.log("Array:", arr);
    const result = arr.findLast((x) => x % 2 === 0);
    console.log("findLast(all even):", result);
    // 8 — the last element (rightmost)
    console.log("When all elements match, findLast returns the LAST element (rightmost).");
  };

  const demoFindLastFirstElementOnly = () => {
    // What if only the first element matches? findLast scans whole array
    const arr = [2, 3, 5, 7, 11];
    console.log("Array:", arr);
    const result = arr.findLast((x) => x % 2 === 0);
    console.log("findLast(even — only arr[0] matches):", result);
    // 2 — still found, but only after scanning all the way to index 0
    console.log(
      "findLast traverses the ENTIRE array if the only match is at index 0.",
      "This is the worst case: O(n) with the match at the very start."
    );
  };

  // Advanced / Nerd Cases─

  const demoFindLastShortCircuit = () => {
    // findLast short-circuits as soon as it finds a match
    const arr = [1, 2, 3, 4, 5];
    let visited = 0;
    const result = arr.findLast((x) => {
      visited++;
      return x === 4;
    });
    console.log("Array:", arr);
    console.log("findLast(x === 4):", result); // 4
    console.log("Elements visited:", visited); // 2 (index 4 and 3)
    console.log(
      "findLast short-circuits — it stops as soon as it finds a match.",
      "Only 2 elements were visited (index 4: 5, then index 3: 4 ✓)."
    );
  };

  const demoFindLastVsLastIndexOf = () => {
    const arr = [1, 2, 3, 2, 1];
    console.log("Array:", arr);
    // lastIndexOf — strict equality (===), no predicate
    const idx = arr.lastIndexOf(2);
    // findLast — predicate-based, returns value
    const val = arr.findLast((x) => x === 2);
    console.log("lastIndexOf(2)           :", idx); // 3
    console.log("findLast(x => x === 2)   :", val); // 2
    console.log(
      "lastIndexOf is faster for simple === equality (no callback overhead).",
      "findLast is needed for complex conditions — comparisons, ranges, type checks, etc.",
      "lastIndexOf also supports a `fromIndex` argument for partial scans."
    );
  };

  const demoFindLastVsFilter = () => {
    const arr = [1, 2, 3, 4, 5, 6];
    console.log("Array:", arr);
    // filter — collects ALL matches, O(n), returns new array
    const allEvens = arr.filter((x) => x % 2 === 0);
    console.log("filter(even):", allEvens);
    // findLast — returns just the LAST match, O(n) but short-circuits
    const lastEven = arr.findLast((x) => x % 2 === 0);
    console.log("findLast(even):", lastEven);
    console.log(
      "Use findLast when you only need the LAST match — avoids allocating a result array.",
      "filter scans the whole array and allocates; findLast short-circuits on first hit from right."
    );
  };

  const demoFindLastWithThisArg = () => {
    // findLast accepts a thisArg as second argument (non-arrow callback required)
    const threshold = { min: 3 };
    const arr = [1, 2, 3, 4, 5];
    const result = arr.findLast(function (this: { min: number }, x) {
      return x > this.min;
    }, threshold);
    console.log("findLast(x > this.min, {min:3}):", result); // 5
    console.log(
      "findLast accepts an optional thisArg — passed as `this` inside a non-arrow callback.",
      "Rarely used in modern code (closures are simpler), but part of the spec."
    );
  };

  const demoFindLastMostRecentEvent = () => {
    // Practical: find the most recent event matching a condition
    const events = [
      { type: "click", ts: 1000 },
      { type: "scroll", ts: 1200 },
      { type: "click", ts: 1500 },
      { type: "keypress", ts: 1800 },
      { type: "click", ts: 2000 },
    ];
    const lastClick = events.findLast((e) => e.type === "click");
    console.log("Events:", JSON.stringify(events));
    console.log("Last click event:", JSON.stringify(lastClick));
    console.log(
      "findLast is perfect for finding the most recent item matching a condition.",
      "Cleaner than events.filter(e => e.type==='click').at(-1) — no intermediate array."
    );
  };

  const demoFindLastBinarySearchAlternative = () => {
    // In a sorted array, findLast can simulate 'last element ≤ threshold'
    const sorted = [1, 3, 5, 7, 9, 11, 13];
    const threshold = 8;
    const lastBelow = sorted.findLast((x) => x <= threshold);
    console.log("Sorted array:", sorted);
    console.log(`findLast(x <= ${threshold}):`, lastBelow); // 7
    console.log(
      "For small sorted arrays, findLast is a readable O(n) alternative to binary search.",
      "For large arrays, use binary search (O(log n)) instead."
    );
  };

  return (
    <Grid
      label="findLast"
      descp={[
        "Returns the last element in the array that satisfies the provided predicate function.",
        "Traverses the array from right to left and short-circuits on the first match.",
        "Returns undefined (not -1) if no element satisfies the predicate.",
        "Signature: arr.findLast(callbackFn, thisArg?)  — callbackFn(element, index, array).",
        "Visits sparse holes (unlike forEach/map) — holes are passed as undefined to the callback.",
        "Use findLastIndex() when you need the index of the match instead of the value.",
        "ES2023 method — available in all modern browsers and Node ≥ 18.",
      ]}
      link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast"
    >
      <Buttons>
        {/* Normal */}
        <Button handleClick={demoFindLastBasic} label="findLast — basic predicate" />
        <Button handleClick={demoFindLastVsFind} label="findLast vs find (left vs right)" />
        <Button handleClick={demoFindLastWithObjects} label="findLast with object elements" />
        <Button handleClick={demoFindLastCallbackArgs} label="Callback args (element, index, array)" />
        <Button handleClick={demoFindLastReturnUndefined} label="No match — returns undefined" />
        <Button handleClick={demoFindLastWithIndex} label="findLast vs findLastIndex" />

        {/* Edge */}
        <Button handleClick={demoFindLastEmptyArray} label="Empty array — always undefined" />
        <Button handleClick={demoFindLastSingleElement} label="Single-element array" />
        <Button handleClick={demoFindLastWithNaN} label="Find last NaN (Number.isNaN)" />
        <Button handleClick={demoFindLastWithUndefined} label="Match undefined values" />
        <Button handleClick={demoFindLastWithNull} label="Match null values" />
        <Button handleClick={demoFindLastSparseArray} label="Sparse array — holes are visited" />
        <Button handleClick={demoFindLastAllMatch} label="All elements match — returns last" />
        <Button handleClick={demoFindLastFirstElementOnly} label="Only first element matches — worst case" />

        {/* Advanced / Nerd */}
        <Button handleClick={demoFindLastShortCircuit} label="Short-circuit behaviour" />
        <Button handleClick={demoFindLastVsLastIndexOf} label="findLast vs lastIndexOf" />
        <Button handleClick={demoFindLastVsFilter} label="findLast vs filter — perf & allocation" />
        <Button handleClick={demoFindLastWithThisArg} label="thisArg second parameter" />
        <Button handleClick={demoFindLastMostRecentEvent} label="Most recent matching event (practical)" />
        <Button handleClick={demoFindLastBinarySearchAlternative} label="Last element ≤ threshold (sorted array)" />
      </Buttons>
    </Grid>
  );
};
