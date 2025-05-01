/*
TO-DO
  - is
  - isExtensible
  - preventExtensions
  - delete(not part of object but is used to delete obj properies as object by itself does not have delete property)
  - const demoEqualityCheck = () => {
    console.log("newEmptyObject === newNullObject", newEmptyObject === newNullObject); // false
    console.log("newEmptyObject === newUndefinedObject", newEmptyObject === newUndefinedObject); // false
    console.log("newNullObject === newUndefinedObject", newNullObject === newUndefinedObject); // false
    console.log("newEmptyObject === {}", newEmptyObject === {}); // false
  }
*/

import { Button, Buttons, Grid } from "../../../components";

export const ObjectOtherProperties = () => {
  const obj = {
    32: "number key",
    name: "John",
    accessorProp: {
      get() {
        return "accessorProp";
      },
      set(value) {
        return "Setter" + value;
      },
    },
    nestedObj: {
      firstNestedObj: "nested object",
    },
  };

  //#region freeze
  const freezeExample = () => {
    const copyObject = Object.assign(obj);
    console.log(
      "Before freezing:",
      Object.getOwnPropertyDescriptors(copyObject)
    );
    const freezedObject = Object.freeze(copyObject);
    console.log(
      "After freezing:",
      Object.getOwnPropertyDescriptors(copyObject)
    );
    console.log("is freezed object === obj", copyObject === freezedObject);

    try {
      console.log("trying to changes property after freeze");
      copyObject.name = "Name new value";
    } catch (error) {
      console.log("Error:", error);
    }

    try {
      console.log("trying to changes property after freeze");
      copyObject.accessorProp = "New value";
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const freezeObjectDefineProperty = () => {
    const copyObject = Object.assign(obj);

    Object.freeze(copyObject);

    try {
      console.log(
        "trying to add new property after freeze using define property"
      );
      Object.defineProperty(copyObject, "newProp", { value: 17 });
    } catch (error) {
      console.log("Error:", error);
    }

    try {
      console.log(
        "trying to add change existin property after freeze using define property"
      );
      Object.defineProperty(copyObject, "name", { value: 17 });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const freezeArray = () => {
    const array = [1, 2, 3];
    Object.freeze(array);

    try {
      console.log("trying to push element after freeze");
      array.push(4);
    } catch (error) {
      console.log("Error:", error);
    }

    try {
      console.log("trying to change element after freeze");
      array[0] = 10;
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const freezeNestedObject = () => {
    const copyObject = Object.assign(obj);

    const freezedObj = Object.freeze(copyObject);
    console.log(freezedObj);
    console.log("After freeze", freezedObj);
    freezedObj.nestedObj.firstNestedObj = "new value";
    console.log("After change", freezedObj);
  };

  //#endregion

  //#region seal
  const sealExample = () => {
    const copyObject = Object.assign(obj);

    Object.seal(copyObject);
    console.log("After sealing", Object.getOwnPropertyDescriptors(copyObject));

    console.log("Changing value of object");
    copyObject.name = "New value";
    console.log(copyObject);

    try {
      console.log("trying to add property after seal");
      copyObject.newProp = "new value";
    } catch (error) {
      console.log("Error:", error);
    }

    try {
      console.log("trying to change property after seal");
      Object.defineProperty(copyObject, "name", { enumerable: false });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const sealDeleteExample = () => {
    const copyObject = Object.assign(obj);
    Object.seal(copyObject);

    try {
      console.log("trying to delete name");
      delete copyObject.name;
    } catch (error) {
      console.log("Error", error);
    }

    copyObject.newProp = "some value";
    console.log("Added new property newProp", copyObject);
    delete copyObject.newProp;
    console.log("After deleteing newProp", copyObject);
  };
  //#endregion

  //#region is

  //#endregion
  const objectIsExample = () => {
    console.log("Object.is(1, 1)", Object.is(1, 1)); // true
    console.log("Object.is('hello', 'hello')", Object.is("hello", "hello")); // true
    console.log("Object.is(null, null)", Object.is(null, null)); // true
    console.log("Object.is(NaN, NaN)", Object.is(NaN, NaN)); // true
    console.log("Object.is(0, -0)", Object.is(0, -0)); // false
    console.log("Object.is({}, {})", Object.is({}, {})); // false

    // Special cases
    console.log("Object.is(0, -0)", Object.is(0, -0)); // false
    console.log("Object.is(+0, -0)", Object.is(+0, -0)); // false
    console.log("Object.is(0, 0)", Object.is(0, 0)); // true
    console.log("Object.is(NaN, 0/0)", Object.is(NaN, 0 / 0)); // true
  };
  //#region preventExtensions
  const preventExtensionsExample = () => {
    const copiedObject = Object.assign(obj);
    Object.preventExtensions(copiedObject);

    console.log(Object.getOwnPropertyDescriptors(copiedObject));
    console.log(copiedObject);

    try {
      console.log("trying to add new object");
      copiedObject.newProp = "New value";
    } catch (error) {
      console.log("Error", error);
    }

    console.log("Changing the existing value");
    copiedObject.name = "new value";
    console.log(copiedObject);
  };
  //#endregion

  return (
    <div className="grid gap-4">
      <Grid
        label="freeze"
        descp={[
          "Freezes an object making it non extensionable(add new props) and also make the existing poperties non-writable and non-configurable",
          "Even an array can be frozen doing so, the existing element canntot be modified or removed and new elements cannot be added",
          "In nested object only the properties of the object passed are frozen, but the objects of any of these properties are not frozen",
          "An empty object which is not extensible(using Object.preventExtensions) is also frozen",
        ]}
      >
        <Buttons>
          <Button label="freeze Example" handleClick={freezeExample} />
          <Button
            label="freeze Object.defineProperty"
            handleClick={freezeObjectDefineProperty}
          />
          <Button label="freeze Array" handleClick={freezeArray} />
          <Button label="nested freeze" handleClick={freezeNestedObject} />
        </Buttons>
      </Grid>
      <Grid
        label="isFrozen"
        descp={["Checks if the given object is frozen"]}
      ></Grid>
      <Grid
        label="seal"
        descp={[
          "Sealing an object prevent extensions and makes properties existing non-configurable",
          "Evertying will same when we do Object.freeze but with seal the values can be changed",
          "Sealed properties cannot be deleted",
        ]}
      >
        <Buttons>
          <Button label="seal Example" handleClick={sealExample} />
          <Button
            label="Sealed delete example"
            handleClick={sealDeleteExample}
          />
        </Buttons>
      </Grid>
      <Grid label="isSealed" descp={["Checks if a object is sealed or not"]} />
      <Grid
        label="preventExtensions"
        descp={[
          "Prevents new properties from being added to the object",
          "Does not effect the existing properties",
        ]}
      >
        <Buttons>
          <Button
            label="Example for preventExtension"
            handleClick={preventExtensionsExample}
          />
        </Buttons>
      </Grid>
      <Grid
        label="isExtensible"
        descp={["Checks if an object is extensible or not"]}
      />
      <Grid
        link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete"
        label="delete"
        descp={[
          "Used to delete a property, an index from array",
          "Deleteing an index from array, adds an empty slot to at index making not accessible in the iterator",
          "delete only has an effect on own properties inherited properties cannot be deleted",
          "Non-configurable properties cannot be removed.",
          "Cannot delete variables or function parameters",
        ]}
      />
      <Grid
        label=".is"
        descp={["determines whether two values are the same value"]}
      >
        <Button label="Object.is example" handleClick={objectIsExample} />
      </Grid>
    </div>
  );
};
