import {
  Accordion,
  Lists,
  MainHeading,
  PropertiesPopup,
} from "../../components";
import { JSPaths } from "../../Navigation/const";
import { objectStyles } from "./consts";
import { CreatingObjects, GetMethods, ObjectsProperty } from "./staticMethods";

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
            "Ther are two types of descriptors- data and accessor",
            "data descriptor is property with a value that may or may not be writable.",
            "access descriptor is a property described by a getter-setter pair of functions.",
            "A descriptor can either be one of these but cannot be both.",
          ]}
        />
        <button popovertarget="showMethods">Object Methods</button>
      </div>
      <div style={objectStyles.section}>
        <h2 className="text-xl leading-12">
          Types of property attributes in object
        </h2>
        <Accordion
          id="configurableProp"
          summary="Configurable property"
          descp="When false"
          list={[
            "type cannot be changed between data and accessor (value, getter-setter)",
            "the property may not be deleted",
            "other attributes cannot be changed except its date descriptor with writable:true, then the value and writiable can be changed",
          ]}
        />
        <Accordion
          id="configurableAttri"
          summary="Configurable attribute"
          descp="When false"
          list={[
            "can used in both data and accessor descriptor",
            "type cannot be changed between data and accessor (value, getter-setter)",
            "the property may not be deleted",
            "other attributes cannot be changed except its date descriptor with writable:true, then the value and writiable can be changed",
          ]}
        />
        <Accordion
          id="enumerableAttri"
          summary="enumerable attribute"
          descp=""
          list={[
            "Used only in data descriptor",
            "Defines if the property is enumerable, i.e it it can iterable",
            "When set to false the property cannot be used via spread operator, for...in loops etc",
            "When a property is defined via defineProperty it is set to false by default",
          ]}
        />
        <Accordion
          id="Attri"
          summary="value attribute"
          descp=""
          list={[
            "Used only in data descriptor",
            "Defines the value of the property",
            "When a property is defined via defineProperty it is set to false by default",
          ]}
        />
        <Accordion
          id="Attri"
          summary="writable attribute"
          descp=""
          list={[
            "Used only in data descriptor",
            "Defines wether the value can be changed, the value can be changed only is set to true",
          ]}
        />
        <Accordion
          id="Attri"
          summary="get attribute"
          descp=""
          list={[
            "Used only in accessor descriptor",
            "Serve as getter for the property like getter in classes",
            "Cannot be used with data accessor",
          ]}
        />
        <Accordion
          id="Attri"
          summary="set attribute"
          descp=""
          list={[
            "Used only in accessor descriptor",
            "Serve as setter for the property like setter in classes",
            "If set to undefined make the property non-writtable",
            "Cannot be used with data accessor",
          ]}
        />
      </div>

      <CreatingObjects />
      <GetMethods />
      <ObjectsProperty />
    </>
  );
};
