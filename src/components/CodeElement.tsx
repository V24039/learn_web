export const CodeElement = ({ children }: { children: React.ReactNode }) => {
  return (
    <pre className="bg-fuchsia-950 p-3.5 rounded-[5px] overflow-auto">
      <code>{children}</code>
    </pre>
  );
};
