import { Button, Buttons, CodeElement, Grid, Lists, MainHeading } from "../../components";

const JSAsync = () => {
  const demoSetTimeout = () => {
    console.log("Starting timeouts...");

    setTimeout(() => {
      console.log("First timeout with 5000 delay");
    }, 5000);

    setTimeout(() => {
      console.log("Second timeout with 100 delay");
    }, 100);

    setTimeout(() => {
      console.log("Third timeout with 500 delay");
    }, 500);
  };

  const demoSetInterval = () => {
    const intervalId = setInterval(() => {
      console.log("Interval tick");
    }, 1000);

    // Stop after 5 seconds
    setTimeout(() => {
      clearInterval(intervalId);
      console.log("Interval stopped");
    }, 5000);
  };

  const demoSingleThread = () => {
    const time = new Date();
    console.log(time);
    setTimeout(() => {
      console.log(
        "Not soon after five seconds due to while loop is occuping the thread"
      );
      console.log(new Date());
    }, 5000);
    let i = 0;
    while (i < 10000000000) {
      if (i % 1000000000 === 0) {
        console.log(i);
      }
      i++;
    }
  };

  return (
    <>
      <MainHeading heading="JavaScript Asynchronous Programming" />

      {/* setTimeout Section */}
      <section className="grid gap-6 mb-8">
        <Grid
          label="setTimeout Function"
          descp={["Calls a function after specified milliseconds"]}
        >
          <Buttons>
            <Button handleClick={demoSetTimeout} label="Demo setTimeout" />
          </Buttons>
          <CodeElement>setTimeout(function, milliseconds);</CodeElement>
        </Grid>
      </section>

      {/* setInterval Section */}
      <section className="grid gap-6 mb-8">
        <Grid
          label="setInterval Function"
          descp={["Calls a function repeatedly at specified intervals"]}
        >
          <Buttons>
            <Button handleClick={demoSetInterval} label="Demo setInterval" />
          </Buttons>
          <CodeElement>setInterval(function, milliseconds);</CodeElement>
        </Grid>
      </section>

      {/* Event Loop Section */}
      <section className="grid gap-6">
        <Grid
          label="JavaScript Event Loop"
          descp={["Understand how the event loop processes tasks and microtasks"]}
        >
          <Lists
            listName="Key Points:"
            points={[
              "Tasks are executed in order of the event loop",
              "Microtasks have priority over regular tasks",
              "setTimeout/setInterval callbacks are regular tasks",
              "Promise callbacks are microtasks",
            ]}
          />
          <Buttons>
            <Button
              handleClick={demoSingleThread}
              label="Waiting for idle thread"
            />
          </Buttons>
        </Grid>
      </section>
    </>
  );
};

export default JSAsync;
