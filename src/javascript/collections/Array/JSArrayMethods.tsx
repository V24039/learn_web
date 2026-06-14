import { Button, Buttons, Grid, MainHeading } from "../../../components";
import {
  JSEntires,
  JSFilter,
  JSFind,
  JSForeach,
  JSKeys,
  JSMap,
  JSReduce,
  JSReduceRight,
} from "./methods/iterations";
import {
  JSCopyWithin,
  JSFill,
  JSPushPop,
  JSReverse,
  JSShiftUnshift,
  JSSort,
  JSSplice,
} from "./methods/mutating";
import {
  JSConcat,
  JSFlat,
  JSFlatMap,
  JSJoin,
  JSReversed,
  JSSlice,
  JSToLocaleString,
  JSToSorted,
  JSToString,
} from "./methods/non-mutating";
import { JSFrom, JSFromAsync, JSIsArray, JSOf } from "./methods/staticMethods";
import {
  JSAt,
  JSEvery,
  JSFindIndex,
  JSFindLast,
  JSFindLastIndex,
  JSIncludes,
  JSIndexOf,
  JSLastIndexOf,
  JSSome,
  JSWith,
} from "./methods/utility";

// 1. Array static methods: Array.from(), Array.isArray(), Array.of()
// 2. Iteration methods: forEach, map, filter, reduce, find, findIndex
// 3. Utility methods: includes, indexOf, lastIndexOf, some, every
// 4. Mutating methods: push, pop, shift, unshift, splice, reverse, sort
// 5. Non-mutating methods: slice, concat, join
// 6. Chaining array methods
// 7. Common use cases and best practices

export const JSArrayMethods = () => {
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

  const demoChaining = () => {
    console.log(
      "Using chaining to filter even numbers, map to double them and then join into a string",
    );
    const arr = [...testArray];
    const result = arr
      .filter((n) => n % 2 === 0)
      .map((n) => n * 2)
      .join(", ");
    console.log(result);
  };

  return (
    <div>
      <MainHeading heading="JavaScript Array Methods" />
      {/* Static methods */}
      <section className="grid gap-6 mb-8">
        <h1>Static methods</h1>
        <JSFrom />
        <JSFromAsync />
        <JSIsArray />
        <JSOf />
      </section>

      {/* Iteration Methods */}
      <section className="grid gap-6 mb-8">
        <h1>Iteration Methods</h1>
        <JSForeach />
        <JSMap />
        <JSFilter />
        <JSReduce />
        <JSReduceRight />
        <JSFind />
        <JSKeys />
        <JSEntires />
      </section>

      {/* Utility Methods */}
      <section className="grid gap-6 mb-8">
        <h1>Utility Methods</h1>
        <JSIncludes />
        <JSIndexOf />
        <JSLastIndexOf />
        <JSSome />
        <JSEvery />
        <JSAt />
        <JSFindIndex />
        <JSFindLast />
        <JSFindLastIndex />
        <JSWith />
      </section>

      {/* Mutating Methods */}
      <section className="grid gap-6 mb-8">
        <h1>Mutating Methods</h1>
        <JSPushPop />
        <JSShiftUnshift />
        <JSSplice />
        <JSReverse />
        <JSSort />
        <JSCopyWithin />
        <JSFill />
      </section>

      {/* Non-Mutating Methods */}
      <section className="grid gap-6 mb-8">
        <h1>Non-Mutating Methods</h1>
        <JSSlice />
        <JSConcat />
        <JSJoin />
        <JSFlat />
        <JSFlatMap />
        <JSReversed />
        <JSToLocaleString />
        <JSToString />
        <JSToSorted />
      </section>

      <section className="grid gap-6 mb-8">
        <Grid
          label="Chaining array methods"
          descp={["Demonstrates how to chain multiple array methods together."]}
        >
          <Buttons>
            <Button handleClick={demoChaining} label="Demo chaining" />
          </Buttons>
        </Grid>
      </section>
    </div>
  );
};
