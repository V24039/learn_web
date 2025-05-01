/* eslint-disable no-prototype-builtins */
import { Button, Buttons, Grid } from "../../components";

export const ObjectInstanceMethods = () => {
  const proto = {
    protoProp: "I am inherited",
    protoMethod() {
      return "Method from prototype";
    },
  };

  const instanceObj = Object.create(proto);
  instanceObj.ownProp = "I belong to the instance";
  instanceObj.ownMethod = function () {
    return "Method from instance";
  };
  Object.defineProperty(instanceObj, "nonEnumerableProp", {
    value: "I am not enumerable",
    enumerable: false,
    writable: true,
    configurable: true,
  });

  const plainObj = { key: "value" };
  const nullProtoObj = Object.create(null);
  nullProtoObj.prop = "value";

  const customToStringObj = {
    value: 42,
    toString() {
      return `Custom String: ${this.value}`;
    },
  };

  const customValueOfObj = {
    amount: 100,
    currency: "USD",
    valueOf() {
      return this.amount;
    },
    toString() {
      return `${this.amount} ${this.currency}`;
    },
  };

  //#region hasOwnProperty
  const hasOwnPropertyExample = () => {
    console.log("instanceObj:", instanceObj);
    console.log(
      "instanceObj.hasOwnProperty('ownProp'):",
      instanceObj.hasOwnProperty("ownProp")
    ); // true
    console.log(
      "instanceObj.hasOwnProperty('nonEnumerableProp'):",
      instanceObj.hasOwnProperty("nonEnumerableProp")
    ); // true (checks existence, not enumerability)
    console.log(
      "instanceObj.hasOwnProperty('ownMethod'):",
      instanceObj.hasOwnProperty("ownMethod")
    ); // true

    console.log(
      "instanceObj.hasOwnProperty('protoProp'):",
      instanceObj.hasOwnProperty("protoProp"),
      "bcoz protoProp is an inherited property or proto"
    ); // false (inherited)
    console.log(
      "instanceObj.hasOwnProperty('protoMethod'):",
      instanceObj.hasOwnProperty("protoMethod"),
      "bcoz protoMethod is an inherited property or proto"
    ); // false (inherited)
    console.log(
      "instanceObj.hasOwnProperty('toString'):",
      instanceObj.hasOwnProperty("toString"),
      "bcoz it is inherited from Object.prototype when creating a oject"
    ); // false (inherited from Object.prototype)

    console.log(
      "instanceObj.hasOwnProperty('nonExistentProp'):",
      instanceObj.hasOwnProperty("nonExistentProp")
    ); // false

    // Issue with null-prototype objects:
    console.log("\nnullProtoObj:", nullProtoObj);
    try {
      // This throws because nullProtoObj doesn't inherit from Object.prototype
      console.log(
        "nullProtoObj.hasOwnProperty('prop'):",
        nullProtoObj.hasOwnProperty("prop")
      );
    } catch (e) {
      console.log("Error calling hasOwnProperty on nullProtoObj:", e); // TypeError
      console.log(
        "Using Object.hasOwn(nullProtoObj, 'prop'):",
        Object.hasOwn(nullProtoObj, "prop")
      ); // true
    }
  };
  //#endregion

  //#region isPrototypeOf
  const isPrototypeOfExample = () => {
    console.log("proto:", proto);
    console.log("instanceObj:", instanceObj);
    console.log("plainObj:", plainObj);

    console.log(
      "instanceObj is create using Object.create(proto) and plainObj is created using {}"
    );

    console.log(
      "proto.isPrototypeOf(instanceObj):",
      proto.isPrototypeOf(instanceObj)
    ); // true
    console.log(
      "Object.prototype.isPrototypeOf(instanceObj):",
      Object.prototype.isPrototypeOf(instanceObj)
    ); // true
    console.log(
      "Object.prototype.isPrototypeOf(proto):",
      Object.prototype.isPrototypeOf(proto)
    ); // true
    console.log(
      "Object.prototype.isPrototypeOf(plainObj):",
      Object.prototype.isPrototypeOf(plainObj)
    ); // true

    console.log(
      "instanceObj.isPrototypeOf(proto):",
      instanceObj.isPrototypeOf(proto)
    ); // false
    console.log(
      "proto.isPrototypeOf(plainObj):",
      proto.isPrototypeOf(plainObj)
    ); // false
    console.log(
      "proto.isPrototypeOf(Object.prototype):",
      proto.isPrototypeOf(Object.prototype)
    ); // false

    // Check against null prototype object
    console.log(
      "Object.prototype.isPrototypeOf(nullProtoObj):",
      Object.prototype.isPrototypeOf(nullProtoObj)
    ); // false
    try {
      // Checking if null is prototype - usually not meaningful unless explicitly set
      console.log(
        "null.isPrototypeOf(nullProtoObj):",
        null.isPrototypeOf(nullProtoObj)
      );
    } catch (e) {
      console.log("Error calling isPrototypeOf on null:", e); // TypeError: Cannot read properties of null
    }
  };
  //#endregion

  //#region propertyIsEnumerable
  const propertyIsEnumerableExample = () => {
    console.log("instanceObj:", instanceObj);
    console.log(
      "Descriptor for 'ownProp':",
      Object.getOwnPropertyDescriptor(instanceObj, "ownProp")
    ); // enumerable: true (by default)
    console.log(
      "Descriptor for 'nonEnumerableProp':",
      Object.getOwnPropertyDescriptor(instanceObj, "nonEnumerableProp")
    ); // enumerable: false

    console.log(
      "instanceObj.propertyIsEnumerable('ownProp'):",
      instanceObj.propertyIsEnumerable("ownProp")
    ); // true
    console.log(
      "instanceObj.propertyIsEnumerable('nonEnumerableProp'):",
      instanceObj.propertyIsEnumerable("nonEnumerableProp")
    ); // false
    console.log(
      "instanceObj.propertyIsEnumerable('ownMethod'):",
      instanceObj.propertyIsEnumerable("ownMethod")
    ); // true (methods are enumerable by default)

    // Inherited properties are NOT considered enumerable by this method on the instance
    console.log(
      "instanceObj.propertyIsEnumerable('protoProp'):",
      instanceObj.propertyIsEnumerable("protoProp")
    ); // false
    console.log(
      "instanceObj.propertyIsEnumerable('toString'):",
      instanceObj.propertyIsEnumerable("toString")
    ); // false

    // Non-existent property
    console.log(
      "instanceObj.propertyIsEnumerable('nonExistent'):",
      instanceObj.propertyIsEnumerable("nonExistent")
    ); // false

    // Check on the prototype itself
    console.log(
      "proto.propertyIsEnumerable('protoProp'):",
      proto.propertyIsEnumerable("protoProp")
    ); // true
  };
  //#endregion

  //#region toString
  const toStringExample = () => {
    const arr = [1, 2];
    const func = function () {};
    const date = new Date();
    const err = new Error("Sample Error");
    const num = 5; // Primitive

    console.log("plainObj.toString():", plainObj.toString()); // "[object Object]"
    console.log("instanceObj.toString():", instanceObj.toString()); // "[object Object]" (default unless overridden)
    console.log("arr.toString():", arr.toString()); // "1,2" (Array overrides toString)
    console.log("func.toString():", func.toString()); // "function() {}" (Function overrides toString)
    console.log("date.toString():", date.toString()); // String representation of the date
    console.log("err.toString():", err.toString()); // "Error: Sample Error"
    console.log("nullProtoObj.toString():", nullProtoObj.toString); // undefined (doesn't inherit toString)

    // Primitives also have toString (via wrappers)
    console.log("num.toString():", num.toString()); // "5"
    console.log("'hello'.toString():", "hello".toString()); // "hello"

    // Custom toString
    console.log("customToStringObj.toString():", customToStringObj.toString()); // "Custom String: 42"

    // Using toString indirectly (e.g., string concatenation)
    console.log("Concatenating object: " + plainObj); // "Concatenating object: [object Object]"
    console.log("Concatenating custom object: " + customToStringObj); // "Concatenating custom object: Custom String: 42"
  };
  //#endregion

  //#region valueOf
  const valueOfExample = () => {
    const date = new Date();
    const numWrapper = new Number(123); // Object wrapper for number

    console.log("plainObj.valueOf():", plainObj.valueOf(), "The plainObj is returned"); // Returns the object itself
    console.log(
      "plainObj.valueOf() === plainObj:",
      plainObj.valueOf() === plainObj
    ); // true

    console.log("instanceObj.valueOf():", instanceObj.valueOf()); // Returns the object itself
    console.log(
      "instanceObj.valueOf() === instanceObj:",
      instanceObj.valueOf() === instanceObj
    ); // true

    console.log("date.valueOf():", date.valueOf()); // Returns timestamp (primitive number)

    console.log("numWrapper.valueOf():", numWrapper.valueOf()); // Returns 123 (primitive number)

    // Custom valueOf
    console.log("customValueOfObj.valueOf():", customValueOfObj.valueOf()); // 100

    // How valueOf is used in coercion:
    console.log("customValueOfObj + 5:", customValueOfObj + 5); // 105 (valueOf() is called)
    console.log("customValueOfObj > 50:", customValueOfObj > 50); // true (valueOf() is called)
    console.log("customValueOfObj < 150:", customValueOfObj < 150); // true (valueOf() is called)

    // If valueOf doesn't return primitive, toString might be tried (context dependent)
    const objWithObjectValueOf = {
      valueOf() {
        return {};
      }, // Returns non-primitive
      toString() {
        return "fallback string";
      },
    };
    console.log("objWithObjectValueOf + '' :", objWithObjectValueOf + ""); // "fallback string" (toString() used)

    console.log("nullProtoObj.valueOf:", nullProtoObj.valueOf); // undefined (doesn't inherit valueOf)
  };
  //#endregion

  return (
    <div className="grid gap-4">
      <Grid
        label="hasOwnProperty(prop)"
        descp={[
          "Returns a boolean indicating whether the object has the specified property as its *own* property (as opposed to inheriting it).",
          "Does not check down the prototype chain.",
          "Returns true even for non-enumerable own properties.",
          "Throws a TypeError if called on an object created with `Object.create(null)` because it doesn't inherit from `Object.prototype`.",
          "Consider using the static `Object.hasOwn(obj, prop)` method instead, which works reliably for all objects.",
        ]}
      >
        <Buttons>
          <Button
            label="hasOwnProperty Examples"
            handleClick={hasOwnPropertyExample}
          />
        </Buttons>
      </Grid>

      <Grid
        label="isPrototypeOf(object)"
        descp={[
          "Returns a boolean indicating whether the object on which it's called exists anywhere in the prototype chain of the `object` parameter.",
          "Checks the entire prototype chain.",
          "`A.isPrototypeOf(B)` checks if A is a prototype of B.",
        ]}
      >
        <Buttons>
          <Button
            label="isPrototypeOf Examples"
            handleClick={isPrototypeOfExample}
          />
        </Buttons>
      </Grid>

      <Grid
        label="propertyIsEnumerable(prop)"
        descp={[
          "Returns a boolean indicating whether the specified property is the object's *own* property and is also enumerable.",
          "Own properties created via simple assignment or object literal are enumerable by default.",
          "Properties added via `Object.defineProperty` are non-enumerable by default.",
          "Inherited properties always return `false` for this method.",
        ]}
      >
        <Buttons>
          <Button
            label="propertyIsEnumerable Examples"
            handleClick={propertyIsEnumerableExample}
          />
        </Buttons>
      </Grid>

      <Grid
        label="toString()"
        descp={[
          "Returns a string representing the object.",
          'By default, for plain objects, it returns `"[object Object]"`.',
          "Many built-in objects (Array, Function, Date, Error, etc.) override `toString()` to provide more useful representations.",
          "You can override `toString()` on your own objects for custom string serialization.",
          "Often called automatically during type coercion to a string (e.g., concatenation with a string).",
        ]}
      >
        <Buttons>
          <Button label="toString Examples" handleClick={toStringExample} />
        </Buttons>
      </Grid>

      <Grid
        label="valueOf()"
        descp={[
          "Returns the primitive value of the specified object.",
          "By default, for plain objects, it returns the object itself.",
          "Some built-in objects (Date, Number wrapper, String wrapper, Boolean wrapper) override `valueOf()` to return an appropriate primitive value.",
          "JavaScript often calls `valueOf()` automatically during type coercion when a primitive value (especially a number) is expected.",
          "If `valueOf()` doesn't return a primitive, `toString()` might be called as a fallback in some contexts (like numeric conversion).",
          "You can override `valueOf()` on custom objects to define their primitive representation.",
        ]}
      >
        <Buttons>
          <Button label="valueOf Examples" handleClick={valueOfExample} />
        </Buttons>
      </Grid>
    </div>
  );
};
