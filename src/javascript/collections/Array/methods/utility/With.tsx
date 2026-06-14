import { Grid, Buttons, Button } from "src/components";

export const JSWith = () => {
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

  const demoWithBasic = () => {
    // with(index, value) — returns a new array with one element replaced
    console.log("Before:", testArray);
    const result = testArray.with(2, 99);
    console.log("with(2, 99):", result);
    console.log("Original:", testArray); // unchanged
    // [1, 2, 99, 4, 5]
    console.log(
      "with(index, value) returns a NEW array with the element at `index` replaced by `value`.",
      "The original array is never mutated."
    );
  };

  const demoWithNegativeIndex = () => {
    // Negative index: normalised as index + length
    console.log("Before:", testArray); // length 5
    const result = testArray.with(-1, 99); // -1 → 4
    console.log("with(-1, 99):", result);
    // [1, 2, 3, 4, 99]
    console.log("with(-2, 99):", testArray.with(-2, 99));
    // [1, 2, 3, 99, 5]
    console.log(
      "Negative index: -1 → last element, -2 → second-to-last, etc.",
      "Same normalisation as at(): index + length."
    );
  };

  const demoWithVsBracketAssignment = () => {
    const arr = [...testArray];
    console.log("Original:", [...arr]);

    // Mutating — bracket assignment
    const mutCopy = [...arr];
    mutCopy[2] = 99;
    console.log("arr[2] = 99 (mutating):", mutCopy);
    console.log("Original after mutation:", arr); // mutCopy changed, arr unchanged

    // Non-mutating — with()
    const fresh = arr.with(2, 99);
    console.log("arr.with(2, 99) (non-mutating):", fresh);
    console.log("Original after with():", arr); // still untouched
    console.log(
      "arr[i] = v mutates in-place. arr.with(i, v) returns a new array.",
      "Prefer with() in functional / immutable code."
    );
  };

  const demoWithChaining = () => {
    // with() enables clean immutable multi-step updates
    const result = testArray
      .with(0, 10)
      .with(4, 50)
      .map((x) => x * 2);
    console.log("Original:", testArray);
    console.log("with(0,10).with(4,50).map(x*2):", result);
    console.log(
      "with() is chainable — each call returns a new array, leaving the previous untouched.",
      "No intermediate state mutations."
    );
  };

  const demoWithObjects = () => {
    const arr = testArrayOfObjects.map((o) => ({ ...o }));
    console.log("Before:", JSON.stringify(arr));
    const newEntry = { name: "Dave", age: 28 };
    const result = arr.with(1, newEntry);
    console.log("with(1, {name:'Dave', age:28}):", JSON.stringify(result));
    console.log("Original:", JSON.stringify(arr)); // unchanged
    console.log("The new value is placed as-is — no deep copy.");
  };

  const demoWithReturnValue = () => {
    const result = testArray.with(0, 99);
    console.log("Is new array:", result !== testArray); // true
    console.log("with() always returns a new array reference.");
  };

  // Edge Cases

  const demoWithFirstElement = () => {
    console.log("Before:", testArray);
    console.log("with(0, 99)  :", testArray.with(0, 99));  // replace first
    console.log("with(-5, 99) :", testArray.with(-5, 99)); // same as with(0,99) for length 5
    console.log("Replacing the first element using positive or equivalent negative index.");
  };

  const demoWithLastElement = () => {
    console.log("Before:", testArray);
    console.log("with(4, 99)  :", testArray.with(4, 99));  // replace last
    console.log("with(-1, 99) :", testArray.with(-1, 99)); // same
    console.log("with(-1) is the idiomatic way to replace the last element without knowing length.");
  };

  const demoWithSingleElement = () => {
    const arr = [42];
    console.log("Before:", arr);
    const result = arr.with(0, 99);
    console.log("with(0, 99):", result);
    console.log("Is new array:", result !== arr); // true
  };

  const demoWithOutOfBounds = () => {
    // Out-of-bounds throws a RangeError (unlike at() which returns undefined)
    try {
      testArray.with(10, 99);
    } catch (e) {
      console.log("with(10, 99) throws:", (e as Error).message);
    }
    try {
      testArray.with(-10, 99);
    } catch (e) {
      console.log("with(-10, 99) throws:", (e as Error).message);
    }
    console.log(
      "IMPORTANT: with() throws RangeError for out-of-bounds indices.",
      "This differs from at() which returns undefined — validate before calling."
    );
  };

  const demoWithUndefinedValue = () => {
    console.log("Before:", testArray);
    const result = testArray.with(2, undefined!);
    console.log("with(2, undefined):", result);
    console.log("You can set a slot to undefined — it becomes a real undefined value, not a hole.");
  };

  const demoWithNullValue = () => {
    console.log("Before:", testArray);
    const result = testArray.with(2, null!);
    console.log("with(2, null):", result);
    console.log("null is a valid replacement value.");
  };

  const demoWithNaNValue = () => {
    console.log("Before:", testArray);
    const result = testArray.with(2, NaN);
    console.log("with(2, NaN):", result);
    console.log("NaN is a valid replacement value.");
  };

  const demoWithSparseArray = () => {
    const arr = [1, , 3, , 5]; // sparse
    console.log("Sparse array:", [...arr]);
    const result = arr.with(1, 99); // fill the hole at index 1
    console.log("with(1, 99):", result);
    console.log(
      "with() replaces the slot regardless of whether it was a hole or a real value.",
      "The resulting array is dense at the replaced position."
    );
  };

  // Advanced / Nerd Cases

  const demoWithES2023Family = () => {
    const arr = [3, 1, 4, 1, 5];
    console.log("Original:", arr);
    console.log("with(2, 99)      :", arr.with(2, 99));
    console.log("toSorted()       :", arr.toSorted((a, b) => a - b));
    console.log("toReversed()     :", arr.toReversed());
    console.log("toSpliced(1,2,0) :", arr.toSpliced(1, 2, 0));
    console.log("Original is still:", arr);
    console.log(
      "with() is the 4th member of the ES2023 'Change Array by Copy' family.",
      "All four — with, toSorted, toReversed, toSpliced — return new arrays."
    );
  };

  const demoWithImmutableStateUpdate = () => {
    // Practical: update an item in state immutably (React/Redux)
    const state = { items: ["apple", "banana", "cherry"] };
    console.log("State before:", state.items);
    const newState = { ...state, items: state.items.with(1, "blueberry") };
    console.log("New state:", newState.items);
    console.log("Original state:", state.items); // unchanged
    console.log(
      "with() is the cleanest way to replace one item in an array immutably.",
      "No spread needed: arr.with(i, v) vs [...arr.slice(0,i), v, ...arr.slice(i+1)]."
    );
  };

  const demoWithMultipleUpdates = () => {
    // Chain multiple with() calls for several updates
    const arr = ["a", "b", "c", "d", "e"];
    console.log("Original:", arr);
    const result = arr
      .with(0, "A")
      .with(2, "C")
      .with(-1, "E");
    console.log("with(0,'A').with(2,'C').with(-1,'E'):", result);
    console.log("Original:", arr); // unchanged
    console.log(
      "Each with() call returns a new array — chain them for multiple immutable updates.",
      "For many updates, Object.assign on a copy may be more efficient."
    );
  };

  const demoWithRecordUpdate = () => {
    // Practical: update a specific record in a list (like a DB row update)
    const users = [
      { id: 1, name: "Alice", active: true },
      { id: 2, name: "Bob",   active: true },
      { id: 3, name: "Carol", active: false },
    ];
    const targetId = 2;
    const idx = users.findIndex((u) => u.id === targetId);
    const updatedUsers = users.with(idx, { ...users[idx], active: false });
    console.log("Original:", JSON.stringify(users));
    console.log("Updated:", JSON.stringify(updatedUsers));
    console.log(
      "Pattern: findIndex + with() is the idiomatic immutable record update.",
      "No need for map — with() is O(n) for the copy but avoids iterating the mapper."
    );
  };

  const demoWithVsMap = () => {
    const arr = [1, 2, 3, 4, 5];
    console.log("Original:", arr);

    // with() — replace a single known index
    const viaWith = arr.with(2, 99);
    console.log("with(2, 99):", viaWith);

    // map() — iterate all, replace conditionally
    const viaMap = arr.map((x, i) => (i === 2 ? 99 : x));
    console.log("map (replace index 2):", viaMap);

    console.log("Equal?", JSON.stringify(viaWith) === JSON.stringify(viaMap));
    console.log(
      "with() is semantically clearer for single-index replacement.",
      "map() is needed when the replacement condition depends on the value, not just the index."
    );
  };

  return (
    <Grid
      label="with"
      descp={[
        "Returns a new array with the element at the given index replaced by the specified value.",
        "ES2023 non-mutating counterpart to arr[index] = value assignment.",
        "Part of the 'Change Array by Copy' proposal alongside toSorted, toReversed, toSpliced.",
        "Accepts negative indices — normalised as index + length (same as at()).",
        "Throws RangeError for out-of-bounds indices (unlike at() which returns undefined).",
        "Signature: arr.with(index, value).",
      ]}
      link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with"
    >
      <Buttons>
        {/* Normal */}
        <Button handleClick={demoWithBasic} label="with(index, value) — basic replacement" />
        <Button handleClick={demoWithNegativeIndex} label="Negative index" />
        <Button handleClick={demoWithVsBracketAssignment} label="with() vs arr[i] = v — mutation" />
        <Button handleClick={demoWithChaining} label="Method chaining (immutable updates)" />
        <Button handleClick={demoWithObjects} label="Replace an object element" />
        <Button handleClick={demoWithReturnValue} label="Always returns a new array" />

        {/* Edge */}
        <Button handleClick={demoWithFirstElement} label="Replace first element (with(0) / with(-n))" />
        <Button handleClick={demoWithLastElement} label="Replace last element (with(-1))" />
        <Button handleClick={demoWithSingleElement} label="Single-element array" />
        <Button handleClick={demoWithOutOfBounds} label="Out-of-bounds → RangeError" />
        <Button handleClick={demoWithUndefinedValue} label="Replace with undefined" />
        <Button handleClick={demoWithNullValue} label="Replace with null" />
        <Button handleClick={demoWithNaNValue} label="Replace with NaN" />
        <Button handleClick={demoWithSparseArray} label="Sparse array — replace a hole" />

        {/* Advanced / Nerd */}
        <Button handleClick={demoWithES2023Family} label="ES2023 Change Array by Copy family" />
        <Button handleClick={demoWithImmutableStateUpdate} label="Immutable state update (React/Redux)" />
        <Button handleClick={demoWithMultipleUpdates} label="Multiple chained with() calls" />
        <Button handleClick={demoWithRecordUpdate} label="Immutable record update (findIndex + with)" />
        <Button handleClick={demoWithVsMap} label="with() vs map() for single-index replace" />
      </Buttons>
    </Grid>
  );
};
