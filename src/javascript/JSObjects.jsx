import { MainHeading } from "../components/MainHeading";

export const JSObjects = () => {
  const objectStyles = {
    container: {
      padding: "20px",
      maxWidth: "800px",
      margin: "0 auto",
    },
    section: {
      marginBottom: "20px",
    },
    code: {
      backgroundColor: "#f4f4f4",
      padding: "15px",
      borderRadius: "5px",
      overflow: "auto",
      color: "black",
    },
    heading: {
      color: "white",
      marginBottom: "10px",
    },
  };

  //hidden properties - Symbols, object.defineProperty with enumberable as false

  return (
    <div style={objectStyles.container}>
      <MainHeading
        heading="JavaScript Objects"
        reference={{
          link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
          label: "MDN Link"
        }}
      />

      <div style={objectStyles.section}>
        <h3 style={objectStyles.heading}>Object Basics</h3>
        <p>
          Object inherits properties (including methods) from Object.prototype
        </p>
        <p>
          Object.prototype is the only object in the core JavaScript language
          that has immutable prototype — the prototype of Object.prototype is
          always null and not changeable.
        </p>
      </div>

      <div style={objectStyles.section}>
        <h3 style={objectStyles.heading}>Creating Objects</h3>
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
      </div>

      <div style={objectStyles.section}>
        <h3 style={objectStyles.heading}>Common Object Methods</h3>
        <pre style={objectStyles.code}>
          <code>
            {`// Object.keys()
const keys = Object.keys(person);  // ['name', 'age', 'greet']

// Object.values()
const values = Object.values(person);  // ['John', 30, ƒ]

// Object.entries()
const entries = Object.entries(person);  // [['name', 'John'], ['age', 30], ['greet', ƒ]]

// Object.freeze()
Object.freeze(person);  // Makes object immutable`}
          </code>
        </pre>
      </div>

      <div style={objectStyles.section}>
        <h3 style={objectStyles.heading}>Working with Properties</h3>
        <pre style={objectStyles.code}>
          <code>
            {`// Adding and modifying properties
person.email = 'john@example.com';
person['phone'] = '123-456-7890';

// Checking if property exists
console.log('name' in person);  // true
console.log(person.hasOwnProperty('age'));  // true

// Deleting properties
delete person.email;`}
          </code>
        </pre>
      </div>
    </div>
  );
};
