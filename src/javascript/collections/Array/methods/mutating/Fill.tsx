import { Button, Buttons, Grid } from "src/components";

export const JSFill = () => {
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

  const demoFillBasic = () => {
    // fill(value) — fills every slot with value
    const arr = [...testArray]; // [1,2,3,4,5]
    console.log("Before:", [...arr]);
    arr.fill(0);
    console.log("After  arr.fill(0):", arr);
    // Result: [0, 0, 0, 0, 0]
    console.log("fill(0) overwrites every element with 0. Length stays 5.");
  };

  const demoFillWithStart = () => {
    // fill(value, start) — fills from `start` to end
    const arr = [...testArray]; // [1,2,3,4,5]
    console.log("Before:", [...arr]);
    arr.fill(9, 2);
    console.log("After  arr.fill(9, 2):", arr);
    // Result: [1, 2, 9, 9, 9]
    console.log("fill(9, 2) fills from index 2 to the end with 9.");
  };

  const demoFillWithStartEnd = () => {
    // fill(value, start, end) — fills [start, end) with value
    const arr = [...testArray]; // [1,2,3,4,5]
    console.log("Before:", [...arr]);
    arr.fill(7, 1, 4);
    console.log("After  arr.fill(7, 1, 4):", arr);
    // Result: [1, 7, 7, 7, 5]
    console.log("fill(7, 1, 4) fills indices 1, 2, 3 — end (4) is exclusive.");
  };

  const demoFillReturnValue = () => {
    // fill returns the same array reference (mutates in-place)
    const arr = [...testArray];
    const returned = arr.fill(0);
    console.log("fill returns the same array reference:", returned === arr);
    console.log("Returned:", returned);
    console.log(
      "Like copyWithin, fill mutates and returns `this` — not a new array."
    );
  };

  const demoFillWithString = () => {
    const arr = [...testArray.toString()];
    console.log("Before:", [...arr]);
    arr.fill("x");
    console.log("After  arr.fill('x'):", arr);
    console.log("fill accepts any value — strings, booleans, objects, etc.");
  };

  const demoFillWithBoolean = () => {
    const arr = new Array(5);
    console.log("Before (empty array):", [...arr]);
    arr.fill(true);
    console.log("After  arr.fill(true):", arr);
    console.log("Useful for initialising flag arrays: new Array(n).fill(false).");
  };

  // Edge Cases ────────────────────────────────────────────────────────────

  const demoFillNegativeStart = () => {
    // Negative start: normalised as start + length
    const arr = [...testArray]; // length = 5
    console.log("Before:", [...arr]);
    arr.fill(0, -2); // start = 5 + (-2) = 3 → fills indices [3, 4]
    console.log("After  arr.fill(0, -2):", arr);
    // Result: [1, 2, 3, 0, 0]
    console.log("Negative start: -2 → index 3 (5 + (-2)). Fills from index 3 onward.");
  };

  const demoFillNegativeEnd = () => {
    const arr = [...testArray];
    console.log("Before:", [...arr]);
    arr.fill(0, 1, -1); // end = 5 + (-1) = 4 → fills [1, 4)
    console.log("After  arr.fill(0, 1, -1):", arr);
    // Result: [1, 0, 0, 0, 5]
    console.log("Negative end: -1 → index 4. Fills indices 1, 2, 3.");
  };

  const demoFillAllNegative = () => {
    const arr = [...testArray];
    console.log("Before:", [...arr]);
    arr.fill(0, -3, -1); // start=-3→2, end=-1→4 → fills [2, 4)
    console.log("After  arr.fill(0, -3, -1):", arr);
    // Result: [1, 2, 0, 0, 5]
    console.log(
      "All-negative: start=2, end=4. Fills indices 2 and 3 with 0."
    );
  };

  const demoFillStartBeyondLength = () => {
    const arr = [...testArray];
    console.log("Before:", [...arr]);
    arr.fill(0, 10); // start ≥ length → nothing happens
    console.log("After  arr.fill(0, 10):", arr);
    console.log("start ≥ length → no-op. Array is unchanged.");
  };

  const demoFillStartGreaterThanEnd = () => {
    const arr = [...testArray];
    console.log("Before:", [...arr]);
    arr.fill(0, 4, 2); // start > end → empty range → no-op
    console.log("After  arr.fill(0, 4, 2):", arr);
    console.log("start > end produces an empty range — no mutation occurs.");
  };

  const demoFillEmptyArray = () => {
    const arr: number[] = [];
    console.log("Before (empty array):", arr);
    arr.fill(42);
    console.log("After  arr.fill(42):", arr);
    console.log("Filling an empty array is a no-op — nothing to overwrite.");
  };

  const demoFillSingleElement = () => {
    const arr = [99];
    console.log("Before:", [...arr]);
    arr.fill(0);
    console.log("After  arr.fill(0):", arr);
    console.log("Single-element array: fill replaces the one element.");
  };

  const demoFillWithUndefined = () => {
    const arr = [...testArrayWithUndefined];
    console.log("Before:", [...arr]);
    arr.fill(undefined as unknown as number, 1, 3);
    console.log("After  arr.fill(undefined, 1, 3):", arr);
    console.log(
      "fill(undefined) sets real `undefined` values — not holes (sparse slots)."
    );
  };

  const demoFillWithNull = () => {
    const arr = [...testArrayWithNull];
    console.log("Before:", [...arr]);
    arr.fill(null as unknown as number);
    console.log("After  arr.fill(null):", arr);
    console.log("null is a valid fill value — treated as an ordinary value.");
  };

  const demoFillWithNaN = () => {
    const arr = [...testArray];
    console.log("Before:", [...arr]);
    arr.fill(NaN);
    console.log("After  arr.fill(NaN):", arr);
    console.log("NaN is a valid fill value — it copies just like any primitive.");
  };

  const demoFillSparseArray = () => {
    const arr = [...sparseArray]; // [1, empty, 3]
    console.log("Before (sparse):", [...arr]);
    arr.fill(0);
    console.log("After  arr.fill(0):", arr);
    console.log(
      "fill overwrites sparse holes with the fill value — the hole becomes a real 0.",
      "Unlike copyWithin, fill CONVERTS holes to real elements."
    );
  };

  // Advanced / Nerd Cases

  const demoFillWithObjectReference = () => {
    // fill with an object sets EVERY slot to the SAME reference
    const arr = new Array(3).fill({ count: 0 });
    console.log("Before:", JSON.stringify(arr));
    arr[0].count = 99; // mutating one slot mutates ALL — same reference!
    console.log("After mutating arr[0].count = 99:", JSON.stringify(arr));
    console.log(
      "GOTCHA: fill({}) does NOT create a new object per slot.",
      "All slots point to the SAME object. Use Array.from({length:n}, ()=>({count:0})) instead."
    );
  };

  const demoFillSafeObjectPerSlot = () => {
    // Correct pattern: Array.from + factory function
    const arr = Array.from({ length: 3 }, () => ({ count: 0 }));
    console.log("Before:", JSON.stringify(arr));
    arr[0].count = 99;
    console.log("After mutating arr[0].count = 99:", JSON.stringify(arr));
    console.log(
      "Array.from with a mapping function creates a UNIQUE object per slot.",
      "This is the safe alternative to fill({}) for objects."
    );
  };

  const demoFillInitialiseMatrix = () => {
    // Create a 3x3 zero matrix with zero allocation in one expression
    const rows = 3;
    const cols = 3;
    const matrix = Array.from({ length: rows }, () => new Array(cols).fill(0));
    console.log("3×3 zero matrix:");
    matrix.forEach((row) => console.log(row));
    console.log(
      "Pattern: Array.from({length:rows}, () => new Array(cols).fill(0))",
      "Each row is an independent array — mutating one row does NOT affect others."
    );
  };

  const demoFillNewArrayPattern = () => {
    // The most common real-world use: create a pre-filled array of length N
    const n = 5;
    const zeros = new Array(n).fill(0);
    const trues = new Array(n).fill(true);
    const xs = new Array(n).fill("x");
    console.log(`new Array(${n}).fill(0):`, zeros);
    console.log(`new Array(${n}).fill(true):`, trues);
    console.log(`new Array(${n}).fill('x'):`, xs);
    console.log(
      "new Array(n).fill(v) is the idiomatic way to create a pre-filled array of length n.",
      "It is faster than Array.from({length:n}).map(()=>v) because it skips the mapper."
    );
  };

  const demoFillArrayLike = () => {
    // fill can be called on array-like objects via Array.prototype.fill.call()
    const arrayLike = { length: 4, 0: "a", 1: "b", 2: "c", 3: "d" };
    console.log("Array-like before:", { ...arrayLike });
    Array.prototype.fill.call(arrayLike, "z", 1, 3);
    console.log("After  Array.prototype.fill.call(obj, 'z', 1, 3):", {
      ...arrayLike,
    });
    // {0:"a", 1:"z", 2:"z", 3:"d"}
    console.log(
      "fill reads/writes integer-keyed properties and respects `length`.",
      "It does NOT require an actual Array."
    );
  };

  const demoFillTypedArray = () => {
    // TypedArrays have their own .fill() — same semantics, zero GC pressure
    const typed = new Int32Array([10, 20, 30, 40, 50]);
    console.log("TypedArray before:", [...typed]);
    typed.fill(99, 1, 4); // fills indices [1, 4) with 99
    console.log("After  typedArray.fill(99, 1, 4):", [...typed]);
    console.log(
      "TypedArray.fill is preferred for numeric buffers — operates on raw memory,",
      "avoids boxing, and is typically SIMD-optimised by the JS engine."
    );
  };

  const demoFillSpecNormalisationSteps = () => {
    // Walk through the ECMA-262 spec normalisation algorithm manually
    const len = 5;
    const rawStart = -8; // out-of-negative-bounds
    const rawEnd = 10;   // out-of-positive-bounds

    const normalise = (idx: number, length: number) =>
      idx < 0 ? Math.max(length + idx, 0) : Math.min(idx, length);

    const start = normalise(rawStart, len); // max(5-8, 0) = max(-3, 0) = 0
    const end = normalise(rawEnd, len);     // min(10, 5) = 5

    console.log(
      `Spec normalisation for fill(0, ${rawStart}, ${rawEnd}) on length-${len} array:`
    );
    console.log(`  start: ${rawStart} → ${start}`);
    console.log(`  end  : ${rawEnd} → ${end}`);
    console.log(`  slots filled: ${end - start}`);

    const arr = [...testArray];
    arr.fill(0, rawStart, rawEnd);
    console.log("Result:", arr);
    console.log(
      "Understanding spec normalisation lets you predict fill behaviour for any",
      "combination of out-of-bounds indices — the same rules as slice/copyWithin."
    );
  };

  const demoFillVsMap = () => {
    const n = 5;

    // fill — O(n), zero allocation for primitives
    console.time("fill");
    const a = new Array(n).fill(0);
    console.timeEnd("fill");
    console.log("fill result:", a);

    // map — O(n) but creates a new array + invokes a callback per element
    console.time("map");
    const b = Array(n)
      .fill(0)
      .map(() => 0);
    console.timeEnd("map");
    console.log("map result:", b);

    console.log(
      "For primitive fill values, Array.fill is faster than .map(() => value)",
      "because it avoids per-element callback invocations and extra allocations."
    );
  };

  return (
    <Grid
      label="fill"
      descp={[
        "Fills all or a portion of an array with a static value and returns the mutated array.",
        "Mutates the original array in place — no new array is created.",
        "Signature: arr.fill(value, start = 0, end = arr.length).",
        "Negative indices are normalised: index + length (clamped to [0, length]).",
        "The end index is exclusive — fill writes to [start, end).",
        "fill with an object value sets EVERY slot to the SAME reference — not a per-slot copy.",
        "Can be called on array-like objects and TypedArrays via Array.prototype.fill.call().",
      ]}
      link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill"
    >
      <Buttons>
        {/* Normal */}
        <Button handleClick={demoFillBasic} label="fill(value) — fill entire array" />
        <Button handleClick={demoFillWithStart} label="fill(value, start)" />
        <Button handleClick={demoFillWithStartEnd} label="fill(value, start, end)" />
        <Button handleClick={demoFillReturnValue} label="Returns same array reference (mutates)" />
        <Button handleClick={demoFillWithString} label="Fill with a string value" />
        <Button handleClick={demoFillWithBoolean} label="Fill with boolean (flag array)" />

        {/* Edge */}
        <Button handleClick={demoFillNegativeStart} label="Negative start index" />
        <Button handleClick={demoFillNegativeEnd} label="Negative end index" />
        <Button handleClick={demoFillAllNegative} label="All-negative indices" />
        <Button handleClick={demoFillStartBeyondLength} label="start ≥ length — no-op" />
        <Button handleClick={demoFillStartGreaterThanEnd} label="start > end — empty range, no-op" />
        <Button handleClick={demoFillEmptyArray} label="Empty array — no-op" />
        <Button handleClick={demoFillSingleElement} label="Single-element array" />
        <Button handleClick={demoFillWithUndefined} label="Fill with undefined" />
        <Button handleClick={demoFillWithNull} label="Fill with null" />
        <Button handleClick={demoFillWithNaN} label="Fill with NaN" />
        <Button handleClick={demoFillSparseArray} label="Sparse array — holes become real values" />

        {/* Advanced / Nerd */}
        <Button handleClick={demoFillWithObjectReference} label="GOTCHA: fill(object) — shared reference" />
        <Button handleClick={demoFillSafeObjectPerSlot} label="Safe pattern: unique object per slot" />
        <Button handleClick={demoFillInitialiseMatrix} label="Initialise 2D matrix (zero allocation)" />
        <Button handleClick={demoFillNewArrayPattern} label="new Array(n).fill(v) — idiomatic init" />
        <Button handleClick={demoFillArrayLike} label="Array-like object via .call()" />
        <Button handleClick={demoFillTypedArray} label="TypedArray.fill (high-performance)" />
        <Button handleClick={demoFillSpecNormalisationSteps} label="Spec index normalisation walkthrough" />
        <Button handleClick={demoFillVsMap} label="fill vs .map(() => v) — perf comparison" />
      </Buttons>
    </Grid>
  );
};
