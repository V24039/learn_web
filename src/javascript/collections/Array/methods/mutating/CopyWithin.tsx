import { Button, Buttons, Grid } from "src/components";

export const JSCopyWithin = () => {
  const sparseArray = [1, , 3, , 5];
  const nanArray = [NaN];
  const testArray = [1, 2, 3, 4, 5];
  const testArrayWithUndefined = [1, undefined, 3, undefined, 5];
  const testArrayOfObjects = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
  ];
  const testArrayWithNull = [1, null, 3, null, 5];

  //#region Normal Cases

  const demoCopyWithinBasic = () => {
    // copyWithin(target) — copies from index 0 to the end, pastes at target
    const arr = [...testArray]; // [1,2,3,4,5]
    console.log("Before:", [...arr]);
    arr.copyWithin(2, 5, 7);
    console.log("After  arr.copyWithin(2):", arr);
    // Copies [1,2,3,4,5] starting at index 0, pastes at index 2
    // Result: [1, 2, 1, 2, 3]  — length stays 5, tail is truncated naturally
    console.log(
      "Copies [1,2,3] from index 0 and writes to index 2 onward.",
      "The array length never changes — extra elements are simply dropped.",
    );
  };

  const demoCopyWithinTargetAndStart = () => {
    // copyWithin(target, start) — copies from `start` to end, pastes at target
    const arr = [...testArray]; // [1,2,3,4,5]
    console.log("Before:", [...arr]);
    arr.copyWithin(0, 3);
    console.log("After  arr.copyWithin(0, 3):", arr);
    // Source slice = arr[3..end] = [4, 5]
    // Paste at index 0 -> [4, 5, 3, 4, 5]
    console.log("Copies elements starting from index 3 ([4,5]) to index 0.");
  };

  const demoCopyWithinTargetStartEnd = () => {
    // copyWithin(target, start, end) — copies [start, end) and pastes at target
    const arr = [...testArray]; // [1,2,3,4,5]
    console.log("Before:", [...arr]);
    arr.copyWithin(1, 3, 5);
    console.log("After  arr.copyWithin(1, 3, 5):", arr);
    // Source slice = arr[3..5) = [4, 5]
    // Paste at index 1 -> [1, 4, 5, 4, 5]
    console.log("Copies arr[3..5) = [4,5], pastes at index 1.");
  };

  const demoCopyWithinWithObjects = () => {
    // copyWithin copies references, not deep copies
    const arr = testArrayOfObjects.map((o) => ({ ...o }));
    console.log("Before:", JSON.stringify(arr));
    arr.copyWithin(2, 0);
    console.log("After  arr.copyWithin(0, 2):", JSON.stringify(arr));
    console.log(
      "Objects are copied by reference — mutating arr[0] now also affects the original arr[2].",
      "This is a shallow copy!",
    );

    console.log("Shallow copy example");
    arr[0].age = 100;
    console.log(
      "Final array after updating arr[0].age = 100",
      JSON.stringify(arr),
    );
  };

  const demoCopyWithinReturnValue = () => {
    const arr = [...testArray];
    const returned = arr.copyWithin(1, 3);
    console.log(
      "copyWithin returns the same array reference:",
      returned === arr,
    );
    console.log("Returned:", returned);
    // true — it mutates and returns `this`
    console.log(
      "Unlike slice/map, copyWithin returns the SAME array, not a new one.",
    );
  };

  //#endregion

  //#region Edge Cases

  const demoCopyWithinNegativeTarget = () => {
    // Negative indices are normalized: index + length
    const arr = [...testArray]; // length = 5
    console.log("Before:", [...arr]);
    arr.copyWithin(-2, 0); // target = 5 + (-2) = 3
    console.log("After  arr.copyWithin(-2):", arr);
    // Copies [1,2] (only 2 slots available from index 3) to indices [3,4]
    // Result: [1, 2, 3, 1, 2]
    console.log("Negative target: -2 -> index 3 (5 + (-2)).");
  };

  const demoCopyWithinNegativeStart = () => {
    const arr = [...testArray];
    console.log("Before:", [...arr]);
    arr.copyWithin(0, -2); // start = 5 + (-2) = 3 -> copies [4,5]
    console.log("After  arr.copyWithin(0, -2):", arr);
    // Result: [4, 5, 3, 4, 5]
    console.log("Negative start: -2 -> index 3. Source = [4, 5].");
  };

  const demoCopyWithinNegativeEnd = () => {
    const arr = [...testArray];
    console.log("Before:", [...arr]);
    arr.copyWithin(1, 3, -1); // end = 5 + (-1) = 4 -> copies arr[3..4) = [4]
    console.log("After  arr.copyWithin(1, 3, -1):", arr);
    // Result: [1, 4, 3, 4, 5]
    console.log("Negative end: -1 -> index 4. Source = arr[3..4) = [4].");
  };

  const demoCopyWithinAllNegative = () => {
    const arr = [...testArray];
    console.log("Before:", [...arr]);
    arr.copyWithin(-3, -2, -1);
    // target=-3->2, start=-2->3, end=-1->4  ->  copies arr[3..4)=[4], pastes at 2
    console.log("After  arr.copyWithin(-3, -2, -1):", arr);
    console.log(
      "All negative: target=2, start=3, end=4. Source=[4], paste at 2 -> [1,2,4,4,5].",
    );
  };

  const demoCopyWithinTargetBeyondLength = () => {
    const arr = [...testArray];
    console.log("Before:", [...arr]);
    arr.copyWithin(10, 0); // target ≥ length -> nothing happens
    console.log("After  arr.copyWithin(10):", arr);
    console.log(
      "If target ≥ length (or normalised target ≥ length), nothing is copied.",
    );
  };

  const demoCopyWithinTargetEqualsStart = () => {
    const arr = [...testArray];
    console.log("Before:", [...arr]);
    arr.copyWithin(2, 2); // target === start -> no net change
    console.log("After  arr.copyWithin(2, 2):", arr);
    console.log(
      "When target === start, you paste onto the exact region you copied from — array is unchanged.",
    );
  };

  const demoCopyWithinEmptyRange = () => {
    const arr = [...testArray];
    console.log("Before:", [...arr]);
    arr.copyWithin(0, 3, 2); // start > end -> empty slice -> nothing copies
    console.log("After  arr.copyWithin(0, 3, 2):", arr);
    console.log("start > end produces an empty slice — no mutation occurs.");
  };

  const demoCopyWithinSparseArray = () => {
    console.log("Before (sparse):", [...sparseArray]);
    sparseArray.copyWithin(0, 3); // copies [empty, 5] to index 0
    console.log("After  sparseArray.copyWithin(0, 3):", sparseArray);
    console.log(
      "copyWithin copies empty slots as-is — the hole at index 3 becomes a hole at index 0.",
      "Result: [empty, 5, 3, empty, 5]",
    );
    console.log("sparseArray[0]:", sparseArray[0]); // undefined (hole)
  };

  const demoCopyWithinWithUndefined = () => {
    const arr = [...testArrayWithUndefined];
    console.log("Before:", [...arr]);
    arr.copyWithin(0, 3);
    console.log("After  arr.copyWithin(0, 3):", arr);
    console.log(
      "undefined values are real elements — they copy normally unlike sparse holes.",
    );
  };

  const demoCopyWithinWithNull = () => {
    const arr = [...testArrayWithNull];
    console.log("Before:", [...arr]);
    arr.copyWithin(0, 3);
    console.log("After  arr.copyWithin(0, 3):", arr);
    console.log("null values copy fine — they are treated as ordinary values.");
  };

  const demoCopyWithinSingleElement = () => {
    const arr = [42];
    console.log("Before:", [...arr]);
    arr.copyWithin(0, 0);
    console.log("After  arr.copyWithin(0):", arr);
    console.log("Single-element array copies to itself — no visible change.");
  };

  const demoCopyWithinNaNValue = () => {
    const arr = [...nanArray, 1, 2];
    console.log("Before:", [...arr]);
    arr.copyWithin(1, 0, 1); // copy [NaN] to index 1
    console.log("After  arr.copyWithin(1, 0, 1):", arr);
    console.log("NaN is a valid value and copies just like any other element.");
  };
  //#endregion

  //#region Advanced Cases

  const demoCopyWithinOverlappingForward = () => {
    // When source and destination overlap and target < start, copy is safe
    // because JS snapshots the source first before writing
    console.log("Before:", [...testArray]);
    testArray.copyWithin(1, 2, 4); // source = [3,4], paste at 1
    console.log("After  testArray.copyWithin(1, 2, 4):", testArray);
    // Result: [1, 3, 4, 4, 5]
    console.log(
      "Overlapping (target < start): source [3,4] is snapshotted before paste.",
      "No corruption — the spec requires a pre-copy snapshot.",
    );
  };

  const demoCopyWithinOverlappingBackward = () => {
    // When target > start, the copy direction matters for overlap correctness.
    // The spec handles this by copying in reverse when target > start to prevent overwrite corruption.
    console.log("Before:", [...testArray]);
    testArray.copyWithin(2, 1, 4); // source=[2,3,4], paste at 2 (overlapping range [2,3,4])
    console.log("After  testArray.copyWithin(2, 1, 4):", testArray);
    // Result: [1, 2, 2, 3, 4]
    console.log(
      "Overlapping (target > start): spec copies in correct order — no corruption.",
      "Internally handled by the engine; you always get the correct 'pre-write snapshot' result.",
    );
  };

  const demoCopyWithinArrayLike = () => {
    // copyWithin can be called on array-like objects via Array.prototype.copyWithin.call()
    const arrayLike = { length: 5, 0: "a", 1: "b", 2: "c", 3: "d", 4: "e" };
    console.log("Array-like before:", { ...arrayLike });
    Array.prototype.copyWithin.call(arrayLike, 0, 3);
    console.log("After  Array.prototype.copyWithin.call(obj, 0, 3):", {
      ...arrayLike,
    });
    // {0:"d", 1:"e", 2:"c", 3:"d", 4:"e"}
    console.log(
      "copyWithin reads/writes integer-keyed properties and respects the `length` property.",
      "It does NOT require an actual Array.",
    );
  };

  const demoCopyWithinTypedArray = () => {
    // TypedArrays (Int32Array, etc.) have their own .copyWithin() — same semantics
    const typed = new Int32Array([10, 20, 30, 40, 50]);
    console.log("TypedArray before:", [...typed]);
    typed.copyWithin(0, 3); // copies [40,50] to index 0
    console.log("After  typedArray.copyWithin(0, 3):", [...typed]);
    console.log(
      "TypedArrays implement the same copyWithin spec — useful for high-performance buffer manipulation.",
    );
  };

  const demoCopyWithinCircularBufferShift = () => {
    // Practical: shift elements left by N without allocating a new array
    const buffer = [10, 20, 30, 40, 50];
    const shiftBy = 2;
    console.log("Buffer before shift:", [...buffer]);
    buffer.copyWithin(0, shiftBy); // [30,40,50,40,50]
    // Zero out the tail (simulate freed slots)
    buffer.fill(0, buffer.length - shiftBy);
    console.log(`After left-shift by ${shiftBy} (zero-fill tail):`, buffer);
    console.log(
      "O(n) left-shift with ZERO allocations — no spread, no slice, no new array.",
      "Ideal for ring-buffer implementations where allocation overhead matters.",
    );
  };

  const demoCopyWithinSelfOverwritePattern = () => {
    // Tile / repeat a pattern within the same array using copyWithin
    const arr = new Array(8).fill(0);
    arr[0] = 1;
    arr[1] = 2;
    arr[2] = 3;
    console.log("Seed:", [...arr]); // [1,2,3,0,0,0,0,0]
    // Double the pattern repeatedly: 3->6->can't fit cleanly, so do 3->6
    arr.copyWithin(3, 0, 3); // [1,2,3,1,2,3,0,0]
    arr.copyWithin(6, 0, 2); // [1,2,3,1,2,3,1,2]
    console.log("Tiled pattern [1,2,3] repeated:", arr);
    console.log(
      "Pattern tiling trick: seed a pattern at the start and copyWithin to tile it.",
      "Used in compression algorithms and WASM memory initialisation.",
    );
  };

  const demoCopyWithinVsSliceConcat = () => {
    const size = 1000000;

    console.log("--- Benchmark: copyWithin vs slice+concat ---");
    console.log(`Array size: ${size.toLocaleString()} elements`);
    console.log("Note: Modern JS engines heavily optimize slice(); results vary by engine.\n");

    // Test 1: copyWithin (in-place mutation)
    console.log("Test 1: copyWithin(0, 3) — mutates array, zero allocation");
    let totalTime = 0;
    for (let run = 0; run < 3; run++) {
      const arr = Array.from({ length: size }, (_, i) => i);
      const start = performance.now();
      arr.copyWithin(0, 3);
      const elapsed = performance.now() - start;
      totalTime += elapsed;
      console.log(`  Run ${run + 1}: ${elapsed.toFixed(2)}ms`);
    }
    const copyWithinAvg = totalTime / 3;
    console.log(`  Average: ${copyWithinAvg.toFixed(2)}ms\n`);

    // Test 2: slice + concat (allocates new array)
    console.log("Test 2: slice(3).concat(slice(0,3)) — allocates 2 arrays");
    totalTime = 0;
    for (let run = 0; run < 3; run++) {
      const arr = Array.from({ length: size }, (_, i) => i);
      const start = performance.now();
      const result = arr.slice(3).concat(arr.slice(0, 3));
      const elapsed = performance.now() - start;
      totalTime += elapsed;
      console.log(`  Run ${run + 1}: ${elapsed.toFixed(2)}ms`);
    }
    const sliceAvg = totalTime / 3;
    console.log(`  Average: ${sliceAvg.toFixed(2)}ms\n`);

    // Analysis
    const ratio = sliceAvg / copyWithinAvg;
    console.log("Analysis:");
    console.log(`  copyWithin: ${copyWithinAvg.toFixed(2)}ms (mutates in-place)`);
    console.log(`  slice+concat: ${sliceAvg.toFixed(2)}ms (allocates)`);
    console.log(
      `  Ratio: ${ratio.toFixed(2)}x ${ratio > 1 ? "(slice+concat slower)" : "(slice+concat faster)"}`,
    );
    console.log("\n💡 Key insight:");
    if (ratio > 1) {
      console.log(
        "  copyWithin is faster: allocation overhead is significant for large arrays.",
      );
      console.log("Use copyWithin in hot loops (game engines, DSP, real-time graphics).");
    } else {
      console.log(
        "slice+concat is faster: modern engines optimize slice aggressively.",
      );
      console.log("However, copyWithin uses less memory (no allocation).");
    }
  };

  const demoCopyWithinSpecNormalisationSteps = () => {
    // Walk through the ECMA-262 spec normalisation algorithm manually
    const len = 5;
    const rawTarget = -7; // out of negative bounds
    const rawStart = 3;
    const rawEnd = 10; // out of positive bounds

    const normalise = (idx: number, length: number) =>
      idx < 0 ? Math.max(length + idx, 0) : Math.min(idx, length);

    const target = normalise(rawTarget, len); // max(5-7,0) = max(-2,0) = 0
    const start = normalise(rawStart, len); // min(3,5) = 3
    const end = normalise(rawEnd, len); // min(10,5) = 5

    console.log(
      `Spec normalisation for copyWithin(${rawTarget}, ${rawStart}, ${rawEnd}) on length-${len} array:`,
    );
    console.log(`  target: ${rawTarget} -> ${target}`);
    console.log(`  start : ${rawStart} -> ${start}`);
    console.log(`  end   : ${rawEnd} -> ${end}`);
    console.log(
      `  count : min(end - start, len - target) = min(${end - start}, ${len - target}) = ${Math.min(end - start, len - target)}`,
    );

    const arr = [...testArray];
    arr.copyWithin(rawTarget, rawStart, rawEnd);
    console.log("Result:", arr);
    console.log(
      "Understanding spec normalisation lets you predict behaviour for any combination of out-of-bounds indices.",
    );
  };
  //#endregion

  return (
    <Grid
      label="copyWithin"
      descp={[
        "Signature: arr.copyWithin(target, start = 0, end = arr.length).",
        "Shallow-copies a portion of the array to another location within the same array and returns it without modifying its length.",
        "Mutates the original array in place, no new array is created. This makes it ideal for zero-allocation circular-buffer tricks.",
        "Because undefined becomes 0 when converted to an integer, omitting the start parameter has the same effect as passing 0",
        "For arr.copyWithin(target, start = N, end = N+1), the method will copy elements from index n to index N (since end is exclusive). The element at index N+1 is not included in the copy operation.",
        "Negative indices are normalised: index + length (clamped to [0, length]).",
        "The source region is snapshotted before writing, overlapping regions are handled correctly.",
        "Copies empty slots in sparse arrays as holes (not as undefined).",
        "Can be called on array-like objects and TypedArrays via Array.prototype.copyWithin.call().",
      ]}
      link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin"
    >
      <Buttons>
        {/* Normal */}
        <Button
          handleClick={demoCopyWithinBasic}
          label="copyWithin(target)"
        />
        <Button
          handleClick={demoCopyWithinTargetAndStart}
          label="copyWithin(target, start)"
        />
        <Button
          handleClick={demoCopyWithinTargetStartEnd}
          label="copyWithin(target, start, end)"
        />
        <Button
          handleClick={demoCopyWithinWithObjects}
          label="Shallow copy of object references"
        />
        <Button
          handleClick={demoCopyWithinReturnValue}
          label="Returns same array reference (mutates)"
        />

        {/* Edge */}
        <Button
          handleClick={demoCopyWithinNegativeTarget}
          label="Negative target index"
        />
        <Button
          handleClick={demoCopyWithinNegativeStart}
          label="Negative start index"
        />
        <Button
          handleClick={demoCopyWithinNegativeEnd}
          label="Negative end index"
        />
        <Button
          handleClick={demoCopyWithinAllNegative}
          label="All-negative indices"
        />
        <Button
          handleClick={demoCopyWithinTargetBeyondLength}
          label="Target ≥ length -> no-op"
        />
        <Button
          handleClick={demoCopyWithinTargetEqualsStart}
          label="Target === start -> no-op"
        />
        <Button
          handleClick={demoCopyWithinEmptyRange}
          label="start > end -> empty slice, no-op"
        />
        <Button
          handleClick={demoCopyWithinSparseArray}
          label="Sparse array -> holes copy as holes"
        />
        <Button
          handleClick={demoCopyWithinWithUndefined}
          label="Array with undefined values"
        />
        <Button
          handleClick={demoCopyWithinWithNull}
          label="Array with null values"
        />
        <Button
          handleClick={demoCopyWithinSingleElement}
          label="Single-element array"
        />
        <Button
          handleClick={demoCopyWithinNaNValue}
          label="NaN value copies normally"
        />

        {/* Advanced / Nerd */}
        <Button
          handleClick={demoCopyWithinOverlappingForward}
          label="Overlapping regions -> target < start"
        />
        <Button
          handleClick={demoCopyWithinOverlappingBackward}
          label="Overlapping regions -> target > start"
        />
        <Button
          handleClick={demoCopyWithinArrayLike}
          label="Array-like object via .call()"
        />
        <Button
          handleClick={demoCopyWithinTypedArray}
          label="TypedArray.copyWithin (high-performance)"
        />
        <Button
          handleClick={demoCopyWithinCircularBufferShift}
          label="Zero-alloc left-shift (ring buffer trick)"
        />
        <Button
          handleClick={demoCopyWithinSelfOverwritePattern}
          label="Pattern tiling (WASM / compression)"
        />
        <Button
          handleClick={demoCopyWithinVsSliceConcat}
          label="copyWithin vs slice+concat (perf)"
        />
        <Button
          handleClick={demoCopyWithinSpecNormalisationSteps}
          label="Spec index normalisation walkthrough"
        />
      </Buttons>
    </Grid>
  );
};
