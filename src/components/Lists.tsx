/* eslint-disable no-unused-vars */
/* TO-DO
- resovle listType warning
- Add sub list type (JSObjects)
*/

interface ListsProps {
  listName: string;
  points: Array<string>;
  orderList?: boolean;
}

export const Lists = ({ listName, points, orderList = false }: ListsProps) => {
  const listType = orderList ? "ol" : "ul";

  return (
    <>
      <h3 className="leading-10 text-xl">{listName}</h3>
      {/* <listType>
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </listType> */}

      {orderList ? (
        <ol>
          {points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ol>
      ) : (
        <ul>
          {points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      )}
    </>
  );
};
