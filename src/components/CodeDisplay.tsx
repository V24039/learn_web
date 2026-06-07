import { CodeElement } from "./CodeElement";

interface CodeDisplayProps {
  heading?: string;
  codeSnippet: React.ReactNode;
}

export const CodeDisplay = ({ heading, codeSnippet }: CodeDisplayProps) => {
  return (
    <div>
      <h3 className="text-white mt-2.5">{heading}</h3>
      <CodeElement>{codeSnippet}</CodeElement>
    </div>
  );
};
