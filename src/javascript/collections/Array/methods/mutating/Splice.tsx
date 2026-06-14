import { Button, Buttons, Grid } from "src/components";

export const JSSplice = () => {
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

  // ─── Normal Cases ──────────────────────────────────────────────────────────

  const demoSpliceDeleteOnly = () => {
    // splice(start, deleteCount) — removes `deleteCount` elements from `start`
    const arr = [...testArray]; // [1,2,3,4,5]
    console.log("Before:", [...arr]);
    const removed = arr.splice(1, 2);
    console.log("After  arr.splice(1, 2):", arr);
    console.log("Removed:", removed);
    // arr: [1, 4, 5], removed: [2, 3]
    console.log(
      "splice(1, 2) removes 2 elements starting at index 1.",
      "The removed elements are returned as a new array."
    );
  };

  const demoSpliceInsertOnly = () => {
    // splice(start, 0, ...items) — inserts items at `start` without removing anything
    const arr = [1, 2, 3];
    console.log("Before:", [...arr]);
    const removed = arr.splice(1, 0, 10, 20);
    console.log("After  arr.splice(1, 0, 10, 20):", arr);
    console.log("Removed (empty):", removed);
    // arr: [1, 10, 20, 2, 3]
    console.log(
      "deleteCount=0 means nothing is removed — items are simply inserted at index 1.",
      "The returned array is always empty when deleteCount is 0."
    );
  };

  const demoSpliceReplace = () => {
    // splice(start, deleteCount, ...items) — removes and inserts simultaneously
    const arr = [1, 2, 3, 4, 5];
    console.log("Before:", [...arr]);
    const removed = arr.splice(1, 2, 10, 20, 30);
    console.log("After  arr.splice(1, 2, 10, 20, 30):", arr);
    console.log("Removed:", removed);
    // arr: [1, 10, 20, 30, 4, 5], removed: [2, 3]
    console.log(
      "Removes 2 elements at index 1 and inserts 3 new ones — array length CAN change.",
      "Unlike fill/copyWithin, splice is NOT length-preserving."
    );
  };

  const demoSpliceDeleteToEnd = () => {
    // Omitting deleteCount removes everything from start to the end
    const arr = [...testArray];
    console.log("Before:", [...arr]);
    const removed = arr.splice(2);
    console.log("After  arr.splice(2) (omit deleteCount):", arr);
    console.log("Removed:", removed);
    // arr: [1, 2], removed: [3, 4, 5]
    console.log(
      "Omitting deleteCount is equivalent to deleteCount = arr.length - start.",
      "Everything from index 2 onward is removed."
    );
  };

  const demoSpliceReturnValue = () => {
    // splice always returns an array of removed elements (may be empty)
    const arr = [...testArray];
    const removed = arr.splice(0, 3);
    console.log("Removed array:", removed);
    console.log("Is array:", Array.isArray(removed));
    console.log("Modified arr:", arr);
    console.log(
      "splice always returns a NEW array containing the deleted elements.",
      "If nothing is deleted, an empty [] is returned."
    );
  };

  const demoSpliceWithObjects = () => {
    const arr = testArrayOfObjects.map((o) => ({ ...o }));
    console.log("Before:", JSON.stringify(arr));
    const removed = arr.splice(1, 1, { name: "Dave", age: 28 });
    console.log("After  arr.splice(1, 1, {name:'Dave', age:28}):", JSON.stringify(arr));
    console.log("Removed:", JSON.stringify(removed));
    console.log("Objects in the removed array are the same references — shallow removal.");
  };

  const demoSpliceAppend = () => {
    // splice(arr.length, 0, ...items) — appends to end (like push, but for multiple items)
    const arr = [...testArray];
    console.log("Before:", [...arr]);
    arr.splice(arr.length, 0, 6, 7, 8);
    console.log("After  arr.splice(arr.length, 0, 6, 7, 8):", arr);
    console.log(
      "start = arr.length with deleteCount=0 appends items — equivalent to arr.push(...items).",
      "splice is more flexible: you can append anywhere, not just the end."
    );
  };

  const demoSplicePrepend = () => {
    // splice(0, 0, ...items) — prepends items (like unshift)
    const arr = [...testArray];
    console.log("Before:", [...arr]);
    arr.splice(0, 0, -2, -1, 0);
    console.log("After  arr.splice(0, 0, -2, -1, 0):", arr);
    console.log(
      "start=0, deleteCount=0 prepends items — equivalent to arr.unshift(-2, -1, 0).",
      "O(n) due to shifting all existing elements right."
    );
  };

  // ─── Edge Cases ────────────────────────────────────────────────────────────

  const demoSpliceNegativeStart = () => {
    // Negative start: normalised as start + length
    const arr = [...testArray]; // length = 5
    console.log("Before:", [...arr]);
    const removed = arr.splice(-2, 1); // start = 5 + (-2) = 3
    console.log("After  arr.splice(-2, 1):", arr);
    console.log("Removed:", removed);
    // removes arr[3] = 4 → arr: [1, 2, 3, 5]
    console.log("Negative start: -2 → index 3 (5 + (-2)). Removes element at index 3.");
  };

  const demoSpliceNegativeStartBeyondLength = () => {
    // Negative start < -length → clamped to 0 (start from beginning)
    const arr = [...testArray];
    console.log("Before:", [...arr]);
    const removed = arr.splice(-100, 2); // -100 < -5 → clamped to 0
    console.log("After  arr.splice(-100, 2):", arr);
    console.log("Removed:", removed);
    console.log(
      "start < -length is clamped to 0 — removal begins from index 0.",
      "This matches the spec: Math.max(length + start, 0)."
    );
  };

  const demoSpliceStartBeyondLength = () => {
    // start > length → clamped to length (appends, nothing is removed)
    const arr = [...testArray];
    console.log("Before:", [...arr]);
    const removed = arr.splice(100, 2, 99);
    console.log("After  arr.splice(100, 2, 99):", arr);
    console.log("Removed (empty):", removed);
    console.log(
      "start > length is clamped to length — nothing is removed, items are appended.",
      "The deleteCount is ignored because there are no elements to delete from that position."
    );
  };

  const demoSpliceDeleteCountZero = () => {
    const arr = [...testArray];
    console.log("Before:", [...arr]);
    const removed = arr.splice(2, 0);
    console.log("After  arr.splice(2, 0):", arr);
    console.log("Removed (empty):", removed);
    console.log("deleteCount=0 removes nothing — array is unchanged, empty [] returned.");
  };

  const demoSpliceDeleteCountNegative = () => {
    // Negative deleteCount is treated as 0
    const arr = [...testArray];
    console.log("Before:", [...arr]);
    const removed = arr.splice(1, -5, 99); // deleteCount=-5 → treated as 0
    console.log("After  arr.splice(1, -5, 99):", arr);
    console.log("Removed (empty):", removed);
    console.log(
      "Negative deleteCount is clamped to 0 — nothing removed, items inserted.",
      "Equivalent to arr.splice(1, 0, 99)."
    );
  };

  const demoSpliceDeleteCountExceedsLength = () => {
    // deleteCount > available elements → removes to end of array
    const arr = [...testArray]; // [1,2,3,4,5]
    console.log("Before:", [...arr]);
    const removed = arr.splice(2, 100); // only 3 elements remain from index 2
    console.log("After  arr.splice(2, 100):", arr);
    console.log("Removed:", removed);
    console.log(
      "deleteCount > available elements from start: removes only what exists.",
      "No error — it simply removes until the end of the array."
    );
  };

  const demoSpliceEmptyArray = () => {
    const arr: number[] = [];
    console.log("Before (empty):", arr);
    const removed = arr.splice(0, 1, 42);
    console.log("After  arr.splice(0, 1, 42):", arr);
    console.log("Removed (empty):", removed);
    console.log(
      "Splicing an empty array with deleteCount=1 removes nothing (no elements) but still inserts."
    );
  };

  const demoSpliceSparseArray = () => {
    const arr = [1, , 3, , 5]; // sparse
    console.log("Before (sparse):", [...arr]);
    const removed = arr.splice(1, 2); // removes index 1 (hole) and index 2 (3)
    console.log("After  arr.splice(1, 2):", arr);
    console.log("Removed:", removed);
    console.log(
      "splice removes holes as if they were elements — the hole at index 1 is included in the removed array.",
      "Removed array: [undefined (hole), 3]. The resulting array may also be sparse."
    );
  };

  const demoSpliceWithUndefined = () => {
    const arr = [...testArrayWithUndefined];
    console.log("Before:", [...arr]);
    const removed = arr.splice(1, 2);
    console.log("After  arr.splice(1, 2):", arr);
    console.log("Removed:", removed);
    console.log("undefined values are real elements and are removed/returned normally.");
  };

  const demoSpliceWithNull = () => {
    const arr = [...testArrayWithNull];
    console.log("Before:", [...arr]);
    const removed = arr.splice(1, 2, null);
    console.log("After  arr.splice(1, 2, null):", arr);
    console.log("Removed:", removed);
    console.log("null is a valid element and can be removed or inserted via splice.");
  };

  const demoSpliceClearArray = () => {
    // Fastest way to empty an array in place (mutating)
    const arr = [...testArray];
    console.log("Before:", [...arr]);
    arr.splice(0);
    console.log("After  arr.splice(0):", arr, "length:", arr.length);
    console.log(
      "arr.splice(0) removes all elements in place.",
      "Unlike arr = [], it keeps the SAME array reference — useful when other vars point to it.",
      "Alternative: arr.length = 0 (also in-place)."
    );
  };

  // ─── Advanced / Nerd Cases

  const demoSpliceVsToSpliced = () => {
    // toSpliced() is the non-mutating ES2023 counterpart
    const arr = [...testArray];
    console.log("Original:", [...arr]);
    const newArr = arr.toSpliced(1, 2, 99);
    console.log("toSpliced(1, 2, 99) result:", newArr);
    console.log("Original after toSpliced():", arr); // unchanged
    console.log(
      "toSpliced() (ES2023) returns a NEW array — the original is not mutated.",
      "Prefer toSpliced() in functional / immutable code; splice() for in-place mutation."
    );
  };

  const demoSpliceArrayLike = () => {
    // splice can be called on array-like objects via Array.prototype.splice.call()
    const arrayLike = { length: 4, 0: "a", 1: "b", 2: "c", 3: "d" };
    console.log("Array-like before:", { ...arrayLike });
    const removed = Array.prototype.splice.call(arrayLike, 1, 2, "x", "y", "z");
    console.log("After  Array.prototype.splice.call(obj, 1, 2, 'x','y','z'):", { ...arrayLike });
    console.log("Removed:", removed);
    console.log(
      "splice reads/writes integer-keyed properties and updates `length` accordingly.",
      "It does NOT require an actual Array."
    );
  };

  const demoSpliceRemoveByValue = () => {
    // Practical: remove the first occurrence of a specific value
    const removeFirst = <T,>(arr: T[], value: T): T[] => {
      const idx = arr.indexOf(value);
      if (idx !== -1) arr.splice(idx, 1);
      return arr;
    };

    const arr = [...testArrayWithDuplicates]; // [1,2,2,3,4,4,5]
    console.log("Before:", [...arr]);
    removeFirst(arr, 2);
    console.log("After removing first '2':", arr);
    console.log(
      "Pattern: indexOf + splice is the idiomatic way to remove by value.",
      "Time: O(n) for indexOf + O(n) for splice = O(n) overall."
    );
  };

  const demoSpliceRemoveAllByValue = () => {
    // Remove ALL occurrences of a value using splice in a reverse loop
    const arr = [...testArrayWithDuplicates]; // [1,2,2,3,4,4,5]
    console.log("Before:", [...arr]);
    // Iterate in reverse to avoid index-shift bugs
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] === 2) arr.splice(i, 1);
    }
    console.log("After removing all '2's:", arr);
    console.log(
      "Iterate in REVERSE when removing multiple elements to avoid index-shift corruption.",
      "Forward removal shifts subsequent indices, causing skips."
    );
  };

  const demoSpliceRotateArray = () => {
    // Rotate array left by N positions using splice + push
    const arr = [...testArray]; // [1,2,3,4,5]
    const n = 2;
    console.log(`Before (rotate left by ${n}):`, [...arr]);
    arr.push(...arr.splice(0, n)); // remove first n, append to end
    console.log("After rotation:", arr);
    // [3, 4, 5, 1, 2]
    console.log(
      `arr.push(...arr.splice(0, ${n})) rotates the array left by ${n} positions.`,
      "For rightward rotation: arr.unshift(...arr.splice(-n))."
    );
  };

  const demoSpliceChunking = () => {
    // Split an array into chunks of a given size using splice
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const chunkSize = 3;
    const chunks: number[][] = [];
    const copy = [...arr];
    while (copy.length > 0) {
      chunks.push(copy.splice(0, chunkSize));
    }
    console.log(`Original (length ${arr.length}):`, arr);
    console.log(`Chunks of ${chunkSize}:`, chunks);
    console.log(
      "splice(0, chunkSize) is an elegant way to destructively consume an array into chunks.",
      "Each call shifts the first `chunkSize` elements out — O(n²) total, avoid for large arrays."
    );
  };

  const demoSpliceVsFilter = () => {
    // splice (in-place) vs filter (non-mutating) for element removal
    const original = [1, 2, 3, 4, 5, 6];

    // splice — mutating, O(n) per removal
    const arrSplice = [...original];
    for (let i = arrSplice.length - 1; i >= 0; i--) {
      if (arrSplice[i] % 2 === 0) arrSplice.splice(i, 1);
    }
    console.log("splice (remove evens, in-place):", arrSplice);

    // filter — non-mutating, O(n) single pass
    const arrFilter = original.filter((x) => x % 2 !== 0);
    console.log("filter (remove evens, new array):", arrFilter);

    console.log(
      "filter is faster (O(n) single pass) and non-mutating — prefer it over splice for removals.",
      "Use splice only when you need in-place mutation and the same array reference."
    );
  };

  const demoSpliceLengthChanges = () => {
    // Unlike fill/copyWithin/reverse, splice CAN change the array's length
    const arr = [...testArray]; // length 5
    console.log("Before:", [...arr], "length:", arr.length);

    arr.splice(1, 1);           // remove 1 → length 4
    console.log("After splice(1,1):", arr, "length:", arr.length);

    arr.splice(1, 0, 10, 20, 30); // insert 3 → length 7
    console.log("After splice(1,0,10,20,30):", arr, "length:", arr.length);

    console.log(
      "splice is the ONLY built-in mutating Array method that can change the length.",
      "fill/copyWithin/reverse/sort are all length-preserving."
    );
  };

  return (
    <Grid
      label="splice"
      descp={[
        "Changes the contents of an array by removing/replacing existing elements and/or inserting new ones in place.",
        "Mutates the original array and returns a new array containing the removed elements.",
        "Signature: arr.splice(start, deleteCount?, ...items).",
        "Negative start is normalised: start + length (clamped to 0).",
        "If start > length, it is clamped to length (appends). If deleteCount is omitted, removes to end.",
        "Unlike fill/copyWithin/reverse, splice CAN change the length of the array.",
        "ES2023 introduced arr.toSpliced() as the non-mutating counterpart.",
      ]}
      link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice"
    >
      <Buttons>
        {/* Normal */}
        <Button handleClick={demoSpliceDeleteOnly} label="splice(start, deleteCount) — delete only" />
        <Button handleClick={demoSpliceInsertOnly} label="splice(start, 0, ...items) — insert only" />
        <Button handleClick={demoSpliceReplace} label="splice(start, n, ...items) — replace" />
        <Button handleClick={demoSpliceDeleteToEnd} label="splice(start) — delete to end" />
        <Button handleClick={demoSpliceReturnValue} label="Returns array of removed elements" />
        <Button handleClick={demoSpliceWithObjects} label="Splice with object elements" />
        <Button handleClick={demoSpliceAppend} label="Append via splice (like push)" />
        <Button handleClick={demoSplicePrepend} label="Prepend via splice (like unshift)" />

        {/* Edge */}
        <Button handleClick={demoSpliceNegativeStart} label="Negative start index" />
        <Button handleClick={demoSpliceNegativeStartBeyondLength} label="start < -length — clamped to 0" />
        <Button handleClick={demoSpliceStartBeyondLength} label="start > length — clamped to length" />
        <Button handleClick={demoSpliceDeleteCountZero} label="deleteCount = 0 — no removal" />
        <Button handleClick={demoSpliceDeleteCountNegative} label="Negative deleteCount — treated as 0" />
        <Button handleClick={demoSpliceDeleteCountExceedsLength} label="deleteCount > available — removes to end" />
        <Button handleClick={demoSpliceEmptyArray} label="Empty array" />
        <Button handleClick={demoSpliceSparseArray} label="Sparse array — holes treated as elements" />
        <Button handleClick={demoSpliceWithUndefined} label="Array with undefined values" />
        <Button handleClick={demoSpliceWithNull} label="Array with null values" />
        <Button handleClick={demoSpliceClearArray} label="Clear array in place — splice(0)" />

        {/* Advanced / Nerd */}
        <Button handleClick={demoSpliceVsToSpliced} label="toSpliced() — ES2023 non-mutating" />
        <Button handleClick={demoSpliceArrayLike} label="Array-like object via .call()" />
        <Button handleClick={demoSpliceRemoveByValue} label="Remove first occurrence by value" />
        <Button handleClick={demoSpliceRemoveAllByValue} label="Remove all occurrences (reverse loop)" />
        <Button handleClick={demoSpliceRotateArray} label="Rotate array left by N (splice + push)" />
        <Button handleClick={demoSpliceChunking} label="Chunk array into groups (splice loop)" />
        <Button handleClick={demoSpliceVsFilter} label="splice vs filter — perf & mutation" />
        <Button handleClick={demoSpliceLengthChanges} label="splice changes array length (unique!)" />
      </Buttons>
    </Grid>
  );
};
