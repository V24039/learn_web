import { Button, Buttons, Grid } from "../../../components";
import { objectStyles } from "../consts";

export const GetMethods = () => {
  const obj = {
    32: "number key",
    name: "John",
    age: 30,
    city: "New York",
    null: "null key",
    undefined: "undefined key",
    true: "boolean key",
    false: "false boolean",
    ["asdad"]: "array key",
  };

  // #region Object.keys
  // #endregion

  // #region Object.values
  const valuesTypeExample = () => {
    const obj = {
      32: "number key",
      name: "John",
      age: 30,
      city: "New York",
      null: null,
      undefined: undefined,
      true: true,
      false: false,
      ["asdad"]: ["array key"],
    };

    const values = Object.values(obj);
    console.log(values);

    values.forEach((value) => {
      console.log(value, " typeof value -", typeof value);
    });
  };
  // #endregion

  // #region Object.entries
  const entriesExampleWithEnumerable = () => {
    const obj = Object.create({
      name: "John",
      age: 30,
      city: {
        writable: true, // Allows the property to be changed
        configurable: true, // Allows the property to be deleted or changed
        enumerable: true, // Makes the property non-enumerable if false
        value: "hello", // Initial value of the property
      },
    });

    const entries = Object.entries(obj);
    console.log("city is not enumerable - ", entries);
    console.log(
      "gives empty array bcoz Object.create() creates obj with a prototype containing name, age, and city. obj itself initially has no own properties"
    );
  };
  // #endregion

  return (
    <div style={objectStyles.section}>
      <h3 style={objectStyles.heading}>Getting keys and values in object</h3>
      <div className="grid gap-4">
        <Grid
          label="Objec.Entries"
          descp={[
            "Returns an array of a given object's own enumerable string-keyed property key-value pairs",
            "undefined and null cannot be coerced to objects and throw a TypeError",
            "Only strings may have own enumerable properties, while all other primitives return an empty array.",
          ]}
        >
          <Buttons>
            <Button
              label="Basic example for Object.entries"
              handleClick={() => console.log(Object.entries(obj))}
            />
            <Button
              label="Primitives type"
              handleClick={() => {
                console.log("ABC -", Object.entries("ABC"));
                console.log("number -", Object.entries(123));
                console.log("empty string -", Object.entries(""));
                console.log("array -", Object.entries(["zero", "one", "two"]));
                // console.log("null - ", Object.entries(null)); cannot convert null and undefined to Object
                // console.log("undefined - ", Object.entries(undefined));
              }}
            />
            <Button
              label="Non enumerable property"
              handleClick={entriesExampleWithEnumerable}
            />
          </Buttons>
        </Grid>

        <Grid
          label="Object.keys"
          descp={[
            "Returns an array of a given object's own enumerable property names.",
            "If any array is given the array index is given",
          ]}
        >
          <Buttons>
            <Button
              label="Basic example for Object.keys"
              handleClick={() => console.log(Object.keys(obj))}
            />
            <Button
              label="Primitives type"
              handleClick={() => {
                console.log("ABC -", Object.keys("ABC"));
                console.log("number -", Object.keys(123));
                console.log("empty string -", Object.keys(""));
                console.log("array -", Object.keys(["zero", "one", "two"]));
                console.log("null - ", Object.keys(null)); // cannot convert null and undefined to Object
                console.log("undefined - ", Object.keys(undefined));
              }}
            />
          </Buttons>
        </Grid>
        <Grid
          label="Object.values"
          descp={[
            "Returns an array of a given object's own enumerable property values.",
            "If any array is given the array index is given",
          ]}
        >
          <Buttons>
            <Button
              label="Basic example for Object.values"
              handleClick={() => console.log(Object.values(obj))}
            />
            <Button
              label="Primitives type"
              handleClick={() => {
                console.log("ABC -", Object.values("ABC"));
                console.log("number -", Object.values(123));
                console.log("empty string -", Object.values(""));
                console.log("array -", Object.values(["zero", "one", "two"]));
                console.log("null - ", Object.values(null)); // cannot convert null and undefined to Object
                console.log("undefined - ", Object.values(undefined));
              }}
            />
            <Button label="type of values" handleClick={valuesTypeExample} />
          </Buttons>
        </Grid>
      </div>
    </div>
  );
};
