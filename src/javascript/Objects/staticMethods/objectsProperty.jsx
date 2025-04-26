/*
TO-DO
  - getOwnPropertyDescriptor
  - getOwnPropertyDescriptors
  - getOwnPropertyNames
  - getOwnPropertySymbols
  - getPrototypeOf
  - setPrototypeOf
  - definePoperty
  - defineProperties
*/

import { objectStyles } from "../consts"

export const ObjectsProperty = () => {
  return (
    
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
  )
}
