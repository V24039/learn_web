/*TO-DO
  - assign
  - groupBy 
*/

import { Button, Buttons, CodeDisplay, Grid } from "../../../components";
import { objectStyles } from "../consts";

export const CreatingObjects = () => {
  const newEmptyObject = new Object();
  const newNullObject = new Object(null);
  const newUndefinedObject = new Object(undefined);

  const addElementToEmptyObject = () => {
    console.log("Before adding a new property -", newEmptyObject);
    newEmptyObject.newValue = "this is added to an empty object using dot";
    console.log("After adding a new property - ", newEmptyObject);
    console.log("delete is used to delete the added prop");
    delete newEmptyObject.newValue;
  };

  //#region Object.create

  const demoObjectCreateNull = () => {
    // Creating object with null prototype
    const nullProtoObject = Object.create(null);
    console.log("Object with null prototype:", nullProtoObject);
    console.log("prototype:", Object.getPrototypeOf(nullProtoObject));
    try {
      nullProtoObject.toString(); // This will throw an error because nullProtoObject has no prototype
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const demoObjectCreate = () => {
    // Creating object with normal object prototype
    const person = {
      isHuman: true,
      printIntro: function () {
        console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
      },
    };

    const child = Object.create(person);
    child.name = "Matthew"; // "name" is a property set on "child", not on "person"
    console.log("Child object:", child);
    child.printIntro();
  };

  // Creating object with property descriptors
  const demoObjectCreatePropertyDescp = () => {
    const propertyObject = Object.create(Object.prototype, {
      withValue: {
        writable: true, // Allows the property to be changed
        configurable: true, // Allows the property to be deleted or changed
        enumerable: false, // Makes the property non-enumerable if false
        value: "hello", // Initial value of the property
      },
      withGetterNoValue: {
        configurable: false,
        get: function () {
          // Getter function for the property
          return 10;
        },
        set: function () {
          // Setter function for the property
          console.log("Cannot set value, this is a read-only property");
        },
      },
      withNoGetterNoValue: {
        configurable: false,
      },
    });

    console.log("Property object:", propertyObject);
    console.log("withValue value:", propertyObject.withValue);
    console.log(
      "even though the no value is set it will log 10 bcoz of own get function withGetterNoValue value:",
      propertyObject.withGetterNoValue
    );
    console.log(
      "withNoGetterNoValue value:",
      propertyObject.withNoGetterNoValue
    );
    propertyObject.bar = 20; // Will log error message
  };
  //#endregion

  //#region Object.assign
  const assignExample = () => {
    const target = { a: 1, b: 2 };
    const source1 = { b: 3, c: 4 };
    const source2 = { d: 5 };

    // Merging objects
    const mergedObject = Object.assign(target, source1, source2);
    console.log("Merged Object:", mergedObject); // { a: 1, b: 3, c: 4, d: 5 }

    // Cloning an object
    const original = { x: 1, y: 2 };
    const clone = Object.assign({}, original);
    console.log("Cloned Object:", clone); // { x: 1, y: 2 }
  };

  const assignWithSameKeys = () => {
    const target = { a: "target a", b: "target b" };
    const source1 = { b: "source1 b", c: "source1 c" };
    const source2 = { b: "source2 b", d: "source2 d" };

    console.log("Target object before merge:", target); // { a: target a, b: target b }
    console.log("Source1 object:", source1); // { b: source1 b, c: source1 c }
    console.log("Source2 object:", source2); // { b: source2 b, d: source2 d }

    const mergedObject = Object.assign(target, source1, source2);
    console.log("Merged Object with same keys:", mergedObject); // { a: target a, b: source2 b, c: source1 c, d: source2 d }
    console.log("Original target object after merge:", target); // { a: target a, b: source2 b, c: source1 c, d: source2 d }
  };

  const assignWithNestedObjects = () => {
    const target = { a: 1, b: { c: 2 } };
    const source = { b: { d: "old value" } };

    // Merging objects with nested properties
    const mergedObject = Object.assign(target, source);
    console.log("Source object:", JSON.stringify(source)); // {{ d: 'old value' } }
    console.log(
      "Merged Object with nested properties:",
      JSON.stringify(mergedObject)
    ); // { a: 1, b: { d: 'old value' } }

    source.b.d = "new value source"; // Modifying the nested property in the source object
    console.log("Modified source object:", source); // {{ d: 'new value source' } }
    console.log("Merged object after modifying target:", mergedObject); // { a: 1, b: { d: 'new value source' } }
  };

  const assignWithGetterInSource = () => {
    const target = { a: 1, b: 2 };
    const source = {
      get c() {
        return 3;
      },
    };

    // Merging objects with getter in source
    const mergedObject = Object.assign(target, source);
    console.log("Merged Object with getter in source:", mergedObject); // { a: 1, b: 2, c: NaN }
    console.log("Value of c:", mergedObject.c); // NaN
  };

  const assignWithGetterInTarget = () => {
    const target = {
      a: 1,
      b: 2,
      get c() {
        return this.a + this.b;
      },
    };
    const source = { d: 4 };

    // Merging objects with getter in target
    console.log("Target object before merge:", JSON.stringify(target)); // { a: 1, b: 2, c: 3 }
    const mergedObject = Object.assign(target, source);
    console.log("Target object after merge:", JSON.stringify(target));
    console.log("Merged Object with getter in target:", mergedObject); // { a: 1, b: 2, c: 3, d: 4 }
    console.log("Value of c:", mergedObject.c); // 3
  };

  const nonEnumerableExample = () => {
    const target = { a: 1, b: 2 };
    const source = Object.create(Object.prototype, {
      c: {
        value: "non-enumerable value",
        enumerable: false, // Non-enumerable property
      },
      d: {
        value: "enumerable value",
        enumerable: true, // Enumerable property
      },
    });

    // Merging objects with non-enumerable property in source
    const mergedObject = Object.assign(target, source);
    console.log("Source object:", source); // { c: 3 }
    console.log("Merged Object with non-enumerable property:", mergedObject); // { a: 1, b: 2 }
    console.log("Value of c:", mergedObject.c); // undefined
  };

  const assignPrimitivesExample = () => {
    // taken from MDN
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#examples
    const v1 = "abc";
    const v2 = true;
    const v3 = 10;
    const v4 = Symbol("foo");

    const obj = Object.assign({}, v1, null, v2, undefined, v3, v4);
    // Primitives will be wrapped, null and undefined will be ignored.
    // Note, only string wrappers can have own enumerable properties.
    console.log(obj); // { "0": "a", "1": "b", "2": "c" }

    // Primitives as the target are also wrapped to objects
    const number = Object.assign(3, { a: 1 });
    console.log(number); // Number {3, a: 1}
    console.log(typeof number); // object
    console.log(number.a); // 1

    // null and undefined as targets throw TypeError
    try {
      Object.assign(null, { a: 1 });
    } catch (e) {
      console.log(e.message); // "Cannot convert undefined or null to object"
    }
  };

  //#endregion

  //#region Object.fromEntries
  const fromEntriesExample = () => {
    const entries = new Map([
      ["name", "John"],
      ["age", 30],
      ["city", "New York"],
      ["", "empty key"],
      [null, "null key"],
      [undefined, "undefined key"],
      [Symbol("sym"), "symbol"],
      [32, "number key"],
      [true, "boolean key"],
      [[], "array key"],
      [{}, "object key"],
      [() => {}, "function key"],
      [new Date(), "date key"],
    ]);

    console.log("Entries:", entries);
    const obj = Object.fromEntries(entries);
    console.log(obj);

    console.log("Object with empty string as key:", obj[""]);
    console.log("Object with null as key:", obj[null], obj.null);
    console.log("Object with undefined as key:", obj[undefined], obj.undefined);
    console.log("Object with symbol as key:", obj[Symbol("sym")]); // undefined, as symbols are not converted to strings
    console.log("Object with number as key:", obj[32], " obj.32 gives error"); // undefined, as numbers are converted to strings
    console.log("Object with boolean as key:", obj[true], obj.true);
    console.log("Object with array as key:", obj[[]]);
    console.log("Object with object as key:", obj[{}]);
    console.log("Object with function as key:", obj[() => {}]);
    console.log("Object with date as key:", obj[new Date()]);
  };
  //#endregion

  //#region Object.groupBy

  const groupByBasicExample = () => {
    const data = [
      { name: "John", age: 25 },
      { name: "Jane", age: 30 },
      { name: "John", age: 35 },
      { name: "Jane", age: 40 },
    ];

    console.log("Original Data:", data);
    const groupedData = Object.groupBy(data, (item) => item.name);
    console.log("Grouped Data:", groupedData);

    data.push({ name: "John", age: 45 });
    console.log("Grouped Data after adding new item:", groupedData);
  };

  const groupByWithCallback = () => {
    const data = [
      { name: "asparagus", type: "vegetables 5", quantity: 9 },
      { name: "bananas", type: "fruit 5", quantity: 5 },
      { name: "goat", type: "meat 23", quantity: 23 },
      { name: "cherries", type: "fruit 12", quantity: 12 },
      { name: "fish", type: "meat true", quantity: true },
    ];

    console.log("Original Data:", data);
    const groupedData = Object.groupBy(data, (item) =>
      item.quantity > 5 ? "greater than 5" : "less than or equal to 5"
    );
    console.log("Grouped Data:", groupedData);
  };

  const groupByExampleWithMiscellanous = () => {
    const data = [
      { name: "John", age: 25 },
      { name: "Jane", age: 30 },
      { name: "John", age: 35 },
      { name: "Jane", age: 40 },
      { name: undefined, age: 45 },
      { name: null, age: 50 },
      { age: 90 },
      { name: "John" },
    ];

    console.log("Original Data:", data);
    const groupedData = Object.groupBy(data, (item) => item.name);
    console.log("Grouped Data:", groupedData);
  };

  const groupByWithNestedObjects = () => {
    const data = [
      { name: "John", age: 25, address: { city: "New York" } },
      { name: "Jane", age: 30, address: { city: "Los Angeles" } },
      { name: "John", age: 35, address: { city: "Chicago" } },
      { name: "Jane", age: 40, address: { city: "New York" } },
    ];

    console.log("Original Data:", data);
    const groupedData = Object.groupBy(data, (item) => item.name);
    console.log("Grouped Data:", groupedData);

    data[0].address.city = "San Francisco";
    console.log("Grouped Data after modifying address:", groupedData);
  };

  const groupByWithCallbackOnNestedObjects = () => {
    const data = [
      { name: "BGk", age: 25, address: { city: "BGk" } },
      { name: "BJP", age: 30, address: { city: "BJP" } },
      { name: "BNG", age: 35, address: { city: "BNG" } },
      { name: "BGk", age: 40, address: { city: "BGk" } },
      { name: "BNG", age: 45, address: { city: "BNG" } },
      { name: "BJP", age: 50, address: { city: "BJP" } },
      { name: "BGk", age: 55, address: { city: "BGk" } },
      { name: "BNG", age: 60, address: { city: "BNG" } },
      { name: "BJP", age: 65, address: { city: "BJP" } },
      { name: "BGk", age: 70, address: { city: "BGk" } },
    ];

    console.log("Original Data:", data);
    const groupedData = Object.groupBy(data, (item) => item.address.city);
    console.log("Grouped Data:", groupedData);

    data[0].address.city = "New City";
    console.log("Grouped Data after modifying address:", groupedData);
  }

  //#endregion

  return (
    <div style={objectStyles.section}>
      <h3 style={objectStyles.heading}>Creating Objects</h3>
      <div className="grid gap-4">
        <Grid label="Basic method of creating object">
          <pre style={objectStyles.code}>
            <code>
              {`// Object literal notation
const person = {
  name: 'John',
  age: 30,
  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
};

// Using Object constructor
const car = new Object();
car.brand = 'Toyota';
car.model = 'Camry';`}
            </code>
          </pre>
        </Grid>
        <Grid
          label="Creating using Object() constructor"
          descp={[
            "if the value is null or undefined, it create and returns an empty object",
            "If the value is an object already, it returns the value.",
            "Otherwise, it returns an object of a type that corresponds to the given value. For example, passing a BigInt primitive returns a BigInt wrapper object.",
          ]}
        >
          <Buttons>
            <Button
              label="newEmptyObject"
              handleClick={() => console.log(newEmptyObject)}
            />
            <Button
              label="newNullObject"
              handleClick={() => console.log(newNullObject)}
            />
            <Button
              label="newUndefinedObject"
              handleClick={() => console.log(newUndefinedObject)}
            />
            <Button
              label="Add prop to empty object"
              handleClick={addElementToEmptyObject}
            />
            <Button label="Add prop" handleClick={addElementToEmptyObject} />
          </Buttons>
        </Grid>
        <Grid
          label="Using Object.create()"
          descp={[
            "Creates a new object, using an existing object as the prototype of the newly created object.",
            "Second parameter maps keys to property descriptors",
            "Useful for creating objects with specific prototypes or property configurations",
            "By default properties are not writable, enumerable or configurable.",
            "When using Object.create() with a null prototype, the new object will not inherit any properties or methods from Object.prototype.",
            "Can be useful for creating objects that do not have any prototype chain, which can be more secure and efficient in certain cases.",
            "Can be using only null or an object as the first parameter",
          ]}
        >
          <CodeDisplay
            codeSnippet={`// Create object with null prototype
const nullProtoObject = Object.create(null);

// Create object with inherited properties
const person = { isHuman: true };
const child = Object.create(person);

// Create object with property descriptors
const obj = Object.create(Object.prototype, {
  foo: {
    writable: true,
    configurable: true,
    value: 'hello'
  }
});`}
          />
          <Buttons>
            <Button
              label="Demo Object.create()"
              handleClick={demoObjectCreate}
            />
            <Button
              label="Demo Object.create(null)"
              handleClick={demoObjectCreateNull}
            />
            <Button
              label="Using Object.create() with property descriptors"
              handleClick={demoObjectCreatePropertyDescp}
            />
          </Buttons>
        </Grid>
        <Grid
          label="Object.fromEntries"
          descp={["Transforms a list of key-value pairs into an object."]}
        >
          <Button
            handleClick={fromEntriesExample}
            label="From Entries Example"
          />
        </Grid>
        <Grid
          label="Object.assign"
          descp={[
            "Copies the values of all enumerable own properties from one or more source objects to a target object.",
            "Returns the target object and it will update the target object with the values from the source objects. So the returned object is the same as the target object.",
            "It uses the [[GET]] to access the properties of the source objects and [[SET]] methods to set the properties on the target object.",
            "Does not perform deep cloning, so nested objects will still reference the original object.",
            "If two or more source objects have the same property, the last one will overwrite the previous ones.",
            "If the target object is not an object, it will be converted to an object.",
            "If the target object is null or undefined, a TypeError will be thrown.",
            "Non-enumerable properties will not be copied.",
          ]}
        >
          <Buttons>
            <Button handleClick={assignExample} label="Assign Example" />
            <Button
              handleClick={assignWithSameKeys}
              label="Assign with same keys"
            />
            <Button
              handleClick={assignWithNestedObjects}
              label="Assign with nested objects"
            />
            <Button
              handleClick={assignWithGetterInSource}
              title="Can be used to get value using values in object and outside the object"
              label="Assign with getter in source"
            />
            <Button
              handleClick={assignWithGetterInTarget}
              label="Assign with getter in target"
            />
            <Button
              handleClick={nonEnumerableExample}
              label="Enumerable property"
            />
            <Button
              handleClick={assignPrimitivesExample}
              label="Assign with primitives"
            />
          </Buttons>
        </Grid>
        <Grid
          label="Object.groupBy"
          descp={[
            "Groups the elements of an iterable based on a specified criterion.",
            "It takes an iterable (like an array) and a grouping callback function as arguments.",
            "Returns an object where the keys are the result of applying the grouping function to each element, and the values are arrays of elements that share the same key.",
            "If the grouping function returns the same key for multiple elements, those elements will be grouped together in an array.",
            "If the grouping function returns undefined, those elements will be grouped under the key 'undefined'.",
          ]}
        >
          <Buttons>
            <Button
              handleClick={groupByBasicExample}
              label="Group By Example"
            />
            <Button
              handleClick={groupByWithCallback}
              label="Group By with callback"
            />
            <Button
              handleClick={groupByWithNestedObjects}
              label="Group By with nested objects"
            />
            <Button
              handleClick={groupByWithCallbackOnNestedObjects}
              label="Group By with callback on nested objects"
            />
            <Button
              handleClick={groupByExampleWithMiscellanous}
              label="Group By with undefined"
            />
          </Buttons>
        </Grid>
      </div>
    </div>
  );
};
