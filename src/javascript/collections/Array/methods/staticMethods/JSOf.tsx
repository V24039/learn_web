import { Button, Buttons, Grid } from "src/components";

export const JSOf = () => {
  const demoArrayOfVsConstructor = () => {
    console.log("new Array(5)", new Array(5));
    console.log("Array.of(5)", Array.of(5));
  };

  return (
    <Grid
      label="Array.of()"
      descp={[
        "Creates a new array instance with a variable number of arguments.",
      ]}
    >
      <Buttons>
        <Button
          label="Basic usage"
          handleClick={() => {
            console.log(
              "Creating an array with Array.of(1, 2, 3):",
              Array.of(1, 2, 3),
            );
            console.log(
              "Creating an array with Array.of('foo', 'bar'):",
              Array.of("foo", "bar"),
            );
            console.log("Creating an array with Array.of(4):", Array.of(4));
            console.log("Creating an array with Array.of():", Array.of());
          }}
        />
        <Button
          label="With string value"
          handleClick={() => {
            console.log(
              "Creating an array with Array.of('hello'):",
              Array.of("hello"),
            );
          }}
        />
        <Button
          label="Comparing with new and of"
          handleClick={demoArrayOfVsConstructor}
        />
      </Buttons>
    </Grid>
  );
};
