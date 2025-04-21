import { CodeElement } from "./CodeElement";

export const CodeDisplay = ({ heading, codeSnippet }) => {
  return (
    <div>
      <h3 className="text-white mt-2.5">{heading}</h3>
      <CodeElement>{codeSnippet}</CodeElement>
    </div>
  );
};
