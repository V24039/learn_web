import { Lists, MainHeading, PropertiesPopup } from "../../components";
import { JSPaths } from "../../Navigation/const";
import { objectStyles } from "./consts";
import { CreatingObjects } from "./staticMethods";

/* TO-DO
1 Explain boxing
*/

export const JSObjects = () => {

  // null-prototype objects
  // need to explain what happens null prototype and why it is used
  // const normalObj = Object.create(); giving error
  // const nullObj = Object.create(null)

  return (
    <>
      <PropertiesPopup id="showMethods" properties={JSPaths[0]?.subPaths} />
      <MainHeading
        heading="JavaScript Objects"
        reference={{
          link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
          label: "MDN Link",
        }}
      />

      <div style={objectStyles.section}>
        <Lists
          listName="Key points about objects:"
          points={[
            "Object inherits properties (including methods) from Object.prototype.",
            "Object.prototype is the only object in the core JavaScript language that has immutable prototype, the prototype of Object.prototype is always null and not changeable.",
            "Objects are a collection of key-value pairs.",
            "Keys are strings (or Symbols), and values can be any data type.",
            "Objects are mutable, meaning their properties can be changed.",
            "Objects can contain methods (functions as properties).",
          ]}
        />
        <button popovertarget="showMethods">Object Methods</button>
      </div>

      <CreatingObjects />
    </>
  );
};
