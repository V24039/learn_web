export const MainHeading = ({ heading, reference }) => {
  return (
    <section className="mb-6">
      <h1 className="inline text-3xl font-bold">{heading}</h1>
      {reference && (
        <a
          href={reference?.link}
          style={{
            paddingLeft: "5px",
            color: "#0066cc",
            textDecoration: "none",
          }}
        >
          [{reference?.label}]
        </a>
      )}
    </section>
  );
};
