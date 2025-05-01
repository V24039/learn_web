export const Accordion = ({ id, summary, descp, list }) => {
  return (
    <details id={id}>
      <summary>{summary}</summary>
      <p>{descp}</p>
      <ul>
        {list?.map((item, index) => (
          <li key={`${id}-${index}`}>{item}</li>
        ))}
      </ul>
    </details>
  );
};
