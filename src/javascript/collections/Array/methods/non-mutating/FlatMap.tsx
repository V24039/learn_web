import { Button, Buttons, Grid } from "src/components";

export const JSFlatMap = () => {
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

  const demoFlatMapBasic = () => {
    // flatMap(fn) — maps each element then flattens ONE level
    console.log("Array:", testArray);
    const result = testArray.flatMap((x) => [x, x * 2]);
    console.log("flatMap(x => [x, x*2]):", result);
    // [1,2, 2,4, 3,6, 4,8, 5,10]
    console.log(
      "flatMap maps then flattens ONE depth level.",
      "Equivalent to arr.map(fn).flat(1) — but more efficient (single pass)."
    );
  };

  const demoFlatMapVsMapFlat = () => {
    console.log("Array:", testArray);
    const withFlatMap = testArray.flatMap((x) => [x, x + 10]);
    const withMapFlat = testArray.map((x) => [x, x + 10]).flat();
    console.log("flatMap(x => [x, x+10]):", withFlatMap);
    console.log("map().flat()           :", withMapFlat);
    console.log("Equal?", JSON.stringify(withFlatMap) === JSON.stringify(withMapFlat)); // true
    console.log(
      "flatMap and map().flat(1) produce identical results.",
      "flatMap is preferred: it creates one fewer intermediate array."
    );
  };

  const demoFlatMapExpand = () => {
    // Expand each element into a range
    const ranges = [3, 2, 4];
    console.log("Array:", ranges);
    const result = ranges.flatMap((n) => Array.from({ length: n }, (_, i) => i + 1));
    console.log("flatMap(n => range(1,n)):", result);
    // [1,2,3, 1,2, 1,2,3,4]
    console.log("flatMap is ideal for expanding each element into multiple values.");
  };

  const demoFlatMapFilter = () => {
    // flatMap doubles as a combined map+filter by returning [] to exclude elements
    console.log("Array:", testArray);
    const result = testArray.flatMap((x) => (x % 2 === 0 ? [x * 10] : []));
    console.log("flatMap — keep even only, multiply by 10:", result);
    // [20, 40]
    console.log(
      "Return [] to skip an element — combines filter + map in one pass.",
      "More efficient than arr.filter(pred).map(fn) which creates an intermediate array."
    );
  };

  const demoFlatMapCallbackArgs = () => {
    // Callback receives (element, index, array)
    testArray.flatMap((element, index, array) => {
      console.log(`element=${element}, index=${index}, array.length=${array.length}`);
      return [element];
    });
    console.log("Callback signature: (element, index, array) — same as map().");
  };

  const demoFlatMapWithObjects = () => {
    console.log("Array:", JSON.stringify(testArrayOfObjects));
    const result = testArrayOfObjects.flatMap((o) => [o.name, o.age]);
    console.log("flatMap(o => [o.name, o.age]):", result);
    // ["Alice", 30, "Bob", 25, "Charlie", 35]
    console.log("flatMap can interleave multiple properties from each object.");
  };

  const demoFlatMapReturnValue = () => {
    // flatMap always returns a NEW array
    const result = testArray.flatMap((x) => [x]);
    console.log("Is new array:", result !== testArray); // true
    console.log("flatMap always returns a NEW flat array — the original is untouched.");
  };

  // Edge Cases──

  const demoFlatMapDepthAlwaysOne = () => {
    // flatMap ONLY flattens one level — deeper nesting is NOT flattened
    console.log("Array:", testArray);
    const result = testArray.flatMap((x) => [[x, x * 2]]);
    console.log("flatMap(x => [[x, x*2]]):", result);
    // [[1,2], [2,4], [3,6], [4,8], [5,10]] — inner arrays NOT flattened
    console.log(
      "flatMap only flattens ONE depth level.",
      "Return [[x]] and the inner array remains nested.",
      "Use arr.map(fn).flat(Infinity) for arbitrary depth flattening."
    );
  };

  const demoFlatMapReturnNonArray = () => {
    // Returning a non-array value is treated as a single element (no flattening)
    console.log("Array:", testArray);
    const result = testArray.flatMap((x) => x * 2);
    console.log("flatMap(x => x*2) — non-array return:", result);
    // [2, 4, 6, 8, 10] — primitives are treated as [primitive]
    console.log(
      "Returning a primitive from flatMap is equivalent to returning [primitive].",
      "The result is identical to .map(fn) when no arrays are returned."
    );
  };

  const demoFlatMapEmptyArray = () => {
    const arr: number[] = [];
    const result = arr.flatMap((x) => [x, x * 2]);
    console.log("flatMap on []:", result);
    console.log("flatMap on an empty array always returns [].");
  };

  const demoFlatMapSingleElement = () => {
    const arr = [5];
    console.log("Array:", arr);
    const result = arr.flatMap((x) => [x - 1, x, x + 1]);
    console.log("flatMap(x => [x-1, x, x+1]):", result);
    // [4, 5, 6]
  };

  const demoFlatMapWithNull = () => {
    console.log("Array:", testArrayWithNull);
    const result = testArrayWithNull.flatMap((x) => (x !== null ? [x] : []));
    console.log("flatMap — remove nulls:", result);
    console.log("Returning [] for null elements removes them — combined filter+map.");
  };

  const demoFlatMapWithUndefined = () => {
    console.log("Array:", testArrayWithUndefined);
    const result = testArrayWithUndefined.flatMap((x) =>
      x !== undefined ? [x * 2] : []
    );
    console.log("flatMap — skip undefined, double rest:", result);
  };

  const demoFlatMapSparseArray = () => {
    const arr = [1, , 3, , 5]; // sparse
    console.log("Sparse array:", [...arr]);
    const result = arr.flatMap((x) => [x, x]);
    console.log("flatMap(x => [x, x]):", result);
    console.log(
      "flatMap SKIPS sparse holes — they are not passed to the callback.",
      "This matches the behaviour of map(), forEach(), and filter()."
    );
  };

  const demoFlatMapWithNaN = () => {
    const arr = [NaN, 1, 2];
    console.log("Array:", arr);
    const result = arr.flatMap((x) => (Number.isNaN(x) ? [] : [x * 2]));
    console.log("flatMap — remove NaN, double rest:", result);
    console.log("flatMap can filter out NaN using Number.isNaN inside the predicate.");
  };

  // Advanced / Nerd Cases─

  const demoFlatMapTokenise = () => {
    // Practical: split sentences into words (tokenisation)
    const sentences = ["Hello world", "foo bar baz", "one two"];
    console.log("Sentences:", sentences);
    const words = sentences.flatMap((s) => s.split(" "));
    console.log("Words:", words);
    // ["Hello","world","foo","bar","baz","one","two"]
    console.log(
      "sentences.flatMap(s => s.split(' ')) is the cleanest way to tokenise.",
      "map + flat would work too, but flatMap avoids the intermediate nested array."
    );
  };

  const demoFlatMapDuplicate = () => {
    // Duplicate each element — [1,2,3] → [1,1,2,2,3,3]
    console.log("Array:", testArray);
    const result = testArray.flatMap((x) => [x, x]);
    console.log("flatMap(x => [x, x]):", result);
    console.log("Doubling each element with flatMap — elegant and allocation-minimal.");
  };

  const demoFlatMapInsertBetween = () => {
    // Insert a separator between every element (like Array join but as an array)
    console.log("Array:", testArray);
    const result = testArray.flatMap((x, i, arr) =>
      i < arr.length - 1 ? [x, 0] : [x]
    );
    console.log("flatMap — insert 0 between each element:", result);
    // [1,0, 2,0, 3,0, 4,0, 5]
    console.log(
      "Interspersing separators: return [element, separator] for all but the last.",
      "Used in rendering React lists with dividers — flatMap is perfect here."
    );
  };

  const demoFlatMapTransposeRows = () => {
    // Flatten a table of rows into a list of {row, col, value} entries
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const entries = matrix.flatMap((row, rowIdx) =>
      row.map((val, colIdx) => ({ row: rowIdx, col: colIdx, val }))
    );
    console.log("Matrix:", matrix);
    console.log("Flattened entries:", entries);
    console.log(
      "flatMap(row => row.map(...)) is the idiomatic way to flatten a 2D array into objects."
    );
  };

  const demoFlatMapWithThisArg = () => {
    // flatMap accepts thisArg as second argument (non-arrow callback needed)
    const multiplier = { factor: 3 };
    const result = testArray.flatMap(function (this: { factor: number }, x) {
      return [x * this.factor];
    }, multiplier);
    console.log("flatMap(x => [x * factor], {factor:3}):", result);
    console.log(
      "flatMap accepts an optional thisArg — passed as `this` in a non-arrow callback.",
      "Rarely used in modern code (closures are simpler), but part of the spec."
    );
  };

  const demoFlatMapConditionExpand = () => {
    // Practical: expand promotions conditionally
    const cart = [
      { item: "coffee", qty: 1 },
      { item: "mug", qty: 2 },
    ];
    const lineItems = cart.flatMap((entry) =>
      Array.from({ length: entry.qty }, () => entry.item)
    );
    console.log("Cart:", JSON.stringify(cart));
    console.log("Line items:", lineItems);
    // ["coffee", "mug", "mug"]
    console.log(
      "flatMap is great for expanding quantity-based entries into individual line items.",
      "Pattern used in order processing, billing, and UI list rendering."
    );
  };

  return (
    <Grid
      label="flatMap"
      descp={[
        "Maps each element using a callback, then flattens the result ONE level deep.",
        "Returns a new array — the original is never mutated.",
        "Equivalent to arr.map(fn).flat(1) but more efficient — single pass, one fewer array.",
        "Returning [] from the callback removes an element (combined filter + map).",
        "Only flattens ONE level — deeper nested arrays remain nested.",
        "Skips sparse holes — they are not passed to the callback.",
        "Signature: arr.flatMap(callbackFn, thisArg?)  — callbackFn(element, index, array).",
      ]}
      link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap"
    >
      <Buttons>
        {/* Normal */}
        <Button handleClick={demoFlatMapBasic} label="flatMap — basic expand" />
        <Button handleClick={demoFlatMapVsMapFlat} label="flatMap vs map().flat() — identical" />
        <Button handleClick={demoFlatMapExpand} label="Expand each element into a range" />
        <Button handleClick={demoFlatMapFilter} label="Return [] to filter elements (map+filter)" />
        <Button handleClick={demoFlatMapCallbackArgs} label="Callback args (element, index, array)" />
        <Button handleClick={demoFlatMapWithObjects} label="flatMap with object elements" />
        <Button handleClick={demoFlatMapReturnValue} label="Returns a new array" />

        {/* Edge */}
        <Button handleClick={demoFlatMapDepthAlwaysOne} label="Only flattens ONE level" />
        <Button handleClick={demoFlatMapReturnNonArray} label="Non-array return → treated as [value]" />
        <Button handleClick={demoFlatMapEmptyArray} label="Empty array → []" />
        <Button handleClick={demoFlatMapSingleElement} label="Single-element array" />
        <Button handleClick={demoFlatMapWithNull} label="Remove null via [] return" />
        <Button handleClick={demoFlatMapWithUndefined} label="Skip undefined values" />
        <Button handleClick={demoFlatMapSparseArray} label="Sparse array — holes skipped" />
        <Button handleClick={demoFlatMapWithNaN} label="Filter out NaN values" />

        {/* Advanced / Nerd */}
        <Button handleClick={demoFlatMapTokenise} label="Tokenise sentences into words" />
        <Button handleClick={demoFlatMapDuplicate} label="Duplicate each element (x => [x, x])" />
        <Button handleClick={demoFlatMapInsertBetween} label="Insert separator between elements" />
        <Button handleClick={demoFlatMapTransposeRows} label="Flatten 2D matrix into entries" />
        <Button handleClick={demoFlatMapWithThisArg} label="thisArg second parameter" />
        <Button handleClick={demoFlatMapConditionExpand} label="Expand cart qty into line items" />
      </Buttons>
    </Grid>
  );
};
