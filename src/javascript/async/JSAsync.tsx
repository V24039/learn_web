import { Button, CodeElement, MainHeading } from "../../components";

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
      <section className="mb-8 bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">setTimeout Function</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">Basic Usage</h3>
            <p className="text-gray-300 mb-2">
              Calls a function after specified milliseconds
            </p>
            <Button handleClick={demoSetTimeout} label="Demo setTimeout" />
          </div>
          <CodeElement>setTimeout(function, milliseconds);</CodeElement>
        </div>
      </section>

      {/* setInterval Section */}
      <section className="mb-8 bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">setInterval Function</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">Repeated Execution</h3>
            <p className="text-gray-300 mb-2">
              Calls a function repeatedly at specified intervals
            </p>
            <Button handleClick={demoSetInterval} label="Demo setInterval" />
          </div>
          <CodeElement>setInterval(function, milliseconds);</CodeElement>
        </div>
      </section>

      {/* Event Loop Section */}
      <section className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">JavaScript Event Loop</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>Tasks are executed in order of the event loop</li>
          <li>Microtasks have priority over regular tasks</li>
          <li>setTimeout/setInterval callbacks are regular tasks</li>
          <li>Promise callbacks are microtasks</li>
        </ul>
        <Button
          handleClick={demoSingleThread}
          label="Waiting for idle thread"
        />
      </section>
    </>
  );
};

export default JSAsync;
