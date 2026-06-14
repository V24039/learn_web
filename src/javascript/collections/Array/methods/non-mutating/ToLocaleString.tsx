import { Button, Buttons, Grid } from "src/components";

export const JSToLocaleString = () => {
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

  const demoToLocaleStringBasic = () => {
    console.log("Array:", testArray);
    const result = testArray.toLocaleString();
    console.log("toLocaleString():", result);
    console.log(
      "toLocaleString() calls each element's own toLocaleString() and joins with a locale-sensitive separator.",
      "For numbers in 'en-US' the separator is a comma."
    );
  };

  const demoToLocaleStringNumbers = () => {
    const prices = [1000, 2500.75, 999999.99];
    console.log("Array:", prices);
    console.log("Default       :", prices.toLocaleString());
    console.log("en-US         :", prices.toLocaleString("en-US"));
    console.log("de-DE         :", prices.toLocaleString("de-DE"));
    console.log("hi-IN         :", prices.toLocaleString("hi-IN"));
    console.log(
      "Different locales format numbers differently — decimal separator, grouping, etc.",
      "de-DE uses '.' for thousands and ',' for decimals."
    );
  };

  const demoToLocaleStringCurrency = () => {
    const prices = [1000, 2500.5, 99.99];
    const options: Intl.NumberFormatOptions = { style: "currency", currency: "USD" };
    console.log("Array:", prices);
    console.log("en-US USD:", prices.toLocaleString("en-US", options));
    console.log("de-DE USD:", prices.toLocaleString("de-DE", options));
    console.log("ja-JP JPY:", prices.toLocaleString("ja-JP", { style: "currency", currency: "JPY" }));
    console.log(
      "Pass Intl.NumberFormatOptions as the second argument for currency, percent, etc.",
      "Each element's toLocaleString() is called with the same locale and options."
    );
  };

  const demoToLocaleStringDates = () => {
    const dates = [new Date("2024-01-01"), new Date("2024-06-15"), new Date("2024-12-31")];
    console.log("Dates:", dates.map((d) => d.toISOString()));
    console.log("Default      :", dates.toLocaleString());
    console.log("en-US        :", dates.toLocaleString("en-US"));
    console.log("en-GB        :", dates.toLocaleString("en-GB"));
    console.log("ja-JP        :", dates.toLocaleString("ja-JP"));
    console.log(
      "Date elements call Date.prototype.toLocaleString() with the provided locale.",
      "Different locales produce very different date format outputs."
    );
  };

  const demoToLocaleStringVsToString = () => {
    const arr = [1000000, 2500.75];
    console.log("Array:", arr);
    console.log("toString()      :", arr.toString());
    console.log("toLocaleString():", arr.toLocaleString("en-US"));
    console.log(
      "toString() → raw comma-joined values (no formatting).",
      "toLocaleString() → locale-formatted values (grouping, decimals, etc.)."
    );
  };

  // Edge Cases

  const demoToLocaleStringEmptyArray = () => {
    const arr: number[] = [];
    console.log("[].toLocaleString():", arr.toLocaleString());
    // ""
    console.log("An empty array produces an empty string — same as toString().");
  };

  const demoToLocaleStringSingleElement = () => {
    const arr = [1234567.89];
    console.log("[1234567.89].toLocaleString('en-US'):", arr.toLocaleString("en-US"));
    // "1,234,567.89"
    console.log("Single-element: no separator, just the formatted value.");
  };

  const demoToLocaleStringWithNull = () => {
    console.log("Array:", testArrayWithNull);
    console.log("toLocaleString():", testArrayWithNull.toLocaleString());
    console.log(
      "null elements produce empty strings in the output — same as toString().",
      "null does not have a toLocaleString() method — it is coerced to ''."
    );
  };

  const demoToLocaleStringWithUndefined = () => {
    console.log("Array:", testArrayWithUndefined);
    console.log("toLocaleString():", testArrayWithUndefined.toLocaleString());
    console.log(
      "undefined elements also produce empty strings — same behaviour as null."
    );
  };

  const demoToLocaleStringSparseArray = () => {
    const arr = [1000, , 3000, , 5000];
    console.log("Sparse array:", [...arr]);
    console.log("toLocaleString():", arr.toLocaleString("en-US"));
    console.log(
      "Sparse holes produce empty strings between separators — same as null/undefined.",
      "Result: '1,000,,3,000,,5,000'"
    );
  };

  const demoToLocaleStringWithNaN = () => {
    console.log("Array:", nanArray);
    console.log("[NaN].toLocaleString():", nanArray.toLocaleString());
    console.log("NaN.toLocaleString() produces 'NaN'.");
  };

  const demoToLocaleStringMixedTypes = () => {
    const arr: (number | string | Date | null)[] = [1000, "hello", new Date("2024-01-01"), null];
    console.log("Mixed array:", arr);
    console.log("toLocaleString('en-US'):", arr.toLocaleString("en-US"));
    console.log(
      "Each element calls its OWN toLocaleString().",
      "Numbers use Intl.NumberFormat, Dates use Intl.DateTimeFormat, strings return themselves."
    );
  };

  // Advanced / Nerd Cases

  const demoToLocaleStringPercent = () => {
    const ratios = [0.1, 0.5, 0.99, 1.0];
    const options: Intl.NumberFormatOptions = { style: "percent" };
    console.log("Ratios:", ratios);
    console.log("toLocaleString (percent):", ratios.toLocaleString("en-US", options));
    // "10%, 50%, 99%, 100%"
    console.log("style:'percent' multiplies by 100 and appends a locale-appropriate percent sign.");
  };

  const demoToLocaleStringUnit = () => {
    const distances = [1.5, 10.2, 100];
    const options: Intl.NumberFormatOptions = { style: "unit", unit: "kilometer" };
    console.log("Distances:", distances);
    console.log("en-US km:", distances.toLocaleString("en-US", options));
    console.log("de-DE km:", distances.toLocaleString("de-DE", options));
    console.log(
      "style:'unit' formats with the measurement unit — locale affects abbreviation and position."
    );
  };

  const demoToLocaleStringSignedDisplay = () => {
    const changes = [+5, -3, 0, +12, -7];
    const options: Intl.NumberFormatOptions = { signDisplay: "always" };
    console.log("Changes:", changes);
    console.log("signDisplay:'always':", changes.toLocaleString("en-US", options));
    // "+5, -3, +0, +12, -7"
    console.log("signDisplay:'always' forces a leading + on positive numbers.");
  };

  const demoToLocaleStringCustomObject = () => {
    // Objects with a custom toLocaleString() use it during array.toLocaleString()
    class Temperature {
      constructor(private celsius: number) {}
      toLocaleString(locale?: string) {
        const f = (this.celsius * 9) / 5 + 32;
        return locale?.startsWith("en-US")
          ? `${f.toFixed(1)}°F`
          : `${this.celsius.toFixed(1)}°C`;
      }
    }
    const temps = [new Temperature(0), new Temperature(100), new Temperature(37)];
    console.log("en-US (Fahrenheit):", temps.toLocaleString("en-US"));
    console.log("de-DE (Celsius)   :", temps.toLocaleString("de-DE"));
    console.log(
      "Each element's toLocaleString(locale, options) is called with the array-level args.",
      "Implement toLocaleString() on your classes to control locale-sensitive rendering."
    );
  };

  const demoToLocaleStringPriceTable = () => {
    // Practical: format a price list for display
    const cart = [
      { item: "Coffee", price: 3.5 },
      { item: "Muffin", price: 2.75 },
      { item: "Juice",  price: 4.0 },
    ];
    const formattedPrices = cart.map((c) => c.price).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    console.log("Cart prices:", formattedPrices);
    cart.forEach((c, i) => console.log(`  ${c.item}: ${formattedPrices.split(", ")[i]}`));
    console.log(
      "toLocaleString is ideal for formatting arrays of prices, measurements, or dates for display."
    );
  };

  return (
    <Grid
      label="toLocaleString"
      descp={[
        "Returns a locale-sensitive string representing the array's elements, joined by a locale separator.",
        "Each element's own toLocaleString(locale, options) method is called individually.",
        "null, undefined, and sparse holes produce empty strings in the output.",
        "Supports Intl.NumberFormatOptions for currency, percent, unit formatting.",
        "Signature: arr.toLocaleString(locales?, options?).",
        "Non-mutating — returns a new string, does not modify the array.",
      ]}
      link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString"
    >
      <Buttons>
        {/* Normal */}
        <Button handleClick={demoToLocaleStringBasic} label="toLocaleString() — basic" />
        <Button handleClick={demoToLocaleStringNumbers} label="Numbers with different locales" />
        <Button handleClick={demoToLocaleStringCurrency} label="Currency formatting (USD, JPY)" />
        <Button handleClick={demoToLocaleStringDates} label="Date elements with locale" />
        <Button handleClick={demoToLocaleStringVsToString} label="toLocaleString vs toString" />

        {/* Edge */}
        <Button handleClick={demoToLocaleStringEmptyArray} label="Empty array → empty string" />
        <Button handleClick={demoToLocaleStringSingleElement} label="Single-element array" />
        <Button handleClick={demoToLocaleStringWithNull} label="null → empty string" />
        <Button handleClick={demoToLocaleStringWithUndefined} label="undefined → empty string" />
        <Button handleClick={demoToLocaleStringSparseArray} label="Sparse holes → empty string" />
        <Button handleClick={demoToLocaleStringWithNaN} label="NaN → 'NaN'" />
        <Button handleClick={demoToLocaleStringMixedTypes} label="Mixed types (number, string, Date)" />

        {/* Advanced / Nerd */}
        <Button handleClick={demoToLocaleStringPercent} label="Percent style formatting" />
        <Button handleClick={demoToLocaleStringUnit} label="Unit style (kilometer)" />
        <Button handleClick={demoToLocaleStringSignedDisplay} label="signDisplay:'always' (±)" />
        <Button handleClick={demoToLocaleStringCustomObject} label="Custom toLocaleString() on elements" />
        <Button handleClick={demoToLocaleStringPriceTable} label="Format price list for display" />
      </Buttons>
    </Grid>
  );
};
