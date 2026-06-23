import { Button, Buttons, Grid, MainHeading } from "../../../components";
import {
  JSEntries,
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

export const JSArrayMethods = () => {
  const testArray = [1, 2, 3, 4, 5];

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
      <section className="grid gap-6 mb-8" id="staticMethods">
        <h1>Static methods</h1>
        <JSFrom />
        <JSFromAsync />
        <JSIsArray />
        <JSOf />
      </section>

      {/* Iteration Methods */}
      <section className="grid gap-6 mb-8" id="iterationMethods">
        <h1>Iteration Methods</h1>
        <JSForeach />
        <JSMap />
        <JSFilter />
        <JSReduce />
        <JSReduceRight />
        <JSFind />
        <JSKeys />
        <JSEntries />
      </section>

      {/* Utility Methods */}
      <section className="grid gap-6 mb-8" id="utilityMethods">
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
      <section className="grid gap-6 mb-8" id="mutatingMethods">
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
      <section className="grid gap-6 mb-8" id="nonMutatingMethods">
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
