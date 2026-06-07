import { Button, Buttons, Grid } from "../../../components";
import { objectStyles } from "../consts";

export const ObjectsProperty = () => {
  const sym = Symbol("sym");
  const baseObjForExamples = {
    baseProp: "I am from the base object",
  };
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
  obj[sym] = "symbol";
  obj.ownMethod = function () {
    return "This is an own method";
  };

  const nestedObject = {
    John: [
      {
        name: "John",
        age: 25,
      },
      {
        name: "John",
        age: 35,
      },
    ],
    Jane: [
      {
        name: "Jane",
        age: 30,
      },
      {
        name: "Jane",
        age: 40,
      },
    ],
  };

  const createObj = Object.create(baseObjForExamples);
  createObj.childProp = "I belong to the child";

  //#region defineProperty Examples

  // byDefault: writable:false, enumerable:false, configurable:false
  const definePropertyDefault = () => {
    const obj = {};
    Object.defineProperty(obj, "defaults", {
      value: "Default Value",
    });
    console.log("Object after definition:", obj);
    console.log("Property value:", obj.defaults);
    console.log(
      "Descriptor:",
      Object.getOwnPropertyDescriptor(obj, "defaults")
    );

    try {
      obj.defaults = "New Value";
      console.log("Value after attempted change:", obj.defaults);
    } catch (error) {
      console.log("Error changing non-writable property:", error);
    }

    try {
      delete obj.defaults;
      console.log(
        "Property still exists after delete attempt",
        Object.prototype.hasOwnProperty.call(obj, "defaults")
      );
    } catch (error) {
      console.log("Error deleting nonConfigurable property:", error);
    }
  };

  //Setting writable to true
  const definePropertyWritable = () => {
    const obj = {};
    Object.defineProperty(obj, "writable", {
      value: "First Value",
      writable: true, // Explicitly writable
      enumerable: true,
      configurable: true,
    });
    console.log("Object after definition:", obj);
    console.log("Initial value:", obj.writable);
    console.log(
      "Descriptor:",
      Object.getOwnPropertyDescriptor(obj, "writable")
    );

    obj.writable = "New Value";
    console.log("Value after change:", obj.writable);
  };

  //Setting enumerable to true
  const definePropertyEnumerable = () => {
    const obj = { existing: 1 };
    Object.defineProperty(obj, "enumerable", {
      value: "I show up in loops",
      enumerable: true,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(obj, "nonEnumerable", {
      value: "I am hidden from loops",
      writable: true,
      configurable: true,
    });

    console.log(
      "nonEnumerable exists:",
      Object.prototype.hasOwnProperty.call(obj, "nonEnumerable")
    );
    console.log("nonEnumerable value:", obj.nonEnumerable);
    console.log(
      "Descriptor (Enumerable):",
      Object.getOwnPropertyDescriptor(obj, "enumerable")
    );
    console.log(
      "Descriptor (Non-Enumerable):",
      Object.getOwnPropertyDescriptor(obj, "nonEnumerable")
    );

    console.log("Object:", obj);
    console.log("Object.keys():", Object.keys(obj));
    console.log("for...in loop:");
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        console.log(`${key}: ${obj[key]}`);
      }
    }
  };

  const definePropertyAccessor = () => {
    const obj = { _privateValue: "secret" };

    Object.defineProperty(obj, "accessorProp", {
      enumerable: true,
      configurable: true,
      set(newValue) {
        console.log(`Setter called with value: "${newValue}"`);
        if (typeof newValue === "string" && newValue.length > 3) {
          this._privateValue = newValue.toUpperCase();
          console.log(`Internal value set to: "${this._privateValue}"`);
        } else {
          console.log("Setter validation failed: Value not set.");
        }
      },
      get() {
        console.log("Getter called!");
        return `Accessed: ${this._privateValue}`;
      },
    });

    console.log("Initial object state:", obj);

    console.log("Accessing property (triggers getter):");
    const val1 = obj.accessorProp;
    console.log("Value from getter:", val1);

    console.log("Assigning to property (triggers setter with validation):");
    obj.accessorProp = "new value";

    console.log("Accessing property again (triggers getter):");
    const val2 = obj.accessorProp;
    console.log("Value from getter:", val2);

    console.log("Assigning invalid value (triggers setter, fails validation):");
    obj.accessorProp = "no";

    console.log("Accessing property again (triggers getter):");
    const val3 = obj.accessorProp;
    console.log("Value from getter:", val3);

    console.log("Final object state:", obj);
    console.log(
      "Descriptor:",
      Object.getOwnPropertyDescriptor(obj, "accessorProp")
    );
  };

  //Making a property nonConfigurable
  const definePropertyNonConfigurable = () => {
    const obj = {};
    Object.defineProperty(obj, "nonConfigurable", {
      value: "Cannot be deleted or reconfigured",
      writable: true, // Can still be writable
      enumerable: true,
      configurable: false,
    });
    console.log("Object after definition:", obj);
    console.log(
      "Descriptor:",
      Object.getOwnPropertyDescriptor(obj, "nonConfigurable")
    );

    try {
      console.log("Attempting to delete nonConfigurable...");
      delete obj.nonConfigurable;
    } catch (error) {
      console.log("Error deleting nonConfigurable property", error);
    }

    try {
      console.log("Attempting to change enumerability to false...");
      Object.defineProperty(obj, "nonConfigurable", {
        enumerable: false, // Cannot change non-value/writable attributes if configurable: false
      });
    } catch (error) {
      console.log("Error reconfiguring nonConfigurable property:", error);
    }

    // Can still change value if writable: true
    try {
      obj.nonConfigurable = "Value Changed";
      console.log("New value:", obj.nonConfigurable); // Value Changed
    } catch (error) {
      console.log("Unexpected error changing value:", error);
    }

    // Attempt to change writability from true to false (will fail)
    try {
      console.log("Attempting to change writability to false...");
      Object.defineProperty(obj, "nonConfigurable", {
        writable: false,
      });
    } catch (error) {
      console.log(
        "Error changing writability of nonConfigurable property:",
        error
      );
    }

    console.log(
      "Final Descriptor:",
      Object.getOwnPropertyDescriptor(obj, "nonConfigurable")
    );
  };

  //#endregion

  //#region defineProperties
  const definePropertiesExample = () => {
    const obj = {};
    Object.defineProperties(obj, {
      prop1: {
        value: "Value 1",
        writable: true,
      },
      prop2: {
        value: "Value 2 (non-enum)",
        enumerable: false,
      },
      prop3: {
        get() {
          return "Getter for Prop 3";
        },
        enumerable: true,
      },
    });
    console.log("Object after defineProperties:", obj);
    console.log("prop1:", obj.prop1);
    console.log("prop2:", obj.prop2);
    console.log("prop3:", obj.prop3);
    console.log("Object.keys():", Object.keys(obj)); // ['prop1', 'prop3']
    console.log(
      "Descriptor prop1:",
      Object.getOwnPropertyDescriptor(obj, "prop1")
    );
    console.log(
      "Descriptor prop2:",
      Object.getOwnPropertyDescriptor(obj, "prop2")
    );
    console.log(
      "Descriptor prop3:",
      Object.getOwnPropertyDescriptor(obj, "prop3")
    );
  };
  //#endregion

  //#region getPrototypeOf
  const getPrototypeOfExample = () => {
    const proto1 = { protoProp: "prototype" };
    const objWithProto = Object.create(proto1);
    objWithProto.ownProp = "object's own property";

    const literalObj = { literal: true };
    const nullProtoObj = Object.create(null);

    console.log("Object created with Object.create(proto1):", objWithProto);
    const retrievedProto1 = Object.getPrototypeOf(objWithProto);
    console.log("Prototype of objWithProto:", retrievedProto1);
    console.log(
      "Is retrieved prototype === proto1",
      retrievedProto1 === proto1
    );

    console.log("Literal object:", literalObj);
    const retrievedProtoLiteral = Object.getPrototypeOf(literalObj);
    console.log("Prototype of literal object:", retrievedProtoLiteral);
    console.log(
      "Is retrieved prototype === Object.prototype",
      retrievedProtoLiteral === Object.prototype
    );

    console.log("Object created with Object.create(null):", nullProtoObj);
    const retrievedProtoNull = Object.getPrototypeOf(nullProtoObj);
    console.log("Prototype of nullProtoObj:", retrievedProtoNull);
  };

  const getPrototypeOfNullUndefined = () => {
    try {
      console.log("Attempting getPrototypeOf on null:");
      Object.getPrototypeOf(null);
    } catch (e) {
      console.log("Error getting prototype of null:", e);
    }
    try {
      console.log("Attempting getPrototypeOf on undefined:");
      Object.getPrototypeOf(undefined);
    } catch (e) {
      console.log("Error getting prototype of undefined:", e);
    }
    try {
      console.log("Attempting getPrototypeOf on a primitive (string):");
      console.log("Prototype of 'hello':", Object.getPrototypeOf("hello"));
    } catch (e) {
      console.log("Error getting prototype of primitive:", e);
    }
  };

  //#endregion

  //#region setPrototypeOf
  const setPrototypeOfExample = () => {
    console.warn(
      "Warning: setPrototypeOf is a slow operation. Use Object.create() for better performance when possible."
    );

    const targetObj = { targetProp: "I am the target" };
    const protoObj = { protoProp: "I am the new prototype" };
    const anotherProto = { anotherProp: "I am another prototype" };

    console.log("Target object:", targetObj);
    console.log(
      "Initial prototype of target:",
      Object.getPrototypeOf(targetObj)
    );

    // Set protoObj as the prototype
    Object.setPrototypeOf(targetObj, protoObj);
    console.log("After setting prototype to protoObj:");
    console.log("New prototype of target:", Object.getPrototypeOf(targetObj));
    console.log("Does target inherit protoProp?", targetObj.protoProp);
    console.log(
      "Is new prototype === protoObj?",
      Object.getPrototypeOf(targetObj) === protoObj
    );

    // Change the prototype again
    Object.setPrototypeOf(targetObj, anotherProto);
    console.log("After setting prototype to anotherProto:");
    console.log("New prototype of target:", Object.getPrototypeOf(targetObj));
    console.log("Does target inherit anotherProp?", targetObj.anotherProp);
    console.log("Does target still inherit protoProp?", targetObj.protoProp);

    // Set prototype to null
    Object.setPrototypeOf(targetObj, null);
    console.log("After setting prototype to null:");
    console.log("New prototype of target:", Object.getPrototypeOf(targetObj));
    console.log("Does target inherit anotherProp?", targetObj.anotherProp);
    console.log("Does target have toString?", typeof targetObj.toString);

    // Attempting to set prototype of an unmodifiable object (e.g., sealed)
    const sealedObj = Object.seal({ sealed: true });
    try {
      console.log("Attempting to set prototype of sealed object:");
      Object.setPrototypeOf(sealedObj, { newProto: true });
    } catch (e) {
      console.log("Error setting prototype of sealed object:", e);
    }

    // Setting prototype of Object.prototype (not allowed)
    try {
      console.log("Attempting to set prototype of Object.prototype:");
      Object.setPrototypeOf(Object.prototype, {});
    } catch (e) {
      console.log("Error setting prototype of Object.prototype:", e);
    }
  };
  //#endregion

  return (
    <div style={objectStyles.section}>
      <h3 style={objectStyles.heading}>Working with Properties</h3>
      <div className="grid gap-4">
        <Grid
          label="defineProperty"
          descp={[
            "Defines a new property or modifies an existing property directly on an object.",
            "Returns the object that was passed to the function.",
            "Allows fine-grained control over property attributes: value, writable, enumerable, configurable, get, set.",
            "By default, properties added this way are NOT writable, NOT enumerable, and NOT configurable.",
            "It uses the internal method [[DefineOwnProperty]].",
            "Cannot mix data descriptors (value, writable) with accessor descriptors (get, set) in the same definition.",
          ]}
        >
          <Buttons>
            <Button
              label="Default Behavior"
              handleClick={definePropertyDefault}
            />
            <Button
              label="Writable Example"
              handleClick={definePropertyWritable}
            />
            <Button
              label="Enumerable Example"
              handleClick={definePropertyEnumerable}
            />
            <Button
              label="NonConfigurable Example"
              handleClick={definePropertyNonConfigurable}
            />
            <Button
              label="Accessor (get/set) Example"
              handleClick={definePropertyAccessor}
            />
          </Buttons>
        </Grid>
        <Grid
          label="defineProperties"
          descp={[
            "Similar to defineProperty but defines or modifies multiple properties at once.",
            "Takes an object where keys are property names and values are descriptor objects.",
          ]}
        >
          <Buttons>
            <Button
              label="defineProperties Example"
              handleClick={definePropertiesExample}
            />
          </Buttons>
        </Grid>
        <Grid
          label="getOwnPropertyNames"
          descp={[
            "returns an array of all properties (including non-enumerable properties except for those which are symbols) found directly in a given object",
            "doees not return any symbol properties",
            "for nested obj only the obj properties are returned, the properties of child obj are not returned",
          ]}
        >
          <Buttons>
            <Button
              handleClick={() => {
                console.log("Base object:", obj);
                console.log(
                  "Property Names-",
                  Object?.getOwnPropertyNames(obj)
                );
                console.log(
                  "Property Name empty obj-",
                  Object?.getOwnPropertyNames({})
                );
                console.log(
                  "Property Name array-",
                  Object?.getOwnPropertyNames([1, 2, 3])
                );
                console.log(
                  "Property Names (nested obj):",
                  Object?.getOwnPropertyNames(nestedObject)
                );
                const nonEnumObj = {};
                Object.defineProperty(nonEnumObj, "nonEnum", {
                  value: 1,
                  enumerable: false,
                });
                Object.defineProperty(nonEnumObj, "enum", {
                  value: 2,
                  enumerable: true,
                });
                console.log("Object with non-enumerable prop:", nonEnumObj);
                console.log(
                  "Property Names (includes non-enumerable):",
                  Object.getOwnPropertyNames(nonEnumObj)
                );
              }}
              label="getOwnPropertyNames Examples"
            />
          </Buttons>
        </Grid>
        <Grid
          label="getOwnPropertySymbols example"
          descp={[
            "static method returns an array of all symbol properties found directly upon a given object.",
          ]}
        >
          <Buttons>
            <Button
              label="Example"
              handleClick={() => {
                const sym1 = Symbol("a");
                const sym2 = Symbol("b");
                const symObj = { prop: "value" };
                symObj[sym1] = "symbol a value";
                symObj[sym2] = "symbol b value";
                Object.defineProperty(symObj, Symbol("nonEnumSym"), {
                  value: "hidden",
                  enumerable: false,
                });

                console.log("Object with symbols:", symObj);
                console.log(
                  "Symbols found:",
                  Object.getOwnPropertySymbols(symObj)
                );
                console.log(
                  "Symbols on base 'obj':",
                  Object.getOwnPropertySymbols(obj)
                );
                console.log(
                  "Symbols on empty object:",
                  Object.getOwnPropertySymbols({})
                );
              }}
            />
          </Buttons>
        </Grid>
        <Grid
          label="getOwnPropertyDescriptor"
          descp={[
            "Returns an object describing the configuration of a specific property on a given object (not inherited).",
            "The returned object has keys like 'value', 'writable', 'enumerable', 'configurable', 'get', 'set'.",
            "Changes made to the returned descriptor object do NOT affect the original property.",
            "Returns `undefined` if the property does not exist directly on the object.",
          ]}
        >
          <Buttons>
            <Button
              handleClick={() => {
                console.log(
                  "Descriptor for 'name' on obj:",
                  Object.getOwnPropertyDescriptor(obj, "name")
                );
                console.log(
                  "Descriptor for Symbol(sym) on obj:",
                  Object.getOwnPropertyDescriptor(obj, sym)
                );
                console.log(
                  "Descriptor for 'undefined' key on obj:",
                  Object.getOwnPropertyDescriptor(obj, "undefined")
                );
                console.log(
                  "Descriptor for non-existent prop 'foo':",
                  Object.getOwnPropertyDescriptor(obj, "foo")
                );
                console.log(
                  "Descriptor for inherited 'baseProp' on createObj:",
                  Object.getOwnPropertyDescriptor(createObj, "baseProp")
                );
                console.log(
                  "Descriptor for own 'childProp' on createObj:",
                  Object.getOwnPropertyDescriptor(createObj, "childProp")
                );
              }}
              label="getOwnPropertyDescriptor Examples"
            />
          </Buttons>
        </Grid>
        <Grid
          label="getOwnPropertyDescriptors"
          descp={[
            "Similar to getOwnPropertyDescriptor but returns an object containing all own property descriptors of a given object.",
            "Useful for copying objects including their exact property definitions (e.g., non-enumerable properties or accessors).",
          ]}
        >
          <Buttons>
            <Button
              handleClick={() => {
                console.log(
                  "Descriptors for obj:",
                  Object.getOwnPropertyDescriptors(obj)
                );
                console.log(
                  "Descriptors for nestedObject:",
                  Object.getOwnPropertyDescriptors(nestedObject)
                );
                console.log(
                  "Descriptors for createObj (only own props):",
                  Object.getOwnPropertyDescriptors(createObj)
                );
                console.log(
                  "Descriptors for empty object:",
                  Object.getOwnPropertyDescriptors({})
                );
              }}
              label="getOwnPropertyDescriptors Examples"
            />
          </Buttons>
        </Grid>
        <Grid
          label="hasOwn"
          descp={[
            "static method returns true if the specified object has the indicated property as its own property.",
            "If the property is inherited, or does not exist, the method returns false.",
            "Recommended over `hasOwnProperty` as it works correctly with objects created using `Object.create(null)`.",
          ]}
        >
          <Buttons>
            <Button
              handleClick={() => {
                const nullProto = Object.create(null);
                nullProto.prop = "exists";

                console.log("obj has own 'name'?", Object.hasOwn(obj, "name"));
                console.log(
                  "obj has own Symbol(sym)?",
                  Object.hasOwn(obj, sym)
                );
                console.log(
                  "obj has own 'toString'?",
                  Object.hasOwn(obj, "toString")
                );
                console.log(
                  "obj has own 'nonExistent'?",
                  Object.hasOwn(obj, "nonExistent")
                );

                console.log(
                  "createObj has own 'childProp'?",
                  Object.hasOwn(createObj, "childProp")
                );
                console.log(
                  "createObj has own 'baseProp'?",
                  Object.hasOwn(createObj, "baseProp")
                );

                console.log(
                  "nullProto has own 'prop'?",
                  Object.hasOwn(nullProto, "prop")
                );
              }}
              label="Basic example"
            />
          </Buttons>
        </Grid>
        <Grid
          label="getPrototypeOf"
          descp={[
            "Returns the prototype (i.e., the value of the internal [[Prototype]] property) of the specified object.",
            "Throws TypeError if the object parameter is not an object (null or undefined).",
          ]}
        >
          <Buttons>
            <Button
              handleClick={() => {
                console.log(
                  "Prototype of Object.prototype:",
                  Object.getPrototypeOf(Object.prototype)
                );
              }}
              label="Prototype of Object.prototype"
            />
            <Button
              label="getPrototypeOf Examples"
              handleClick={getPrototypeOfExample}
            />
            <Button
              label="getPrototypeOf Null/Undefined"
              handleClick={getPrototypeOfNullUndefined}
            />
          </Buttons>
        </Grid>
        <Grid
          label="setPrototypeOf"
          descp={[
            "static method sets the prototype (i.e., the internal [[Prototype]] property) of a specified object to another object or null.",
            "Warning: This is a slow operation and should be used sparingly. Consider `Object.create()` instead when creating new objects with a specific prototype.",
            "setPrototypeOf is a slow operation",
            "Throws TypeError if the object whose prototype is to be changed is non-extensible, or if setting the prototype of Object.prototype.",
          ]}
        >
          <Buttons>
            <Button
              label="setPrototypeOf Examples"
              handleClick={setPrototypeOfExample}
            />
          </Buttons>
        </Grid>
      </div>
    </div>
  );
};
