import { Button, Buttons, Grid } from "src/components";

export const JSAt = () => {
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

  const demoAtBasic = () => {
    console.log("Array:", testArray);
    console.log("at(0) :", testArray.at(0));  // 1
    console.log("at(2) :", testArray.at(2));  // 3
    console.log("at(4) :", testArray.at(4));  // 5
    console.log(
      "at(n) returns the element at index n — identical to arr[n] for positive indices.",
      "The key advantage is support for negative indices."
    );
  };

  const demoAtNegativeIndex = () => {
    // The main reason at() exists — negative indexing
    console.log("Array:", testArray);
    console.log("at(-1):", testArray.at(-1)); // 5 — last element
    console.log("at(-2):", testArray.at(-2)); // 4
    console.log("at(-5):", testArray.at(-5)); // 1 — first element
    console.log(
      "Negative indices count from the end: at(-1) is the last element.",
      "Equivalent to arr[arr.length + index]."
    );
  };

  const demoAtVsBracketNotation = () => {
    console.log("Array:", testArray);
    // Positive — identical
    console.log("arr[2]  :", testArray[2]);      // 3
    console.log("arr.at(2):", testArray.at(2));   // 3

    // Negative — key difference
    console.log("arr[-1]  :", testArray[-1]);     // undefined (property lookup, not index)
    console.log("arr.at(-1):", testArray.at(-1)); // 5
    console.log(
      "arr[-1] does NOT work — JS treats it as a string property key '-1', not an index.",
      "arr.at(-1) is the correct and readable way to access the last element."
    );
  };

  const demoAtLastElement = () => {
    // Common use case: get the last element cleanly
    console.log("Array:", testArray);
    const last = testArray.at(-1);
    console.log("Last element (at(-1)):", last);

    // Old patterns for comparison
    const lastBracket = testArray[testArray.length - 1];
    console.log("Last element (arr[arr.length-1]):", lastBracket);
    console.log(
      "at(-1) is much cleaner than arr[arr.length - 1].",
      "No need to read arr.length or compute the index manually."
    );
  };

  const demoAtWithObjects = () => {
    console.log("Array:", JSON.stringify(testArrayOfObjects));
    console.log("at(0) :", JSON.stringify(testArrayOfObjects.at(0)));
    console.log("at(-1):", JSON.stringify(testArrayOfObjects.at(-1)));
    console.log("at() returns the object reference — not a copy.");
  };

  const demoAtReturnUndefined = () => {
    // Out-of-bounds returns undefined
    console.log("Array:", testArray, "length:", testArray.length);
    console.log("at(10) :", testArray.at(10));   // undefined
    console.log("at(-10):", testArray.at(-10));  // undefined
    console.log(
      "at() returns undefined for out-of-bounds indices (positive or negative).",
      "No error is thrown — same behaviour as bracket notation for positive out-of-bounds."
    );
  };

  // Edge Cases

  const demoAtEmptyArray = () => {
    const arr: number[] = [];
    console.log("at(0) on []:", arr.at(0));   // undefined
    console.log("at(-1) on []:", arr.at(-1)); // undefined
    console.log("All at() calls on an empty array return undefined.");
  };

  const demoAtSingleElement = () => {
    const arr = [42];
    console.log("Array:", arr);
    console.log("at(0) :", arr.at(0));  // 42
    console.log("at(-1):", arr.at(-1)); // 42 — same element
    console.log("at(1) :", arr.at(1));  // undefined
    console.log("For a single-element array, at(0) and at(-1) both return the same element.");
  };

  const demoAtWithNull = () => {
    console.log("Array:", testArrayWithNull);
    console.log("at(1):", testArrayWithNull.at(1)); // null
    console.log("null is a real element — at() returns it normally.");
  };

  const demoAtWithUndefined = () => {
    console.log("Array:", testArrayWithUndefined);
    console.log("at(1):", testArrayWithUndefined.at(1)); // undefined (real element)
    console.log(
      "Cannot distinguish real undefined values from out-of-bounds via at() alone.",
      "Use index < arr.length to confirm the index is valid before calling at()."
    );
  };

  const demoAtSparseArray = () => {
    const arr = [1, , 3, , 5]; // sparse
    console.log("Sparse array:", [...arr]);
    console.log("at(1):", arr.at(1)); // undefined (hole)
    console.log("at(-2):", arr.at(-2)); // undefined (hole at index 3)
    console.log(
      "at() returns undefined for sparse holes — same as bracket notation.",
      "Cannot distinguish holes from out-of-bounds or real undefined values via at() alone."
    );
  };

  const demoAtWithNaN = () => {
    console.log("Array:", nanArray);
    console.log("at(0):", nanArray.at(0)); // NaN
    console.log("NaN is a valid element — at() returns it.");
  };

  const demoAtIndexNormalisation = () => {
    // at() normalises: negative → index + length, then checks bounds
    const len = testArray.length; // 5
    const idx = -2;
    const normalised = len + idx; // 3
    console.log(`at(${idx}) on length-${len} array → normalised index: ${normalised}`);
    console.log("at(-2):", testArray.at(-2)); // 4 = testArray[3]
    console.log(`testArray[${normalised}]:`, testArray[normalised]); // 4 — identical
    console.log("Spec: index = index < 0 ? length + index : index; if (index < 0 || index >= length) return undefined.");
  };

  // Advanced / Nerd Cases

  const demoAtChaining = () => {
    // at() is useful when chaining operations that return arrays
    const result = [3, 1, 4, 1, 5, 9, 2, 6]
      .filter((x) => x > 3)
      .sort((a, b) => a - b)
      .at(-1); // last of sorted filtered array
    console.log("Last of filtered+sorted [>3]:", result); // 9
    console.log(
      "at() chains cleanly — no need to store in a variable just to access the last element.",
      "arr.filter(...).sort(...).at(-1) is far cleaner than computing .length - 1."
    );
  };

  const demoAtTypedArray = () => {
    // TypedArrays also support at()
    const typed = new Int32Array([10, 20, 30, 40, 50]);
    console.log("TypedArray:", [...typed]);
    console.log("at(1) :", typed.at(1));  // 20
    console.log("at(-1):", typed.at(-1)); // 50
    console.log("TypedArray.at() works identically — useful for reading buffer boundaries.");
  };

  const demoAtString = () => {
    // String also has .at() — same negative-index support
    const str = "Hello";
    console.log("String:", str);
    console.log("str.at(0) :", str.at(0));  // "H"
    console.log("str.at(-1):", str.at(-1)); // "o"
    console.log(
      "String.prototype.at() works the same way — negative indices supported.",
      "str.at(-1) is the clean replacement for str[str.length - 1]."
    );
  };

  const demoAtVsSliceAt = () => {
    // Old hack: arr.slice(-1)[0] to get last element
    console.log("Array:", testArray);
    const viaSlice = testArray.slice(-1)[0];
    const viaAt = testArray.at(-1);
    console.log("slice(-1)[0]:", viaSlice); // 5
    console.log("at(-1)      :", viaAt);    // 5
    console.log(
      "slice(-1)[0] was the pre-ES2022 idiom for the last element.",
      "at(-1) is shorter, more readable, and avoids allocating an intermediate single-element array."
    );
  };

  const demoAtArrayLike = () => {
    // at() can be called on array-like objects via Array.prototype.at.call()
    const arrayLike = { length: 3, 0: "x", 1: "y", 2: "z" };
    console.log("Array-like:", { ...arrayLike });
    console.log("at(0) :", Array.prototype.at.call(arrayLike, 0));  // "x"
    console.log("at(-1):", Array.prototype.at.call(arrayLike, -1)); // "z"
    console.log("at() reads integer-keyed properties and respects `length`.");
  };

  return (
    <Grid
      label="at"
      descp={[
        "Returns the element at the given index, accepting negative integers to count from the end.",
        "at(-1) is the idiomatic replacement for arr[arr.length - 1].",
        "Returns undefined for out-of-bounds indices — no error thrown.",
        "Non-mutating — does not modify the array.",
        "Signature: arr.at(index) — index is normalised: negative adds array length.",
        "ES2022 method — also available on String and TypedArray.",
      ]}
      link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at"
    >
      <Buttons>
        {/* Normal */}
        <Button handleClick={demoAtBasic} label="at(n) — positive index" />
        <Button handleClick={demoAtNegativeIndex} label="at(-n) — negative index" />
        <Button handleClick={demoAtVsBracketNotation} label="at() vs [] bracket notation" />
        <Button handleClick={demoAtLastElement} label="Last element — at(-1) vs [length-1]" />
        <Button handleClick={demoAtWithObjects} label="at() with object elements" />
        <Button handleClick={demoAtReturnUndefined} label="Out-of-bounds → undefined" />

        {/* Edge */}
        <Button handleClick={demoAtEmptyArray} label="Empty array → undefined" />
        <Button handleClick={demoAtSingleElement} label="Single-element — at(0) === at(-1)" />
        <Button handleClick={demoAtWithNull} label="null element" />
        <Button handleClick={demoAtWithUndefined} label="undefined element" />
        <Button handleClick={demoAtSparseArray} label="Sparse array — holes return undefined" />
        <Button handleClick={demoAtWithNaN} label="NaN element" />
        <Button handleClick={demoAtIndexNormalisation} label="Index normalisation (spec walkthrough)" />

        {/* Advanced / Nerd */}
        <Button handleClick={demoAtChaining} label="Method chaining — at(-1) at end of chain" />
        <Button handleClick={demoAtTypedArray} label="TypedArray.at (ES2022)" />
        <Button handleClick={demoAtString} label="String.at() — same negative-index support" />
        <Button handleClick={demoAtVsSliceAt} label="at(-1) vs slice(-1)[0] — old idiom" />
        <Button handleClick={demoAtArrayLike} label="Array-like object via .call()" />
      </Buttons>
    </Grid>
  );
};
