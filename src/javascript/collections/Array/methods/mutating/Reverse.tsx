import { Button, Buttons, Grid } from "src/components";

export const JSReverse = () => {
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

  const demoReverseBasic = () => {
    // reverse() — reverses the array in place
    const arr = [...testArray]; // [1,2,3,4,5]
    console.log("Before:", [...arr]);
    arr.reverse();
    console.log("After  arr.reverse():", arr);
    // Result: [5, 4, 3, 2, 1]
    console.log(
      "reverse() swaps elements symmetrically around the centre.",
      "The first element becomes the last, and the last becomes the first."
    );
  };

  const demoReverseReturnValue = () => {
    // reverse returns the same array reference (mutates in-place)
    const arr = [...testArray];
    const returned = arr.reverse();
    console.log("reverse returns the same array reference:", returned === arr);
    console.log("Returned:", returned);
    console.log(
      "Unlike toReversed(), reverse() mutates and returns `this` — not a new array."
    );
  };

  const demoReverseStrings = () => {
    const arr = ["apple", "banana", "cherry", "date"];
    console.log("Before:", [...arr]);
    arr.reverse();
    console.log("After  arr.reverse():", arr);
    console.log("reverse works on any element type — strings, booleans, objects, etc.");
  };

  const demoReverseObjects = () => {
    // Objects are reversed by reference — no deep copy occurs
    const arr = testArrayOfObjects.map((o) => ({ ...o }));
    console.log("Before:", JSON.stringify(arr));
    arr.reverse();
    console.log("After  arr.reverse():", JSON.stringify(arr));
    console.log(
      "Objects are moved by reference — the objects themselves are not cloned.",
      "Mutating arr[0] after reversal affects the same object that was at arr[2]."
    );
  };

  const demoReverseWithNull = () => {
    const arr = [...testArrayWithNull];
    console.log("Before:", [...arr]);
    arr.reverse();
    console.log("After  arr.reverse():", arr);
    console.log("null values are reversed normally — treated as ordinary values.");
  };

  const demoReverseWithUndefined = () => {
    const arr = [...testArrayWithUndefined];
    console.log("Before:", [...arr]);
    arr.reverse();
    console.log("After  arr.reverse():", arr);
    console.log("undefined values are reversed normally — they are real elements.");
  };

  const demoReverseWithNaN = () => {
    const arr = [...nanArray, 1, 2];
    console.log("Before:", [...arr]);
    arr.reverse();
    console.log("After  arr.reverse():", arr);
    console.log("NaN is a valid element and is reversed just like any other value.");
  };

  const demoReverseWithDuplicates = () => {
    const arr = [...testArrayWithDuplicates];
    console.log("Before:", [...arr]);
    arr.reverse();
    console.log("After  arr.reverse():", arr);
    console.log("Duplicate values are handled correctly — each index is swapped independently.");
  };

  // Edge Cases──

  const demoReverseEmptyArray = () => {
    const arr: number[] = [];
    console.log("Before (empty):", arr);
    arr.reverse();
    console.log("After  arr.reverse():", arr);
    console.log("Reversing an empty array is a no-op — nothing to swap.");
  };

  const demoReverseSingleElement = () => {
    const arr = [42];
    console.log("Before:", [...arr]);
    arr.reverse();
    console.log("After  arr.reverse():", arr);
    console.log("A single-element array is a no-op — nothing to swap.");
  };

  const demoReverseTwoElements = () => {
    const arr = [1, 2];
    console.log("Before:", [...arr]);
    arr.reverse();
    console.log("After  arr.reverse():", arr);
    console.log("Two elements: single swap — [1, 2] → [2, 1].");
  };

  const demoReversePalindrome = () => {
    const arr = [1, 2, 3, 2, 1]; // palindrome
    console.log("Before (palindrome):", [...arr]);
    arr.reverse();
    console.log("After  arr.reverse():", arr);
    console.log(
      "A palindromic array looks identical after reversal.",
      "This is a handy way to check if an array is a palindrome: arr.join() === [...arr].reverse().join()"
    );
  };

  const demoReverseSparseArray = () => {
    const arr = [1, , 3, , 5]; // sparse: indices 1 and 3 are holes
    console.log("Before (sparse):", [...arr]);
    arr.reverse();
    console.log("After  arr.reverse():", arr);
    console.log("Sparse holes are preserved and swapped symmetrically.");
    console.log("arr[1]:", arr[1]); // undefined (hole, now at index 3 after reverse)
    console.log(
      "Holes move to the mirrored position — they do NOT become `undefined` values.",
      "The resulting array is also sparse."
    );
  };

  const demoReverseDoubleReverse = () => {
    // Reversing twice returns the array to its original order
    const arr = [...testArray];
    console.log("Original:", [...arr]);
    arr.reverse();
    console.log("After 1st reverse:", [...arr]);
    arr.reverse();
    console.log("After 2nd reverse:", arr);
    console.log(
      "Reversing twice is an identity operation — the array returns to its original order.",
      "Useful as a sanity check or when temporarily needing reversed order."
    );
  };

  const demoReverseDoesNotSort = () => {
    // reverse ≠ sort — it only flips, it does not order by value
    const arr = [3, 1, 4, 1, 5, 9];
    console.log("Before:", [...arr]);
    arr.reverse();
    console.log("After  arr.reverse():", arr);
    console.log(
      "reverse does NOT sort — it only flips the index order.",
      "To get a descending sort: arr.sort((a, b) => b - a)."
    );
  };

  // Advanced / Nerd Cases─

  const demoToReversedNonMutating = () => {
    // toReversed() is the non-mutating ES2023 counterpart
    const arr = [...testArray];
    console.log("Original:", [...arr]);
    const reversed = arr.toReversed();
    console.log("toReversed() result:", reversed);
    console.log("Original after toReversed():", arr); // unchanged
    console.log(
      "toReversed() (ES2023) returns a NEW array — the original is not mutated.",
      "Prefer toReversed() in functional / immutable code; reverse() for in-place mutation."
    );
  };

  const demoReverseArrayLike = () => {
    // reverse can be called on array-like objects via Array.prototype.reverse.call()
    const arrayLike = { length: 4, 0: "a", 1: "b", 2: "c", 3: "d" };
    console.log("Array-like before:", { ...arrayLike });
    Array.prototype.reverse.call(arrayLike);
    console.log("After  Array.prototype.reverse.call(obj):", { ...arrayLike });
    // {0:"d", 1:"c", 2:"b", 3:"a"}
    console.log(
      "reverse reads/writes integer-keyed properties and respects `length`.",
      "It does NOT require an actual Array."
    );
  };

  const demoReverseTypedArray = () => {
    // TypedArrays have their own .reverse() — same semantics, no GC pressure
    const typed = new Int32Array([10, 20, 30, 40, 50]);
    console.log("TypedArray before:", [...typed]);
    typed.reverse();
    console.log("After  typedArray.reverse():", [...typed]);
    console.log(
      "TypedArray.reverse() operates on raw memory — no boxing, no heap allocation.",
      "Preferred for high-performance numeric buffers in audio/DSP/WASM pipelines."
    );
  };

  const demoReversePalindromeCheck = () => {
    const isPalindrome = (arr: unknown[]) =>
      arr.every((val, i) => val === arr[arr.length - 1 - i]);

    console.log("isPalindrome([1,2,3,2,1]):", isPalindrome([1, 2, 3, 2, 1])); // true
    console.log("isPalindrome([1,2,3,4,5]):", isPalindrome([1, 2, 3, 4, 5])); // false

    // Alternative using reverse (allocates a copy to avoid mutating original)
    const isPalindromeViaReverse = (arr: unknown[]) => {
      const copy = [...arr];
      return copy.join(",") === copy.reverse().join(",");
    };
    console.log("Via reverse ([1,2,3,2,1]):", isPalindromeViaReverse([1, 2, 3, 2, 1]));
    console.log("Via reverse ([1,2,3]):", isPalindromeViaReverse([1, 2, 3]));
    console.log(
      "Use the two-pointer approach (every) to check palindromes without allocation.",
      "The spread+reverse approach is simpler but allocates a copy."
    );
  };

  const demoReverseStringWords = () => {
    // Practical: reverse word order in a sentence
    const sentence = "The quick brown fox jumps over the lazy dog";
    const reversed = sentence.split(" ").reverse().join(" ");
    console.log("Original:", sentence);
    console.log("Words reversed:", reversed);
    console.log(
      "Classic interview pattern: split → reverse → join.",
      "Time: O(n), Space: O(n) for the words array."
    );
  };

  const demoReverseStackSimulation = () => {
    // Practical: reverse to simulate a queue from a stack-push pattern
    const stack: number[] = [];
    [1, 2, 3, 4, 5].forEach((v) => stack.push(v));
    console.log("Stack (LIFO order):", [...stack]);
    stack.reverse();
    console.log("After reverse (FIFO order):", stack);
    console.log(
      "Reversing a stack gives FIFO processing order without needing a separate queue.",
      "Useful when you must push in one order but process in the opposite order."
    );
  };

  const demoReverseVsSort = () => {
    const arr = [3, 1, 4, 1, 5, 9, 2, 6];
    console.log("Original:", [...arr]);

    const sortedDesc = [...arr].sort((a, b) => b - a);
    console.log("sort((a,b) => b-a) — descending sort:", sortedDesc);

    const sortedAscThenReversed = [...arr].sort((a, b) => a - b).reverse();
    console.log("sort asc then reverse:", sortedAscThenReversed);

    console.log(
      "sort().reverse() is O(n log n) and gives the same result as sort(desc).",
      "They are equivalent for numeric arrays, but sort desc is clearer in intent."
    );
  };

  return (
    <Grid
      label="reverse"
      descp={[
        "Reverses the order of elements in an array in place and returns the mutated array.",
        "Mutates the original array — the first element becomes the last, and vice versa.",
        "Signature: arr.reverse() — takes no arguments.",
        "Returns the same array reference (not a new array).",
        "Sparse holes are preserved and swapped to their mirrored positions.",
        "Can be called on array-like objects and TypedArrays via Array.prototype.reverse.call().",
        "ES2023 introduced arr.toReversed() as the non-mutating counterpart.",
      ]}
      link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse"
    >
      <Buttons>
        {/* Normal */}
        <Button handleClick={demoReverseBasic} label="reverse() — basic reversal" />
        <Button handleClick={demoReverseReturnValue} label="Returns same array reference (mutates)" />
        <Button handleClick={demoReverseStrings} label="Reverse array of strings" />
        <Button handleClick={demoReverseObjects} label="Reverse array of objects (by reference)" />
        <Button handleClick={demoReverseWithNull} label="Array with null values" />
        <Button handleClick={demoReverseWithUndefined} label="Array with undefined values" />
        <Button handleClick={demoReverseWithNaN} label="NaN value reverses normally" />
        <Button handleClick={demoReverseWithDuplicates} label="Array with duplicates" />

        {/* Edge */}
        <Button handleClick={demoReverseEmptyArray} label="Empty array — no-op" />
        <Button handleClick={demoReverseSingleElement} label="Single-element array — no-op" />
        <Button handleClick={demoReverseTwoElements} label="Two-element array — single swap" />
        <Button handleClick={demoReversePalindrome} label="Palindromic array — unchanged" />
        <Button handleClick={demoReverseSparseArray} label="Sparse array — holes swap symmetrically" />
        <Button handleClick={demoReverseDoubleReverse} label="Double reverse — identity operation" />
        <Button handleClick={demoReverseDoesNotSort} label="reverse ≠ sort (only flips index order)" />

        {/* Advanced / Nerd */}
        <Button handleClick={demoToReversedNonMutating} label="toReversed() — ES2023 non-mutating" />
        <Button handleClick={demoReverseArrayLike} label="Array-like object via .call()" />
        <Button handleClick={demoReverseTypedArray} label="TypedArray.reverse (high-performance)" />
        <Button handleClick={demoReversePalindromeCheck} label="Palindrome check (two-pointer vs reverse)" />
        <Button handleClick={demoReverseStringWords} label="Reverse word order in a sentence" />
        <Button handleClick={demoReverseStackSimulation} label="Stack → queue order (LIFO to FIFO)" />
        <Button handleClick={demoReverseVsSort} label="reverse vs descending sort" />
      </Buttons>
    </Grid>
  );
};
