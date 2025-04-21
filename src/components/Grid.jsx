export const Grid = ({ label, descp, children, link = "" }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="mb-3">
        <h3 className="inline text-lg font-semibold">{label}</h3>
        {link && <a className="pl-2 text-xs" href={link}>[MDN Link]</a>}
      </div>
      {descp?.map((value, index) => (
        <p key={index} className="text-gray-300 mb-4">
          {value}
        </p>
      ))}
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
};
