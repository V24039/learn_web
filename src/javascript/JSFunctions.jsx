import { CodeDisplay, Grid, MainHeading } from "../components";

export const JSFunctions = () => {
  return (
    <>
      <MainHeading heading="JavaScript Function" />
      <section>
        <Grid
          label="Length method of Promise"
          descp={[
            "function.length give the number arugments the function as",
            "Only the required number arugment is consider optional arugments are ignored",
          ]}
        >
          <CodeDisplay
            heading={"Example"}
            codeSnippet={`const func1 = () => {}

const func2 = (a,b,c) => {}

const func3 = (a,b,c=4) => {}


console.log(func1.length);
// Expected output: 0

console.log(func2.length);
// Expected output: 3

console.log(func3.length);
// Expected output: 2
`}
          ></CodeDisplay>
        </Grid>
      </section>
    </>
  );
};
