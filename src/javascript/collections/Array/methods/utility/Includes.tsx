import { Button, Buttons, Grid } from "src/components";

export const JSIncludes = () => {
  const testArray = [1, 2, 3, 4, 5];
  
  const demoIncludes = () => {
    console.log("Using includes to check if the array includes the value 3");
    const result = testArray.includes(3);
    console.log(result);
    console.log(
      "The includes method determines whether an array includes a certain value among its entries, returning true or false as appropriate",
    );
  };

  const demoIncludesNaN = () => {
    console.log([NaN].includes(NaN));
  };

  return (
    <Grid
      label="includes"
      descp={[
        "Determines whether an array includes a certain value among its entries, returning true or false as appropriate.",
        "The includes method uses the SameValueZero algorithm for comparison, which means it treats NaN as equal to NaN and considers -0 and +0 as the same value.",
      ]}
    >
      <Buttons>
        <Button handleClick={demoIncludes} label="Demo includes" />
        <Button handleClick={demoIncludesNaN} label="Demo includes for array with NAN" />
      </Buttons>
    </Grid>
  );
};
