import { Button, Buttons, Grid } from "src/components";

export const JSToString = () => {
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

  const demoToStringBasic = () => {
    // toString() — joins all elements with commas, no spaces
    console.log("Array:", testArray);
    const result = testArray.toString();
    console.log("arr.toString():", result);
    // "1,2,3,4,5"
    console.log(
      "toString() is equivalent to arr.join(',') — elements separated by commas.",
      "Returns a primitive string — NOT the array itself."
    );
  };

  const demoToStringVsJoin = () => {
    console.log("Array:", testArray);
    const ts = testArray.toString();
    const join = testArray.join(",");
    console.log("toString()  :", ts);
    console.log("join(',')   :", join);
    console.log("Are they equal?", ts === join); // true
    console.log(
      "toString() is exactly join(',') — same output, same spec.",
      "Use join() when you need a custom separator; use toString() for the comma default."
    );
  };

  const demoToStringStrings = () => {
    const arr = ["apple", "banana", "cherry"];
    console.log("Array:", arr);
    console.log("arr.toString():", arr.toString());
    // "apple,banana,cherry"
    console.log("String elements are concatenated with commas — no extra quotes added.");
  };

  const demoToStringImplicit = () => {
    // toString is called implicitly when an array is coerced to a string
    const arr = [1, 2, 3];
    console.log("Array:", arr);
    const implicit = "Result: " + arr; // string concatenation triggers toString()
    console.log("'Result: ' + arr:", implicit);
    const template = `Template: ${arr}`; // template literal also triggers toString()
    console.log("`Template: ${arr}`:", template);
    console.log(
      "toString() is called implicitly in string concatenation and template literals.",
      "This is why [1,2,3]+'' === '1,2,3'."
    );
  };

  // Edge Cases──

  const demoToStringEmptyArray = () => {
    const arr: number[] = [];
    console.log("Array:", arr);
    const result = arr.toString();
    console.log("[].toString():", JSON.stringify(result)); // ""
    console.log(
      "An empty array stringifies to an empty string ''.",
      "Gotcha: Boolean('') is false — [].toString() is falsy!"
    );
  };

  const demoToStringSingleElement = () => {
    const arr = [42];
    console.log("Array:", arr);
    console.log("[42].toString():", arr.toString());
    // "42" — no comma, just the single element as a string
    console.log("Single-element array: no comma, just the element as a string.");
  };

  const demoToStringWithNull = () => {
    console.log("Array:", testArrayWithNull);
    console.log("arr.toString():", testArrayWithNull.toString());
    // "1,,3,,5" — null becomes empty string
    console.log(
      "null elements become empty strings in the output.",
      "Result: '1,,3,,5' — each null slot is an empty string between commas."
    );
  };

  const demoToStringWithUndefined = () => {
    console.log("Array:", testArrayWithUndefined);
    console.log("arr.toString():", testArrayWithUndefined.toString());
    // "1,,3,,5" — undefined becomes empty string, same as null
    console.log(
      "undefined elements also become empty strings — same behaviour as null.",
      "You cannot distinguish null from undefined in the toString() output."
    );
  };

  const demoToStringWithNaN = () => {
    console.log("Array:", nanArray);
    console.log("[NaN].toString():", nanArray.toString());
    // "NaN"
    console.log("NaN stringifies to the string 'NaN'.");
  };

  const demoToStringSparseArray = () => {
    const arr = [1, , 3, , 5]; // holes at index 1 and 3
    console.log("Sparse array:", [...arr]);
    console.log("arr.toString():", arr.toString());
    // "1,,3,,5" — holes become empty strings, same as null/undefined
    console.log(
      "Sparse holes behave identically to null/undefined in toString().",
      "All three produce an empty string between commas."
    );
  };

  const demoToStringNestedArray = () => {
    const nested = [[1, 2], [3, 4], [5]];
    console.log("Nested array:", nested);
    console.log("nested.toString():", nested.toString());
    // "1,2,3,4,5" — nested arrays are flattened ONE level by recursive toString
    console.log(
      "Nested arrays are recursively stringified — each sub-array calls its own toString().",
      "[[1,2],[3,4]] → '1,2,3,4'. This can be surprising — use JSON.stringify for clarity."
    );
  };

  const demoToStringWithObjects = () => {
    console.log("Array:", JSON.stringify(testArrayOfObjects));
    console.log("arr.toString():", testArrayOfObjects.toString());
    // "[object Object],[object Object],[object Object]"
    console.log(
      "Plain objects stringify to '[object Object]' — their toString() is called.",
      "Use JSON.stringify(arr) for meaningful object serialisation."
    );
  };

  const demoToStringCustomObjectToString = () => {
    // Objects with a custom toString() method use it during array.toString()
    class Point {
      constructor(public x: number, public y: number) {}
      toString() {
        return `(${this.x},${this.y})`;
      }
    }
    const arr = [new Point(1, 2), new Point(3, 4)];
    console.log("arr.toString():", arr.toString());
    // "(1,2),(3,4)"
    console.log(
      "Each element's own toString() method is called when it exists.",
      "This lets you control how your objects appear in array string coercions."
    );
  };

  // Advanced / Nerd Cases─

  const demoToStringVsJSON = () => {
    const arr = [1, null, undefined, NaN, [2, 3]];
    console.log("toString() :", arr.toString());
    console.log("JSON.stringify:", JSON.stringify(arr));
    console.log(
      "toString() and JSON.stringify behave very differently:",
      "• toString: null/undefined/NaN → '' | nested arrays flattened",
      "• JSON.stringify: null → 'null' | undefined → 'null' | NaN → 'null' | arrays preserved"
    );
  };

  const demoToStringLocaleString = () => {
    const prices = [1000.5, 2000.75, 3000];
    console.log("Array:", prices);
    console.log("toString()    :", prices.toString());
    console.log("toLocaleString():", prices.toLocaleString("en-IN", { style: "currency", currency: "INR" }));
    console.log(
      "toLocaleString() calls each element's toLocaleString() — locale-aware formatting.",
      "Use toLocaleString() for human-readable currency, dates, and numbers."
    );
  };

  const demoToStringVsStringConstructor = () => {
    const arr = [1, 2, 3];
    console.log("arr.toString()   :", arr.toString());
    console.log("String(arr)      :", String(arr));
    console.log("'' + arr         :", "" + arr);
    console.log("Are they equal?  :", arr.toString() === String(arr)); // true
    console.log(
      "String(arr) and '' + arr both call arr.toString() internally.",
      "All three produce the same result."
    );
  };

  const demoToStringSymbolToPrimitive = () => {
    // Arrays use Symbol.toPrimitive for coercion, which falls back to toString
    const arr = [1, 2, 3];
    console.log("typeof arr[Symbol.toPrimitive]:", typeof (arr as unknown as Record<symbol, unknown>)[Symbol.toPrimitive]);
    // undefined — Arrays do NOT implement Symbol.toPrimitive
    // They fall back to valueOf() (returns the array itself) then toString()
    console.log("arr.valueOf() === arr:", arr.valueOf() === arr); // true
    console.log("arr.toString():", arr.toString());
    console.log(
      "Arrays don't have Symbol.toPrimitive — coercion uses valueOf() first (returns self),",
      "then falls back to toString(). In string context, toString() wins."
    );
  };

  return (
    <Grid
      label="toString"
      descp={[
        "Returns a string representing the array and its elements, joined by commas.",
        "Equivalent to arr.join(',') — this is specified in the ECMAScript standard.",
        "null, undefined, and sparse holes all become empty strings in the output.",
        "Nested arrays are recursively stringified — each sub-array calls its own toString().",
        "Called implicitly in string concatenation and template literals.",
        "Plain objects produce '[object Object]'; custom toString() methods are respected.",
      ]}
      link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString"
    >
      <Buttons>
        {/* Normal */}
        <Button handleClick={demoToStringBasic} label="toString() — basic" />
        <Button handleClick={demoToStringVsJoin} label="toString() vs join(',') — identical" />
        <Button handleClick={demoToStringStrings} label="Array of strings" />
        <Button handleClick={demoToStringImplicit} label="Implicit coercion (+ and template literals)" />

        {/* Edge */}
        <Button handleClick={demoToStringEmptyArray} label="Empty array → empty string" />
        <Button handleClick={demoToStringSingleElement} label="Single-element array" />
        <Button handleClick={demoToStringWithNull} label="null → empty string" />
        <Button handleClick={demoToStringWithUndefined} label="undefined → empty string" />
        <Button handleClick={demoToStringWithNaN} label="NaN → 'NaN'" />
        <Button handleClick={demoToStringSparseArray} label="Sparse holes → empty string" />
        <Button handleClick={demoToStringNestedArray} label="Nested arrays — recursive flattening" />
        <Button handleClick={demoToStringWithObjects} label="Objects → '[object Object]'" />
        <Button handleClick={demoToStringCustomObjectToString} label="Custom toString() on elements" />

        {/* Advanced / Nerd */}
        <Button handleClick={demoToStringVsJSON} label="toString vs JSON.stringify differences" />
        <Button handleClick={demoToStringLocaleString} label="toLocaleString — locale-aware formatting" />
        <Button handleClick={demoToStringVsStringConstructor} label="toString vs String() vs '' + arr" />
        <Button handleClick={demoToStringSymbolToPrimitive} label="valueOf / Symbol.toPrimitive internals" />
      </Buttons>
    </Grid>
  );
};
