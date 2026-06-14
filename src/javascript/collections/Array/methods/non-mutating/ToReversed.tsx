import { Button, Buttons, Grid } from "src/components";

export const JSReversed = () => {
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

  const demoToReversedBasic = () => {
    // toReversed() — returns a NEW reversed array, original untouched
    console.log("Before:", testArray);
    const reversed = testArray.toReversed();
    console.log("toReversed():", reversed);
    console.log("Original after toReversed():", testArray); // unchanged
    // Result: [5, 4, 3, 2, 1]
    console.log(
      "toReversed() returns a NEW array — the original is never mutated.",
      "This is the key difference from reverse() which mutates in place."
    );
  };

  const demoToReversedVsReverse = () => {
    const arr = [...testArray];
    console.log("Original:", [...arr]);

    // reverse() — mutates
    const mutated = arr.reverse();
    console.log("After reverse() (mutating):", arr);
    console.log("reverse() returns same ref:", mutated === arr); // true

    // toReversed() — non-mutating
    const arr2 = [...testArray];
    const copy = arr2.toReversed();
    console.log("After toReversed() (non-mutating), original:", arr2);
    console.log("toReversed() returns same ref:", copy === arr2); // false
    console.log(
      "reverse() mutates + returns `this`. toReversed() creates a copy + returns it.",
      "Prefer toReversed() in functional / immutable pipelines."
    );
  };

  const demoToReversedChaining = () => {
    // toReversed() enables clean method chaining without side effects
    const result = testArray
      .toReversed()
      .map((x) => x * 2)
      .filter((x) => x > 4);
    console.log("Original:", testArray);
    console.log("toReversed().map(x*2).filter(x>4):", result);
    console.log(
      "toReversed() fits naturally in method chains — it does not break the pipeline.",
      "reverse() would mutate the original mid-chain, making subsequent steps unpredictable."
    );
  };

  const demoToReversedWithStrings = () => {
    const arr = ["apple", "banana", "cherry"];
    console.log("Before:", arr);
    const reversed = arr.toReversed();
    console.log("toReversed():", reversed);
    console.log("Original:", arr); // unchanged
  };

  const demoToReversedWithObjects = () => {
    const arr = testArrayOfObjects.map((o) => ({ ...o }));
    console.log("Before:", JSON.stringify(arr));
    const reversed = arr.toReversed();
    console.log("toReversed():", JSON.stringify(reversed));
    console.log("Original:", JSON.stringify(arr)); // unchanged
    console.log(
      "toReversed creates a SHALLOW copy — objects are not deep-cloned.",
      "reversed[0] and arr[2] reference the SAME object."
    );
  };

  // Edge Cases──

  const demoToReversedEmptyArray = () => {
    const arr: number[] = [];
    console.log("Before (empty):", arr);
    const reversed = arr.toReversed();
    console.log("toReversed():", reversed);
    console.log("Is new array:", reversed !== arr); // true
    console.log("toReversed on an empty array returns a NEW empty array.");
  };

  const demoToReversedSingleElement = () => {
    const arr = [42];
    console.log("Before:", arr);
    const reversed = arr.toReversed();
    console.log("toReversed():", reversed);
    console.log("Is new array:", reversed !== arr); // true — always a fresh copy
  };

  const demoToReversedWithNull = () => {
    console.log("Before:", testArrayWithNull);
    const reversed = testArrayWithNull.toReversed();
    console.log("toReversed():", reversed);
    console.log("null values are reversed normally.");
  };

  const demoToReversedWithUndefined = () => {
    console.log("Before:", testArrayWithUndefined);
    const reversed = testArrayWithUndefined.toReversed();
    console.log("toReversed():", reversed);
    console.log("undefined values are reversed normally — they are real elements.");
  };

  const demoToReversedWithNaN = () => {
    const arr = [...nanArray, 1, 2];
    console.log("Before:", arr);
    const reversed = arr.toReversed();
    console.log("toReversed():", reversed);
    console.log("NaN is treated as an ordinary value.");
  };

  const demoToReversedSparseArray = () => {
    const arr = [1, , 3, , 5]; // sparse
    console.log("Before (sparse):", [...arr]);
    const reversed = arr.toReversed();
    console.log("toReversed():", reversed);
    console.log(
      "Sparse holes are preserved in the reversed copy.",
      "Unlike map/filter, toReversed does NOT densify the array."
    );
  };

  const demoToReversedPalindrome = () => {
    const arr = [1, 2, 3, 2, 1];
    console.log("Palindrome:", arr);
    const reversed = arr.toReversed();
    console.log("toReversed():", reversed);
    const isPalindrome = arr.every((v, i) => v === reversed[i]);
    console.log("Is palindrome:", isPalindrome);
    console.log(
      "toReversed makes palindrome checking clean and non-destructive.",
      "arr.every((v,i) => v === arr.toReversed()[i]) — elegant one-liner."
    );
  };

  const demoToReversedDoubleReverse = () => {
    console.log("Original:", testArray);
    const result = testArray.toReversed().toReversed();
    console.log("toReversed().toReversed():", result);
    console.log("Same values?", JSON.stringify(result) === JSON.stringify(testArray)); // true
    console.log("Same reference?", result === testArray); // false — always new arrays
    console.log(
      "Double toReversed() restores the original order but creates two new arrays.",
      "Unlike double reverse() (in-place), this allocates — avoid in hot paths."
    );
  };

  // Advanced / Nerd Cases─

  const demoToReversedES2023 = () => {
    // toReversed is part of the 'Change Array by Copy' ES2023 proposal
    console.log("ES2023 Change Array by Copy methods:");
    console.log("  arr.toReversed() — non-mutating reverse()");
    console.log("  arr.toSorted()   — non-mutating sort()");
    console.log("  arr.toSpliced()  — non-mutating splice()");
    console.log("  arr.with(i, v)   — non-mutating arr[i] = v");
    const arr = [3, 1, 4, 1, 5];
    console.log("Original:", arr);
    console.log("toReversed:", arr.toReversed());
    console.log("toSorted  :", arr.toSorted((a, b) => a - b));
    console.log("with(2,99):", arr.with(2, 99));
    console.log("Original is still:", arr); // unchanged
  };

  const demoToReversedImmutableUpdate = () => {
    // Practical: update state immutably in React / Redux
    const state = { items: [1, 2, 3, 4, 5] };
    console.log("State before:", state.items);
    // ✗ Wrong — mutates state.items directly
    // state.items.reverse();

    // ✓ Correct — creates a new array, leaves state.items intact
    const newState = { ...state, items: state.items.toReversed() };
    console.log("New state items:", newState.items);
    console.log("Original state items:", state.items); // still [1,2,3,4,5]
    console.log(
      "toReversed() is the idiomatic way to reverse an array immutably in React/Redux state.",
      "Avoids the [...arr].reverse() pattern (spread + mutate) which is slightly more verbose."
    );
  };

  const demoToReversedVsSpreadReverse = () => {
    const arr = [...testArray];
    console.log("Original:", arr);

    // Old pattern: spread then mutate
    const spreadReversed = [...arr].reverse();
    console.log("[...arr].reverse():", spreadReversed);
    console.log("Original after spread+reverse:", arr); // unchanged

    // New pattern: toReversed (ES2023)
    const toRev = arr.toReversed();
    console.log("arr.toReversed():", toRev);

    console.log(
      "Both produce the same result, but toReversed() is cleaner and avoids the spread.",
      "[...arr].reverse() was the pre-ES2023 idiom for non-mutating reversal."
    );
  };

  const demoToReversedWithTypedArray = () => {
    // TypedArrays also have toReversed() (ES2023)
    const typed = new Int32Array([10, 20, 30, 40, 50]);
    console.log("TypedArray before:", [...typed]);
    const reversed = typed.toReversed();
    console.log("toReversed():", [...reversed]);
    console.log("Original TypedArray:", [...typed]); // unchanged
    console.log(
      "TypedArray.toReversed() returns a NEW TypedArray of the same type.",
      "The original buffer is not touched."
    );
  };

  return (
    <Grid
      label="toReversed"
      descp={[
        "Returns a new array with elements in reversed order — the original is not modified.",
        "ES2023 non-mutating counterpart to reverse() (part of the 'Change Array by Copy' proposal).",
        "Always returns a new array reference, even for empty or single-element arrays.",
        "Creates a shallow copy — object elements are not deep-cloned.",
        "Sparse holes are preserved in the new reversed array.",
        "TypedArrays also support toReversed() and return a new TypedArray of the same type.",
      ]}
      link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed"
    >
      <Buttons>
        {/* Normal */}
        <Button handleClick={demoToReversedBasic} label="toReversed() — basic non-mutating" />
        <Button handleClick={demoToReversedVsReverse} label="toReversed() vs reverse() — mutation" />
        <Button handleClick={demoToReversedChaining} label="Method chaining without side effects" />
        <Button handleClick={demoToReversedWithStrings} label="Array of strings" />
        <Button handleClick={demoToReversedWithObjects} label="Shallow copy of objects" />

        {/* Edge */}
        <Button handleClick={demoToReversedEmptyArray} label="Empty array — new empty array" />
        <Button handleClick={demoToReversedSingleElement} label="Single-element array" />
        <Button handleClick={demoToReversedWithNull} label="Array with null values" />
        <Button handleClick={demoToReversedWithUndefined} label="Array with undefined values" />
        <Button handleClick={demoToReversedWithNaN} label="NaN value" />
        <Button handleClick={demoToReversedSparseArray} label="Sparse array — holes preserved" />
        <Button handleClick={demoToReversedPalindrome} label="Palindrome check (non-destructive)" />
        <Button handleClick={demoToReversedDoubleReverse} label="Double toReversed() — identity values" />

        {/* Advanced / Nerd */}
        <Button handleClick={demoToReversedES2023} label="ES2023 Change Array by Copy family" />
        <Button handleClick={demoToReversedImmutableUpdate} label="Immutable state update (React/Redux)" />
        <Button handleClick={demoToReversedVsSpreadReverse} label="toReversed vs [...arr].reverse() idiom" />
        <Button handleClick={demoToReversedWithTypedArray} label="TypedArray.toReversed (ES2023)" />
      </Buttons>
    </Grid>
  );
};
