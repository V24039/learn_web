import { Button, Buttons, Grid } from "src/components";

export const JSIsArray = () => {
  const demoIsArrayEdgeCases = () => {
    console.log("Checking for Array.prototype", Array.isArray(Array.prototype));
    console.log(
      "Checking for new Int8Array(3)",
      Array.isArray(new Int8Array(3)),
    );

    (function () {
      console.log("Checking for arguments object", Array.isArray(arguments));
    })();

    const proxy = new Proxy([], {});
    console.log("Checking for Proxy wrapped array (Array.isArray(new Proxy([], {}))):", Array.isArray(proxy));
  };

  return (
    <Grid
      label="Array.isArray()"
      descp={[
        "Checks if a value is an array.",
        "Returns true if the value is an array, otherwise false.",
        "Works across different execution contexts (e.g., iframes) where instanceof might fail.",
        "Detects arrays wrapped in Proxy objects transparently (returns true if the proxy target is an array).",
        "Can be used to check if an object is an array before performing array-specific operations.",
        "Example: Array.isArray([]) returns true, while Array.isArray({}) returns false.",
      ]}
    >
      <Buttons>
        <Button
          label="Basic checks"
          handleClick={() => {
            console.log("Checking if [] is an array:", Array.isArray([]));
            console.log("Checking if {} is an array:", Array.isArray({}));
            console.log(
              "Checking if new Array() is an array:",
              Array.isArray(new Array()),
            );
            console.log(
              "Checking if [1,2,3] is an array:",
              Array.isArray([1, 2, 3]),
            );
          }}
        />
        <Button
          label="Null and undefined checks"
          handleClick={() => {
            console.log("Checking if null is an array:", Array.isArray(null));
            console.log(
              "Checking if undefined is an array:",
              Array.isArray(undefined),
            );
          }}
        />
        <Button
          label="Boolean checks"
          handleClick={() => {
            console.log("Checking if true is an array:", Array.isArray(true));
            console.log("Checking if false is an array:", Array.isArray(false));
          }}
        />
        <Button
          label="Number and string checks"
          handleClick={() => {
            console.log("Checking if 42 is an array:", Array.isArray(42));
            console.log("Checking if 0 is an array:", Array.isArray(0));
            console.log("Checking if 'foo' is an array:", Array.isArray("foo"));
          }}
        />
        <Button
          label="Object checks"
          handleClick={() => {
            console.log("Checking if {} is an array:", Array.isArray({}));
            console.log(
              "Check if object.entries is an array:",
              Array.isArray(Object.entries({ a: 1, b: 2 })),
            );
          }}
        />
        <Button
          label="Check if array created with Array.of() is an array"
          handleClick={() => {
            console.log(
              "Checking if Array.of(1, 2, 3) is an array:",
              Array.isArray(Array.of(1, 2, 3)),
            );
            console.log(
              "Checking if Array.of(4)(empty slot) is an array:",
              Array.isArray(Array.of(4)),
            );
          }}
        />
        <Button
          label="Checking for edge cases"
          handleClick={demoIsArrayEdgeCases}
        />
      </Buttons>
    </Grid>
  );
};
