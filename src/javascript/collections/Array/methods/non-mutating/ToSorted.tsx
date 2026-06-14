import { Button, Buttons, Grid } from "src/components";

export const JSToSorted = () => {
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

  const demoToSortedBasic = () => {
    const arr = [3, 1, 4, 1, 5, 9, 2, 6];
    console.log("Before:", arr);
    const sorted = arr.toSorted();
    console.log("toSorted():", sorted);
    console.log("Original:", arr); // unchanged
    console.log(
      "toSorted() with no comparator sorts lexicographically (as strings) — same default as sort().",
      "The original array is NOT mutated."
    );
  };

  const demoToSortedNumeric = () => {
    const arr = [10, 2, 30, 4, 5];
    console.log("Before:", arr);
    const sorted = arr.toSorted((a, b) => a - b);
    console.log("toSorted((a,b) => a-b):", sorted);
    console.log("Original:", arr);
    console.log(
      "Numeric ascending sort: comparator returns negative when a < b.",
      "For descending: (a,b) => b - a."
    );
  };

  const demoToSortedDescending = () => {
    const arr = [3, 1, 4, 1, 5, 9];
    console.log("Before:", arr);
    const sorted = arr.toSorted((a, b) => b - a);
    console.log("toSorted((a,b) => b-a):", sorted);
    console.log("Original:", arr);
  };

  const demoToSortedVsSort = () => {
    const arr = [3, 1, 4, 1, 5];
    console.log("Original:", [...arr]);

    // sort() — mutating
    const copy1 = [...arr];
    const mutated = copy1.sort((a, b) => a - b);
    console.log("After sort() (mutating), arr:", copy1);
    console.log("sort() returns same ref:", mutated === copy1); // true

    // toSorted() — non-mutating
    const copy2 = [...arr];
    const fresh = copy2.toSorted((a, b) => a - b);
    console.log("After toSorted(), original:", copy2); // unchanged
    console.log("toSorted() returns same ref:", fresh === copy2); // false
    console.log(
      "sort() mutates in-place; toSorted() always creates a new array.",
      "Prefer toSorted() in functional pipelines and React/Redux state updates."
    );
  };

  const demoToSortedStrings = () => {
    const arr = ["banana", "apple", "cherry", "date"];
    console.log("Before:", arr);
    const sorted = arr.toSorted();
    console.log("toSorted() (default):", sorted);
    console.log("Original:", arr);
    console.log("Default (no comparator) sorts lexicographically — correct for strings.");
  };

  const demoToSortedObjects = () => {
    const arr = testArrayOfObjects.map((o) => ({ ...o }));
    console.log("Before:", JSON.stringify(arr));
    const sorted = arr.toSorted((a, b) => a.age - b.age);
    console.log("toSorted by age (asc):", JSON.stringify(sorted));
    console.log("Original:", JSON.stringify(arr));
    console.log("toSorted returns a new array of the same object references (shallow).");
  };

  const demoToSortedChaining = () => {
    const result = [3, 1, 4, 1, 5, 9, 2, 6]
      .toSorted((a, b) => a - b)
      .filter((x) => x > 3)
      .map((x) => x * 10);
    console.log("toSorted().filter().map():", result);
    console.log(
      "toSorted() fits naturally in chains — does not mutate the source, so later steps are safe."
    );
  };

  // Edge Cases

  const demoToSortedEmptyArray = () => {
    const arr: number[] = [];
    const sorted = arr.toSorted();
    console.log("toSorted on []:", sorted);
    console.log("Is new array:", sorted !== arr); // true
    console.log("toSorted on an empty array returns a new empty array.");
  };

  const demoToSortedSingleElement = () => {
    const arr = [42];
    const sorted = arr.toSorted();
    console.log("toSorted on [42]:", sorted);
    console.log("Is new array:", sorted !== arr); // true
  };

  const demoToSortedSparseArray = () => {
    const arr = [3, , 1, , 2]; // sparse
    console.log("Sparse before:", [...arr]);
    const sorted = arr.toSorted((a, b) => (a as number) - (b as number));
    console.log("toSorted():", sorted);
    console.log(
      "toSorted() moves sparse holes to the END of the result (same as sort()).",
      "Holes are treated as undefined and sorted to the tail."
    );
  };

  const demoToSortedWithUndefined = () => {
    console.log("Before:", testArrayWithUndefined);
    const sorted = testArrayWithUndefined.toSorted();
    console.log("toSorted():", sorted);
    console.log(
      "undefined values are always sorted to the END without invoking the comparator.",
      "This is the same behaviour as sort()."
    );
  };

  const demoToSortedWithDuplicates = () => {
    console.log("Before:", testArrayWithDuplicates);
    const sorted = testArrayWithDuplicates.toSorted((a, b) => a - b);
    console.log("toSorted (asc):", sorted);
    console.log("Duplicate values maintain a stable relative order (ES2019+ guaranteed stable sort).");
  };

  const demoToSortedStability = () => {
    // ES2019 mandates stable sort — equal elements retain original order
    const items = [
      { name: "b", priority: 1 },
      { name: "a", priority: 1 },
      { name: "c", priority: 2 },
    ];
    const sorted = items.toSorted((a, b) => a.priority - b.priority);
    console.log("Original:", JSON.stringify(items));
    console.log("Sorted by priority (stable):", JSON.stringify(sorted));
    console.log(
      "Items with equal priority retain their original relative order.",
      "Stable sort is guaranteed by the ECMAScript spec since ES2019."
    );
  };

  const demoToSortedDefaultLexicographic = () => {
    // Default sort converts to strings — can surprise with numbers
    const arr = [10, 9, 100, 21];
    console.log("Before:", arr);
    console.log("toSorted() (default, lexicographic):", arr.toSorted());
    // [10, 100, 21, 9] — "100" < "21" lexicographically
    console.log("toSorted((a,b)=>a-b) (numeric):", arr.toSorted((a, b) => a - b));
    console.log(
      "GOTCHA: default sort is LEXICOGRAPHIC — [10,9,100] sorts as ['10','100','9'].",
      "Always pass a numeric comparator for number arrays."
    );
  };

  // Advanced / Nerd Cases

  const demoToSortedES2023Family = () => {
    const arr = [3, 1, 4, 1, 5];
    console.log("Original:", arr);
    console.log("toSorted() :", arr.toSorted((a, b) => a - b));
    console.log("toReversed():", arr.toReversed());
    console.log("toSpliced(1,2,99):", arr.toSpliced(1, 2, 99));
    console.log("with(2, 99):", arr.with(2, 99));
    console.log("Original is still:", arr);
    console.log(
      "toSorted is part of the ES2023 'Change Array by Copy' proposal.",
      "All four methods — toSorted, toReversed, toSpliced, with — are non-mutating."
    );
  };

  const demoToSortedMultiKey = () => {
    // Sort by multiple keys
    const people = [
      { name: "Charlie", age: 30 },
      { name: "Alice", age: 25 },
      { name: "Bob", age: 30 },
      { name: "Dave", age: 25 },
    ];
    const sorted = people.toSorted((a, b) => a.age - b.age || a.name.localeCompare(b.name));
    console.log("Sorted by age then name:", JSON.stringify(sorted));
    console.log(
      "Multi-key sort: primary key (age) first, fallback (name) when primary is equal.",
      "|| chains comparators cleanly."
    );
  };

  const demoToSortedLocale = () => {
    const words = ["éclair", "apple", "über", "banana", "ångström"];
    console.log("Before:", words);
    console.log("toSorted() (default):", words.toSorted());
    console.log(
      "toSorted(localeCompare):",
      words.toSorted((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }))
    );
    console.log(
      "Default sort is byte-order — accented characters may appear out of order.",
      "Use localeCompare for correct language-aware string sorting."
    );
  };

  const demoToSortedImmutableState = () => {
    // Practical: sort state immutably in React
    const state = { items: [3, 1, 4, 1, 5] };
    console.log("State before:", state.items);
    const newState = { ...state, items: state.items.toSorted((a, b) => a - b) };
    console.log("New state:", newState.items);
    console.log("Original state:", state.items); // unchanged
    console.log(
      "toSorted() is the idiomatic immutable sort in React/Redux.",
      "No need for [...state.items].sort() — toSorted() handles the copy internally."
    );
  };

  return (
    <Grid
      label="toSorted"
      descp={[
        "Returns a new array with elements sorted — the original is not modified.",
        "ES2023 non-mutating counterpart to sort() (part of the 'Change Array by Copy' proposal).",
        "Default (no comparator) sorts elements as strings lexicographically — pass a numeric comparator for numbers.",
        "undefined values and sparse holes are always moved to the end.",
        "Sort is guaranteed stable (ES2019+) — equal elements retain original relative order.",
        "Always returns a new array reference, even for empty or single-element arrays.",
      ]}
      link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted"
    >
      <Buttons>
        {/* Normal */}
        <Button handleClick={demoToSortedBasic} label="toSorted() — default lexicographic" />
        <Button handleClick={demoToSortedNumeric} label="Numeric ascending sort" />
        <Button handleClick={demoToSortedDescending} label="Numeric descending sort" />
        <Button handleClick={demoToSortedVsSort} label="toSorted() vs sort() — mutation" />
        <Button handleClick={demoToSortedStrings} label="Sort strings alphabetically" />
        <Button handleClick={demoToSortedObjects} label="Sort objects by property" />
        <Button handleClick={demoToSortedChaining} label="Method chaining without side effects" />

        {/* Edge */}
        <Button handleClick={demoToSortedEmptyArray} label="Empty array — new empty array" />
        <Button handleClick={demoToSortedSingleElement} label="Single-element array" />
        <Button handleClick={demoToSortedSparseArray} label="Sparse array — holes to end" />
        <Button handleClick={demoToSortedWithUndefined} label="undefined → sorted to end" />
        <Button handleClick={demoToSortedWithDuplicates} label="Duplicate values (stable sort)" />
        <Button handleClick={demoToSortedStability} label="Stable sort guarantee (ES2019+)" />
        <Button handleClick={demoToSortedDefaultLexicographic} label="GOTCHA: default sort is lexicographic" />

        {/* Advanced / Nerd */}
        <Button handleClick={demoToSortedES2023Family} label="ES2023 Change Array by Copy family" />
        <Button handleClick={demoToSortedMultiKey} label="Multi-key sort (age then name)" />
        <Button handleClick={demoToSortedLocale} label="Locale-aware sort (localeCompare)" />
        <Button handleClick={demoToSortedImmutableState} label="Immutable state sort (React/Redux)" />
      </Buttons>
    </Grid>
  );
};
