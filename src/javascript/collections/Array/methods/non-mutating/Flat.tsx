import { Button, Buttons, Grid } from "src/components";

export const JSFlat = () => {
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

  const demoFlatBasic = () => {
    // flat() with no argument — flattens ONE level by default
    const nested = [[1, 2], [3, 4], [5]];
    console.log("Before:", nested);
    const result = nested.flat();
    console.log("flat():", result);
    // [1, 2, 3, 4, 5]
    console.log(
      "flat() with no argument defaults to depth=1 — flattens one level.",
      "Returns a new array; the original is not mutated."
    );
  };

  const demoFlatDepth1 = () => {
    const nested = [[1, [2]], [3, [4, [5]]]];
    console.log("Before:", JSON.stringify(nested));
    const result = nested.flat(1);
    console.log("flat(1):", JSON.stringify(result));
    // [1, [2], 3, [4, [5]]]
    console.log("flat(1) only removes ONE level of nesting — inner arrays remain.");
  };

  const demoFlatDepth2 = () => {
    const nested = [[1, [2]], [3, [4, [5]]]];
    console.log("Before:", JSON.stringify(nested));
    const result = nested.flat(2);
    console.log("flat(2):", JSON.stringify(result));
    // [1, 2, 3, 4, [5]]
    console.log("flat(2) removes two levels — the [5] at depth 3 remains nested.");
  };

  const demoFlatInfinity = () => {
    const deepNested = [1, [2, [3, [4, [5]]]]];
    console.log("Before:", JSON.stringify(deepNested));
    const result = deepNested.flat(Infinity);
    console.log("flat(Infinity):", result);
    // [1, 2, 3, 4, 5]
    console.log(
      "flat(Infinity) completely flattens any depth of nesting.",
      "Use when depth is unknown or arbitrarily deep."
    );
  };

  const demoFlatReturnValue = () => {
    const nested = [[1, 2], [3, 4]];
    const result = nested.flat();
    console.log("flat() returns a new array:", (result as unknown) !== nested); // true
    console.log("Original unchanged:", nested);
    console.log("flat() is non-mutating — always returns a fresh array.");
  };

  const demoFlatVsFlatMap = () => {
    // flat(1) after map is equivalent to flatMap, but less efficient
    console.log("Array:", testArray);
    const withMapFlat = testArray.map((x) => [x, x * 2]).flat();
    const withFlatMap = testArray.flatMap((x) => [x, x * 2]);
    console.log("map().flat() :", withMapFlat);
    console.log("flatMap()    :", withFlatMap);
    console.log("Equal?", JSON.stringify(withMapFlat) === JSON.stringify(withFlatMap));
    console.log(
      "flatMap() is preferred over map().flat() — single pass, one fewer intermediate array.",
      "Use flat() when you already have a nested array and just need to flatten it."
    );
  };

  // Edge Cases

  const demoFlatRemovesHoles = () => {
    // flat() removes sparse holes — this is a notable difference from map/filter
    const sparse = [1, , 3, , 5];
    console.log("Sparse array:", [...sparse], "length:", sparse.length);
    const result = sparse.flat();
    console.log("flat():", result, "length:", result.length);
    // [1, 3, 5] — holes removed
    console.log(
      "flat() REMOVES sparse holes — it densifies the array.",
      "This is unlike copyWithin/reverse which preserve holes."
    );
  };

  const demoFlatAlreadyFlat = () => {
    console.log("Array:", testArray);
    const result = testArray.flat();
    console.log("flat() on already-flat array:", result);
    console.log("Is new array:", result !== testArray); // true — always a new copy
    console.log("flat() on a non-nested array still returns a NEW copy with no holes.");
  };

  const demoFlatEmptyArray = () => {
    const arr: number[] = [];
    const result = arr.flat();
    console.log("flat() on []:", result);
    console.log("Is new array:", result !== arr); // true
    console.log("flat() on an empty array returns a new empty array.");
  };

  const demoFlatWithNull = () => {
    const nested = [[1, null, 3], [null, 5]];
    console.log("Before:", JSON.stringify(nested));
    const result = nested.flat();
    console.log("flat():", result);
    console.log("null values are kept — flat() does not filter any values.");
  };

  const demoFlatWithUndefined = () => {
    const nested = [[1, undefined, 3], [undefined, 5]];
    console.log("Before:", nested);
    const result = nested.flat();
    console.log("flat():", result);
    console.log("undefined values are real elements and are preserved in the output.");
  };

  const demoFlatMixedDepths = () => {
    const arr = [1, [2, 3], [[4, 5]], [[[6]]]];
    console.log("Before:", JSON.stringify(arr));
    console.log("flat(1):", JSON.stringify(arr.flat(1)));
    console.log("flat(2):", JSON.stringify(arr.flat(2)));
    console.log("flat(3):", JSON.stringify(arr.flat(3)));
    console.log(
      "flat(n) with n >= max depth fully flattens.",
      "Elements at shallower depths are unaffected by a larger depth argument."
    );
  };

  const demoFlatHolesInNestedArrays = () => {
    const arr = [[1, , 3], [, 5]]; // holes inside nested arrays
    console.log("Before (nested sparse):", arr);
    const result = arr.flat();
    console.log("flat():", result);
    console.log(
      "Holes inside nested arrays are also removed when flat() encounters them.",
      "flat() densifies at every level it traverses."
    );
  };

  // Advanced / Nerd Cases

  const demoFlatDepth0 = () => {
    const nested = [[1, 2], [3, 4]];
    console.log("Before:", nested);
    const result = nested.flat(0);
    console.log("flat(0):", result);
    console.log("Is new array:", result !== nested); // true
    console.log(
      "flat(0) does NO flattening but still returns a new copy.",
      "Useful when you want a shallow clone that also removes top-level sparse holes."
    );
  };

  const demoFlatNegativeDepth = () => {
    // Negative depth is treated as 0
    const nested = [[1, 2], [3, 4]];
    console.log("Before:", nested);
    const result = nested.flat(-1);
    console.log("flat(-1):", result);
    console.log("Negative depth is treated as 0 — no flattening, but a new array is returned.");
  };

  const demoFlatRecursiveStructure = () => {
    // Build a deep structure and flatten fully
    const deep = [1, [2, [3, [4, [5, [6, [7]]]]]]];
    console.log("Deep structure:", JSON.stringify(deep));
    for (let d = 0; d <= 4; d++) {
      console.log(`flat(${d}):`, JSON.stringify(deep.flat(d)));
    }
    console.log("flat(Infinity):", deep.flat(Infinity));
  };

  const demoFlatPolyfill = () => {
    // Manual polyfill showing how flat(depth) works recursively
    const myFlat = (arr: unknown[], depth = 1): unknown[] =>
      depth > 0
        ? arr.reduce<unknown[]>(
            (acc, val) =>
              Array.isArray(val)
                ? acc.concat(myFlat(val, depth - 1))
                : acc.concat([val]),
            []
          )
        : arr.slice();

    const nested = [1, [2, [3, [4]]]];
    console.log("myFlat(arr, 1):", myFlat(nested, 1));
    console.log("myFlat(arr, 2):", myFlat(nested, 2));
    console.log("myFlat(arr, Infinity):", myFlat(nested, Infinity));
    console.log(
      "The polyfill reveals the recursive reduce pattern underlying flat().",
      "Understanding this helps reason about performance: O(n) per level traversed."
    );
  };

  const demoFlatVsReduce = () => {
    const nested = [[1, 2], [3, 4], [5]];
    console.log("Before:", nested);
    const viaFlat = nested.flat();
    const viaReduce = nested.reduce<number[]>((acc, arr) => acc.concat(arr), []);
    console.log("flat()  :", viaFlat);
    console.log("reduce():", viaReduce);
    console.log("Equal?", JSON.stringify(viaFlat) === JSON.stringify(viaReduce));
    console.log(
      "flat() is more readable than reduce+concat for one-level flattening.",
      "flat() is also faster for large arrays — native implementation avoids JS-level allocation in reduce."
    );
  };

  const demoFlatGraphTraversal = () => {
    // Practical: collect all children at next level in a tree
    const tree = {
      children: [
        { id: 1, children: [{ id: 3 }, { id: 4 }] },
        { id: 2, children: [{ id: 5 }] },
      ],
    };
    const nextLevel = tree.children.flatMap((node) => node.children);
    console.log("Next-level nodes:", JSON.stringify(nextLevel));
    console.log(
      "flatMap (flat + map) is the idiomatic BFS level-expansion pattern for trees.",
      "Each call to flatMap descends one level in the tree."
    );
  };

  return (
    <Grid
      label="flat"
      descp={[
        "Creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.",
        "Returns a new array — the original is never mutated.",
        "Default depth is 1. Use flat(Infinity) to fully flatten any depth.",
        "Removes sparse holes — the result is always a dense array.",
        "Signature: arr.flat(depth = 1).",
        "Use flatMap() instead of map().flat(1) for a single-level expand+flatten — it is more efficient.",
      ]}
      link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat"
    >
      <Buttons>
        {/* Normal */}
        <Button handleClick={demoFlatBasic} label="flat() — default depth 1" />
        <Button handleClick={demoFlatDepth1} label="flat(1) — one level" />
        <Button handleClick={demoFlatDepth2} label="flat(2) — two levels" />
        <Button handleClick={demoFlatInfinity} label="flat(Infinity) — full depth" />
        <Button handleClick={demoFlatReturnValue} label="Returns a new array (non-mutating)" />
        <Button handleClick={demoFlatVsFlatMap} label="flat vs flatMap — efficiency" />

        {/* Edge */}
        <Button handleClick={demoFlatRemovesHoles} label="Sparse holes are removed (densifies)" />
        <Button handleClick={demoFlatAlreadyFlat} label="Already-flat array — new copy returned" />
        <Button handleClick={demoFlatEmptyArray} label="Empty array → new empty array" />
        <Button handleClick={demoFlatWithNull} label="null values preserved" />
        <Button handleClick={demoFlatWithUndefined} label="undefined values preserved" />
        <Button handleClick={demoFlatMixedDepths} label="Mixed depth nesting" />
        <Button handleClick={demoFlatHolesInNestedArrays} label="Holes inside nested arrays removed" />

        {/* Advanced / Nerd */}
        <Button handleClick={demoFlatDepth0} label="flat(0) — no flatten, just clone" />
        <Button handleClick={demoFlatNegativeDepth} label="Negative depth — treated as 0" />
        <Button handleClick={demoFlatRecursiveStructure} label="Depth comparison on deep structure" />
        <Button handleClick={demoFlatPolyfill} label="Polyfill walkthrough (recursive reduce)" />
        <Button handleClick={demoFlatVsReduce} label="flat vs reduce+concat" />
        <Button handleClick={demoFlatGraphTraversal} label="BFS level expansion on tree" />
      </Buttons>
    </Grid>
  );
};
