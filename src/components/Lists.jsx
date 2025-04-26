/* eslint-disable no-unused-vars */

export const Lists = ({ listName, points, orderList = false }) => {
  const listType = orderList ? "ol" : "ul";

  return (
    <>
      <h3 className="leading-10 text-xl">{listName}</h3>
      <listType>
        {points.map((point, index) => (
          <li key={index} >{point}</li>
        ))}
      </listType>
    </>
  );
};