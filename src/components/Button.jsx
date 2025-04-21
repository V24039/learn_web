export const Button = ({handleClick, label}) => {
  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
    >
      {label}
    </button>
  );
};
