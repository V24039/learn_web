export const PropertiesPopup = ({ id, properties }) => {
  return (
    <div className="bg-amber-400" id={id} popover="auto">
      {properties?.map((value, index) => (
        <div key={`${value}-${index}`}>{value?.name}</div>
      ))}
    </div>
  );
};
