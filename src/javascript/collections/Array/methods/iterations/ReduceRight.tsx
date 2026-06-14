import { Button, Buttons, Grid } from "src/components";

export const JSReduceRight = () => {
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

  // --- Normal Cases ---

  const demoReduceRight = () => {
    console.log("Input array:", testArray);
    console.log("Using reduceRight to sum all elements (right to left):");
    const result = testArray.reduceRight((accumulator, currentValue) => {
      console.log(`  acc: ${accumulator}, curr: ${currentValue}`);
      return accumulator + currentValue;
    }, 0);
    console.log("Sum:", result);
    console.log(
      "Note: reduceRight processes elements from right (index 4) to left (index 0)."
    );
  };

  const demoReduceRightVsReduce = () => {
    const arr = ["a", "b", "c", "d"];
    console.log("Input array:", arr);

    const reduceResult = arr.reduce((acc, val) => acc + val, "");
    const reduceRightResult = arr.reduceRight((acc, val) => acc + val, "");

    console.log("reduce()      (left→right):", reduceResult);      // "abcd"
    console.log("reduceRight() (right→left):", reduceRightResult); // "dcba"
    console.log("Key difference: reduceRight starts from the last element.");
  };

  const demoReduceRightWithObjects = () => {
    console.log("Array of objects:", testArrayOfObjects);
    console.log("Collecting names in reverse order using reduceRight:");
    const names = testArrayOfObjects.reduceRight((acc, obj) => {
      acc.push(obj.name);
      return acc;
    }, [] as string[]);
    console.log("Names (right to left):", names); // ["Charlie", "Bob", "Alice"]
  };

  const demoReduceRightNoInitialValue = () => {
    console.log("Input array:", testArray);
    console.log(
      "Without an initial value, the last element becomes the first accumulator:"
    );
    const result = testArray.reduceRight((acc, curr) => {
      console.log(`  acc: ${acc}, curr: ${curr}`);
      return acc + curr;
    });
    console.log("Result:", result); // 15
    console.log(
      "Starts at index 3 (second-to-last), with last element (5) as initial accumulator."
    );
  };

  // --- Edge Cases ---

  const demoReduceRightEmptyArray = () => {
    console.log("Calling reduceRight on [] with no initial value:");
    try {
      ([] as number[]).reduceRight((a, b) => a + b);
    } catch (error) {
      console.error("Caught expected TypeError:", error);
      console.log(
        "Fix: provide an initial value, e.g., [].reduceRight((a,b)=>a+b, 0)"
      );
    }
  };

  const demoReduceRightEmptyArrayWithInitial = () => {
    console.log("Calling reduceRight on [] with initial value 0:");
    const result = ([] as number[]).reduceRight((a, b) => a + b, 0);
    console.log("Result:", result); // 0 — callback never runs, initial value returned
    console.log(
      "When the array is empty and an initial value is given, it is returned immediately."
    );
  };

  const demoReduceRightSingleElement = () => {
    console.log("Calling reduceRight on [42] with no initial value:");
    const result = [42].reduceRight((acc, curr) => {
      console.log("This callback will NOT run!");
      return acc + curr;
    });
    console.log("Result:", result); // 42
    console.log(
      "Single-element array with no initial value returns that element without running the callback."
    );
  };

  const demoReduceRightSparseArray = () => {
    console.log("Sparse array:", sparseArray); // [1, empty, 3]
    console.log("reduceRight skips empty slots in sparse arrays:");
    const result = sparseArray.reduceRight((acc, curr, idx) => {
      console.log(`  index ${idx}: acc=${acc}, curr=${curr}`);
      return acc! + curr!;
    }, 0);
    console.log("Result:", result); // 4 — index 1 (empty) is skipped
    console.log("Index 1 was never visited.");
  };

  const demoReduceRightWithUndefined = () => {
    console.log("Array with undefined:", testArrayWithUndefined);
    console.log(
      "Unlike sparse arrays, undefined values ARE visited by reduceRight:"
    );
    const result = testArrayWithUndefined.reduceRight(
      (acc: (number | undefined)[], curr) => {
        acc.push(curr);
        return acc;
      },
      []
    );
    console.log("Collected right-to-left:", result);
  };

  const demoReduceRightWithNull = () => {
    console.log("Array with null:", testArrayWithNull);
    const sum = testArrayWithNull.reduceRight((acc, curr) => {
      return acc! + (curr ?? 0); // treat null as 0
    }, 0);
    console.log("Sum (treating null as 0):", sum); // 9
  };

  const demoReduceRightNaN = () => {
    console.log("NaN array:", nanArray);
    const result = nanArray.reduceRight((acc, curr) => acc + curr, 0);
    console.log("Result:", result); // NaN — 0 + NaN = NaN
    console.log("NaN propagates through arithmetic operations.");
  };

  // --- Advanced Cases ---

  const demoReduceRightFlattenNested = () => {
    const nested = [[1, 2], [3, 4], [5, 6]];
    console.log("Nested array:", nested);
    const flat = nested.reduceRight(
      (acc, curr) => acc.concat(curr),
      [] as number[]
    );
    console.log("Flattened right-to-left:", flat); // [5, 6, 3, 4, 1, 2]
    console.log(
      "Compare with reduce left-to-right which gives [1, 2, 3, 4, 5, 6]."
    );
  };

  const demoReduceRightComposeFunctions = () => {
    console.log("Function composition using reduceRight:");
    const double = (x: number) => x * 2;
    const addTen = (x: number) => x + 10;
    const square = (x: number) => x * x;

    const compose =
      (...fns: ((x: number) => number)[]) =>
      (x: number) =>
        fns.reduceRight((acc, fn) => fn(acc), x);

    // Applies square first, then addTen, then double: double(addTen(square(3)))
    const composed = compose(double, addTen, square);
    console.log("compose(double, addTen, square)(3):", composed(3));
    console.log("  square(3) = 9 → addTen(9) = 19 → double(19) = 38");
    console.log(
      "reduceRight is the natural choice for function composition (right-to-left application)."
    );
  };

  const demoReduceRightGroupBy = () => {
    console.log("Array of objects:", testArrayOfObjects);
    console.log("Grouping by age bracket (processed right to left):");
    const grouped = testArrayOfObjects.reduceRight(
      (acc, person) => {
        const key = person.age > 30 ? "senior" : "junior";
        acc[key] ??= [];
        acc[key].push(person.name);
        return acc;
      },
      {} as Record<string, string[]>
    );
    console.log("Grouped:", grouped);
  };

  const demoReduceRightDeduplicateKeepLast = () => {
    console.log("Array with duplicates:", testArrayWithDuplicates);
    console.log(
      "Deduplicating by processing right-to-left (keeps last occurrence order):"
    );
    const seen = new Set<number>();
    const result = testArrayWithDuplicates.reduceRight(
      (acc, curr) => {
        if (!seen.has(curr)) {
          seen.add(curr);
          acc.unshift(curr); // maintain original order
        }
        return acc;
      },
      [] as number[]
    );
    console.log("Deduplicated (last occurrence wins):", result);
    console.log(
      "Contrast with reduce (left-to-right) which keeps the first occurrence."
    );
  };

  const demoReduceRightBuildStringReverse = () => {
    const words = ["world", "beautiful", "Hello"];
    console.log("Words array:", words);
    const sentence = words.reduceRight((acc, word) => `${acc} ${word}`.trim());
    console.log("Built sentence (right→left):", sentence); // "Hello beautiful world"
    console.log(
      "reduceRight naturally reverses the processing order to produce forward-reading text."
    );
  };

  const demoReduceRightIndexTracking = () => {
    console.log("Input array:", testArray);
    console.log("Tracking index and array during reduceRight:");
    testArray.reduceRight((acc, curr, index, arr) => {
      console.log(
        `  index: ${index}, curr: ${curr}, acc: ${acc}, array: [${arr}]`
      );
      return acc + curr;
    }, 0);
  };

  return (
    <Grid
      label="reduceRight"
      descp={[
        "Applies a function against an accumulator and each value of the array (from right to left) to reduce it to a single value.",
        "Processes elements starting from the last index down to index 0 — the opposite of reduce().",
        "Skips empty slots in sparse arrays, just like reduce().",
        "Without an initial value on an empty array, a TypeError is thrown.",
        "Ideal for right-to-left function composition and reverse-order aggregations.",
      ]}
      link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight"
    >
      <Buttons>
        <Button handleClick={demoReduceRight} label="reduceRight basic sum" />
        <Button
          handleClick={demoReduceRightVsReduce}
          label="reduceRight vs reduce direction"
        />
        <Button
          handleClick={demoReduceRightWithObjects}
          label="Collect names in reverse order"
        />
        <Button
          handleClick={demoReduceRightNoInitialValue}
          label="No initial value (last element as accumulator)"
        />
        <Button
          handleClick={demoReduceRightEmptyArray}
          label="Empty array — no initial value (TypeError)"
        />
        <Button
          handleClick={demoReduceRightEmptyArrayWithInitial}
          label="Empty array — with initial value"
        />
        <Button
          handleClick={demoReduceRightSingleElement}
          label="Single element — callback skipped"
        />
        <Button
          handleClick={demoReduceRightSparseArray}
          label="Sparse array — empty slots skipped"
        />
        <Button
          handleClick={demoReduceRightWithUndefined}
          label="Array with undefined values"
        />
        <Button
          handleClick={demoReduceRightWithNull}
          label="Array with null values"
        />
        <Button handleClick={demoReduceRightNaN} label="NaN propagation" />
        <Button
          handleClick={demoReduceRightFlattenNested}
          label="Flatten nested arrays right-to-left"
        />
        <Button
          handleClick={demoReduceRightComposeFunctions}
          label="Function composition (compose)"
        />
        <Button
          handleClick={demoReduceRightGroupBy}
          label="Group by property right-to-left"
        />
        <Button
          handleClick={demoReduceRightDeduplicateKeepLast}
          label="Deduplicate — keep last occurrence"
        />
        <Button
          handleClick={demoReduceRightBuildStringReverse}
          label="Build sentence from reversed word array"
        />
        <Button
          handleClick={demoReduceRightIndexTracking}
          label="Track index and array reference"
        />
      </Buttons>
    </Grid>
  );
};
